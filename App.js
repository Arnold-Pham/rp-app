import React, { useState, useEffect } from 'react';
import LoadingScreen from './screens/LoadingScreen';
import ReservationCodeScreen from './screens/ReservationCodeScreen';

export default function App() {
	const [isLoading, setLoading] = useState(true);

	useEffect(() => {
		setTimeout(() => {
			setLoading(false);
		}, 2000);
	}, []);

	if (isLoading) {
		return <LoadingScreen />;
	}

	return <ReservationCodeScreen />;
}
