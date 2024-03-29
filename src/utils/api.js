const URL_SERVER = import.meta.env.VITE_URL_BACKEND

export const signup = async (username, email, password) => {
	try {
		const response = await fetch(`${URL_SERVER}/api/users/signup`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ username, email, password }),
		})
		const data = await response.json()
		return data
	} catch (error) {
		return error.msg
	}
}

export const login = async (username, password) => {
	try {
		const response = await fetch(`${URL_SERVER}/api/users/login`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ username, password }),
		})

		const data = await response.json()
		return data
	} catch (error) {
		return error.message
	}
}

export const isAutenticated = async token => {
	try {
		const response = await fetch(`${URL_SERVER}/api/users/auth`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ token }),
		})
		const res = await response.json()
		return res
	} catch (error) {
		return error.message
	}
}

export const getUserData = async token => {
	try {
		const response = await fetch(`${URL_SERVER}/api/users/getuserdata`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ token }),
		})
		const res = await response.json()
		return res
	} catch (error) {
		return error.message
	}
}

export const getNotes = async token => {
	try {
		const response = await fetch(`${URL_SERVER}/api/notes/get-notes/${token}`, {
			headers: {
				'Access-Control-Allow-Origin': '*',
			}
		})
		const res = await response.json()
		return res
	} catch (error) {
		return error.message
	}
}

export const addNote = async (token, title, description) => {
	try {
		const response = await fetch(`${URL_SERVER}/api/notes/add`, {
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
			body: JSON.stringify({ token, title, description }),
		})
		const res = await response.json()
		return res
	} catch (error) {
		return error
	}
}

export const deleteNote = async id => {
	try {
		const response = await fetch(`${URL_SERVER}/api/notes/delete/${id}`, {
			method: 'DELETE',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*',
			},
		})
		return await response.json()
	} catch (error) {
		return error.message
	}
}
