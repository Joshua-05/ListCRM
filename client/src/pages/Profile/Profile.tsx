import { useEffect } from 'react';
import { RootState } from '../../store/store';
import { useSelector } from 'react-redux';
import { instance } from '@api/axios';
import { useListStore } from 'src/store/zustand';
import { IProductList } from 'src/types/ListStore';
import UserProductListCard from '@components/UserProductListCard';
import { Typography, Row, Col, Card, Space } from 'antd';

const { Title, Text } = Typography;

const Profile = () => {
	const addList = useListStore(state => state.addList);
	const listStore = useListStore(state => state.listStore);
	const user = useSelector((state: RootState) => state.auth.user);
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const reset = useListStore(state => state.resetList);

	useEffect(() => {
		const fetchUserLists = async () => {
			try {
				reset();
				const response = await instance.post(`user/getList`, { id: userId });
				const list: IProductList[] = response.data;
				addList(list);
			} catch (error) {
				console.error('Failed to fetch user lists:', error);
			}
		};
		if (userId) {
			fetchUserLists();
		}
	}, [userId]);

	return (
		<Row
			justify='center'
			style={{ padding: '20px', paddingBottom: '100px', height: '100%' }}
		>
			<Col span={16}>
				<Space direction='vertical' style={{ width: '100%' }} size='large'>
					<Card>
						<Title level={2}>Ваш профиль</Title>
						{user ? (
							<div>
								<Text>
									<strong>Имя пользователя:</strong> {user.username}
								</Text>
								<br />
								<Text>
									<strong>Email:</strong> {user.email}
								</Text>
							</div>
						) : (
							<Text>No user is logged in.</Text>
						)}
					</Card>

					<Card>
						<Title level={3}>Ваши списки покупок</Title>
						{listStore.length > 0 ? (
							<Space
								direction='vertical'
								style={{ width: '100%' }}
								size='middle'
							>
								{listStore.map(item => (
									<UserProductListCard list={item} key={item.id} />
								))}
							</Space>
						) : (
							<Text>У вас пока нет списков покупок.</Text>
						)}
					</Card>
				</Space>
			</Col>
		</Row>
	);
};

export default Profile;
