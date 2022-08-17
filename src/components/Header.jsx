import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Header() {
  const {
    setFilters,
    filters,
    planets,
    setList,
  } = useContext(StarWarsContext);

  useEffect(() => {
    const filterPlanets = () => {
      const reg = new RegExp(filters.filterByName, 'i');
      const result = planets.filter(({ name }) => reg.test(name));
      return result;
    };

    setList(filterPlanets());
  }, [filters, planets, setList]);

  return (
    <header>
      <h1>Projeto Star Wars</h1>
      <div>
        <input
          data-testid="name-filter"
          onChange={ ({ target }) => setFilters({ ...filters,
            filterByName: target.value }) }
        />
        <select
          data-testid="column-filter"
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
        >
          <option value="maior_que">maior que</option>
          <option value="menor_que">menor que</option>
          <option value="igual_a">igual a</option>
        </select>
      </div>
    </header>
  );
}
