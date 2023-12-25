import createError from 'http-errors';
import express, { NextFunction, Response, Request } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './routes/index';
import usersRouter from './routes/users';
import catalogRouter from './routes/catalog';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

const app = express();

// Set trust proxy to 1 to prevent rate limiter from
// applying globally but per use-basis.
app.set('trust proxy', 1);

// Add helmet to the middleware chain.
// Set CSP headers to allow Bootstrap and Jquery to be served
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'script-src': ["'self'", 'code.jquery.com', 'cdn.jsdelivr.net'],
    },
  })
);

// Set up request limiter to 20 requests for minute.
app.use(
  rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 20,
  })
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/catalog', catalogRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
type ReqError = { message: string; status: number };
app.use((err: ReqError, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
