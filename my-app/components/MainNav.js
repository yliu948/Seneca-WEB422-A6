import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { useRouter } from "next/router";
import { useState } from "react";
import Link from "next/link";
import { addToHistory } from "@/lib/userData";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { readToken, removeToken } from "@/lib/Authenticate";

export default function MainNav() {
  const router = useRouter();
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  let token = readToken();

  async function submitForm(e) {
    e.preventDefault();
    const searchField = e.target.search.value;
    e.target.search.value = "";
    setIsExpanded(false);
    setSearchHistory(await addToHistory(`title=true&q=${searchField}`));
    if (searchField) {
      router.push(`/artwork?title=true&q=${searchField}`);
    }
  }

  function logout() {
    setIsExpanded(false);
    removeToken();
    router.push("/");
  }

  return (
    <>
      <Navbar
        className=" fixed-top navbar-dark bg-dark"
        expand="lg"
        expanded={isExpanded}
      >
        <Container>
          <Navbar.Brand>Yi Liu</Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbarScroll"
            onClick={() => setIsExpanded(!isExpanded)}
          />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto">
              <Link href="/" legacyBehavior passHref>
                <Nav.Link
                  onClick={() => setIsExpanded(false)}
                  active={router.pathname === "/"}
                >
                  Home
                </Nav.Link>
              </Link>
              {token && (
                <Link href="/search" legacyBehavior passHref>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/search"}
                  >
                    Advanced Search
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            <Nav>
              {!token && (
                <Link href="/register" legacyBehavior passHref>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/register"}
                  >
                    Register
                  </Nav.Link>
                </Link>
              )}
              {!token && (
                <Link href="/login" legacyBehavior passHref>
                  <Nav.Link
                    onClick={() => setIsExpanded(false)}
                    active={router.pathname === "/login"}
                  >
                    Login
                  </Nav.Link>
                </Link>
              )}
            </Nav>
            &nbsp;
            {token && (
              <Form className="d-flex" onSubmit={submitForm}>
                <Form.Control
                  type="search"
                  name="search"
                  placeholder="Search"
                  className="me-2"
                  aria-label="Search"
                />
                <Button type="submit" variant="outline-success">
                  Search
                </Button>
              </Form>
            )}
            &nbsp;
            <Nav>
              {token && (
                <NavDropdown
                  title={token.userName}
                  active={
                    router.pathname === "/favourites" ||
                    router.pathname === "/history"
                  }
                >
                  <NavDropdown.Item
                    as={Link}
                    href={"/favourites"}
                    onClick={() => setIsExpanded(false)}
                    //active={router.pathname === "/favourites"}
                  >
                    Favourites
                  </NavDropdown.Item>

                  <NavDropdown.Item
                    as={Link}
                    href={"/history"}
                    onClick={() => setIsExpanded(false)}
                    //active={router.pathname === "/history"}
                  >
                    Search History
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} href={"/"} onClick={logout}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <br />
      <br />
    </>
  );
}
