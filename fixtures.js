const Fixtures = require("node-mongodb-fixtures");
const fixtures = new Fixtures();

fixtures
  .connect("mongodb://localhost:27017/NewWaveDB")
  .then(() => fixtures.unload())
  .then(() => fixtures.load())
  .then(() => fixtures.disconnect());
