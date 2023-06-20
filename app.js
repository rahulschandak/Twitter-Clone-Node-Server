import express from "express";
import session from "express-session";
import cors from "cors";
import HelloController from "./controllers/hello-controller.js";
import UserController from "./users/users-controller.js";
import TuitsController from "./controllers/tuits/tuits-controller.js";
import AuthController from "./users/auth-controller.js";
import mongoose from "mongoose";

// mongoose.connect("mongodb://127.0.0.1:27017/tuiter");
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/tuiter';
mongoose.connect(CONNECTION_STRING);

const app = express();
app.set("trust proxy", 1);

app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:3000","https://a6--papaya-salamander-4aad5c.netlify.app/"]
  })
);

// app.use((req, res, next) => {
//   const allowedOrigins = [
//     "http://localhost:3000",
//     "https://a5--papaya-salamander-4aad5c.netlify.app/",
//     "https://tuiter-node-server-app-7rwr.onrender.com/api",
//   ];
//   const origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//     res.header("Access-Control-Allow-Origin", origin);
//   }
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   res.header(
//     "Access-Control-Allow-Methods",
//     "GET, PUT, POST, DELETE, PATCH, OPTIONS"
//   );
//   res.header("Access-Control-Allow-Credentials", "true");
//   res.header("Cache-Control", "no-cache, no-store, must-revalidate");
//   next();
// });

app.use(
  session({
    secret: "any string",
    resave: false,
    proxy: true,
    saveUninitialized: true,
    cookie: {
      sameSite: "none",
      secure: true,
    },
  })
);

app.use(
  session({
    secret: "your-secret-key",
    resave: false,
    saveUninitialized: false,
    store: new session.MemoryStore(),
  })
);
app.use(express.json());
TuitsController(app);
HelloController(app);
UserController(app);
AuthController(app);
app.listen(process.env.PORT || 4000);
