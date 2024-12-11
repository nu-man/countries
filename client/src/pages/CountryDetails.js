import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

const CountryDetails = () => {
  const { id } = useParams(); // Extract the `id` from the URL
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [country, setCountry] = useState(null); // State for the first API
  const [courses, setCourses] = useState([]); // Initialize as an empty array
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        // Fetch the first API data
        const countryResponse = await axios.get(
          `https://campusroot.com/api/v1/public/destination/${id}`
        );
  
        if (countryResponse.data && countryResponse.data.data) {
          let countryData = countryResponse.data.data;
  
          // Replace "USA" with "United States of America" and "UK" with "United Kingdom"
          if (countryData.title === "USA") {
            countryData.title = "United States of America";
          } else if (countryData.title === "UK") {
            countryData.title = "United Kingdom";
          }
  
          setCountry(countryData);
  
          // Prepare the request body for the second API
          const requestBody = {
            page: 1,
            filterData: [
              {
                type: "country",
                data: [countryData.title], // Use the modified country title
              },
            ],
            currency: "CAD",
          };
  
          // Fetch the second API data
          const coursesResponse = await axios.post(
            `https://campusroot.com/api/v1/public/listings/courses`,
            requestBody
          );
  
          // Check if 'data.list' exists and is an array
          if (
            coursesResponse.data &&
            Array.isArray(coursesResponse.data.data.list)
          ) {
            setCourses(coursesResponse.data.data.list); // Set the courses from the 'list' array
          } else {
            setCourses([]); // Fallback to an empty array if the data is not in the expected structure
            setError("Invalid data structure from the second API.");
          }
        } else {
          setError("Invalid data structure from the first API.");
        }
      } catch (err) {
        setError("Failed to load data from APIs.");
      } finally {
        setLoading(false);
      }
    };
  
    fetchCountryDetails();
  }, [id]);
  

  if (loading) return <div>Loading details...</div>;
  if (error) return <div>{error}</div>;
  if (!country) return <div>No details found for this country.</div>;

  // Get unique universities
  const universities = Array.from(
    new Set(courses.map((course) => course.university.name))
  );

  // Function to navigate to the university or course details page
  const handleNavigate = (type, id) => {
    if (type === "university") {
      navigate(`/university/${id}`);
    } else if (type === "course") {
      navigate(`/course/${id}`);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Study in {country.title}</h1>
      <img
        src={country.coverImageSrc}
        alt={country.title}
        style={{
          width: "50%",
          height: "auto",
          objectFit: "cover",
          marginBottom: "20px",
        }}
      />
      <Container>
        {/* Render list of all universities */}
        {universities.length > 0 ? (
          <div
            className="top-courses"
            style={{
              marginTop: "20px",
              textAlign: "left",
            }}
          >
            <h4>
              <strong>Top Universities</strong>
            </h4>
            <ol>
              {universities.map((university, index) => (
                <li
                  key={index}
                  onClick={() => handleNavigate("university", university.id)} // Navigate to the university page
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  <strong>{university}</strong>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div>No universities available for this country.</div>
        )}

        {/* Render list of all courses */}
        {courses.length > 0 ? (
          <div
            className="top-courses"
            style={{ marginTop: "20px", textAlign: "left" }}
          >
            <h4>
              <strong>Top Courses</strong>
            </h4>
            <ol>
              {courses.slice(0, 10).map((course) => (
                <li
                  key={course._id}
                  onClick={() => handleNavigate("course", course._id)} // Navigate to the course page
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  <strong>{course.name}</strong>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div>No courses available for this country.</div>
        )}
      </Container>
      {/* Render the rich text content */}
      <div
        dangerouslySetInnerHTML={{ __html: country.content }}
        style={{
          textAlign: "left",
          margin: "20px auto",
          width: "80%",
          lineHeight: "1.6",
          fontFamily: "Arial, sans-serif",
        }}
        className="rich-content"
      />
    </div>
  );
};

export default CountryDetails;
