import express from "express";
import expressLayouts from "express-ejs-layouts";
import session from "express-session";
import path from "path";
import passportMiddleware from './middleware/passportMiddleware';

const port = process.env.port || 8888;

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

import authRoute from "./routes/authRoute";
import indexRoute from "./routes/indexRoute";

// Middleware for express
app.use(express.json());
app.use(expressLayouts);
app.use(express.urlencoded({ extended: true }));
passportMiddleware(app);

app.use((req, res, next) => {
  // if(req.sessionStore.all === undefined){
  //   throw new Error("this can't ever happen lol");
  // } else {
  // console.log(`hello?`)
  // req.sessionStore.all((err, sessions) => console.log(`all sessions : ${sessions}`));
  // }
  console.log("hello?");
  //if(req.sessionStore.all === undefined) throw new Error("error!!")
  //req.sessionStore.all((err, sessions) => {console.log(sessions)})
  if(req.sessionStore.all === undefined) {
    throw new Error("this can not be hanppens! lol");
  } else {
    req.sessionStore.all((err, sessions) => {
      if(err) {
        console.error("세션조회중 에러발생", err)
      } else {
        console.log("all sessions")
        console.log(sessions);
        
      }
    })
  }

  console.log(`User details are: `);
  console.log(req.user);

  console.log("Entire session object:");
  console.log(req.session);

  console.log(`Session details are: `);
  console.log((req.session as any).passport);

  
  next();
});

app.use("/", indexRoute);
app.use("/auth", authRoute);

app.listen(port, () => {
  console.log(`🚀 Server has started on port ${port}`);
});
