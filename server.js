var app = require("./app");
const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log("App started on port ", port);
});
