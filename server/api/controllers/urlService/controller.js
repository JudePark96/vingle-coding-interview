import ServiceEntity from '../../entity/ServiceEntity';

export class Controller {
  async createUrl(req, res, next) {
    try {
      ServiceEntity.findOrCreate({
        where: { url: req.body.url },
        defaults: { url: req.body.url },
      }).spread((service, created) => {
        const result = `http://localhost:3000/service/${service.dataValues.id}`;
        if (created) res.send(200, { url: result });
        else res.send(201, { url: result });
      });
    } catch (e) {
      next(e);
    }
  }

  async getById(req, res, next) {
    try {
      const targetEntity = await ServiceEntity.findById(req.params.urlId);
      targetEntity.visits += 1;
      const result = await targetEntity.save();
      res.statusCode = 301;
      res.setHeader('Location', result.url);
      res.sendStatus(301);
    } catch (e) {
      next(e);
    }
  }

  async getStatsById(req, res, next) {
    try {
      const targetEntity = await ServiceEntity.findById(req.params.urlId);
      res.send(200, { visits: targetEntity.visits });
    } catch (e) {
      next(e);
    }
  }
}

export default new Controller();
