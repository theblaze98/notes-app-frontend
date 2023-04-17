import { Link } from 'react-router-dom';
import { LoginForm } from '../components/users/index';

export const LoginPage = () => {
    return (
		<main className='flex justify-center items-center min-h-screen'>
			<div className='container-form'>
				<h2 className='text-2xl text-center font-medium mb-3'>
					Iniciar Sesion
				</h2>
				<Link
					to='/signup'
					className='text-sm text-center block w-full font-normal text-stone-900 hover:text-blue-600'>
					Aun no tienes una cuenta? Click aqui para registrarte
				</Link>
				<hr className='my-5' />
                <LoginForm />
			</div>
		</main>
	);
}
