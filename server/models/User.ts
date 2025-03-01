import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

// Define Book schema
const bookSchema = new Schema({
  bookId: { type: String, required: true },
  authors: [String],
  description: String,
  title: String,
  image: String,
  link: String,
});

// Define TypeScript interface for User
interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  savedBooks: typeof bookSchema[];
  isCorrectPassword(password: string): Promise<boolean>;
}

// Define User schema
const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedBooks: [bookSchema],
});

// Hash password before saving
userSchema.pre<IUser>("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Define isCorrectPassword method
userSchema.methods.isCorrectPassword = async function (password: string) {
  return bcrypt.compare(password, this.password);
};

// Create and export the User model
const User = model<IUser>("User", userSchema);
export default User;
