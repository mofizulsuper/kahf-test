import mongoose, { Schema, Document, Model } from 'mongoose';

// Define the User interface
interface IUser extends Document {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

// Create the User schema
const userSchema = new Schema<IUser>({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

console.log('Before User model registration:', mongoose.models.User);
const User: Model<IUser> = 	mongoose.models.User || mongoose.model<IUser>('User', userSchema);
console.log('After User model registration:', mongoose.models);

export default User;
