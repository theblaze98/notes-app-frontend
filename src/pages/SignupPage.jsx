import { Link } from 'react-router-dom';
import { SignupForm } from '../components/users/index';

export const SignupPage = () => {
	return (
		<main className='flex justify-center items-center min-h-screen'>
			<div className='container-form'>
				<h2 className='text-2xl text-center font-medium mb-3'>Registrarse</h2>
				<Link to='/login' className='text-sm text-center block w-full font-normal text-stone-900 hover:text-blue-600'>Ya tienes una cuenta? Haz click aqui para iniciar sesion</Link>
				<hr className='my-5' />
				<SignupForm />
			</div>
		</main>
	);
};
