import {useBearStore} from "../../zustand/bearStore.ts";

export const Bearbox= () => {
    // const bears = useBearStore(state => state.bears);
    // const increasePopulation = useBearStore(state => state.increasePopulation);
    // const removeAllBears = useBearStore(state => state.removeAllBears);

    const {bears, increasePopulation, removeAllBears} = useBearStore();
    return (
        <div className='box'>
            <h1>Bear Box</h1>
            <p>bears: {bears}</p>
            <div>
                <button onClick={increasePopulation}>add bear</button>
                <button onClick={removeAllBears}>remove bear</button>
                <button onClick={useBearStore.persist.clearStorage}>clear storage bear</button>
            </div>
        </div>
    );
}

