import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAutenticated, getUserData } from '../utils/api';

export const DashBoardPage = () => {
	const [userData, setUserData] = useState({
		username: '',
		email: '',
	});

	const navigate = useNavigate();

	async function autenticar() {
		const token = JSON.parse(localStorage.getItem('JWTToken'));
		if (token) {
			try {
				const res = await isAutenticated(token.token);
				if (res.msg === 'USER_AUTHENTICATED') {
					const userData = await getUserData(token.token);
					setUserData({
						username: userData.username,
						email: userData.email,
					});
				}
				if (res.msg === 'NOT_AUTHENTICATED') return navigate('/login');
			} catch (error) {
				navigate('/login');
			}
		} else {
			return navigate('/login');
		}
	}

	autenticar();

	return (
		<>
			<p>{userData.username}</p>
			<p>{userData.email}</p>
		</>
	);
};
