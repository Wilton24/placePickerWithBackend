import Places from './Places.jsx';
import { useEffect, useState } from 'react';
import ErrorPage from './ErrorPage.jsx';
import { sortPlacesByDistance } from "../loc.js"
import { fetchPlaces } from '../fetchData.js';

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const data = await fetchPlaces();
        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlaces = sortPlacesByDistance(data, position.coords.latitude, position.coords.longitude);
          setAvailablePlaces(sortedPlaces);
          setIsFetching(false);
        });
      } catch (error) {
        setError({ message: error.message || "An error occurred while fetching places" });
        setIsFetching(false);
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <ErrorPage title="An Error occured" message={error.message} />
  }

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      isLoading={isFetching}
      loadingText="Loading available places ..."
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
