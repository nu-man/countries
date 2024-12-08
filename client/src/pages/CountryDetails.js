import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const CountryDetails = () => {
  const { id } = useParams(); // Extract the `id` from the URL
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountryDetails = async () => {
      try {
        const response = await axios.get(
          `https://campusroot.com/api/v1/public/destination/${id}`
        ); // Replace with the correct API endpoint
        if (response.data && response.data.data) {
          setCountry(response.data.data); // Access the 'data' object
        } else {
          setError("Invalid data structure from the API.");
        }
      } catch (err) {
        setError("Failed to load country details.");
      } finally {
        setLoading(false);
      }
    };
    fetchCountryDetails();
  }, [id]);

  if (loading) return <div>Loading country details...</div>;
  if (error) return <div>{error}</div>;
  if (!country) return <div>No details found for this country.</div>;

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1 >Study in {country.title}</h1>
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
