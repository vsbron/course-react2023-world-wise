import { createContext, useContext, useEffect, useReducer } from "react";

const BASE_URL = "http://localhost:8000";

// Creating the context
const CitiesContext = createContext();

// The initial state for the reducer
const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
};

// The reducer function that handles all the *pure* logic
function reducer(state, action) {
  switch (action.type) {
    // Loading state is active
    case "loading":
      return { ...state, isLoading: true };

    // Cities list is fetched
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
        error: "",
      };

    // Current city is loaded
    case "city/loaded":
      return { ...state, isLoading: false, currentCity: action.payload };

    // New city added to the list
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };

    // City removed from the list
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
        currentCity: {},
      };

    // Something went wrong
    case "rejected":
      return { ...state, isLoading: false, error: action.payload };
    default:
      throw new Error("Unknown action type");
  }
}

// Creating the CitiesProvider component that will wrap the components that need access to the state values
function CitiesProvider({ children }) {
  // Initializing the reducer hook
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Getting the cities list from the fake API at initial load
  useEffect(function () {
    async function fetchCities() {
      // Setting the IsLoading state to true
      dispatch({ type: "loading" });

      try {
        // Fetching the cities data
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        // Setting the cities array with received data
        dispatch({ type: "cities/loaded", payload: data });
      } catch {
        // Throwing error, disabling isLoading state
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities",
        });
      }
    }
    fetchCities();
  }, []);

  // Function that gets the city's details by fetching its id
  async function getCity(id) {
    // If selected city id matched current city's id - return immediately
    if (Number(id) === currentCity.id) return;

    // Setting the IsLoading state to true
    dispatch({ type: "loading" });

    try {
      // Fetching the city with the id
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      // Setting the new city with received data
      dispatch({ type: "city/loaded", payload: data });
    } catch {
      // Throwing error, disabling isLoading state
      dispatch({
        type: "rejected",
        payload: "There was an error loading city",
      });
    }
  }

  // Function that adds the new city to the state and the Fake API
  async function createCity(newCity) {
    // Setting the IsLoading state to true
    dispatch({ type: "loading" });
    try {
      // Fetching the new city data with POST request
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();

      // Updating the cities array with the new City
      dispatch({ type: "city/created", payload: data });
    } catch {
      // Throwing error, disabling isLoading state
      dispatch({
        type: "rejected",
        payload: "There was an error adding city",
      });
    }
  }

  // Function that deletes the city from the state and the Fake API
  async function deleteCity(id) {
    // Setting the IsLoading state to true
    dispatch({ type: "loading" });

    try {
      // Deleting the city from API with POST request
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });

      // Filtering the city array to remove deleted city
      dispatch({ type: "city/deleted", payload: id });
    } catch {
      // Throwing error, disabling isLoading state
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city",
      });
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        error,
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
