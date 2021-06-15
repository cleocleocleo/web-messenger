const createError = require("http-errors");
const express = require("express");
const { join } = require("path");
const logger = require("morgan");
const jwt = require("jsonwebtoken");
const cors = require('cors');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const db = require("./db");
const { User } = require("./db/models");
// create store for sessions to persist in database
const sessionStore = new SequelizeStore({ db });

const { json, urlencoded } = express;

const app = express();
app.use(cors());
app.use(logger("dev"));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(express.static(join(__dirname, "public")));

// Enable cookie parser middleware
app.use(cookieParser());

app.use(function (req, _res, next) {
    const token = req.cookies.token
    if (token) {
        jwt.verify(token, process.env.SESSION_SECRET, (err, decoded) => {
            if (err) {
                return next();
            }
            User.findOne({
                where: { id: decoded.id },
            }).then((user) => {
                req.user = user;
                return next();
            });
        });
    } else {
        return next();
    }
});

// require api routes here after I create them

app.use("/auth", require("./routes/auth"));

// require CSRF cookie to access api routes
app.use(csrf({
    cookie: {
        httpOnly: true,
    }
}));
app.use((req, res, next) => {
    res.cookie('XSRF-TOKEN', req.csrfToken(), {
        sameSite: true,
        httpOnly: true,
        maxAge: 86400
    });
    return next();
});

app.use("/api", require("./routes/api"));

// catch 404 and forward to error handler
app.use(function (_req, _res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res) {
    // set locals, only providing error in development
    console.log(err);
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.json({ error: err });
});

module.exports = { app, sessionStore };
