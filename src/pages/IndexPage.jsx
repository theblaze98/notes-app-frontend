import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAutenticated } from '../utils/api';

export const IndexPage = () => {
	const navigate = useNavigate();

	async function autenticar() {
		const token =
			JSON.parse(localStorage.getItem('JWTToken'));
		if (token) {
			try {
				const res = await isAutenticated(token.token);
				if (res.msg === 'USER_AUTHENTICATED')
					return navigate('/dashboard');
				if (res.msg === 'NOT_AUTHENTICATED') return navigate('/login');
			} catch (error) {
				console.log(error.message);
			}
		} else {
			return navigate('/login');
		}
	}

	autenticar();

	return (
		<>
			<h1>IndexPage</h1>
		</>
	);
};
