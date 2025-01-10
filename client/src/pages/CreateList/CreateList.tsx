import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store/store';
import { instance } from '@api/axios';
import { useNavigate } from 'react-router-dom';
import {
	Form,
	Input,
	Button,
	Checkbox,
	Typography,
	Row,
	Col,
	Space,
	Divider,
} from 'antd';

const { Title } = Typography;

interface Product {
	name: string;
	quantity: string;
	price: string;
}

const CreateList = () => {
	const userId = useSelector((state: RootState) => state.auth.user?.id);
	const nav = useNavigate();
	const [title, setTitle] = useState('');
	const [access, setAccess] = useState(false);
	const [products, setProducts] = useState<Product[]>([
		{ name: '', quantity: '', price: '' },
	]);

	const handleProductChange = (
		index: number,
		field: keyof Product,
		value: string
	) => {
		const newProducts = [...products];
		newProducts[index][field] = value;
		setProducts(newProducts);
	};

	const addProduct = () => {
		setProducts([...products, { name: '', quantity: '', price: '' }]);
	};

	const removeProduct = (index: number) => {
		const newProducts = products.filter((_, i) => i !== index);
		setProducts(newProducts);
	};

	const handleSubmit = async (values: any) => {
		const listData = {
			title: values.title,
			userId,
			products,
			access: access,
		};

		try {
			const response = await instance.post('list/create', listData);
			console.log('Good', response.data);
			nav('/Profile');
			// console.log(listData);
		} catch (error) {
			console.error('Error: ', error);
		}
	};
	
	return (
		<div style={{ height: '100%', paddingBottom: '100px' }}>
			<Row justify='center' style={{ margin: '20px 0' }}>
				<Col span={24}>
					<Title level={2} style={{ textAlign: 'center' }}>
						Создание списка покупок
					</Title>
				</Col>
			</Row>

			<Row justify='center'>
				<Col span={16}>
					<Form layout='vertical' onFinish={handleSubmit}>
						<Form.Item
							label='Название списка'
							name='title'
							rules={[{ required: true, message: 'Please input the title!' }]}
						>
							<Input
								value={title}
								onChange={e => setTitle(e.target.value)}
								placeholder='Название списка'
							/>
						</Form.Item>

						<Divider>Продукты</Divider>
						{products.map((product, index) => (
							<Space
								key={index}
								direction='vertical'
								style={{ width: '100%', marginBottom: '10px' }}
							>
								<Row gutter={16} align='middle'>
									<Col span={8}>
										<Input
											value={product.name}
											onChange={e =>
												handleProductChange(index, 'name', e.target.value)
											}
											placeholder='Название продукта'
											required
										/>
									</Col>
									<Col span={8}>
										<Input
											value={product.quantity}
											onChange={e =>
												handleProductChange(index, 'quantity', e.target.value)
											}
											placeholder='Количество'
											required
										/>
									</Col>
									<Col span={8}>
										<Input
											type='number'
											value={product.price}
											onChange={e =>
												handleProductChange(index, 'price', e.target.value)
											}
											placeholder='Цена'
											required
										/>
									</Col>
								</Row>
								<Row justify='end' gutter={8}>
									<Col>
										<Button
											type='dashed'
											onClick={() => removeProduct(index)}
											danger
										>
											Удалить
										</Button>
									</Col>
									<Col>
										<Button type='dashed' onClick={addProduct}>
											Добавить
										</Button>
									</Col>
								</Row>
							</Space>
						))}

						<Divider>Доступ</Divider>
						<Form.Item name='access' valuePropName='checked'>
							<Checkbox
								checked={access}
								onChange={e => setAccess(e.target.checked)}
							>
								Опубликовать для всех пользователей
							</Checkbox>
						</Form.Item>

						<Form.Item>
							<Button type='primary' htmlType='submit'>
								Подтвердить
							</Button>
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</div>
	);
};

export default CreateList;
