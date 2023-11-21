import { useState } from "react";

export function useGeolocation(defaultPosition = null) {
  // Setting up some state variables
  const [isLoading, setIsLoading] = useState(false);
  const [position, setPosition] = useState(defaultPosition);
  const [error, setError] = useState(null);

  // Function that gets user's current geolocation
  function getPosition() {
    // Guard clause
    if (!navigator.geolocation)
      return setError("Your browser does not support geolocation");

    // Set the app state to loading
    setIsLoading(true);

    // Getting the user's position
    navigator.geolocation.getCurrentPosition(
      // If success - assign the lat and lng to the state
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        // Disable the app's loading state
        setIsLoading(false);
      },
      // If failes - throw error, disable loading state
      (error) => {
        setError(error.message);
        setIsLoading(false);
      }
    );
  }
  return { position, isLoading, error, getPosition };
}
