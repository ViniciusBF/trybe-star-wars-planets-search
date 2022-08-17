const STAR_WARS_API = 'https://swapi-trybe.herokuapp.com/api/planets';

const getStarWarsPlanets = async () => {
  const response = await fetch(`${STAR_WARS_API}/?format=json`);
  const json = await response.json();

  return response.ok ? Promise.resolve(json) : Promise.reject(json);
};

export default getStarWarsPlanets;
