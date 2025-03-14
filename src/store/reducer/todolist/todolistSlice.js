import { createSlice } from '@reduxjs/toolkit'

export const todolistSlice = createSlice({
	name: 'todolist',
	initialState: {
		data: [
			{
				id: '1',
				name: 'Shohrukh Abduvakhidov',
				email: 'shoxa@gmail.com',
				status: true,
				city: 'Dushanbe',
			},
			{
				id: '2',
				name: 'Eraj Akhmetov',
				email: 'akhmetov@gmail.com',
				status: true,
				city: 'Dushanbe',
			},
			{
				id: '3',
				name: 'Muhsin Behbudov',
				email: 'maks@gmail.com',
				status: false,
				city: 'Hisor',
			},
			{
				id: '4',
				name: 'Bushra Tarakhil',
				email: 'bushra@gmail.com',
				status: false,
				city: 'Khujand',
			},
			{
				id: '5',
				name: 'Azizova Rayhona',
				email: 'bella@gmail.com',
				status: true,
				city: 'Bokhtar',
			},
			{
				id: '6',
				name: 'Izzat Doronshodazpda',
				email: 'izzat@gmail.com',
				status: false,
				city: 'Khujand',
			},
		],
		filterStatus: 'all',
		filterCity: 'all',
		showUser: null,
	},
	reducers: {
		del: (state, action) => {
			state.data = state.data.filter(todo => todo.id !== action.payload)
		},
		add: (state, action) => {
			state.data = [...state.data, action.payload]
		},
		update: (state, action) => {
			state.data = state.data.map(user =>
				user.id === action.payload.id ? { ...user, ...action.payload } : user
			)
		},
		completed: (state, action) => {
			state.data = state.data.map(todo =>
				todo.id === action.payload ? { ...todo, status: !todo.status } : todo
			)
		},
		searchF: (state, action) => {
			state.searchQuary = action.payload.toLowerCase()
		},
		setFillterStatus: (state, action) => {
			state.filterStatus = action.payload
		},
		setFillterCity: (state, action) => {
			state.filterCity = action.payload
		},
		showUserFunc: (state, action) => {
			state.showUser =
				state.data.find(user => user.id == action.payload) || null
		},
	},
})

export default todolistSlice.reducer
export const {
	showUserFunc,
	del,
	add,
	update,
	completed,
	searchF,
	setFillterStatus,
	setFillterCity,
} = todolistSlice.actions
