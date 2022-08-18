const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/planets';

const getStarWarsPlanets = async () => {
  const response = await fetch(`${STAR_WARS_API}/?format=json`);
  const data = await response.json();

  return data;
};

export default getStarWarsPlanets;
