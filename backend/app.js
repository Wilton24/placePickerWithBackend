import fs from 'node:fs/promises';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import express from 'express';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.static('images'));
app.use(bodyParser.json());

// CORS

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // allow all domains
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  next();
});

app.get('/places', async (req, res) => {
  const fileContent = await fs.readFile('./data/places.json');

  const placesData = JSON.parse(fileContent);

  res.status(200).json({ places: placesData });
});

app.get('/user-places', async (req, res) => {
  const fileContent = await fs.readFile('./data/user-places.json');

  const places = JSON.parse(fileContent);

  res.status(200).json({ places });
});

app.put('/user-places', async (req, res) => {
  const places = req.body.places;

  await fs.writeFile('./data/user-places.json', JSON.stringify(places));

  res.status(200).json({ message: 'User places updated!' });
});

app.delete('/user-places/:id', async (req, res) => {
  const placeId = req.params.id;
  const fileContent = await fs.readFile('./data/user-places.json');
  const places = JSON.parse(fileContent);
  const updatedPlaces = places.filter((place) => place.id !== placeId);

  await fs.writeFile('./data/user-places.json', JSON.stringify(updatedPlaces));

  res.status(200).json({ message: 'User place deleted!' });
});


// 404
app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next();
  }
  res.status(404).json({ message: '404 - Not Found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
