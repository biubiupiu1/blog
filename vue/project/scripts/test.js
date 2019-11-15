const path = require("path")

console.log(path.relative(
    "../src/router",
    path.resolve(__dirname, "../src/views/Home/Home.vue")
))