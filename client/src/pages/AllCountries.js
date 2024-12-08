import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

import "../App.css";

const AllCountries = () => {
  const [countries, setCountries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.post(
          "https://campusroot.com/api/v1/public/listings/destinations"
        );
        // Assuming the response structure is like the given sample
        setCountries(response.data.data.list);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchCountries();
  }, []);


// Navigate to the dynamic route with the ID
  const handleRedirect = (id) => {
    navigate(`/country/${id}`); 
  };

  return (
    <Container className="contain">
      <div className="allCountry-heading">
        <h4>
          Find your <span>Ideal</span> Country
        </h4>
      </div>
      <Row>
        {countries.map((ele, index,_id) => {

          return (
            <Col lg={4} md={6} sm={6} xs={6} key={_id}  >
              <div className="all-countries" onClick={() => handleRedirect(ele._id)}>
                <img
                  src={ele.coverImageSrc}
                  alt={"img"}
                  className="country-image"
                />
                <h5>{ele.title}</h5>
              </div>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
};

export default AllCountries;
