'use client';
import { GetUser } from '@/app/lib/user';
import { useEffect, useState } from 'react';

export default function Page() {
	const [user, setUser] = useState(null);
	useEffect(() => {
		const userData = GetUser();
		userData.then((res) => res.json()).then((data) => setUser(data));
	}, []);

	return <div>{user}</div>;
}
