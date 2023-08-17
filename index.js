const app = require ("./app")

const port = process.env.PORT || 8001;

app.listen(port, function() {
    console.log("Application is running on port " + port);
});
