
import CatBox from "./components/Bearbox/CatBox";
import {Catbox2} from "./components/Bearbox/Catbox2";
import CatController from "./components/Bearbox/CatController";
import {Bearbox} from "./components/Bearbox/Bearbox.tsx";
import {FoodBox} from "./components/Foodbox/FoodBox.tsx";

function App() {
    return (
        <div className="container">
            <h1>Zustand tutorial</h1>
            <div>
                <Bearbox/>
                <FoodBox/>
            </div>
            {/*<div>*/}
            {/*    <CatBox/>*/}
            {/*    <Catbox2/>*/}
            {/*    <CatController/>*/}
            {/*</div>*/}
        </div>
    );
}

export default App;