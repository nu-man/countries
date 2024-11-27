import React from "react";
import usa from "../images/allCountries/usa.png"
import uk from "../images/allCountries/uk.png"
import canada from "../images/allCountries/usa.png"
import aus from "../images/allCountries/aus.png"
import ireland from "../images/allCountries/ireland.png"
import newzealand from "../images/allCountries/newzealand.png"
import germany from "../images/allCountries/germany.png"
import france from "../images/allCountries/france.png"
import netherland from "../images/allCountries/netherland.png"
import itlay from "../images/allCountries/itlay.png"
import singapore from "../images/allCountries/singapore.png"
import uae from "../images/allCountries/uae.png"
import { Container,Row,Col} from "react-bootstrap";
import "../App.css"


const AllCountries = () => {
  const cardData = [
    {
      country: "United States",
      pic: usa,
    },
    {
      country: "United Kingdom",
      pic: uk,
    },
    {
      country: "Canada",
      pic: canada,
    },
    {
      country: " Australia",
      pic: aus,
    },
    {
      country: " Ireland",
      pic: ireland,
    },
    {
      country: " New Zealand",
      pic: newzealand,
    },
    {
      country: "Germany",
      pic: germany,
    },
    {
      country: "France",
      pic: france,
    },
    {
      country: "Netherland",
      pic: netherland,
    },
    {
      country: "Itlay",
      pic: itlay,
    },
    {
        country: "Singapore",
        pic: singapore,
      },
      {
        country: "UAE",
        pic: uae,
      },
  ];

  return (
    <Container className="contain">
      <div className="allCountry-heading">
        <h4>
          Find your <span>Ideal</span> Country
        </h4>
      </div>
      <Row>
        {cardData.map((ele, index) => (
          <Col lg={4} md={6} sm={6} xs={6} key={index}>
            <div className="all-countries">
              <img
                src={ele.pic}
                alt={ele.country}
                className="country-image"
              />
              <h5>{ele.country}</h5>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AllCountries;
