
import express from 'express';
import {join} from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import browserify from 'browserify-middleware';
import babelify from 'babelify';
import less from 'less-file';

import routes from './routes/index';
import mails from './routes/mail';

const app = express();

const env = process.env.NODE_ENV || 'development';
app.locals.ENV = env;
app.locals.ENV_DEVELOPMENT = env == 'development';

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

// logging
if (env === 'development') {
  app.use(logger('dev'));
} else {
  app.use(logger('dev', {
    skip: (req, res) => res.statusCode < 400,
  }));
}

// app.use(favicon(__dirname + '/public/img/favicon.ico'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.use(express.static(join(__dirname, 'public')));
app.use('/style', less(join(__dirname, 'styling', 'client.less')));

browserify.settings({
  transform: [[babelify, {presets: ['es2015', 'stage-0']}]]
});

app.get('/js/bundle.js', browserify('./public/js/app.js'));

app.use('/', routes);
app.use('/mails', mails);

/// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace

if (app.get('env') === 'development') {
    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            title: 'error'
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        title: 'error'
    });
});

export default app;
