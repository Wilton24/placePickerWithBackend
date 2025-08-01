import { useRef, useState, useCallback, useEffect } from 'react';
import Places from './components/Places.jsx';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import AvailablePlaces from './components/AvailablePlaces.jsx';
import { updateUserPlaces } from './fetchData.js';
import { use } from 'react';

function App() {
  const selectedPlace = useRef();
  const [userPlaces, setUserPlaces] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const storedPlaces = localStorage.getItem("userPlaces");
    if (storedPlaces) {
      setUserPlaces(JSON.parse(storedPlaces));
    }
  }, []);

  function handleStartRemovePlace(place) {
    setModalIsOpen(true);
    selectedPlace.current = place;
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



  const handleRemovePlace = useCallback(async function handleRemovePlace() {
    setUserPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current.id)
    );

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
        <Places
          title="I'd like to visit ..."
          fallbackText="Select the places you would like to visit below."
          places={userPlaces}
          onSelectPlace={handleStartRemovePlace}
        />

        <AvailablePlaces onSelectPlace={handleSelectPlace} />
      </main>
    </>
  );
}

export default App;
