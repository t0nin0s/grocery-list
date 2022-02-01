import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';
import axios from 'axios';

jest.mock('axios');

describe('testing App', () => {
  let mockedAxios: jest.Mocked<typeof axios>;
  beforeEach(() => {
    mockedAxios = axios as jest.Mocked<typeof axios>;
  })

  it('should show empty results and add a new item', async () => {
    await mockedAxios.get.mockResolvedValueOnce({data: []})
    render(<App />);

    await waitFor(() => expect(screen.getByText("List is empty, start adding products to your list")).toBeInTheDocument());

    const newItemInput = screen.getByPlaceholderText("Add your item");
    const newItemAddButton = screen.getByRole("button", {name: "Add"});
    expect(newItemInput).toBeInTheDocument();
    userEvent.type(newItemInput, "Carrots");
    fireEvent.click(newItemAddButton);

    expect(axios.post).toHaveBeenCalledWith(expect.anything(), {name: "Carrots"}, expect.anything());
    await mockedAxios.get.mockResolvedValueOnce({data: [{id: '2348', name: "Carrots", completed: true} as Item]})
    await waitFor(() => expect(screen.getByText("Carrots")).toBeInTheDocument() );
  });

  it('should show results coming from api and complete an item on my list', async () => {
    await mockedAxios.get.mockResolvedValueOnce({data: [{id: '2348', name: "Potatoes", completed: false} as Item]})
    render(<App />);
    await waitFor(() => expect(screen.getByText("Potatoes")).toBeInTheDocument());

    await mockedAxios.get.mockResolvedValueOnce({data: [{id: '2348', name: "Potatoes", completed: true} as Item]})
    fireEvent.click(screen.getByRole('checkbox', { name: 'Potatoes' }));

    await waitFor(() => screen.getByRole("checkbox", { name: "Potatoes"}));
    expect(screen.getByRole("checkbox", {name: "Potatoes"})).toBeChecked()
  });

  it('should remove an item on my list', async () => {
    await mockedAxios.get.mockResolvedValueOnce({data: [{id: '2348', name: "Potatoes", completed: false} as Item]})
    render(<App />);
    await waitFor(() => screen.getByText("Potatoes"));

    await mockedAxios.delete.mockResolvedValue({data: []})
    await mockedAxios.get.mockResolvedValueOnce({data: []})
    fireEvent.click(screen.getByRole('button', { name: 'Remove' }));

    await waitFor(() => expect(screen.getByText("List is empty, start adding products to your list")).toBeInTheDocument());
  });
})
