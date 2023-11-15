import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  // Getting and pulling the Query String value from URL using useSearchParams hook
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  // Getting the function from useNavigate hook, to redirect the user
  const navigate = useNavigate();

  return (
    <>
      {/* Once user clicks the map, he is redirected to form route, which brings up the form component */}
      <div className={styles.mapContainer} onClick={() => navigate("form")}>
        <h1>Map:</h1>
        <p>
          Position: {lat}, {lng}
        </p>
        <button
          onClick={() => {
            setSearchParams({ lat: 23, lng: 50 });
          }}
        >
          Change pos
        </button>
      </div>
    </>
  );
}

export default Map;
