import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Container } from "react-bootstrap";

const CountryDetails = () => {
  const { id } = useParams(); // Extract the `id` from the URL
  const navigate = useNavigate(); // Initialize the useNavigate hook
  const [country, setCountry] = useState(null); // State for the first API
  const [courses, setCourses] = useState([]); // State for courses data
  const [universities, setUniversities] = useState([]); // State for universities data
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        setLoading(true);

        // Fetch country details
        const countryResponse = await axios.get(
          `https://campusroot.com/api/v1/public/destination/${id}`
        );
        const countryData = countryResponse?.data?.data;
        if (!countryData) throw new Error("Invalid data from the country API.");

        let normalizedTitle = countryData.title;
        if (normalizedTitle === "USA") {
          normalizedTitle = "United States of America";
        } else if (normalizedTitle === "UK") {
          normalizedTitle = "United Kingdom";
        }
        const updatedCountryData = { ...countryData, title: normalizedTitle };
        setCountry(updatedCountryData);

        // Fetch university details
        const universityResponse = await axios.post(
          "https://campusroot.com/api/v1/public/listings/universities",
          {
            page: 1,
            filterData: [
              {
                type: "country",
                data: [normalizedTitle],
              },
            ],
            currency: "CAD",
          }
        );
        const universityList = universityResponse?.data?.data?.list || [];
        setUniversities(universityList);
        console.log(universityList);
        

        // Fetch courses
        const coursesResponse = await axios.post(
          `https://campusroot.com/api/v1/public/listings/courses`,
          {
            page: 1,
            filterData: [
              {
                type: "country",
                data: [normalizedTitle],
              },
            ],
            currency: "CAD",
          }
        );
        const coursesList = coursesResponse?.data?.data?.list || [];
        setCourses(coursesList);
      } catch (err) {
        setError(err.message || "Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchCountryDetails();
  }, [id]);

  if (loading) return <div>Loading details...</div>;
  if (error) return <div>{error}</div>;
  if (!country) return <div>No details found for this country.</div>;

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
        {/* Render universities */}
        {universities.length > 0 ? (
          <div
            className="top-courses"
            style={{ marginTop: "20px", textAlign: "left" }}
          >
            <h4>
              <strong>Top Universities</strong>
            </h4>
            <ul>
              {universities.slice(0,10).map((university) => (
                <li
                  key={university._id}
                  onClick={() => navigate(`/university/${university._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <strong>{university.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No universities available for this country.</div>
        )}

        {/* Render courses */}
        {courses.length > 0 ? (
          <div
            className="top-courses"
            style={{ marginTop: "20px", textAlign: "left" }}
          >
            <h4>
              <strong>Top Courses</strong>
            </h4>
            <ul>
              {courses.slice(0, 10).map((course) => (
                <li
                  key={course._id}
                  onClick={() => navigate(`/course/${course._id}`)}
                  style={{ cursor: "pointer", color: "blue" }}
                >
                  <strong>{course.name}</strong>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>No courses available for this country.</div>
        )}
      </Container>
      <div
        dangerouslySetInnerHTML={{ __html: country.content }}
        style={{
          textAlign: "left",
          margin: "20px auto",
          width: "80%",
          lineHeight: "1.6",
        }}
        className="rich-content"
      />
    </div>
  );
};

export default CountryDetails;
