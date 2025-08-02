import axios from 'axios';

export async function fetchPlaces() {
    const response = await axios.get("http://localhost:3000/places");
    const data = response.data.places;
    if (response.request.statusText !== "OK") {
        throw new Error('Failed to fetch places');
    }
    return data;
};

export async function updateUserPlaces(places) {
    try {
        const response = await axios.put("http://localhost:3000/user-places", {
            places,
        });

        if (response.status !== 200) {
            throw new Error("Failed to update places");
        }

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong while updating the places");
    }
}


export async function deleteUserPlace(placeId) {
    try {
        const response = await axios.delete(`http://localhost:3000/user-places/${placeId}`);

        if (response.status !== 200) {
            throw new Error("Failed to delete place");
        }

        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error("Something went wrong while deleting the place");
    }
}

// const place = {
//     id: "p1",
//     title: "Forest Waterfall",
//     image: {
//         src: "forest-waterfall.jpg",
//         alt: "A tranquil forest with a cascading waterfall amidst greenery."
//     },
//     lat: 44.5588,
//     lon: -80.344
// };

// const response = await axios.put("http://localhost:3000/user-places", {
//     places: [place]
// });