import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Profile, AuthPage, CreateList, AllLists } from '@pages/index';
import { RootState } from 'src/store/store';
import { Routes as RoutesPath } from '@routes';
import { Layout } from '@Layout/Layout';

const PrivateRoute = ({ children }: { children: JSX.Element }) => {
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.user !== null
	);
	return isAuthenticated ? (
		children
	) : (
		<Navigate to={RoutesPath.AuthPage} replace />
	);
};

export const AppRouter = () => {
	// const userId = useSelector((state : RootState) => state.auth.user?.id)
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.user !== null
	);

	return (
		<BrowserRouter>
			<Routes>
				{!isAuthenticated ? (
					<>
						<Route path={RoutesPath.AuthPage} element={<AuthPage />} />
						<Route
							path='*'
							element={<Navigate to={RoutesPath.AuthPage} replace />}
						/>
					</>
				) : (
					<>
						<Route path='/' element={<Layout />}>
							<Route path={RoutesPath.Profile} element={<Profile />} />
							{/* <Route path={"Profile/:userId"} element={<Profile />} /> */}
							<Route
								path={RoutesPath.CreateList}
								element={
									<PrivateRoute>
										<CreateList />
									</PrivateRoute>
								}
							/>
							<Route
								path={RoutesPath.AllLists}
								element={
									<PrivateRoute>
										<AllLists />
									</PrivateRoute>
								}
							/>
							<Route
								path='*'
								element={<Navigate to={RoutesPath.Profile} replace />}
							/>
						</Route>
					</>
				)}
			</Routes>
		</BrowserRouter>
	);
};
