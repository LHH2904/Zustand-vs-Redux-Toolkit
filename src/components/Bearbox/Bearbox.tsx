import {useBearStore} from "../../zustand/bearStore.ts";
import {useFoodStore} from "../../zustand/foodStore.ts";
import {useEffect, useState} from "react";
import {shallow} from "zustand/vanilla/shallow";

export const Bearbox = () => {
    // const bears = useBearStore(state => state.bears);
    // const increasePopulation = useBearStore(state => state.increasePopulation);
    // const removeAllBears = useBearStore(state => state.removeAllBears);

    const {bears, increasePopulation, removeAllBears} = useBearStore();
    // const fish = useFoodStore(state => state.fish);

    const [bgColor, setBgColor] = useState<"lightgreen" | "lightpink">("lightpink");

    useEffect(() => {
        // // Đăng ký subscribe để theo dõi thay đổi trong store food
        // const unsub = useFoodStore.subscribe(
        //     (state, prevState) => {
        //         console.log(state, prevState); // In ra trạng thái hiện tại và trạng thái trước đó
        //         // Kiểm tra nếu giá trị fish thay đổi qua ngưỡng 5
        //         if (prevState.fish <= 5 && state.fish > 5) {
        //             setBgColor("lightgreen"); // Nếu fish đã vượt quá 5, đổi màu nền thành lightgreen
        //         } else if (prevState.fish > 5 && state.fish <= 5) {
        //             setBgColor("lightpink"); // Nếu fish giảm xuống <= 5, đổi màu nền thành lightpink
        //         }
        //     },
        // );
        //
        // // Cleanup khi component bị unmount
        // return unsub;
        const unsub = useFoodStore.subscribe(
            state => state.fish,
            (fish, prevFish) => {
                if (prevFish <= 5 && fish > 5) {
                    setBgColor("lightgreen"); // Nếu fish vượt qua 5, đổi màu nền thành lightgreen
                } else if (prevFish > 5 && fish <= 5) {
                    setBgColor("lightpink"); // Nếu fish <= 5, đổi màu nền thành lightpink
                }
            },
            {
                equalityFn: shallow, // So sánh shallow (chỉ so sánh giá trị của "fish")
                fireImmediately: true // Gọi callback ngay khi đăng ký (không cần chờ thay đổi)
            } // Dùng shallow so sánh và fireImmediately để nhận giá trị ngay lập tức
        );

        // Cleanup khi component bị unmount
        return unsub;
    }, []);


    return (
        <div className='box' style={{backgroundColor: bgColor}}>
            <h1>Bear Box</h1>
            <p>bears: {bears}</p>
            <p>{Math.random()}</p>
            <div>
                <button onClick={increasePopulation}>add bear</button>
                <button onClick={removeAllBears}>remove bear</button>
                <button onClick={useBearStore.persist.clearStorage}>clear storage bear</button>
            </div>
        </div>
    );
}

