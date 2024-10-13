import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../src/lib/mongodb';
import User from '../../src/models/user';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
	if (req.method === 'POST') {
		await dbConnect(); // Connect to the database

		const { email, password } = req.body;

		try {
			// Find the user by email
			const user = await User.findOne({ email });

			if (!user) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}

			// Check if the password matches (you might want to use hashing here)
			if (user.password !== password) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}

			// Successful login - include user details in the response
			return res.status(200).json({
				message: 'Sign in successful',
				user: {
					firstName: user.firstName,
					lastName: user.lastName,
					email: user.email,
					profilePic: user.profilePic || '', // Add this if you have a profile picture field
				},
			});
		} catch (error) {
			console.error('Error during sign in:', error);
			return res.status(500).json({ message: 'Internal server error' });
		}
	} else {
		// Handle any other HTTP method
		res.setHeader('Allow', ['POST']);
		res.status(405).end(`Method ${req.method} Not Allowed`);
	}
};

export default handler;
