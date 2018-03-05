const express = require('express')
const bodyparser = require('body-parser');
const path = require('path');
//establishes the express app and port for server
const app = express();
var PORT = process.env.PORT || 3000;

//the express app to handle data parsing
app.use(bodyparser.urlencoded({ extended: true }));
app.use(bodyparser.json());

//routes for app
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

//starts the server to start listing to the designated PORT
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
});