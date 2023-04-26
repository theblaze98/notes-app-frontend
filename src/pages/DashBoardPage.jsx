import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAutenticated, getUserData, getNotes, addNote, deleteNote } from '../utils/api';
import Header from '../components/HeaderReact';
import { CardNotes, AddNotesForm } from '../components/notes/index';
import img from '../assets/img2.jpg';

export const DashBoardPage = () => {
	const [userData, setUserData] = useState({
		username: '',
		email: '',
	});

	const [showAddFormNote, setShowAddFormNote] = useState(false);

	const [notes, setNotes] = useState([]);

	const navigate = useNavigate();
	async function autenticar() {
		const token = JSON.parse(localStorage.getItem('JWTToken'));
		if (!token) return navigate('/login');
		try {
			const res = await isAutenticated(token.token);
			if (res.msg === 'USER_AUTHENTICATED') {
				const { username, email } = await getUserData(token.token);
				setUserData({ username, email });
			}
			if (res.msg === 'NOT_AUTHENTICATED') return navigate('/login');
		} catch (error) {
			return navigate('/login');
		}
	}

	async function getAllNotes() {
		try {
			const token = JSON.parse(localStorage.getItem('JWTToken'));
			const res = await getNotes(token.token);
			setNotes(res);

		} catch (error) {
			console.log(error);
		}
	}

	const handleClickShowAddNotesForm = () => {
		setShowAddFormNote(true);
	}

	const handleClickNoShowAddNotesForm = () => {
		setShowAddFormNote(false);
	}

	const onSubmitAddNote = async ({title, description}) => {
		setShowAddFormNote(false);
		try {
			const token = JSON.parse(localStorage.getItem('JWTToken'))
			const res = await addNote(token.token, title, description);
			getAllNotes();
		} catch (error) {
			console.error(error);
		}
	}

	const handleClickDeleteNote = async id => {
		try {
			const res = await deleteNote(id);
			getAllNotes();
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		autenticar();
		getAllNotes();
	}, []);

	return (
		<>
			<Header
				userProfile={img}
				username={userData.username}
				userEmail={userData.email}
			/>
			<main className='main p-3 gap-5 flex flex-col'>
				<button
					className='button bg-blue-600 self-end'
					onClick={handleClickShowAddNotesForm}>
					Crear Nueva Nota
				</button>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5'>
					{notes.length !== 0 ? (
						notes.map(
							({_id, title, description, createdAt }, index) => {
								const date = new Date(createdAt);
								return (
									<CardNotes
										key={_id}
										title={title}
										description={description}
										timeCreated={`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}
										onClickDeleteNote={() => {handleClickDeleteNote(_id)}}
									/>
								);
							}
						)
					) : (
						<div className='col-span-2 md:col-span-3 bg-white rounded-md p-5'>
							<h2 className='text-2xl text-center font-semibold text-blue-600'>
								Aun no tienes ninguna nota
							</h2>
						</div>
					)}
				</div>
			</main>
			{showAddFormNote ? (
				<AddNotesForm
					handleClickNoShowAddNotesForm={
						handleClickNoShowAddNotesForm
					}
					onSubmitAddNote={onSubmitAddNote}
				/>
			) : (
				''
			)}
		</>
	);
};
