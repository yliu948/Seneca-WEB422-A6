import { useState } from "react";
import { useAtom } from "jotai";
import { favouritesAtom } from "../store";
import useSWR from "swr";
import Error from "next/error";
import { Card, Button } from "react-bootstrap";
import Link from "next/link";

export function ArtworkCard(props) {
  const { data, error } = useSWR(
    `https://collectionapi.metmuseum.org/public/collection/v1/objects/${props.objectID}`
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img
        variant="top"
        src={
          data.primaryImageSmall ||
          "https://via.placeholder.com/375x375.png?text=%5b+Not+Available+%5d"
        }
      />
      <Card.Body>
        {data.title ? (
          <Card.Title>{data.title}</Card.Title>
        ) : (
          <Card.Title>N/A</Card.Title>
        )}
        <Card.Text>
          {data.objectDate ? (
            <>
              <b>Date: </b>
              {data.objectDate}
            </>
          ) : (
            <>
              <b>Date: </b> N/A
            </>
          )}
          <br />
          {data.classification ? (
            <>
              <b>classification: </b>
              {data.classification}
            </>
          ) : (
            <>
              <b>classification: </b> N/A
            </>
          )}
          <br />
          {data.medium ? (
            <>
              <b>medium: </b>
              {data.medium}
            </>
          ) : (
            <>
              <b>medium: </b> N/A <br />
            </>
          )}
        </Card.Text>
        <Link href={`/artwork/${props.objectID}`} passHref>
          <Button variant="outline-dark">
            <b>ID:</b> {props.objectID}
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}

export function ArtworkCardDetail(props) {
  const { objectID } = props;
  const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
  const [showAdded, setShowAdded] = useState(favouritesList.includes(objectID));

  console.log(favouritesList);

  function favouritesClicked(e) {
    e.preventDefault();
    if (showAdded) {
      //console.log(favouritesList);

      setFavouritesList(favouritesList.filter((fav) => fav != objectID));

      //console.log(favouritesList);

      setShowAdded(false);
    } else {
      //console.log(favouritesList);

      setFavouritesList([...favouritesList, objectID]);

      //console.log(favouritesList);

      setShowAdded(true);
    }
  }

  const { data, error } = useSWR(
    objectID
      ? `https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectID}`
      : null
  );

  if (error) {
    return <Error statusCode={404} />;
  }

  if (!data) {
    return null;
  }

  return (
    <Card>
      {data.primaryImage && (
        <Card.Img
          variant="top"
          src={data.primaryImage}
          alt={`Image of ${data.title}`}
        />
      )}

      <Card.Body>
        {data.title ? (
          <Card.Title>{data.title}</Card.Title>
        ) : (
          <Card.Title>N/A</Card.Title>
        )}
        <Card.Text>
          {data.objectDate ? (
            <>
              <b>Date: </b>
              {data.objectDate}
            </>
          ) : (
            <>
              <b>Date: </b> N/A
            </>
          )}
          <br />
          {data.classification ? (
            <>
              <b>classification: </b>
              {data.classification}
            </>
          ) : (
            <>
              <b>classification: </b> N/A
            </>
          )}
          <br />
          {data.medium ? (
            <>
              <b>medium: </b>
              {data.medium}
            </>
          ) : (
            <>
              <b>medium: </b> N/A <br />
            </>
          )}
          <br />
          <br />
          {data.artistDisplayName ? (
            <>
              <b>Artist: </b>
              {data.artistDisplayName}
            </>
          ) : (
            <>
              <b>Artist: </b> N/A <br />
            </>
          )}
          {data.artistDisplayName && data.artistWikidata_URL ? (
            <>
              &nbsp;&#40;&nbsp;
              <a
                href={data.artistWikidata_URL}
                target="_blank"
                rel="noreferrer"
              >
                wiki
              </a>
              &nbsp;&#41;
            </>
          ) : (
            ""
          )}
          <br />
          {data.creditLine ? (
            <>
              <b>Credit Line: </b>
              {data.creditLine}
            </>
          ) : (
            <>
              <b>Credit Line: </b> N/A <br />
            </>
          )}
          <br />

          {data.dimensions ? (
            <>
              <b>Dimensions: </b>
              {data.dimensions}
            </>
          ) : (
            <>
              <b>Dimensions: </b> N/A <br />
            </>
          )}
          <br />
          <br />
        </Card.Text>
        <Button
          type="submit"
          variant={showAdded ? "primary" : "outline-primary"}
          onClick={(e) => favouritesClicked(e)}
        >
          {showAdded ? "+ Favourite (added)" : "+ Favourite"}
        </Button>
      </Card.Body>
    </Card>
  );
}
