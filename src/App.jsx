import { useDispatch, useSelector } from 'react-redux'
import {
	del,
	add,
	update,
	completed,
	searchF,
	setFillterStatus,
	setFillterCity,
	showUserFunc,
} from './store/reducer/todolist/todolistSlice.js'
import { useEffect, useState } from 'react'

export default function App() {
	// const data = useSelector(store => store.todolist.data)
	const filterStatus = useSelector(state => state.todolist.filterStatus)
	const searchQuary = useSelector(state => state.todolist.searchQuary)
	const filterCity = useSelector(state => state.todolist.filterCity)
	const data = useSelector(state =>
		state.todolist.data
			.filter(user =>
				user.name.toLowerCase().includes((searchQuary || '').toLowerCase())
			)
			.filter(user =>
				filterStatus == 'all'
					? true
					: user.status === (filterStatus === 'active')
			)
			.filter(user => (filterCity == 'all' ? true : user.city == filterCity))
	)
	const dispatch = useDispatch()
	const handleStatusFillter = e => {
		dispatch(setFillterStatus(e.target.value))
	}
	const handleCityFillter = e => {
		dispatch(setFillterCity(e.target.value))
	}
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [cityA, setCityA] = useState('Dushanbe')
	const [addStatus, setAddStatus] = useState(false)
	const [open, setOpen] = useState(false)

	const [editUser, setEditUser] = useState({})
	const [openEdit, setOpenEdit] = useState(false)
	const [NameE, setNameE] = useState('')
	const [EmailE, setEmailE] = useState('')
	const [city, setCityE] = useState('')
	const [search, setSearch] = useState('')
	const [openS, setOpenS] = useState(false)
	// const [status, setStatus] = useState('')
	useEffect(() => {
		setNameE(editUser.name || '')
		setEmailE(editUser.email || '')
		setCityE(editUser.city || '')
	}, [editUser])

	const handleAdd = () => {
		const newUser = {
			id: Date.now(),
			name: name,
			email: email,
			status: addStatus,
			city: cityA,
		}
		dispatch(add(newUser))

		setName('')
		setEmail('')
		setCityA('Dushanbe')
		setOpen(false)
	}
	const editCLick = user => {
		setEditUser(user)
		console.log(user)
		setOpenEdit(true)
	}
	const handleUpdate = () => {
		dispatch(
			update({
				id: editUser.id,
				name: NameE,
				email: EmailE,
				status: editUser.status,
				city: city,
			})
		)
		setOpenEdit(false)
	}
	const handleSearch = e => {
		const value = e.target.value
		setSearch(value)
		dispatch(searchF(value))
	}
	function showUserF(id) {
		dispatch(showUserFunc(id))
		setOpenS(true)
	}
	const showUser = useSelector(state => state.todolist.showUser)

	return (
		<div className='w-[100%] m-auto mt-10'>
			{openS && (
				<div className='fixed m-auto top-0 right-0 flex justify-center items-center'>
					<div className='flex w-[500px] h-[100vh] flex-col items-center gap-3 rounded-lg bg-white	border-black border-2 p-[10px]'>
						<p className='font-bold text-start items-start w-[90%] m-auto'>
							Show USER
						</p>
						<div className='flex w-[90%] font-bold m-auto text-[25px] gap-[30px] flex-col'>
							<h1 className=''>Name : {showUser.name}</h1>
							<h1 className=''>Email : {showUser.email}</h1>
							<div className='flex gap-[20px] items-center'>
							<h1 className=''>Status : </h1>
							<h1 className={showUser.status ? "text-[#fff] bg-[green] rounded-md px-[10px] py-[5px]" : "text-[#fff] bg-[red] rounded-md px-[10px] py-[5px]"}>{showUser.status ? "Active" : "Inactive"}</h1>
							</div>
							<h1 className=''>City : {showUser.name}</h1>
						</div>
						<div className='flex gap-[20px] items-center justify-items-start w-[90%] m-auto	'>
							<button onClick={() => setOpenS(false)} className='cursor-pointer border px-[10px] py-[5px] rounded-md'>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<div className='flex gap-[20px] w-[90%] items-center m-auto justify-between'>
				<h1 className='text-[30px] font-bold my-4'>
					USER LIST
					<span className='text-purple-700 font-bold'> Redux</span>
				</h1>
				<button
					onClick={() => setOpen(true)}
					className='border-blue-900 cursor-pointer px-[20px] py-[10px] rounded-md bg-blue-500 text-[#fff] font-bold'
				>
					+ Add New
				</button>
			</div>
			{open && (
				<div className='fixed m-auto top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
					<div className='flex w-[500px] h-[300px] flex-col items-center gap-3 rounded-lg bg-white	border-black border-2 p-[10px]'>
						<p className='font-bold text-start items-start w-[90%] m-auto'>
							Add New USER
						</p>
						<div className='flex w-[90%] m-auto gap-5 flex-col'>
							<input
								type='text'
								value={name}
								onChange={e => setName(e.target.value)}
								placeholder='Name...'
								className='p-2 w-full border rounded-md'
							/>
							<input
								type='text'
								value={email}
								onChange={e => setEmail(e.target.value)}
								placeholder='Email...'
								className='p-2 border rounded-md'
							/>
							<select
								name=''
								className='border border-gray-600 py-[10px] px-[10px]'
								value={cityA}
								onChange={e => setCityA(e.target.value)}
								id=''
							>
								<option value='Dushanbe'>Dushanbe</option>
								<option value='Hisor'>Hisor</option>
								<option value='Bokhtar'>Bokhtar</option>
								<option value='Khujand'>Khujand</option>
							</select>
						</div>
						<div className='flex gap-[20px] items-center justify-items-start w-[90%] m-auto	'>
							<button
								onClick={handleAdd}
								className='border-blue-500 border-[1px] text-blue-500 font-bold rounded-md hover:bg-blue-200 py-2 px-5'
							>
								Add
							</button>
							<button onClick={() => setOpen(false)} className='cursor-pointer'>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
			<section
				className='w-[90%] m-auto flex justify-between items-center'
				id='toolBar'
			>
				<div className='flex gap-[20px] items-center'>
					<select
						name=''
						className='border border-gray-600 py-[10px] px-[20px] rounded-md cursor-pointer'
						id=''
						onChange={handleStatusFillter}
					>
						<option value='all'>All Status</option>
						<option value='active'>Active</option>
						<option value='inactive'>Inactive</option>
					</select>
					<select
						name=''
						className='border border-gray-600 py-[10px] px-[20px] rounded-md cursor-pointer'
						id=''
						onChange={handleCityFillter}
					>
						<option value='all'>All Cities</option>
						<option value='Dushanbe'>Dushanbe</option>
						<option value='Hisor'>Hisor</option>
						<option value='Khujand'>Khujand</option>
						<option value='Bokhtar'>Bokhtar</option>
					</select>
				</div>
				<input
					type='search'
					className='border border-gray-600 py-[10px] px-[20px] rounded-md'
					placeholder='Search...'
					value={search}
					onChange={handleSearch}
					name=''
					id=''
				/>
			</section>
			<table className='w-[90%] m-auto'>
				<thead>
					<tr className='border-b border-gray-500'>
						<th className='py-[10px]'>FullName</th>
						<th>Email</th>
						<th>Status</th>
						<th>City</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody className='text-center'>
					{data.length === 0 ? (
						<tr>
							<td className='flex justify-center items-center inset-0 fixed top-[50%] left-0 right-0 bottom-0'>
								<h1 className='fixed inset-0 top-[50%] left-0 text-[70px] font-bold text-[red]'>
									NOT FOUND
								</h1>
							</td>
						</tr>
					) : (
						data.map(user => (
							<tr key={user.id} className='border-b font-bold border-gray-500'>
								<td className='py-[10px]'>{user.name}</td>
								<td className='py-[10px]'>{user.email}</td>
								<td className='py-[10px] w-[150px]'>
									<p
										className={
											user.status
												? 'text-[#fff] bg-[green] rounded-md py-[10px] '
												: 'text-[#fff] bg-[red] rounded-md py-[10px]'
										}
									>
										{user.status ? 'Active' : 'Inactive'}
									</p>
								</td>
								<td className=''>{user.city}</td>
								<td className='w-[300px]'>
									<div className='flex gap-[10px] items-center w-[70%] m-auto'>
										<button
											onClick={() => dispatch(del(user.id))}
											className='bg-[red] cursor-pointer text-[#fff] font-bold rounded-md py-[5px] px-[10px]'
										>
											Delete
										</button>
										<button
											onClick={() => editCLick(user)}
											className='bg-blue-500 text-[#fff] cursor-pointer font-bold rounded-md py-[5px] px-[10px]'
										>
											Edit
										</button>
										<button
											onClick={() => showUserF(user.id)}
											className='bg-blue-900 text-[#fff] cursor-pointer font-bold rounded-md py-[5px] px-[10px]'
										>
											Show
										</button>

										<input
											checked={user.status}
											onChange={() => dispatch(completed(user.id))}
											type='checkbox'
											name=''
											id=''
											className='w-[50px] h-[50px] cursor-pointer'
										/>
									</div>
								</td>
							</tr>
						))
					)}
				</tbody>
			</table>

			{openEdit && (
				<div className='fixed m-auto top-0 bottom-0 left-0 right-0 flex justify-center items-center'>
					<div className='flex w-[500px] h-[300px] flex-col items-center gap-3 rounded-lg bg-white	border-black border-2 p-[10px]'>
						<p className='font-bold w-[90%] m-auto'>Edit USER</p>
						<div className='flex gap-5 flex-col w-[90%] m-auto'>
							<input
								type='text'
								value={NameE}
								onChange={e => setNameE(e.target.value)}
								placeholder='Name...'
								className='p-2 border rounded-md'
							/>
							<input
								type='text'
								value={EmailE}
								onChange={e => setEmailE(e.target.value)}
								placeholder='Email...'
								className='p-2 border rounded-md'
							/>
							<select
								value={city}
								onChange={e => setCityE(e.target.value)}
								placeholder='City...'
								className='p-2 border rounded-md'
							>
								<option value='Dushanbe'>Dushanbe</option>
								<option value='Hisor'>Hisor</option>
								<option value='Khujand'>Khujand</option>
								<option value='Bokhtar'>Bokhtar</option>
							</select>
						</div>
						<div className='flex gap-[20px] items-center w-[90%] m-auto'>
							<button
								onClick={handleUpdate}
								className='border-blue-500 border-[1px] text-blue-500 font-bold rounded-md hover:bg-blue-200 py-2 px-5'
							>
								Update
							</button>
							<button
								onClick={() => setOpenEdit(false)}
								className='cursor-pointer'
							>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
