import styles from "./CityList.module.css";
import CityItem from "./CityItem";
import Message from "./Message";
import Spinner from "./Spinner";

function CityList({ cities, isLoading }) {
  // If list is still being loaded, display the spinner
  if (isLoading) return <Spinner />;

  // If cities array is empty, display the message
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {/* Iterating through cities array and passing it to CityItem */}
      {cities.map((city) => (
        <CityItem city={city} key={city.id} />
      ))}
    </ul>
  );
}

export default CityList;
