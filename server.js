import Hapi from '@hapi/hapi';
import Routes from './app/routes.js';
import dotenv from 'dotenv'

(async () => {
  dotenv.config()
  const PORT = process.env.PORT || 9000;

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
