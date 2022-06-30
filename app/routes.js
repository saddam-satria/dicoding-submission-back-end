import rootController from './controllers/rootController.js';
import bookController from './controllers/bookController.js';

const Routes = (server) => {
  server.route({
    method: 'GET',
    path: '/',
    handler: rootController,
  });

  server.route({
    method: 'POST',
    path: '/books',
    handler: bookController.create,
  });

  server.route({
    method: 'GET',
    path: '/books',
    handler: bookController.books,
  });

  server.route({
    method: 'GET',
    path: '/books/{id}',
    handler: bookController.book,
  });
};

export default Routes;
