import app from "./app";
import env from "./utils/validate-env";
import mongoose from "mongoose";

const port = env.PORT;

mongoose.connect(env.MONGO_CONNECTION_STRING).then(() => {
  console.log("Connected to MongoDB");
  app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
  });
});
