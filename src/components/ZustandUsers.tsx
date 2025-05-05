import useUserStore from '../zustand/userStore';
import { useEffect, useState } from 'react';

function ZustandUsers() {
    // Lấy dữ liệu và hàm từ Zustand store
    // - users: danh sách người dùng
    // - loading: trạng thái loading khi gọi API
    // - error: lỗi nếu có
    // - fetchUsers: hàm gọi API lấy danh sách người dùng
    // - addUser: hàm thêm người dùng mới
    const { users, loading, error, fetchUsers, addUser } = useUserStore();
    const [name, setName] = useState('');

    /*
    useEffect được gọi khi component mount lần đầu
    - Gửi action fetchUsers để lấy danh sách người dùng từ API
    - Chỉ chạy một lần vì dependency array chỉ chứa fetchUsers
     */
    useEffect(() => {
        fetchUsers().then();
    }, [fetchUsers]);

    /*
       Xử lý sự kiện khi người dùng nhấn nút "Add User"
       - Kiểm tra input name không rỗng
       - Gửi action addUser với dữ liệu tên người dùng mới
       - Reset ô input sau khi thêm
     */
    const handleAdd = async () => {
        if (name.trim()) {
            await addUser({ name }); // Đợi addUser chạy xong (nếu muốn)
            setName('');
        }
    };

    return (
        <div>
            <h2>Zustand Users</h2>
            <ul>
                {users.map((user) => (
                    <li key={user.id}>{user.name}</li>
                ))}
            </ul>

            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <div style={{ marginBottom: '1rem' }}>
                <input
                    type="text"
                    placeholder="Enter name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button onClick={handleAdd}>Add User</button>
            </div>
        </div>
    );
}

export default ZustandUsers;
