import React from 'react';
import './App.css';
import Table from './components/Table';
import Header from './components/Header';
import StarWarsProvider from './context/StarWarsProvider';

function App() {
  return (
    <StarWarsProvider>
      <Header />
      <Table />
    </StarWarsProvider>
  );
}

export default App;
