export const logger = (req, res, next) => {
  console.log(req.body);
  next();
};
