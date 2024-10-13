import type { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import dbConnect from '@/lib/mongodb';
import User from '@/models/user';

export const config = {
	api: {
		bodyParser: false, // Disable body parsing for formidable
	},
};

// Helper function to handle form parsing
const parseForm = (
	req: NextApiRequest
): Promise<{ fields: any; files: any }> => {
	return new Promise((resolve, reject) => {
		const form = formidable({
			uploadDir: path.join(process.cwd(), 'public/uploads'), // Set upload directory
			keepExtensions: true, // Keep file extension
		});

		// Ensure the upload directory exists
		if (!fs.existsSync(form.uploadDir)) {
			fs.mkdirSync(form.uploadDir, { recursive: true });
		}

		form.parse(req, (err, fields, files) => {
			if (err) reject(err);
			resolve({ fields, files });
		});
	});
};

const updateProfile = async (req: NextApiRequest, res: NextApiResponse) => {
	await dbConnect(); // Connect to the database

	if (req.method === 'POST') {
		try {
			const { fields, files } = await parseForm(req);

			// Ensure fields are strings
			const firstName = Array.isArray(fields.firstName)
				? fields.firstName[0]
				: fields.firstName;
			const lastName = Array.isArray(fields.lastName)
				? fields.lastName[0]
				: fields.lastName;
			const email = Array.isArray(fields.email)
				? fields.email[0]
				: fields.email;

			// Find the user in the database
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(404).json({ message: 'User not found' });
			}

			// Update user data
			if (firstName) user.firstName = firstName;
			if (lastName) user.lastName = lastName;
			if (fields.password) user.password = fields.password; // Ensure password is hashed if required

			// Handle profile picture upload
			if (files.profilePic) {
				const profilePic = files.profilePic as formidable.File;

				// Check if file has been uploaded properly
				if (
					profilePic &&
					profilePic.originalFilename &&
					profilePic.filepath
				) {
					const fileExtension = path.extname(
						profilePic.originalFilename
					); // Get the extension
					const newFileName = `${Date.now()}${fileExtension}`; // Create a unique file name
					const newFilePath = path.join(form.uploadDir, newFileName); // Define the full path for the new file

					// Rename and move the uploaded file to the correct location
					fs.renameSync(profilePic.filepath, newFilePath);

					// Save the path relative to the public folder
					user.profilePic = `/uploads/${newFileName}`;
				}
			}

			// Save the updated user profile
			await user.save();

			// Send response
			res.status(200).json({
				message: 'Profile updated successfully',
				userData: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					profilePic: user.profilePic,
				},
			});
		} catch (error) {
			console.error('Error updating profile:', error);
			res.status(500).json({ message: 'Internal server error' });
		}
	} else {
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default updateProfile;
