import express, { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';

export const router = express.Router();

router.get('/items', (req: Request, res: Response) => {
  try {
    res.send(req.session.items || [])
  } catch (error) {
    res.send(error);
  }
});

router.post('/item', (req: Request, res: Response) => {
  try {
    const newItem = {id: uuidv4(), name: req.body.name, completed: false};
    const items = [ newItem, ...req.session.items || []];
    req.session.items = items;
    res.send(newItem);
  } catch (error) {
    res.send(error);
  }
});

router.put('/item/:id', (req: Request, res: Response) => {
  try {
    req.session.items = req.session.items.map(item => {
      if (item.id === req.params.id) {
        return {
          ...item,
          name: req.body.name,
          completed: req.body.completed
        } as Item
      } else {
        return item;
      }
    })
    
    const updatedItem = req.session.items.find((item => item.id === req.params.id));
    res.send(updatedItem);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/item/:id', (req: Request, res: Response) => {
  try {
    req.session.items = req.session.items.filter((item) => item.id !== req.params.id);
    res.send(req.session.items);
  } catch (error) {
    res.send(error);
  }
});

router.get('/health', (req: Request, res: Response) => {
  try {
    res.send({status: 'OK'});
  } catch (error) {
    res.send(error);
  }
});