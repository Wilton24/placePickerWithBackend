import axios from 'axios';

export async function fetchPlaces() {
    const response = await axios.get("http://localhost:3000/places");
    const data = response.data.places;
    if (response.request.statusText !== "OK") {
        throw new Error('Failed to fetch places');
    }
    return data;
}