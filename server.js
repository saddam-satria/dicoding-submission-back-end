import Hapi from '@hapi/hapi';
import Routes from './app/routes.js';

(async () => {
  const PORT = process.env.PORT || 5000;

  const server = Hapi.server({
    port: PORT,
    host: 'localhost',
  });

  try {
    await server.start();
    Routes(server);
    console.log(`server running on PORT ${PORT}`);
  } catch (error) {
    console.log(error.message);
  }
})();
