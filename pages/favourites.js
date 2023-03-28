import { useAtom } from "jotai";
import { favouritesAtom } from "../store";

import { Col, Row, Card } from "react-bootstrap";
import { ArtworkCard } from "../components/artworkCard";

export default function Favourites() {
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  if (!favouritesList) return null;
  return (
    <>
      <Row className="gy-4">
        {favouritesList.length == 0 ? (
          <Col>
            <Card>
              <Card.Body>
                <h4>Nothing Here</h4>
                Try searching for something else.
              </Card.Body>
            </Card>
          </Col>
        ) : (
          favouritesList.map((currentObjectID) => (
            <Col lg={3} key={currentObjectID}>
              <ArtworkCard objectID={currentObjectID} />
            </Col>
          ))
        )}
      </Row>
    </>
  );
}
