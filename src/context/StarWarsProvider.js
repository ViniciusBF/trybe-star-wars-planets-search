import React, { useState } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getStarWarsPlanets from '../services/starWarsAPI';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    const { results } = await getStarWarsPlanets();
    results.forEach((e) => {
      delete e.residents;
    });
    setPlanets(results);
  };

  return (
    <StarWarsContext.Provider
      value={ {
        planets,
        getPlanets,
      } }
    >
      {children}
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = {
  children: node.isRequired,
};

export default StarWarsProvider;
