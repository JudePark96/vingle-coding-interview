import serviceRouter from './api/controllers/urlService/router';

export default function routes(app) {
  app.use('/api/v1/service', serviceRouter);
}
