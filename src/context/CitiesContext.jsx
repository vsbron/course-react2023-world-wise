import { createContext, useContext, useEffect, useState } from "react";

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

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
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
