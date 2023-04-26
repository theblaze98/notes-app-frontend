import { FaTrash } from 'react-icons/fa';

export const CardNotes = ({
	title,
	description,
	timeCreated,
	onClickDeleteNote,
}) => {
	return (
		<div className='bg-white rounded-md p-5'>
			<span className='text-xl font-medium text-blue-600'>{title}</span>
			<p className='text-lg text-stone-900'>{description}</p>
			<div className='flex justify-between items-center'>
				<p className='text-sm text-slate-700 font-medium'>
					{timeCreated}
				</p>
				<button
					onClick={onClickDeleteNote}
					className='rounded bg-red-500 text-white p-2'>
					<FaTrash />
				</button>
			</div>
		</div>
	);
};
