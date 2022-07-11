const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const port = process.env.PORT || 3030;
const mongooseString = process.env.DATABASE_URL;

mongoose
  .connect(mongooseString, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
