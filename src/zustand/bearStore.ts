import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

type TBearStoreState = {
    bears: number;
    increasePopulation: () => void;
    removeAllBears: () => void;
};

export const useBearStore = create<TBearStoreState>()(
    persist(
        devtools(
            (set) => ({
                bears: 0,

                increasePopulation: () =>
                    set(
                        (state) => ({ bears: state.bears + 1 }),
                        false,
                        'increasePopulation'
                    ),

                removeAllBears: () =>
                    set({ bears: 0 }, false, 'removeAllBears'),
            }),
            {
                name: 'BearStore', // Tên trong Redux DevTools
            }
        ),
        {
            name: 'bear-storage', // key lưu trong localStorage
            partialize: (state) => ({ bears: state.bears }), // chỉ lưu dữ liệu, không lưu hàm
        }
    )
);
