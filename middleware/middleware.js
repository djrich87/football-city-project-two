function passUserToView(req, res, next) {
  res.local.user = req.user ? req.user : null
  next()
}

export {
  passUserToView
}
