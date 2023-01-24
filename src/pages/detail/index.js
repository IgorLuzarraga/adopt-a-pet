import { useParams, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { getPetDetails } from '../../api/petfinder';
import Hero from '../../components/hero';

const PetDetailsPage = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  // const id = '51322435'; // <--- Update me!
  const {id} = useParams()

  useEffect(() => {
    async function getPetsData() {
      try {
        const petsData = await getPetDetails(id);
        setData(petsData);
        setError(false);
      } catch (e) {
        setError(true);
      }
      setLoading(false);
    }

    getPetsData();
  }, [id]);

  return (
    <div>
      {loading ? (
        <h3>Loading...</h3>
      ) : error ? (
        <div>
          {redirectToPetDetailsNotFoundPage()}
        </div>
      ) : (
        <main>
          {showHero(data)}
          {showPetDetails(data)}
        </main>
      )}
    </div>
  );
};

/* Redirect to /pet-details-not-found if there was an error! */
const redirectToPetDetailsNotFoundPage = () =>
    <Redirect to={'/pet-details-not-found'}/>

const showHero = data => 
  <Hero
  image={data.photos[1]?.full || 'https://i.imgur.com/aEcJUFK.png'}
  displayText={`Meet ${data.name}`}
  />

const showPetDetails = data =>
  <div className="pet-detail">
    {showPetImage(data)}
    {showPetData(data)}
  </div>

const showPetImage = data => 
  <div className="pet-image-container">
    <img
      className="pet-image"
      src={
        data.photos[0]?.medium || 'https://i.imgur.com/aEcJUFK.png'
      }
      alt=""
    />
  </div>

const showPetData = data =>
  <div>
    <h1>{data.name}</h1>
    <h3>Breed: {data.breeds.primary}</h3>
    <p>Color: {data.colors.primary || 'Unknown'}</p>
    <p>Gender: {data.gender}</p>
    <h3>Description</h3>
    <p>{data.description}</p>
  </div>

export default PetDetailsPage;
