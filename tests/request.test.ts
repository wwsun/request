import { createServices } from '../src';

const services = createServices(
  {
    listBooks: {
      url: '/books',
    },
  },
  {
    baseURL: 'https://fakerapi.it/api/v1',
  }
);

describe('createServices', () => {
  test('basic', async () => {
    const data = await services.listBooks();
    console.log(data);
    expect(data).toBeTruthy();
  });
});
