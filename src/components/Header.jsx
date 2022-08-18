import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

const COLUMN_FILTER = [
  'population', 'orbital_period', 'diameter', 'rotation_period', 'surface_water',
];

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
      default:
        return array.filter((e) => Number(e[columnFilter]) === valueFilter);
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
    const newCol = COLUMN_FILTER.filter((e) => !filters.categoriesUsed.includes(e));

    setColumn(newCol[0]);
    setList(filterPlanets());
  }, [filters, planets, setList]);

  const excluirFiltro = (param) => {
    const newFilters = filters.filterNumber
      .filter(({ columnFilter }) => columnFilter !== param.columnFilter);
    const newCategoriesUsed = newFilters.map(({ columnFilter }) => columnFilter);
    console.log(newCategoriesUsed);

    setFilters({
      ...filters,
      filterNumber: newFilters,
      categoriesUsed: newCategoriesUsed,
    });
  };

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
          {
            COLUMN_FILTER.filter((e) => !filters.categoriesUsed.includes(e))
              .map((e, i) => (
                <option key={ i } value={ e }>{ e }</option>
              ))
          }
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
            categoriesUsed: [...filters.categoriesUsed,
              column],
            filterNumber: [...filters.filterNumber,
              { columnFilter: column,
                comparisonFilter: comparison,
                valueFilter: Number(valueNumber),
              }] }) }
          type="button"
        >
          Filtrar
        </button>
        <button
          data-testid="button-remove-filters"
          type="button"
          onClick={ () => setFilters({
            ...filters,
            categoriesUsed: [],
            filterNumber: [],
          }) }
        >
          Remover Filtros
        </button>
      </div>
      <div>
        {
          filters.filterNumber.map((e, i) => (
            <div key={ i } data-testid="filter">
              <button
                id={ `btn-${i}` }
                type="button"
                onClick={ () => excluirFiltro(e) }
              >
                { e.columnFilter }
              </button>
            </div>
          ))
        }
      </div>
    </header>
  );
}
