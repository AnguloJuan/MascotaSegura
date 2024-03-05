import { Children } from 'react';

export const Each = ({ render, of }) => {
	return <>{Children.toArray(of.map((item, index) => render(item, index)))}</>;
};
