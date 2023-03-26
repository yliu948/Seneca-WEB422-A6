import { useAtom } from "jotai";
import { searchHistoryAtom } from "../store";
import { Col, Row, Form, Button } from "react-bootstrap";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

export default function Search() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  function submitForm(data) {
    let queryString = data.searchBy + "=true";

    if (data.geoLocation) {
      queryString += "&geoLocation=" + data.geoLocation;
    }

    if (data.medium) {
      queryString += "&medium=" + data.medium;
    }

    queryString += "&isOnView=" + data.isOnView;
    queryString += "&isHighlight=" + data.isHighlight;
    queryString += "&q=" + data.q;

    setSearchHistory((current) => [...current, queryString]);
    router.push("/artwork?" + queryString);
  }

  return (
    <>
      <Form onSubmit={handleSubmit(submitForm)}>
        <div>
          <Row>
            <Col>
              <Form.Group className="mb-3">
                <Form.Label>Search Query</Form.Label>
                <Form.Control
                  {...register("q", { required: true })}
                  className={errors.q && "is-invalid"}
                  type="text"
                  placeholder=""
                  name="q"
                />
              </Form.Group>
            </Col>
          </Row>
        </div>

        <Row>
          <Col md={4}>
            <Form.Label>Search By</Form.Label>
            <Form.Select
              {...register("searchBy")}
              name="searchBy"
              className="mb-3"
            >
              <option value="title">Title</option>
              <option value="tags">Tags</option>
              <option value="artistOrCulture">Artist or Culture</option>
            </Form.Select>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Geo Location</Form.Label>
              <Form.Control
                {...register("geoLocation")}
                type="text"
                placeholder=""
                name="geoLocation"
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie &quot;Europe&quot;,
                &quot;France&quot;, &quot;Paris&quot;, &quot;China&quot;,
                &quot;New York&quot;, etc.), with multiple values separated by
                the | operator
              </Form.Text>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Medium</Form.Label>
              <Form.Control
                {...register("medium")}
                type="text"
                placeholder=""
                name="medium"
              />
              <Form.Text className="text-muted">
                Case Sensitive String (ie: &quot;Ceramics&quot;,
                &quot;Furniture&quot;, &quot;Paintings&quot;,
                &quot;Sculpture&quot;, &quot;Textiles&quot;, etc.), with
                multiple values separated by the | operator
              </Form.Text>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Check
              {...register("isHighlight")}
              type="checkbox"
              label="Highlighted"
              name="isHighlight"
            />
            <Form.Check
              {...register("isOnView")}
              type="checkbox"
              label="Currently on View"
              name="isOnView"
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <br />
            <Button
              variant="primary"
              type="submit"
              //disabled={Object.keys(errors).length > 0}
            >
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </>
  );
}
