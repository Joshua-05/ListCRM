import { Routes } from '@routes';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo';
import { Menu, Typography, Space } from 'antd';

const { Text } = Typography;

export const Header = () => {
	return (
		<header
			style={{
				background: '#001529',
				padding: '0 20px',
				display: 'flex',
				alignItems: 'center',
			}}
		>
			<Space style={{ flex: 1, alignItems: 'center' }}>
				<div style={{ display: 'flex', alignItems: 'center' }}>
					<Logo />
					<Text style={{ color: '#fff', fontSize: '18px', fontWeight: 'bold' }}>
						ProductList
					</Text>
				</div>
			</Space>
			<Menu theme='dark' mode='horizontal' style={{ minWidth: '400px' }}>
				<Menu.Item key='1'>
					<Link to={Routes.Profile}>Профиль</Link>
				</Menu.Item>
				<Menu.Item key='2'>
					<Link to={Routes.AllLists}>Все списки</Link>
				</Menu.Item>
				<Menu.Item key='3'>
					<Link to={Routes.CreateList}>Создать список</Link>
				</Menu.Item>
			</Menu>
		</header>
	);
};
