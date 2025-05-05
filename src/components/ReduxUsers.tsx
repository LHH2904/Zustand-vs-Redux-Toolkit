/*
Component ReduxUsers sử dụng Redux để quản lý trạng thái người dùng.
- Dùng useSelector để truy cập vào dữ liệu người dùng, trạng thái loading và lỗi từ Redux store.
- Dùng useDispatch để dispatch các action fetchUsers và addUser.
- Dùng useState để quản lý giá trị của ô input trong form thêm người dùng.
*/
import {useEffect, useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addUser, fetchUsers} from '../redux/userSlice';
import type {RootState, AppDispatch} from '../redux/store';

function ReduxUsers() {
    // Sử dụng useSelector để lấy dữ liệu từ Redux store
    // users: danh sách người dùng, loading: trạng thái loading, error: thông báo lỗi (nếu có)
    const {users, loading, error} = useSelector((state: RootState) => state.users);
    // Sử dụng useDispatch để lấy dispatch function để gửi action tới Redux store
    const dispatch = useDispatch<AppDispatch>();

    // Quản lý trạng thái input form (tên người dùng)
    const [name, setName] = useState('');

    /*
    useEffect được gọi khi component mount lần đầu
    - Gửi action fetchUsers để lấy danh sách người dùng từ API
    - Chỉ chạy một lần vì dependency array chỉ chứa dispatch (luôn ổn định)
     */
    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    /*
       Xử lý sự kiện khi người dùng nhấn nút "Add User"
       - Kiểm tra input name không rỗng
       - Gửi action addUser với dữ liệu tên người dùng mới
       - Reset ô input sau khi thêm
     */
    const handleAdd = () => {
        if (name.trim()) {
            dispatch(addUser({name}));
            setName('');
        }
    };

    return (
        <div>
            <h2>Redux Users</h2>
            {loading && <p>Loading...</p>}
            {error && <p style={{color: 'red'}}>{error}</p>}
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={handleAdd}>Add User</button>
        </div>
    );
}

export default ReduxUsers;