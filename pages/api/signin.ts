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

			// Check if the password matches (as plain text)
			if (user.password !== password) {
				return res.status(401).json({ message: 'Invalid credentials' });
			}

			// Successful login (you can set a session or JWT here if needed)
			return res.status(200).json({ message: 'Sign in successful' });
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
