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

    // try {
    //     const response = await axios.post("http://localhost:3000/user-places", places);

    //     if (response.status !== 201) {
    //         throw new Error('Failed to add new place');
    //     }
    //     return response.data;
    // } catch (error) {
    //     console.error(error);
    //     throw new Error('Something went wrong while adding the place');
    // }

    console.log("Updating user places with:", places);

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