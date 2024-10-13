import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const ProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 2rem;
`;

const ProfileForm = styled.form`
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

const Profile = () => {
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		profilePic: '',
	});

	const [profilePicPreview, setProfilePicPreview] = useState<string | null>(
		null
	);

	useEffect(() => {
		// Retrieve user data from session storage
		const userData = sessionStorage.getItem('user');
		if (userData) {
			const parsedUser = JSON.parse(userData);
			setFormData(parsedUser);
			setProfilePicPreview(parsedUser.profilePic);
		}
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setProfilePicPreview(URL.createObjectURL(file));
			setFormData({ ...formData, profilePic: file });
		}
	};

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formDataToSend = new FormData();

		// Only append fields if they're not empty
		if (formData.firstName)
			formDataToSend.append('firstName', formData.firstName);
		if (formData.lastName)
			formDataToSend.append('lastName', formData.lastName);
		if (formData.email) formDataToSend.append('email', formData.email);
		if (formData.password)
			formDataToSend.append('password', formData.password);

		// Handle profile picture upload only if it's selected by the user
		if (formData.profilePic) {
			const response = await fetch(formData.profilePic);
			const blob = await response.blob();
			formDataToSend.append('profilePic', blob, 'profile-pic.jpg');
		}

		try {
			const response = await fetch('/api/update-profile', {
				method: 'POST',
				body: formDataToSend,
			});

			if (response.ok) {
				alert('Profile updated successfully!');
			} else {
				alert('Failed to update profile.');
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			alert('An error occurred while updating the profile.');
		}
	};

	return (
		<ProfileContainer>
			<ProfileForm onSubmit={handleSubmit}>
				<Title>Profile</Title>
				<Input
					type="text"
					name="firstName"
					placeholder="First Name"
					value={formData.firstName}
					onChange={handleChange}
					required
				/>
				<Input
					type="text"
					name="lastName"
					placeholder="Last Name"
					value={formData.lastName}
					onChange={handleChange}
					required
				/>
				<Input
					type="email"
					name="email"
					placeholder="Email"
					value={formData.email}
					onChange={handleChange}
					required
				/>
				<Input
					type="password"
					name="password"
					placeholder="Password (optional)"
					value={formData.password}
					onChange={handleChange}
				/>
				<Input
					type="file"
					name="profilePic"
					accept="image/*"
					onChange={handleFileChange}
				/>
				{profilePicPreview && (
					<Image
						src={profilePicPreview}
						alt="Profile"
						width={100}
						height={100}
						style={{ borderRadius: '50%' }}
					/>
				)}
				<Button type="submit">Update Profile</Button>
			</ProfileForm>
		</ProfileContainer>
	);
};

export default Profile;
