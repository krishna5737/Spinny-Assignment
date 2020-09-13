import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Card } from "antd";
import { Row, Col } from "antd";

const { Meta } = Card;

function DebugComponent(props) {
  const currentSearch = props ? props.searchInput : "";
  const apiString = "https://api.jikan.moe/v3/search/anime?q=";
  const [apiResultState, setapiResultState] = useState([]);
  const [isMorePagesAvailable, setisMorePagesAvailable] = useState(false);
  const [currentPageNumber, setCurrentpageNumber] = useState(1);

  const loadMoreData = () => {
    setCurrentpageNumber(currentPageNumber+1);
  };

  useEffect(() => {
    if (currentSearch) {
      console.log("🔍 Making a fetch Call for: " + currentSearch);
      axios
        .get(`${apiString}${currentSearch}&page=${currentPageNumber}`)
        .then((res) => {
          const series = res.data;
          console.log(`🐸 ${JSON.stringify(series.results[0])}`);
          if (series.results.length) {
            const currentAPIState = [];
            series.results.map((obj) => {
              currentAPIState.push({
                img: obj.image_url,
                title: obj.title,
                link: obj.url,
              });
            });
            setapiResultState([...apiResultState, ...currentAPIState]);
          }
          axios
            .get(`${apiString}${currentSearch}&page=${currentPageNumber + 1}`)
            .then((res) => {
              const series = res.data;
              if (series.results.length) {
                setisMorePagesAvailable(true);
              } else {
                setisMorePagesAvailable(false);
              }
            });
        });
    }
  }, [currentSearch,currentPageNumber]);
  return (
    <>
      <div className="debug">
        <p>
          <span>Requesting: </span>
          {currentSearch
            ? "" + currentSearch
            : "API Request URL will appear here"}
        </p>
      </div>
      <div id="search_results" className="cards">
        {apiResultState.map((currentResult, key) => (
          <div key={key} style={{ padding: 20 }}>
            <Card
              style={{
                width: 200,
                borderRadius: "0px 0px 10px 10px",
              }}
              cover={<img alt="" src={currentResult.img} />}
            >
              <Meta className="card_name" description={currentResult.title} />
            </Card>
          </div>
        ))}
      </div>

      <div className="loadMoreSection">
        {isMorePagesAvailable ? (
          <Row>
            <Button
              onClick={loadMoreData.bind(this, apiResultState)}
              style={{ marginTop: 20, marginBottom: 20, left: "50%" }}
              type="primary"
            >
              Load More
            </Button>
          </Row>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

export default DebugComponent;
