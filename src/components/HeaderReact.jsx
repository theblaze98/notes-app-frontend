import { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import profileDefault from '../assets/img1.jpg';

export default function Header({userProfile, username, userEmail}) {
    const [showProfile, setShowProfile] = useState(false);

    const navigate = useNavigate();

    const openProfile = () => {
        setShowProfile(true);
    }

    const closeProfile = () => {
        setShowProfile(false);
    }

    const logout = () => {
        localStorage.removeItem('JWTToken');
        return navigate('/login');
    }

    return (
		<header className='flex w-full h-20 px-5 py-2 z-10 items-center justify-between bg-white text-blue-600 fixed top-0'>
			<h2 className='text-2xl font-medium'>Notes App</h2>
			{showProfile ? (
				<FaUser
					className='w-5 h-5 cursor-pointer'
					onClick={closeProfile}
				/>
			) : (
				<figure
					className='h-4/5 cursor-pointer'
					onClick={openProfile}>
					<img
						src={userProfile || profileDefault}
						alt=''
						className='h-full rounded-full'
					/>
				</figure>
			)}
			<div
				className={`w-52 bg-white shadow shadow-gray-500 fixed right-0 top-20 p-8 flex flex-wrap rounded-bl-xl transition-opacity duration-150 ease-in ${
					showProfile
						? 'opacity-100 pointer-events-auto'
						: 'pointer-events-none opacity-0'
				} gap-5 items-center`}>
				<figure className='w-17 h-17 profile-img rounded-full overflow-hidden cursor-pointer'>
					<img
						src={userProfile || profileDefault}
						alt='profileImageUser'
						className='w-full h-full'
					/>
				</figure>
				<div className='flex flex-col w-full'>
					<span className='text-xl text-center font-medium block'>
						{username}
					</span>
					<span className='text-sm text-slate-700 block text-center'>
						{userEmail}
					</span>
				</div>
                <button className='basis-full' onClick={logout}>Cerrar Sesion</button>
			</div>
		</header>
	);
}
