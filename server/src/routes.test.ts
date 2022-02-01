import request from 'supertest';
import { app } from './app';
import { Server } from 'http';
import { expect } from 'chai';

const agent = request.agent(app);

describe('Routes tests', () => {
  let server: Server;
  let itemInserted: Item;
  const port = 4000;
  const updatedItem: Partial<Item> = {
    name: "update item",
    completed: false
  };
  before((done) => {
    server = app.listen(port, () => {
      console.info(`HTTP server is listening on http://localhost:${server.address().port}`);
      done();
    });
  });
  after((done) => {
    server.close(done);
  });

  it('should call health endpoint', async () => {
    await agent
      .get('/api/health')
      .expect(200)
      .expect({status: 'OK'});
  });

  it('should call items endpoint and return empty array', async () => {
    await agent
      .get('/api/items')
      .expect(200)
      .expect([]);
  });

  it('should post item and return same item', async () => {
    await agent
      .post('/api/item')
      .send({name: 'test item'})
      .expect(200)
      .then(res => {
        itemInserted = res.body;
        expect(res.body).to.include({name: 'test item', completed: false})
      })
  });

  it('should call items endpoint and return stored items', async () => {
    await agent
      .get('/api/items')
      .expect(200)
      .then(res => {
        expect(res.body[0]).to.include(itemInserted)
      })
      
  });

  it('should modify an item and return updated item', async () => {
    await agent
      .put(`/api/item/${itemInserted.id}`)
      .send(updatedItem)
      .expect(200)
      .then(res => {
        expect(res.body).to.include({id: itemInserted.id, ...updatedItem})
      })
  });

  it('should delete item given an id and return list of items', async () => {
    await agent
      .delete(`/api/item/${itemInserted.id}`)
      .expect(200)
      .expect([])
  });
})