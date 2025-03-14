const mongoose = require("mongoose");


const MONGO_URI = "mongodb+srv://livinusekene93:X9dTemJC7tKaOSl1@cluster0.n9awh.mongodb.net/todoapp?retryWrites=true&w=majority";

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log("Connected to MongoDB");
    const result = await mongoose.connection.db.collection("users").deleteMany({});
    console.log(`Deleted ${result.deletedCount} users`);
    mongoose.connection.close();
  })
  .catch(err => console.error("Error connecting to MongoDB:", err));
