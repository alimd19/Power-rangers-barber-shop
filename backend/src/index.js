const mongoose = require("mongoose");
const app = require("./app");

require("dotenv").config();

const port = process.env.PORT || 3030;
const mongooseString = "mongodb+srv://barber_admin:wiQRm2EVnv3rHFUB@cap805.wq8lwr7.mongodb.net/barber_bookings?retryWrites=true&w=majority";

mongoose
  .connect(mongooseString, { useNewUrlParser: true })
  .then(() => {
    app.listen(port, () => {
      console.log(`Listening: http://localhost:${port}`);
    });
  })
  .catch((error) => console.log(error));
