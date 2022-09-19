export default function (req, res, next) {
  res.setHeader('Date', 'On va peut-être passer sur deux jours !')
  next()
}
