import { instance } from '@api/axios';
import { useEffect, useState } from 'react';
import { usePublicListStore } from 'src/store/zustand';
import { IProductList } from 'src/types/ListStore';
import style from './style.module.css';
import PublicProductListCard from '@components/PublicProductListCard';
import { Input, Checkbox, Row, Col, Typography, Space, Divider } from 'antd';

const { Title, Text } = Typography;

const AllLists = () => {
	const addList = usePublicListStore(state => state.addList);
	const reset = usePublicListStore(state => state.resetList);
	const list = usePublicListStore(state => state.publicListStore);

	const [searchTerm, setSearchTerm] = useState('');
	const [filterByDate, setFilterByDate] = useState(false);
	const [filterByAlphabet, setFilterByAlphabet] = useState(false);
	const [author, setAuthor] = useState<string>('');

	useEffect(() => {
		const fetchPublicLists = async () => {
			try {
				reset();
				const response = await instance.get(`list/getAllList`);
				const fetchedList: IProductList[] = response.data;
				addList(fetchedList);
			} catch (error) {
				console.error('Failed to fetch user lists:', error);
			}
		};

		fetchPublicLists();
	}, [addList, reset]);

	const filteredLists = () => {
		let filtered = list;

		if (searchTerm) {
			filtered = filtered.filter(
				item =>
					item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					author.toLowerCase().includes(searchTerm.toLowerCase())
			);
		}

		if (filterByDate) {
			filtered = filtered.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			);
		}

		if (filterByAlphabet) {
			filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
		}

		return filtered;
	};

	return (
		<>
			<Row justify='center' style={{ margin: '20px 0', height: '100%' }}>
				<Col span={24}>
					<Title level={2} style={{ textAlign: 'center' }}>
						Все списки покупок
					</Title>
				</Col>
			</Row>

			<Row justify='center' className={style.allListsContainer}>
				<Col span={18}>
					<Space direction='vertical' style={{ width: '100%' }}>
						<div className={style.filters}>
							<Input
								placeholder='Поиск по названию или автору'
								value={searchTerm}
								onChange={e => setSearchTerm(e.target.value)}
								className={style.searchInput}
								allowClear
							/>

							<Space
								direction='horizontal'
								size='large'
								style={{ marginTop: '10px' }}
							>
								<Checkbox
									checked={filterByDate}
									onChange={e => setFilterByDate(e.target.checked)}
								>
									Сортировать по дате
								</Checkbox>

								<Checkbox
									checked={filterByAlphabet}
									onChange={e => setFilterByAlphabet(e.target.checked)}
								>
									Сортировать по алфавиту
								</Checkbox>
							</Space>
						</div>

						<Divider />

						<div className={style.list}>
							{filteredLists().length > 0 ? (
								<Row gutter={[16, 16]}>
									{filteredLists().map(item => (
										<Col span={8} key={item.id} style={{ display: 'flex' }}>
											<PublicProductListCard setUser={setAuthor} list={item} />
										</Col>
									))}
								</Row>
							) : (
								<Text
									type='secondary'
									style={{ textAlign: 'center', display: 'block' }}
								>
									Списков не существует
								</Text>
							)}
						</div>
					</Space>
				</Col>
			</Row>
		</>
	);
};

export default AllLists;
