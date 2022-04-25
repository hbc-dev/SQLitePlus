class moduleErr extends Error {
  constructor(err) {
    super()

    this.name = '[SQLP Error]'
    this.message = err
  }
}

module.exports = moduleErr;
