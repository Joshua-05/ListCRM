import { instance } from "@api/axios";
import { useEffect, useState } from "react";
import { IProductList } from "src/types/ListStore";
import style from "./style.module.css";

interface IProductListCard {
    list: IProductList;
    setUser: (author: string) => void
}

const PublicProductListCard = ({ list, setUser }: IProductListCard) => {
    const userId = list.userId;
    const [author, setAuthor] = useState<string>('author');
    const [isOpen, setIsOpen] = useState<boolean>(false); // Состояние для управления видимостью продуктов

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await instance.post('user/getAuthor', { id: userId });
                setAuthor(response.data);
            } catch (error) {
                console.log('Problem with finding the author', error);
            }
        };

        fetchAuthor();
    }, [userId]);
    setUser(author)
    // Форматирование даты
    const formattedDate = new Intl.DateTimeFormat('ru-RU', {
        day: 'numeric',
        month: 'long'
    }).format(new Date(list.createdAt));

    return (
        <div className={style.card}>
            <h3>{list.title}</h3>
            <p>Автор: {author}</p>
            <p>Дата публикации: {formattedDate}</p>
            {/* Кнопка для переключения видимости списка */}
            <button onClick={() => setIsOpen(!isOpen)} className={style.toggleButton}>
                {isOpen ? "Скрыть товары" : "Показать товары"}
            </button>
            {isOpen && (
                <div className={style.productList}> {/* Оберните товары в div для стилизации */}
                    {list.products.map(item => (
                        <p key={item.name}> {/* Убедитесь, что используется уникальный ключ */}
                            {item.name} {item.quantity} {item.price} руб.
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};

export default PublicProductListCard;