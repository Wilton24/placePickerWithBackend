import { useRef, useState, useCallback, useEffect } from 'react';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces, deleteUserPlace, fetchUserPlaces } from './fetchData.js';

function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadUserPlaces() {
      setIsFetching(true);
      try {
        const data = await fetchUserPlaces();

        setUserPlaces(data);
      } catch (error) {
        setError({ message: error.message || "An error occurred while fetching user places" });
      };
    };
    setIsFetching(false);
    loadUserPlaces();

  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
    // console.log(place);

  }

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  };


  const handleSelectPlace = useCallback((selectedPlace) => {
    setUserPlaces((prevPickedPlaces) => {
      const updatedPlaces = prevPickedPlaces || [];

      if (updatedPlaces.some((place) => place.id === selectedPlace.id)) {
        return updatedPlaces;
      }

      const newPlaces = [selectedPlace, ...updatedPlaces];

      // ✅ Save to localStorage
      localStorage.setItem("userPlaces", JSON.stringify(newPlaces));

      // ✅ Send to backend
      updateUserPlaces(newPlaces);

      return newPlaces;
    });
  }, []);

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) => {
      const updatedPlaces = prevPickedPlaces.filter(
        (place) => place.id !== selectedPlace.current.id
      );
      // ✅ Update the backend
      deleteUserPlace(selectedPlace.current.id);

      // ✅ Save the updated list to localStorage
      localStorage.setItem("userPlaces", JSON.stringify(updatedPlaces));

      return updatedPlaces;
    });

    setModalIsOpen(false);
  }, []);


  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        {error && <Error message={error.message} title="An error occured..." />}
        {!error && (
          <Places
            title="I'd like to visit ..."
            isLoading={isFetching}
            loadingText="Fetching your places ..."
            fallbackText="Select the places you would like to visit below."
            places={userPlaces}
            onSelectPlace={handleStartRemovePlace}
          />
        )}

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
