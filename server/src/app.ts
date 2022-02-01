import express from "express";
import cors from "cors";
import helmet from "helmet";
import session from "express-session";
import { router } from "./routes";

export const app: express.Application = express();

app.use(helmet());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000",
}));
app.use(express.json());
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'defaultSecret',
  cookie: {
    httpOnly: true,
    maxAge: 3600000
  }
}));

app.use("/api/", router);