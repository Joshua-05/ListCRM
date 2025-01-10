import { Typography } from 'antd';
import styles from './Footer.module.scss';

const { Text } = Typography;

export const Footer = () => {
	return (
		<footer
			style={{
				textAlign: 'center',
				background: '#001529',
				color: '#fff',
				padding: '20px 0',
			}}
			className={styles.footer}
		>
			<Text style={{ color: '#fff' }}>
				© 2025 ProductList. Made by{' '}
				<a href='https://github.com/LVSTDVNCE'>LVSTDVNCE,</a>{' '}
				<a href='https://github.com/Joshua-05'>Joshua-05,</a>{' '}
				<a href='https://github.com/Cha11en9er'>Cha11en9er</a>.
			</Text>
		</footer>
	);
};
