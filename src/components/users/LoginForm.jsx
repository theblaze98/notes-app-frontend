import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { login } from '../../utils/api';

const loginSchema = Yup.object().shape({
	username: Yup.string()
		.min(4, 'El usuario debe contener al menos 4 caracteres')
		.required('Debes ingresar un username o email'),
	password: Yup.string()
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
		.max(20, 'La contraseña no puede tener mas de 20 caracteres')
		.required('Ingrese una contraseña'),
});

export const LoginForm = () => {
	const [error, setError] = useState({
		username: { hasError: false, msg: '' },
		password: { hasError: false, msg: '' },
	});

	const navigate = useNavigate();

	async function handleSubmit({ username, password }) {
		const res = await login(username, password);
		if (res.msg === 'USER_NOT_EXIST') {
			setError({
				...error,
				username: {
					hasError: true,
					msg: 'El usuario no se encuenta registrado',
				},
			});
			return;
		}
		if (res.msg === 'INVALID_PASSWORD') {
			setError({
				...error,
				password: {
					hasError: true,
					msg: 'Contraseña invalida',
				},
			});
			return;
		}
		localStorage.setItem('JWTToken', JSON.stringify({token: res.token}));
		return navigate('/');
	}

	function handleFocus({ target }) {
		const { name } = target;

		if (name === 'username') {
			setError({
				...error,
				username: { hasError: false, msg: '' },
			});
		}
		if (name === 'password') {
			setError({
				...error,
				password: { hasError: false, msg: '' },
			});
		}
	}

	return (
		<Formik
			initialValues={{ username: '', password: '' }}
			validationSchema={loginSchema}
			onSubmit={handleSubmit}>
			{({ errors, touched }) => (
				<Form className='flex flex-col gap-3'>
					<div className='input-group'>
						<Field
							name='username'
							id='username'
							className={`peer input ${
								(errors.username && touched.username) ||
								error.username.hasError
									? 'input-error'
									: ''
							}`}
							placeholder=' '
							onFocus={handleFocus}
						/>
						<label
							htmlFor='username'
							className={`placeholder ${
								(errors.username && touched.username) ||
								error.username.hasError
									? 'placeholder-error'
									: ''
							}`}>
							Username
						</label>
					</div>
					{(errors.username && touched.username) ||
					error.username.hasError ? (
						<span className='error-span'>
							{error.username.msg || errors.username}
						</span>
					) : (
						''
					)}
					<div className='input-group'>
						<Field
							type='password'
							name='password'
							id='password'
							className={`peer input ${
								(errors.password && touched.password) ||
								error.password.hasError
									? 'input-error'
									: ''
							}`}
							placeholder=' '
							onFocus={handleFocus}
						/>
						<label
							htmlFor='password'
							className={`placeholder ${
								(errors.password && touched.password) ||
								error.password.hasError
									? 'placeholder-error'
									: ''
							}`}>
							Password
						</label>
					</div>
					{(errors.password && touched.password) ||
					error.password.hasError ? (
						<span className='error-span'>
							{error.password.msg || errors.password}
						</span>
					) : (
						''
					)}
					<button
						type='submit'
						className='button bg-blue-600 self-end'>
						Iniciar Sesion
					</button>
				</Form>
			)}
		</Formik>
	);
};
