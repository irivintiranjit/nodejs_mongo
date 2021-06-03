var chalk = require("chalk");
var mongoose = require("mongoose");
var dbUrl = "mongodb://localhost:27017/nodejs_examples";

mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

mongoose.connection.on("connected", () => {
  console.log(chalk.green("Connected to MongosDB!"));
});

mongoose.connection.on("error", () => {
  console.log(chalk.red("Error while connecting  to MongosDB!"));
});

mongoose.connection.on("disconnected", () => {
  console.log(chalk.yellow("DB Connection disconnected"));
});
