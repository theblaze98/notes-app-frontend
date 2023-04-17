import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { signup } from '../../utils/api';

const SignupSchema = Yup.object().shape({
	username: Yup.string()
		.min(4, 'El nombre de usuario debe tener al menos 4 caracteres')
		.required('Ingrese un Nombre de Usuario'),
	email: Yup.string()
		.email('Email ingrese un email valido')
		.required('Debes ingresar un email'),
	password: Yup.string()
		.min(6, 'La contraseña debe tener al menos 6 caracteres')
		.max(20, 'La contraseña no puede tener mas de 20 caracteres')
		.required('Ingrese una contraseña'),
});

export const SignupForm = () => {
    const [error, setError] = useState({
        username: {hasError: false, msg: ''},
        email: {hasError: false, msg: ''},
    })

    const navigate = useNavigate();

	const handleSubmit = async ({ username, email, password }) => {
		const res = await signup(username, email, password);
        console.log(res);
        if (res.msg === 'USERNAME_ALREADY_EXISTS') {
            setError({
                ...error,
                username: {hasError: true, msg: 'El nombre de usuario ya esta registrado'}
            })
            return;
		}
        if (res.msg === 'EMAIL_ALREADY_EXISTS') {
            setError({
				...error,
				email: {
					hasError: true,
					msg: 'El email ya esta registrado',
				},
			});
            return;
        }
        navigate('/login')
	};

    function handleFocus ({target}) {
        const {name} = target;

        if (name === 'username') {
            setError({
                ...error,
                username: {hasError: false, msg: ''}
            })
        }
        if (name === 'email') {
            setError({
                ...error,
                email: {hasError: false, msg: ''}
            })
        }
    }

	return (
		<Formik
			initialValues={{
				username: '',
				email: '',
				password: '',
			}}
			validationSchema={SignupSchema}
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
					{errors.username && touched.username || error.username.hasError ? (
						<span className='error-span'>{error.username.msg || errors.username}</span>
					) : (
						''
					)}
					<div className='input-group'>
						<Field
							type='email'
							name='email'
							id='email'
							className={`peer input ${
								errors.email && touched.email || error.email.hasError
									? 'input-error'
									: ''
							}`}
							placeholder=' '
                            onFocus={handleFocus}
						/>
						<label
							htmlFor='email'
							className={`placeholder ${
								(errors.email && touched.email) ||
								error.email.hasError
									? 'placeholder-error'
									: ''
							}`}>
							Email
						</label>
					</div>
					{errors.email && touched.email || error.email.hasError ? (
						<span className='error-span'>
							{error.email.msg || errors.email}
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
								errors.password && touched.password
									? 'input-error'
									: ''
							}`}
							placeholder=' '
						/>
						<label
							htmlFor='password'
							className={`placeholder ${
								errors.password && touched.password
									? 'placeholder-error'
									: ''
							}`}>
							Password
						</label>
					</div>
					{errors.password && touched.password ? (
						<span className='error-span'>{errors.password}</span>
					) : (
						''
					)}
					<button
						type='submit'
						className='button bg-blue-600 self-end'>
						Registrarse
					</button>
				</Form>
			)}
		</Formik>
	);
};
