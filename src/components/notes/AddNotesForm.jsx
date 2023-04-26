import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const addNoteSchema = Yup.object().shape({
	title: Yup.string().required('Debes ingresar un titulo'),
	description: Yup.string().required('Debes ingresar una descripcion'),
});

export const AddNotesForm = ({
	handleClickNoShowAddNotesForm,
	onSubmitAddNote,
}) => {
	return (
		<div className='w-full h-screen fixed flex justify-center items-center bg-slate-800 bg-opacity-20 top-0 left-0 z-20'>
			<div className='container-form'>
				<Formik
					initialValues={{ title: '', description: '' }}
					validationSchema={addNoteSchema}
					onSubmit={onSubmitAddNote}>
					{({ errors, touched }) => (
						<Form className='flex flex-col gap-3'>
							<div className='input-group'>
								<Field
									name='title'
									id='title'
									className={`peer input ${
										errors.title && touched.title
											? 'input-error'
											: ''
									}`}
									placeholder=' '
								/>
								<label
									htmlFor='title'
									className={`placeholder ${
										errors.title && touched.title
											? 'placeholder-error'
											: ''
									}`}>
									Titulo
								</label>
							</div>
							{errors.title && touched.title ? (
								<span className='error-span'>
									{errors.title}
								</span>
							) : (
								''
							)}
							<div className='input-group'>
								<Field
									name='description'
									id='description'
									className={`peer input ${
										errors.description &&
										touched.description
											? 'input-error'
											: ''
									}`}
									placeholder=' '
								/>
								<label
									htmlFor='description'
									className={`placeholder ${
										errors.description &&
										touched.description
											? 'placeholder-error'
											: ''
									}`}>
									Descripcion
								</label>
							</div>
							{errors.description && touched.description ? (
								<span className='error-span'>
									{errors.description}
								</span>
							) : (
								''
							)}
							<div className='self-end'>
								<button
									className='button bg-gray-700 mx-1'
									onClick={handleClickNoShowAddNotesForm}>
									Cancelar
								</button>
								<button
									type='submit'
									className='button bg-blue-600 mx-1'>
									Crear Nota
								</button>
							</div>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};
