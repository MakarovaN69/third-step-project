export const API = 'https://ajax.test-danit.com/api/cards/';

export function getLogin(email, password) {
    return fetch(`${API}login`, {
        method: "POST",
        mode: "cors",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    })
}