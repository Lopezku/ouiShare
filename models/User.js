const mongoose = require("mongoose");
const { isEmail, contains, address } = require("validator");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      minlength: [4, "Il doit y avoir 4 caractères au moins"],
      maxlength: [20, "Il doit y avoir 20 caractères maximum"],
      validate: {
        validator: (val) => !contains(val, " "),
        message: "Pas d'espace possible",
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      validate: [isEmail, "Email valide svp"],
    },
    password: {
      type: String,
      required: true,
      minLength: [6, "Il doit y avoir 6 caractères au moins"],
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: false,
      maxLength: [100, "Adresse max de 100 caractères"],
    },
    gender: {
      type: String,
      enum: ["homme", "femme"],
      required: false,
    },
    phone: {
      type: Number,
      required: false,
    },
    age: {
      type: Number,
      required: false,
    },
    needs: {
      type: Array,
      required: false,
    },
    offers: {
      type: Array,
      required: true,
    },
    friends: {
      type: Array,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
