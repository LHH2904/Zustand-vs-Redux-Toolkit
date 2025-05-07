import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { createSelectors } from "../utils/createSelectors";

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
        ["zustand/immer", never],
    ]
>(
    immer((set, get) => ({
        cats: {
            bigCats: 0,
            smallCats: 0,
        },

        increaseBigCats: () => {
            set((state) => {
                state.cats.bigCats++; // Sử dụng immer để thay đổi state
            });
        },

        increaseSmallCats: () => {
            set((state) => {
                state.cats.smallCats++; // Sử dụng immer để thay đổi state
            });
        },

        summary: () => {
            const total = get().cats.bigCats + get().cats.smallCats;
            return `There are ${total} cats in total. `;
        },
    }))
));
