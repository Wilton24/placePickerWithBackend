import Places from './Places.jsx';
import { useEffect, useState } from 'react';
import axios from 'axios';

const places = localStorage.getItem('places');

export default function AvailablePlaces({ onSelectPlace }) {
  const [isFetching, setIsFetching] = useState(false);
  const [availablePlaces, setAvailablePlaces] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      try {
        const response = await axios.get("http://localhost:3000/places");
        const data = response.data.places;
        // localStorage.setItem('places', JSON.stringify(data));
        setAvailablePlaces(data)
        setIsFetching(false);
      } catch (error) {
        setIsFetching(false);
        console.log('Error fetching places:', error);
      }
    };
    fetchData();

    // setAvailablePlaces(JSON.parse(places));
  }, []);

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
