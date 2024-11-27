import React from "react";
import "../App.css";
import { Container, Row, Col } from "react-bootstrap";
import Uspic from "../images/Us.png"; // Import the image
import comp from "../images/singleCountry/comp.png";
import finance from "../images/singleCountry/finance.png"
import programming from "../images/singleCountry/programming.png";
import business from "../images/singleCountry/business.png";
import management from "../images/singleCountry/management.png";
import social from "../images/singleCountry/social.png";
import law from "../images/singleCountry/law.png";
import design from "../images//singleCountry/design.png";

function Country() {
  // Array with data for each column in Section 1
  const cardData = [
    {
      title: "Currency",
      value: "USD, $",
      backgroundColor: "rgba(246, 246, 246, 1)",
    },
    {
      title: "Language",
      value: "English",
      backgroundColor: "rgba(215, 255, 253, 1)",
    },
    {
      title: "Time Zone",
      value: "ET",
      backgroundColor: "rgba(255, 234, 203, 1)",
    },
    {
      title: "Students",
      value: "320,000",
      backgroundColor: "rgba(255, 190, 181, 1)",
    },
    {
      title: "Int. Students",
      value: "52,000",
      backgroundColor: "rgba(255, 234, 203, 1)",
    },
    {
      title: "Cost of living",
      value: "$5000",
      backgroundColor: "rgba(215, 255, 253, 1)",
    },
  ];

  // Array for "Popular Programs"
  const secondCard = [
    {
      title: "Computers & IT",
      pic: comp, // Directly using imported image for testing
    },
    {
      title: "Finance",
      pic: finance, // Replace with actual images
    },
    {
      title: "Business",
      pic: business, // Replace with actual images
    },
    {
      title: "Programming",
      pic: programming, // Replace with actual images
    },
    {
      title: "Management",
      pic: management, // Directly using imported image for testing
    },
    {
      title: "Social Science",
      pic: social, // Replace with actual images
    },
    {
      title: "Law",
      pic: law, // Replace with actual images
    },
    {
      title: "Designing",
      pic: design, // Replace with actual images
    },
  ];

  return (
    <>
      <div className="country">
        <div className="section-1">
          {/* Section 1 Image */}
          <img src={Uspic} alt="US" className="responsive-image" />
        </div>

        <Container>
          {/* Section 2: Card Data */}
          <Row style={{ flexWrap: "nowrap" }}>
            {cardData.map((data, index) => (
              <Col
                lg={2}
                md={12}
                sm={12}
                key={index}
                style={{ background: data.backgroundColor }}
                className="caard"
              >
                <p>{data.title}</p>
                <h2>{data.value}</h2>
              </Col>
            ))}
          </Row>

          {/* Section 3: Description */}
          <div className="description">
            <h3>About</h3>
            <p>
              If you desire to study abroad, then the United States should be on
              the top of your list. The United States has the largest and most
              diverse international student population. Over one million
              students visit the country in quest of the greatest academic
              preparation. The country not only provides high-quality education,
              but also an experience that students will remember for the rest of
              their lives.
            </p>
          </div>

          {/* Section 4: Popular Programs */}
          <div className="section-3">
            <h3>Popular Programs</h3>
            {/* Loop through cards in chunks of 4 */}
            {secondCard
              .reduce((rows, card, index) => {
                if (index % 4 === 0) rows.push([]);
                rows[rows.length - 1].push(card);
                return rows;
              }, [])
              .map((rowCards, rowIndex) => (
                <Row key={`row-${rowIndex}`} style={{ flexWrap: "nowrap" }}>
                  {rowCards.map((card, colIndex) => (
                    <Col
                      lg={3}
                      md={3}
                      sm={4}
                      key={`col-${colIndex}`}
                      className="secondCard"
                    >
                      <div className="card-content">
                        <img
                          src={card.pic}
                          alt={card.title}
                          style={{ width: "100px", height: "100px" }}
                        />
                        <h5>{card.title}</h5>
                      </div>
                    </Col>
                  ))}
                </Row>
              ))}
          </div>

          {/* Section 5: Internship & Work Opportunities */}
          <div className="section-4">
            <h3>Internship & Work Opportunities</h3>
            <Row className="opportunities-row">
              <Col lg={6} md={12} sm={12} className="cd">
                <h5>Internship Opportunities</h5>
                <p>
                  A quality internship: Consists of a part-time or full-time
                  work schedule that includes no more than 25% clerical or
                  administrative duties. Provides a clear job/project
                  description for the work experience. Orients the student to
                  the organization, its culture and proposed work assignment.
                </p>
              </Col>

              <Col lg={6} md={12} sm={12} className="cd">
                <h5>Work Opportunities</h5>
                <p>
                  United States has always been considered as the “land of
                  opportunities”. Being one of the leading nations with a strong
                  economic structure, the nation offers an array of job
                  opportunities to international students in all fields of work.
                </p>
              </Col>
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Country;
