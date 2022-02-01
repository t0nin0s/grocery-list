import { app } from "./app";

const port: number | string = process.env.PORT || 3001;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
