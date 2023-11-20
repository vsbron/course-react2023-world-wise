import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // Getting and pulling the Query String value from URL using useSearchParams hook
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
