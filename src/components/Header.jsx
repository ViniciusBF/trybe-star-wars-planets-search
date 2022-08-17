import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

export default function Header() {
  const { getPlanets } = useContext(StarWarsContext);
  useEffect(getPlanets, []);
  return (
    <header>
      <h1>Projeto Star Wars</h1>
    </header>
  );
}
