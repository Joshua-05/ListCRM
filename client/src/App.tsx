import { AppRouter } from '@routes';
import { store } from './store/store';
import { Provider } from 'react-redux';

export function App() {
	return (
		<Provider store={store}>
			<AppRouter />
		</Provider>
	);
}
