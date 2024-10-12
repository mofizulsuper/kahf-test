import Link from 'next/link';
import React, { useState } from 'react';
import styled from 'styled-components';
import dbConnect from '../../lib/mongodb';
import User from '../../models/user';

const RegisterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const RegisterForm = styled.form`
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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		try {
			// Send the form data to the API route
			const response = await fetch('/api/register', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					firstName: formData.firstName,
					lastName: formData.lastName,
					email: formData.email,
					password: formData.password,
				}),
			});

			const data = await response.json();

			if (response.ok) {
				alert('Registration successful!');
                // redirect to /signin page
                window.location.href = '/signin';
			} else {
				alert(`Registration failed: ${data.message}`);
			}
		} catch (error) {
			console.error('Error submitting form:', error);
			alert('An error occurred. Please try again.');
		}
  };

  return (
    <RegisterContainer>
      <p>Go to ⮞ <Link href="/"> Home </Link></p>
      <RegisterForm onSubmit={handleSubmit}>
        <Title>Register</Title>
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
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <Input
          type="password"
          name="confirmPassword" // You might want to add a different name for confirmation
          placeholder="Confirm Password"
          value={formData.password} // Change this to handle confirm password appropriately
          onChange={handleChange}
          required
        />
        <Button type="submit">Register</Button>
      </RegisterForm>
      <p>Already have an account? <Link href="/signin"> Signin </Link></p>
    </RegisterContainer>
  );
};

export default Register;
