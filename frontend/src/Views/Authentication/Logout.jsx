import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { authInstance } from '../../Services/authentication';

export default function Logout() {
	const history = useHistory();

	useEffect(() => {
		const response = authInstance.post('user/logout/blacklist/', {
			refresh_token: localStorage.getItem('refresh_token'),
		});
		localStorage.removeItem('access_token');
		localStorage.removeItem('refresh_token');
        localStorage.removeItem('username');
        localStorage.setItem('loggedIn', 'False')
		authInstance.defaults.headers['Authorization'] = null;
		history.push('/Login');
	});
	return <div>Logout</div>;
}