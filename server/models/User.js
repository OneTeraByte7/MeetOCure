const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: function () { return this.isProfileComplete; },
    },

    dob: {
      type: Date,
      required: function () { return this.isProfileComplete; },
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: function () { return this.isProfileComplete; },
    },

    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[6-9]\d{9}$/, "Please enter a valid Indian mobile number"],
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },

    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: ["doctor", "patient"],
      required: true,
    },

    // Doctor only fields
    address: {
      type: String,
      required: function () {
        return this.role === "doctor" && this.isProfileComplete;
      },
    },

    certificateUrl: {
      type: String,
      required: function () {
        return this.role === "doctor" && this.isProfileComplete;
      },
    },

    specialization: {
      type: String,
      default: "",
    },

    experience: {
      type: Number,
      default: 0,
    },

    isProfileComplete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.index({ role: 1, specialization: 1 });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("User", userSchema);
