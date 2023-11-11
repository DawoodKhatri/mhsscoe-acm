import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    isAdmin: { type: Boolean },
    profilePicture: { type: String },
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, select: false },
    rollno: { type: Number },
    branch: { type: String },
    year: { type: Number },
    isMember: { type: Boolean, default: false },
    links: [{ type: String }],
    events: { type: ObjectId, ref: "Events" },
    achievements: { type: ObjectId, ref: "Achievements" },
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};

const User = models.User || model("User", userSchema);

export default User;
