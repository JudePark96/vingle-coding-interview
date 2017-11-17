import Express from 'express';
import Sequelize from './dbConfig';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import * as http from 'http';
import * as os from 'os';
import cookieParser from 'cookie-parser';
import swaggerify from './swagger';
import l from './logger';
import ErrorHandler from './errorHandler';

const app = new Express();

export default class ExpressServer {
  constructor() {
    const root = path.normalize(`${__dirname}/../..`);
    app.set('appPath', `${root}client`);
    app.use(bodyParser.json());
    app.use(ErrorHandler);
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser(process.env.SESSION_SECRET));
    app.use(Express.static(`${root}/public`));
  }

  authenticaiton() {
    Sequelize.authenticate()
      .then(() => {
        /**
         * 서비스 레벨이 개발 수준이라면 각각의 엔티티를 Sync 하여 테이블을 생성해줄 것.
         */
        return l.info('db authentication done');
      })
      .catch(err => l.info(err));
    return this;
  }

  router(routes) {
    swaggerify(app, routes);
    return this;
  }

  listen(port = process.env.PORT) {
    const welcome = p => () => l.info(`up and running in ${process.env.NODE_ENV || 'development'} @: ${os.hostname()} on port: ${p}}`);
    http.createServer(app).listen(port, welcome(port));
    return app;
  }
}
