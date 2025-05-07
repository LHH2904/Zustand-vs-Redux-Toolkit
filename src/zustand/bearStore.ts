import {create} from "zustand";
import { devtools } from 'zustand/middleware';
type TBearStoreState = {
    bears: number,
    increasePopulation: () => void,
    removeAllBears: () => void,
}

export const useBearStore = create<TBearStoreState>()(
    devtools((set) => ({
        bears: 0,

        increasePopulation: () =>
            set(
                (state) => ({ bears: state.bears + 1 }),
                false,
                'increasePopulation' // 👈 tên action hiển thị trong devtools
            ),

        removeAllBears: () =>
            set({ bears: 0 }, false, 'removeAllBears'), // 👈 tên action hiển thị trong devtools
    }),{
        enabled: true,
        name: 'BearStore',
    })
);