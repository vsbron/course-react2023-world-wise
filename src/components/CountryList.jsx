import CountryItem from "./CountryItem";
import Message from "./Message";
import Spinner from "./Spinner";

import { useCities } from "../context/CitiesContext";

import styles from "./CountryList.module.css";

function CountryList() {
  // Getting the value from the Context API using custom hook
  const { cities, isLoading } = useCities();

  // If list is still being loaded, display the spinner
  if (isLoading) return <Spinner />;

  // If cities array is empty, display the message
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  // Deriving cities list state to the countries list
  // Reducing cties array and on each iteration checking
  const countries = cities.reduce((arr, city) => {
    // whether current city's country is in the country array
    if (!arr.map((el) => el.country).includes(city.country)) {
      // If it's not - adding to the countries array
      return [...arr, { country: city.country, emoji: city.emoji }];
    } else {
      // If it is - leaving countries array untouched
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {/* Iterating through cities array and passing it to CityItem */}
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
}

export default CountryList;
