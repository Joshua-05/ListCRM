export interface ListStore {
	listStore: IProductList[];
	addList: (productList: IProductList[]) => void;
	resetList: () => void;
	deleteList: (listId: number) => void;
}

export interface PublicListStore {
	publicListStore: IProductList[];
	addList: (productList: IProductList[]) => void;
	resetList: () => void;
}

export interface IProductList {
	id: number;
	title: string;
	userId: number;
	products: IProduct[];
	access: boolean;
	createdAt: string;
}

export interface IProduct {
	name: string;
	quantity: string;
	price: number;
}
