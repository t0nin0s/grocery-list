import axios from 'axios';

const apiUrl = 'http://localhost:3001/api'

export function getGroceryList() {
  return axios.get(`${apiUrl}/items`, { withCredentials: true })
}

export function addGroceryItem(item: string) {
  return axios.post(`${apiUrl}/item`, { name: item }, { withCredentials: true })
}

export function updateGroceryItem(item: Item) {
  return axios.put(`${apiUrl}/item/${item.id}`, item, { withCredentials: true });
}

export function deleteGroceryItem(id: string) {
  return axios.delete(`${apiUrl}/item/${id}`, { withCredentials: true });
}
