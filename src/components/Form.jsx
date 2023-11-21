import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";

import BackButton from "./BackButton";
import Button from "./Button";
import Message from "./Message";
import Spinner from "./Spinner";

import { useCities } from "../context/CitiesContext";
import { useUrlPosition } from "../hooks/useURLPosition";

import styles from "./Form.module.css";
import "react-datepicker/dist/react-datepicker.css";

// Helper function that converts country code to flag emoji
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

// Base url for getting the data from clicked position on the map
const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  // Getting the lat and lng from URL using custom hook
  const [lat, lng] = useUrlPosition();

  // Setting some states
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [emoji, setEmoji] = useState("");
  const [geocodingError, setGeocodingError] = useState("");

  // Getting the navigate function from useNavigate hook
  const navigate = useNavigate();

  // Getting the state from the Context API
  const { createCity, isLoading } = useCities();

  // useEffect function that gets the info about the clicked area on the map
  useEffect(() => {
    // Initial check of whether we have the coordinates. If not, return immediately
    if (!lat && !lng) return;

    async function fetchCityData() {
      try {
        // Setting initial state for loading and error
        setIsLoadingGeocoding(true);
        setGeocodingError("");

        // Fetching data about the clicked area
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();

        // If clicked outside of the country, throwing error
        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else 😉"
          );

        // Setting the city, country and the flag
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (e) {
        setGeocodingError(e.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  // Form submit handler function
  async function handleSubmit(e) {
    // Preventing default behavior
    e.preventDefault();

    // Guard clause
    if (!cityName || !date) return;

    // Creating the new city object
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    // Passing the new city data to the createCity function from the Context API
    await createCity(newCity);

    // Redirecting user to the cities list
    navigate("/app/cities");
  }

  // If data is still loading, display the Spinner
  if (isLoadingGeocoding) return <Spinner />;

  // If no coordinates, display starter message
  if (!lat && !lng)
    return <Message message={`Start by clicking somewhere on the map`} />;

  // If there's an error, displaying a message
  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
