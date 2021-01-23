const express = require("express");
const app = express();
const bodyParser = require("body-parser");




app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  res.render("form");
});




const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userScheme = new Schema({

  name: String,
  surname:String,
  data:String,
  email:String,
  password:String
});

app.post("/", (req, res) => {
  console.log(req.body);
  mongoose.connect("your data base", { useNewUrlParser: true });

  const User = mongoose.model("user", userScheme);

  const user = new User({
    name:req.body.first,
    surname:req.body.last,
    data:req.body.data,
    email:req.body.email,
    password:req.body.password
  });

  user.save(function(err){
    mongoose.disconnect();

    if(err) return console.log(err);
    console.log("Сохранен объект", user);

  });

 res.redirect("/" )
});

app.listen(3000);
