// src/models/user.ts
import mongoose, { Schema, Document } from 'mongoose';

interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string; // Ensure the password is stored as a plain text if required
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

// Ensure that the connection is established before defining the model
const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);

export default User;
