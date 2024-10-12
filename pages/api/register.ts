// src/pages/api/register.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../src/lib/mongodb';
import User from '../../src/models/user';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method === 'POST') {
		try {
			// Connect to the database
			await dbConnect();
			console.log('Connected to the database');

			// Create a new user
			const { firstName, lastName, email, password } = req.body;
			const newUser = new User({ firstName, lastName, email, password });

			await newUser.save();
			return res
				.status(200)
				.json({ message: 'Registration successful!' });
		} catch (error) {
			console.error('Error registering user:', error);
			return res
				.status(500)
				.json({ message: 'Registration failed', error });
		}
	} else {
		return res.status(405).json({ message: 'Method not allowed' });
	}
}
