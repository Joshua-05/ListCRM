import { IProductList } from 'src/types/ListStore';
import style from './style.module.css';
import { instance } from '@api/axios';
import { useState } from 'react';
import { useListStore } from 'src/store/zustand';

interface IProductListCard {
	list: IProductList;
}

const UserProductListCard = ({ list }: IProductListCard) => {
	const [access, setAccess] = useState<boolean>(list.access);
	// console.log(list);
	
	const deleteListik = useListStore(state => state.deleteList);
	// const userId = list.userId
	// const [author, setAuthor] = useState<string>('author')
	// useEffect(() => {
	//     const fetchAuthor = async() => {
	//         try {
	//             const responce = await instance.post('user/getAuthor', {id : userId})
	//             setAuthor(responce.data)
	//         } catch (error) {
	//             console.log('Problem with find the author', error);
	//         }
	//     }
	//     fetchAuthor()
	// }, [])
	// // console.log(author)
	const formattedDate = new Intl.DateTimeFormat('ru-RU', {
		day: 'numeric',
		month: 'long',
	}).format(new Date(list.createdAt));

	const handlePublicate = async () => {
		const data = {
			id: list.id,
			access: true,
		};
		setAccess(!access);
		try {
			await instance.post('list/update', data);
		} catch (error) {
			console.log(error);
		}
	};

	const handleDelete = async () => {
		try {
			await instance.post('list/delete', { listId: list.id });
			deleteListik(list.id);
		} catch (error) {
			console.log(error);
		}
	};

	// console.log(access);
	

	return (
		<div className={style.card}>
			<h3>{list.title}</h3>
			{list.products.map(item => (
				<p>
					{item.name} {item.quantity} {item.price} руб
				</p>
			))}
			<p>Дата публикации: {formattedDate}</p>
			{access === false ? (
				<button onClick={handlePublicate}>Опубликовать</button>
			) : (
				<span>ОПУБЛИКОВАННО</span>
			)}

			{/* <button>Редактировать</button> */}
			<button onClick={handleDelete}>Удалить</button>
		</div>
	);
};

export default UserProductListCard;
