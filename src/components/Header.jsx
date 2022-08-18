import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Header() {
  const [valueNumber, setValue] = useState('0');
  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');

  const {
    setFilters,
    filters,
    planets,
    setList,
  } = useContext(StarWarsContext);

  useEffect(() => {
    const filtroNumerico = (array, obj) => {
      const { columnFilter, comparisonFilter, valueFilter } = obj;
      switch (comparisonFilter) {
      case 'maior que':
        return array.filter((e) => Number(e[columnFilter]) > valueFilter);
      case 'menor que':
        return array.filter((e) => Number(e[columnFilter]) < valueFilter);
      case 'igual a':
        return array.filter((e) => Number(e[columnFilter]) === valueFilter);
      default:
        return array;
      }
    };

    const filterPlanets = () => {
      const { filterByName, filterNumber } = filters;
      const reg = new RegExp(filterByName.name, 'i');
      const firstFilter = planets.filter(({ name }) => reg.test(name));
      const result = filterNumber
        .reduce((acc, curr) => filtroNumerico(acc, curr), firstFilter);
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
            filterByName: { name: target.value } }) }
        />
        <select
          data-testid="column-filter"
          onChange={ ({ target: { value } }) => setColumn(value) }
          value={ column }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>
        <select
          data-testid="comparison-filter"
          onChange={ ({ target: { value } }) => setComparison(value) }
          value={ comparison }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>
        <input
          onChange={ ({ target: { value } }) => setValue(value) }
          value={ valueNumber }
          min="0"
          data-testid="value-filter"
          type="number"
        />
        <button
          data-testid="button-filter"
          onClick={ () => setFilters({ ...filters,
            filterNumber: [...filters.filterNumber,
              { columnFilter: column,
                comparisonFilter: comparison,
                valueFilter: Number(valueNumber),
              }] }) }
          type="button"
        >
          Filtrar
        </button>
      </div>
    </header>
  );
}
