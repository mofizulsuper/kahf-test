import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';

const SignInContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;
	background-color: #f5f5f5;
`;

const SignInForm = styled.form`
	background: white;
	padding: 2rem;
	border-radius: 8px;
	box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
	width: 400px;
`;

const Title = styled.h1`
	text-align: center;
	margin-bottom: 1.5rem;
`;

const Input = styled.input`
	width: 93%;
	padding: 0.8rem;
	margin: 0.5rem 0;
	border: 1px solid #ccc;
	border-radius: 4px;
`;

const Button = styled.button`
	width: 100%;
	padding: 0.8rem;
	background-color: #0070f3;
	color: white;
	border: none;
	border-radius: 4px;
	cursor: pointer;

	&:hover {
		background-color: #005bb5;
	}
`;

const SignIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const response = await fetch('/api/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			if (response.ok) {
				const userData = await response.json(); // Get user data from response
				// Store user data in session storage
				sessionStorage.setItem('user', JSON.stringify(userData.user)); // Save the user object
				alert('Sign in successful!');
				// Redirect to the profile page
				window.location.href = '/profile';
			} else {
				const errorData = await response.json();
				alert(
					errorData.message ||
						'Sign in failed. Please check your credentials.'
				);
			}
		} catch (error) {
			console.error('Error during sign in:', error);
			alert('An error occurred. Please try again later.');
		}
	};

	return (
		<SignInContainer>
			<p>
				Go to ⮞ <Link href="/"> Home </Link>
			</p>
			<SignInForm onSubmit={handleSubmit}>
				<Title>Sign In</Title>
				<Input
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					required
				/>
				<Input
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					required
				/>
				<Button type="submit">Sign In</Button>
			</SignInForm>
			<p>
				Not have an account? <Link href="/register"> Register </Link>
			</p>
		</SignInContainer>
	);
};

export default SignIn;
