import {useCatStore} from "../../zustand/catStore";

const CatBox = () => {
    // ✅ Lấy toàn bộ state và action từ store bằng destructuring
    // ❗ Điều này khiến component sẽ re-render mỗi khi *bất kỳ phần nào* của store thay đổi
    const {
        cats:{ bigCats,smallCats },
        increaseBigCats,
        increaseSmallCats,
        summary
    } = useCatStore();

    // ✅ Mỗi lần component render lại, summary() sẽ được gọi
    console.log(summary());

    return (
        <div className="box">
            <h1>Cat Box</h1>
            <p>Big cats: {bigCats}</p>
            <p>Small cats: {smallCats}</p>
            {/* Dòng này dùng để kiểm tra component có re-render không */}
            <p>{Math.random()}</p>
            <div>
                <button onClick={increaseBigCats}>add big cats</button>
                <button onClick={increaseSmallCats}>add small cats</button>
            </div>
        </div>
    );
};

export default CatBox;