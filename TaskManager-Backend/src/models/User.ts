import bcrypt from "bcryptjs";
import mongoose, { Model } from "mongoose";
import { IUser } from "../interfaces";

interface UserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
  register(name: string, email: string, password: string): Promise<IUser>;
  comparePassword(
    plainPassword: string,
    hashedPassword: string
  ): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
    },
  },
  { timestamps: true }
);

userSchema.statics.findByEmail = function (email: string) {
  return this.findOne({ email: email.toLowerCase() });
};

userSchema.statics.register = async function (
  name: string,
  email: string,
  password: string
) {
  const hashedPassword = await bcrypt.hash(password, 10);
  return this.create({ name, email, password: hashedPassword });
};

userSchema.statics.comparePassword = function (
  plainPassword: string,
  hashedPassword: string
) {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export const User = mongoose.model<IUser, UserModel>("User", userSchema);
