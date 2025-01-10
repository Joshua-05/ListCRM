import { IProductList, ListStore, PublicListStore } from 'src/types/ListStore';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useListStore = create<ListStore>()(
	persist(
		(set, get) => ({
			listStore: [],
			addList: (lists: IProductList[]) => {
				const { listStore } = get();

				const existingIds = new Set(listStore.map(item => item.id));

				const uniqueList = lists.filter(item => !existingIds.has(item.id));

				set({
					listStore: [...listStore, ...uniqueList],
				});
			},
			resetList: () => set({ listStore: [] }),

			deleteList: (listId: number) => {
				const { listStore } = get();
				set({
					listStore: listStore.filter(item => item.id !== listId),
				});
			},
		}),
		{
			name: 'UserStore',
			version: 1,
		}
	)
);

export const usePublicListStore = create<PublicListStore>((set, get) => ({
	publicListStore: [],
	addList: (lists: IProductList[]) => {
		const { publicListStore } = get();

		const existingIds = new Set(publicListStore.map(item => item.id));

		const uniqueList = lists.filter(item => !existingIds.has(item.id));

		set({
			publicListStore: [...publicListStore, ...uniqueList],
		});
	},
	resetList: () => set({ publicListStore: [] }),
}));
