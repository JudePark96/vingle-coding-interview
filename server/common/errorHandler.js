import l from './logger';

export default (err, req, res, next) => {
  l.error(err);
  res.status(500).send(err);
  next();
};
