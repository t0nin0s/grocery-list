/// <reference types="react-scripts" />

interface Item {
  id: string;
  name: string;
  completed: boolean;
}

interface GroceryForm{
  submitItem: (value: string) => void;
}

interface GroceryList {
  list: Item[];
  handleComplete: (item: Item) => void;
  handleDelete: (id: string) => void;
}

interface GroceryItem {
  item: Item;
  handleComplete: (item: Item) => void;
  handleDelete: (id: string) => void;
}