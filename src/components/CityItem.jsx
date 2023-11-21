import { Link } from "react-router-dom";

import { useCities } from "../context/CitiesContext";

import styles from "./CityItem.module.css";

// Helper function to format the date
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

// CityItem component
function CityItem({ city }) {
  // Getting the state from Context API
  const { currentCity, deleteCity } = useCities();

  // Destructuring city prop
  const { cityName, emoji, date, id, position } = city;

  // Click handler function
  function handleClick(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <li>
      {/* Adding link with some state in the url */}
      <Link
        to={`${id}?lat=${position.lat}&lng=${position.lng}`}
        className={`${styles.cityItem} ${
          id === currentCity.id ? styles["cityItem--active"] : ""
        }`}
      >
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.name}>{cityName}</h3>
        <time className={styles.date}>({formatDate(date)})</time>
        <button className={styles.deleteBtn} onClick={handleClick}>
          &times;
        </button>
      </Link>
    </li>
  );
}

export default CityItem;
