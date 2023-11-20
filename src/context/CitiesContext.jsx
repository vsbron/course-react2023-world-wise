import { createContext, useContext, useEffect, useState } from "react";
import Spinner from "../components/Spinner";

const BASE_URL = "http://localhost:8000";

// Creating the context
const CitiesContext = createContext();

// Creating the CitiesProvider component that will wrap the components that need access to the state values
function CitiesProvider({ children }) {
  // Initializing states
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // Getting the cities list from the fake API
  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading data");
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      // Setting the IsLoading state
      setIsLoading(true);

      // Fetching the new city data with POST request
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      // Updating the cities array with the new City
      setCities((cities) => [...cities, data]);
    } catch {
      alert("There was an error creating city");
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      // Setting the IsLoading state
      setIsLoading(true);

      // Deleting the city from API with POST request
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });

      // Filtering the city array to remove deleted city
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch {
      alert("There was an error deleting city");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

// Custom hook to get the state values from Context API
function useCities() {
  // Getting the value from the context
  const context = useContext(CitiesContext);

  // Guard clause
  if (context === undefined)
    throw new Error("CitiesContext was used outside of its scope");

  // Return value
  return context;
}

export { CitiesProvider, useCities };
