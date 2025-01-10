import { Profile, AuthPage, CreateList, AllLists } from '@pages/index';
import { NotFound } from '@pages/NotFound';

export enum Routes {
	AuthPage = '/Auth',
	Profile = '/Profile',
	CreateList = '/CreateList',
	AllLists = '/AllLists',
	NotFound = '*',
}

export const ROUTES = [
	{
		path: Routes.AuthPage,
		Component: AuthPage,
	},
	{
		path: Routes.Profile,
		Component: Profile,
	},
	{
		path: Routes.CreateList,
		Component: CreateList,
	},
	{
		path: Routes.AllLists,
		Component: AllLists,
	},
	{
		path: Routes.NotFound,
		Component: NotFound,
	},
];
