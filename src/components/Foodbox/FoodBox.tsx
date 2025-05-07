import {useFoodStore} from "../../zustand/foodStore.ts";

export const FoodBox = () => {
    const { fish, addOneFish, removeOneFish, removeAllFish} = useFoodStore()
    return (
        <div className="box">
            <h1>Food Box</h1>
            <p>fish: {fish}</p>
            <div>
                <button onClick={addOneFish}>add 1 fish</button>
                <button onClick={removeOneFish}>remove 1 fish</button>
                <button onClick={removeAllFish}>remove all fish</button>
            </div>
        </div>
    )
}