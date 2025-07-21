import Places from './Places.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';
import ErrorPage from './ErrorPage.jsx';

// const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("http://localhost:3000/placeswd");
        const data = response.data.places;
        // if (!response.ok) {
        //   throw new Error('Failed to fetch places');
        // }
        if (response.request.statusText !== "OK") {
          throw new Error('Failed to fetch places');
        }

        setAvailablePlaces(data);
      } catch (error) {
        setError({ message: error.message || "An error occurred while fetching places" });
      }
      setIsFetching(false);
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
