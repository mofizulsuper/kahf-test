// src/models/user.ts (or wherever your IUser interface is defined)

import mongoose from 'mongoose';

export interface IUser {
	_id?: string; // Add optional _id if needed
	firstName: string;
	lastName: string;
	email: string;
	password: string; // Consider hashing this
	profilePic?: string; // Optional: Include this field
}

const userSchema = new mongoose.Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
	profilePic: { type: String }, // This field should store the URL or path to the profile picture
});

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
