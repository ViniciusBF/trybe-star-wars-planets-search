import React from 'react';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import testData from '../../cypress/mocks/testData';
import App from '../App';

describe('', () => {
  beforeEach(() => {
    fetch = jest.fn(() => ({
        ok: true,
        json: jest.fn(() => testData)
      })
    );
  })

  test('Se os componentes estão renderizando', async () => {
    await act( async () => render(<App/>));
    const colunaTable = screen.getByText(/name/i);
    expect(colunaTable).toBeInTheDocument();
  });

  test('Se o filtro por nome funciona', async () => {
    await act( async () => render(<App/>));

    const planet = await screen.findByText(/alderaan/i);
    const planetT = await screen.findByText(/tatooine/i);

    expect(planet).toBeInTheDocument();
    const inputfilter = screen.getByTestId('name-filter');
    userEvent.type(inputfilter, 'tatooine');

    expect(planet).not.toBeInTheDocument();
    expect(planetT).toBeInTheDocument();
  });

  test('Se o filtro por categoria funciona', async () => {
    await act( async () => render(<App/>));

    const column = await screen.findByTestId('column-filter');
    const comparison = await screen.findByTestId('comparison-filter');
    const value = await screen.findByTestId('value-filter');
    const filtroBtn = await screen.findByTestId('button-filter');
    
    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '364');
    userEvent.click(filtroBtn);

    const alderaan = screen.getByText(/alderaan/i);
    const tatooine = screen.queryByText(/tatooine/i);

    expect(alderaan).toBeInTheDocument();
    expect(tatooine).toBeNull();
  });

  test('Se o filtro pode ser apagado', async () => {
    await act( async () => render(<App/>));

    const column = await screen.findByTestId('column-filter');
    const comparison = await screen.findByTestId('comparison-filter');
    const value = await screen.findByTestId('value-filter');
    const filtroBtn = await screen.findByTestId('button-filter');
    
    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparison, 'maior que');
    userEvent.type(value, '364');
    userEvent.click(filtroBtn);
    userEvent.selectOptions(column, 'diameter');
    userEvent.selectOptions(comparison, 'igual a');
    userEvent.type(value, '{backspace}{backspace}{backspace}10465');
    userEvent.click(filtroBtn);

    const btnRemove = screen.getByText(/orbital_period/i);

    userEvent.click(btnRemove)

    const tatooine = screen.getByText(/tatooine/i);
    expect(tatooine).toBeInTheDocument();
  });

  test('Se o filtro pode ser apagado atraves do botão de apagar todos', async () => {
    await act( async () => render(<App/>));

    const column = await screen.findByTestId('column-filter');
    const comparison = await screen.findByTestId('comparison-filter');
    const value = await screen.findByTestId('value-filter');
    const filtroBtn = await screen.findByTestId('button-filter');
    
    userEvent.selectOptions(column, 'orbital_period');
    userEvent.selectOptions(comparison, 'menor que');
    userEvent.type(value, '303');
    userEvent.click(filtroBtn);

    const btnRemove = screen.getByTestId('button-remove-filters');

    userEvent.click(btnRemove)

    const tatooine = screen.getByText(/tatooine/i);
    expect(tatooine).toBeInTheDocument();
  });
})
