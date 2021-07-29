// Dependencies
const express = require('express');
const session = require('express-session');
const passport = require('passport')

// Passport strategies
const local = require('./strategies/local')

// Initialization
const port = 8080;
const store = new session.MemoryStore();
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(session({
    secret: 'secretsession',
    resave: true,
    cookie: {maxAge: 7200000}, // 2 hours
    saveUninitialized: false,
    store
}));

// Passport initialization
app.use(passport.initialize());
app.use(passport.session());

// Routes retrieval
const templateRoute = require('./routes/template');
const loginRoute = require('./routes/login');
const logoutRoute = require('./routes/logout');

// Activate Non-Authenticated routes
app.use('/login', loginRoute);
app.use('/logout', logoutRoute);

// Authenticate
app.use((req, res, next) => {
    if (req.user) {
        next();
    } else {
        res.sendStatus(403);
    }
});

// Activate Authenticated routes 
app.use('/template', templateRoute);

// Listen
app.listen(
    port,
    () => console.log(`API is online on port ${port}`)
);