export const signup = async (username, email, password) => {

    try {
        const response = await fetch('http://localhost:3000/api/users/signup', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, email, password})
        });
        const data = await response.json();
        return data;
    } catch (error) {
        return error.msg;
    }
}

export const login = async (email, password) => {
    console.log({email, password});

    return true;
}
