import './common/env';
import Server from './common/server';
import routes from './routes';

const apiServer = new Server();
apiServer.syncSchema()
  .then(() => apiServer.router(routes))
  .then(() => apiServer.listen(process.env.PORT));

export default apiServer;
