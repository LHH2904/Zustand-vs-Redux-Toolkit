/*
Sử dụng Redux để quản lý trạng thái counter trong component.
- useSelector: Dùng để truy cập vào state từ Redux store.
- useDispatch: Dùng để dispatch các action lên Redux store.
*/
import {useSelector, useDispatch} from 'react-redux';
import {increment, decrement} from '../redux/counterSlice';
import type {RootState, AppDispatch} from '../redux/store';

function ReduxCounter() {
    // useSelector để truy cập vào state.counter.count từ Redux store
    const count = useSelector((state: RootState) => state.counter.count);
    // useDispatch trả về dispatch function để gửi action tới Redux store
    const dispatch = useDispatch<AppDispatch>();

    return (
        <div>
            <h2>Redux Counter</h2>
            <p>Count: {count}</p>
            <button onClick={() => dispatch(increment())}>+</button>
            <button onClick={() => dispatch(decrement())}>-</button>
        </div>
    );
}

export default ReduxCounter;