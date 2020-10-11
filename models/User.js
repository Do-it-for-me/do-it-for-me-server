const { Schema, model } = require("mongoose");

//const Address = require("./Address");

const { encrypt, check } = require("../lib/encryption");
const { sign, verify } = require("../lib/authentication");
const env = require("../config/environment");

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    street: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    zip: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      required: true,
      default: "user",
    },
    image: {
      type: String,
    },
    availability: {
      startDate: {
        type: Date,
      },
      endDate: {
        type: Date,
      },
    },
    services: [
      {
        type: Schema.Types.ObjectId,
        ref: "Service",
      },
    ],
    price: {
      type: Number,
      default: 0,
    },
    bio: {
      type: String,
    },
    totalRate: {
      type: Number,
    },
    rateCounter: {
      type: Number,
      default: 0,
    },
    rate:{
      type: Number,
      default: 0,
    }
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },

  }
);

UserSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`;
});
/* UserSchema.virtual("rate").get(function () {
  return Math.round(this.totalRate / this.rateCounter) / 2 || 0;
}); */

// Automatically hash the provided clear-text password before a User is saved
// We can run a Mongoose hook to automatically do that
UserSchema.pre("save", async function (next) {
  // Don't rehash if the password was NOT changed
  // this.isModified(<field>) returns true or false;
  // return next() to prevent execution of additional code.
  if (!this.isModified("password")) return next();
  // Replace the unencrypted password in the unsaved document with the replaced one...
  this.password = await encrypt(this.password);
  // ...And move on
  next();
});

UserSchema.pre("save", async function (next) {
  /* if (
    this.services.length === 0 &&
    (!this.availability.startDate || !this.availability.endDate)
  ) */
  if (
    this.services.length > 0 &&
    !(this.availability.startDate || this.availability.endDate)
  ) {
    const error = new Error("Please fill availability fields");
    error.code = 15000;
    next(error);
  } else next();
});

// Workaround for findByIdAndUpdate beause no "save" or "update" event is triggered there
UserSchema.pre("findOneAndUpdate", async function (next) {
  if (!this._update.hasOwnProperty("password")) return next();
  this._update.password = await encrypt(this._update.password);
  next();
});

// Add authentication as a method to our User schema because we always have access to the saved password from here.
UserSchema.method("authenticate", async function (loginPassword) {
  return await check(loginPassword, this.password);
});

// Add a method that returns a reduced dataset from our User so we send only non-sensitive data
UserSchema.method("toJSON", function () {
  return {
    _id: this._id,
    firstName: this.firstName,
    lastName: this.lastName,
    email: this.email,
    city: this.city,
    zip: this.zip,
    street: this.street,
    address: this.address,
    fullName: this.fullName,
    services: this.services,
    availability: this.availability,
    price: this.price,
    rate: this.rate,
    rateCounter: this.rateCounter,
    totalRate: this.totalRate,
    bio: this.bio,
    image: this.image,
  };
});

// Add a static method that checks for whether the ID inside a JWT token can be found in the database
// Important: Schema methods only work with document instances. Since we need to find a document first, we need to create a static.
const tokenSecret = env.jwt_secret;

UserSchema.static("findByToken", async function (token) {
  // Decode the token to get the ID
  let payload;
  try {
    payload = await verify(token, tokenSecret);
  } catch (err) {
    return null;
  }
  // Here, this is the Schema
  const user = await this.findOne({ _id: payload._id });
  return user;
});

// Add a method that generates a JWT token that includes the current user
UserSchema.method("generateAuthToken", async function () {
  return await sign({ _id: this._id, access: "auth" }, tokenSecret);
  // return await sign({ _id: this._id, access: 'auth' }, tokenSecret, { expiresIn: '1m' });
});

module.exports = model("User", UserSchema);
