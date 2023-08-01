var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require("cors");
var app = express();
var loginRouter = require("./routes/login");
var signinRouter = require("./routes/signin");
var forgetpasswordRouter = require("./routes/forgetpassword");


app.use(cors({ origin: "*" }));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.use("/login", loginRouter);
app.use("/signin", signinRouter);
app.use("/forgetpassword", forgetpasswordRouter);



app.listen("4000", () => {
  console.log(`Example app listening on port`)
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



module.exports = app;
