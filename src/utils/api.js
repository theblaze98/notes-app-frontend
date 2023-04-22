import { createRoutesFromChildren } from 'react-router-dom';

export const signup = async (username, email, password) => {
	try {
		const response = await fetch('http://localhost:3000/api/users/signup', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, email, password }),
		});
		const data = await response.json();
		return data;
	} catch (error) {
		return error.msg;
	}
};

export const login = async (username, password) => {
	try {
		const response = await fetch('http://localhost:3000/api/users/login', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ username, password }),
		});

		const data = await response.json();
		return data;
	} catch (error) {
		return error.message;
	}
};

export const isAutenticated = async token => {
	try {
		const response = await fetch('http://localhost:3000/api/users/auth', {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ token }),
		});
		const res = await response.json();
		return res;
	} catch (error) {
		return error.message;
	}
};

export const getUserData = async token => {
	try {
		const response = await fetch(
			'http://localhost:3000/api/users/getuserdata',
			{
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ token }),
			}
		);
		const res = await response.json();
		return res;
	} catch (error) {
		return error.message;
	}
};
