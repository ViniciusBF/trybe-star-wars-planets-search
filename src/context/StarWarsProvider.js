import React, { useState, useEffect } from 'react';
import { node } from 'prop-types';
import StarWarsContext from './StarWarsContext';
import getStarWarsPlanets from '../services/starWarsAPI';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [list, setList] = useState([]);
  const [filters, setFilters] = useState({
    filterByName: { name: '' },
    filterNumber: [],
  });

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await getStarWarsPlanets();
      results.forEach((e) => {
        delete e.residents;
      });
      setPlanets(results);
    };

    getPlanets();
  }, []);

  return (
    <StarWarsContext.Provider
      value={ {
        filters,
        setFilters,
        list,
        setList,
        planets,
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
