import Places from './Places.jsx';
import { useState } from 'react';
import axios from 'axios';


const places = localStorage.getItem('places');

const sendData = async () => {
  try {
    const response = await axios.get("http://localhost:3000/places");
    const data = response.data.places;
    localStorage.setItem('places', JSON.stringify(data));

  } catch (error) {
    console.log('Error fetching places:', error);
  }
};

sendData();

export default function AvailablePlaces({ onSelectPlace }) {

  const [availablePlaces, setAvailablePlaces] = useState([]);

  return (
    <Places
      title="Available Places"
      places={availablePlaces}
      fallbackText="No places available."
      onSelectPlace={onSelectPlace}
    />
  );
}
