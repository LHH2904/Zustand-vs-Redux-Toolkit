import { create } from 'zustand';

/*
  Interface định nghĩa cấu trúc của đối tượng User
  - id: số định danh của người dùng
  - name: tên người dùng
*/
interface User {
  id: number;
  name: string;
}

/*
  Interface định nghĩa trạng thái lưu trữ của Zustand store
  - users: danh sách người dùng
  - loading: trạng thái đang tải dữ liệu từ API
  - error: thông báo lỗi nếu xảy ra lỗi khi fetch hoặc add
  - fetchUsers: hàm bất đồng bộ để lấy danh sách người dùng
  - addUser: hàm bất đồng bộ để thêm người dùng mới
    + newUser: là đối tượng User nhưng không có trường 'id'
    + Sử dụng Omit<User, 'id'> để loại bỏ thuộc tính 'id' khỏi kiểu User,
      vì khi thêm user mới, ID sẽ do server tự tạo
*/
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
  fetchUsers: () => Promise<void>;
  addUser: (newUser: Omit<User, 'id'>) => Promise<void>;
}

/*
  Tạo Zustand store sử dụng create<UserState>
  - set: hàm để cập nhật state bên trong store
*/
const useUserStore = create<UserState>((set) => ({
  users: [],
  loading: false,
  error: null,

  /*
    Hàm fetchUsers: gọi API để lấy danh sách người dùng
    - Cập nhật trạng thái loading trước khi fetch
    - Nếu thành công: lưu dữ liệu users vào state
    - Nếu lỗi: lưu thông báo lỗi vào state
  */
  fetchUsers: async () => {
    set({ loading: true, error: null });

    const res = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!res.ok) {
      set({ loading: false, error: `Failed to fetch: ${res.status}` });
      return;
    }

    const data: User[] = await res.json();
    set({ users: data, loading: false });
  },

  /*
    Hàm addUser: gửi request POST để thêm người dùng mới
    - Nếu thành công: thêm người dùng vừa tạo vào danh sách users
    - Nếu lỗi: cập nhật thông báo lỗi vào state
  */
  addUser: async (newUser) => {
    const res = await fetch('https://jsonplaceholder.typicode.com/users', {
      method: 'POST',
      body: JSON.stringify(newUser),
      headers: { 'Content-Type': 'application/json' },
    });

    if (!res.ok) {
      set({ error: `Failed to add user: ${res.status}` });
      return;
    }

    const createdUser = await res.json();
    set((state) => ({ users: [...state.users, createdUser] }));
  }
}));

export default useUserStore;