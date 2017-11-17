import * as express from 'express';
import controller from './controller';

export default express
  .Router()
  .post('/', controller.createUrl)
  .get('/:urlId', controller.getById)
  .get('/:urlId/stats', controller.getStatsById);
