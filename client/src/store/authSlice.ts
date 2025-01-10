import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface AuthState {
	user: {
		id: string;
		username: string; 
		email: string 
	} | null;
	loading: boolean;
	error: string | null;
}

const initialState: AuthState = {
	user: null,
	loading: false,
	error: null,
};

export const registerUser = createAsyncThunk(
	'auth/registr',
	async (
		userData: { username: string; email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/auth/registr',
				userData
			);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('Ошибка регистрации');
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/login',
	async (
		loginData: { email: string; password: string },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.post(
				'http://localhost:3000/auth/login',
				loginData
			);
			return response.data;
		} catch (error) {
			console.log(error);
			return rejectWithValue('Ошибка авторизации');
		}
	}
);

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = null;
		},
	},
	extraReducers: builder => {
		builder.addCase(registerUser.pending, state => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			registerUser.fulfilled,
			(state, action: PayloadAction<{ id: string; username: string; email: string }>) => {
				state.loading = false;
				state.user = action.payload;
			}
		);
		builder.addCase(
			registerUser.rejected,
			(state, action: PayloadAction<any>) => {
				state.loading = false;
				state.error = action.payload;
			}
		);

		builder.addCase(loginUser.pending, state => {
			state.loading = true;
			state.error = null;
		});
		builder.addCase(
			loginUser.fulfilled,
			(state, action: PayloadAction<{ id: string; username: string; email: string }>) => {
				state.loading = false;
				state.user = action.payload;
			}
		);
		builder.addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
			state.loading = false;
			state.error = action.payload;
		});
	},
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
