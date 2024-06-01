export const ROUTES = {
	home: () => '/',
	cccomic: () => '/cccomic',
	cctext: () => '/cctext',
	cctextId: (id: string | number) => `/cctext/${id}`,
	ccpoop: () => '/ccpoop',
	ccpoopId: (id: string | number) => `/ccpoop/${id}`,
	ccvideo: () => '/ccvideo'
};
export const menu = [
	{ name: 'Home', path: ROUTES.home(), icon: 'solar:home-outline' },
	{ name: 'Comic', path: ROUTES.cccomic() },
	{ name: 'Text', path: ROUTES.cctext() },
	{ name: 'Poop', path: ROUTES.ccpoop() },
	{ name: 'Video', path: ROUTES.ccvideo() }
];
