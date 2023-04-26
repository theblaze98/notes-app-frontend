import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Ring } from '@uiball/loaders';
import { isAutenticated } from '../utils/api';

export const IndexPage = () => {
	const navigate = useNavigate();

	async function autenticar() {
		const token = JSON.parse(localStorage.getItem('JWTToken'));
		if (!token) return navigate('/login');
		try {
			const res = await isAutenticated(token.token);
			if (res.msg === 'USER_AUTHENTICATED') return navigate('/dashboard');
			if (res.msg === 'NOT_AUTHENTICATED') return navigate('/login');
		} catch (error) {
			return navigate('/login');
		}
	}

	useEffect(() => {
		autenticar();
	}, []);


	return (
		<main className='h-screen flex justify-center items-center'>
			<Ring lineWeight={6} size={60} speed={2} color='#2563eb' />
		</main>
	);
};
