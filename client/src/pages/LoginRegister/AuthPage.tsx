import React from 'react';
import { Tabs, Form, Input, Button, message } from 'antd';
import { useForm, Controller } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store/store';
import { registerUser, loginUser } from 'src/store/authSlice';

interface RegisterFormValues {
	username: string;
	email: string;
	password: string;
}

interface LoginFormValues {
	email: string;
	password: string;
}

const AuthPage: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>();
	const {
		handleSubmit: handleRegisterSubmit,
		control: registerControl,
		reset: resetRegisterForm,
	} = useForm<RegisterFormValues>();

	const {
		handleSubmit: handleLoginSubmit,
		control: loginControl,
		reset: resetLoginForm,
	} = useForm<LoginFormValues>();

	const onRegisterSubmit = async (data: RegisterFormValues) => {
		try {
			await dispatch(registerUser(data));
			message.success('Регистрация прошла успешно!');
			resetRegisterForm();
		} catch (error) {
			console.log(error);
		}
	};

	const onLoginSubmit = async (data: LoginFormValues) => {
		try {
			await dispatch(loginUser(data));
			message.success('Вход выполнен успешно!');
			resetLoginForm();
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<section style={{ maxWidth: 400, margin: '50px auto' }}>
			<Tabs defaultActiveKey='1'>
				<Tabs.TabPane tab='Регистрация' key='1'>
					<Form
						layout='vertical'
						onFinish={handleRegisterSubmit(onRegisterSubmit)}
					>
						<Form.Item label='Имя пользователя'>
							<Controller
								name='username'
								control={registerControl}
								rules={{ required: 'Введите имя пользователя' }}
								render={({ field, fieldState }) => (
									<Input
										{...field}
										placeholder='Введите имя пользователя'
										status={fieldState.error ? 'error' : ''}
									/>
								)}
							/>
						</Form.Item>

						<Form.Item label='Email'>
							<Controller
								name='email'
								control={registerControl}
								rules={{
									required: 'Введите email',
									pattern: {
										value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
										message: 'Неверный формат email',
									},
								}}
								render={({ field, fieldState }) => (
									<Input
										{...field}
										placeholder='Введите email'
										status={fieldState.error ? 'error' : ''}
									/>
								)}
							/>
						</Form.Item>

						<Form.Item label='Пароль'>
							<Controller
								name='password'
								control={registerControl}
								rules={{ required: 'Введите пароль' }}
								render={({ field, fieldState }) => (
									<Input.Password
										{...field}
										placeholder='Введите пароль'
										status={fieldState.error ? 'error' : ''}
									/>
								)}
							/>
						</Form.Item>

						<Button type='primary' htmlType='submit' block>
							Зарегистрироваться
						</Button>
					</Form>
				</Tabs.TabPane>

				<Tabs.TabPane tab='Вход' key='2'>
					<Form layout='vertical' onFinish={handleLoginSubmit(onLoginSubmit)}>
						<Form.Item label='Email'>
							<Controller
								name='email'
								control={loginControl}
								rules={{ required: 'Введите email' }}
								render={({ field, fieldState }) => (
									<Input
										{...field}
										placeholder='Введите email'
										status={fieldState.error ? 'error' : ''}
									/>
								)}
							/>
						</Form.Item>

						<Form.Item label='Пароль'>
							<Controller
								name='password'
								control={loginControl}
								rules={{ required: 'Введите пароль' }}
								render={({ field, fieldState }) => (
									<Input.Password
										{...field}
										placeholder='Введите пароль'
										status={fieldState.error ? 'error' : ''}
									/>
								)}
							/>
						</Form.Item>

						<Button type='primary' htmlType='submit' block>
							Войти
						</Button>
					</Form>
				</Tabs.TabPane>
			</Tabs>
		</section>
	);
};

export default AuthPage;
