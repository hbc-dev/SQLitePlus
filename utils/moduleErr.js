class moduleErr extends Error {
  constructor(err) {
    super()

    this.name = '[SimpleSQLiteJS ERR]'
    this.message = err
  }
}

module.exports = moduleErr;
