import {useCatStore} from "../../zustand/catStore.ts";

export const Catbox2 = () => {
    // ✅ Chỉ lấy phần `bigCats` từ state bằng selector
    // ➕ Component chỉ re-render nếu `bigCats` thay đổi
    const bigCats = useCatStore((state) => state.cats.bigCats)

    return (
        <div className='box'>
            <h1>Partial States from catStore</h1>
            <p>big cats: {bigCats}</p>
            {/* Dùng để test xem component có render lại không */}
            <p>{Math.random()}</p>
        </div>
    )
}