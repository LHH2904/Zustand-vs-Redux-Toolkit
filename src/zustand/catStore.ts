import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';
import {createSelectors} from "../utils/createSelectors";
import {devtools, persist} from "zustand/middleware";

type TCatStoreState = {
    cats: {
        bigCats: number;
        smallCats: number;
    };
    increaseBigCats: () => void;
    increaseSmallCats: () => void;
    summary: () => void;
};

// Cập nhật kiểu store để đảm bảo TypeScript hiểu middleware immer
export const useCatStore = createSelectors(create<
    TCatStoreState,
    [
        ['zustand/persist', unknown],
        ["zustand/devtools", never],
        ["zustand/immer", never]
    ]
>(
    persist(
        devtools(
            immer((set, get) => ({
                cats: {
                    bigCats: 0,
                    smallCats: 0,
                },

                increaseBigCats: () => {
                    set((state) => {
                        state.cats.bigCats++;
                    }, false, 'increaseBigCats');
                },

                increaseSmallCats: () => {
                    set((state) => {
                        state.cats.smallCats++;
                    }, false, 'increaseSmallCats');
                },

                summary: () => {
                    const total = get().cats.bigCats + get().cats.smallCats;
                    return `There are ${total} cats in total.`;
                },
            })),
            {
                name: 'CatStore', // Tên hiển thị trong Redux DevTools
            }
        ), {
            name: 'cat-storage', // localStorage key
            //chỉ lưu phần cần thiết
            partialize: (state) => ({cats: state.cats}),
        }
    )
));


