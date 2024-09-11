export const ROUTES = {
	home: () => '/',
	cctext: () => '/cctext',
	cctextId: (id: string | number) => `/cctext/${id}`,
	ccpoop: () => '/ccpoop',
	ccpoopId: (id: string | number) => `/ccpoop/${id}`,
	about: () => '/about'
};
export const menu = [
	{ name: 'Home', path: ROUTES.home(), icon: 'solar:home-outline' },
	{ name: 'Text', path: ROUTES.cctext() },
	{ name: 'Poop', path: ROUTES.ccpoop() },
	{ name: 'About', path: ROUTES.about() }
];
