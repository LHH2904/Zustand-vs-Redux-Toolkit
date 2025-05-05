import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

/*
 Interface định nghĩa cấu trúc của một user
 - id: định danh user
 - name: tên user
*/
interface User {
  id: number;
  name: string;
}

/*
 Interface định nghĩa cấu trúc của slice state
 - users: danh sách người dùng
 - loading: trạng thái loading khi gọi API
 - error: thông báo lỗi (nếu có)
*/
interface UserState {
  users: User[];
  loading: boolean;
  error: string | null;
}

/*
 Thunk bất đồng bộ để lấy danh sách người dùng từ API
 - Trả về: mảng User nếu thành công
 - rejectValue: trả về string nếu có lỗi để xử lý tại reducer
*/
export const fetchUsers = createAsyncThunk<User[], void, { rejectValue: string }>(
    'users/fetchUsers',
    async (_, { rejectWithValue }) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!res.ok) return rejectWithValue(`Failed to fetch: ${res.status}`);
      return res.json();
    }
);

/*
 Thunk bất đồng bộ để thêm một user mới thông qua POST request
 - newUser: thông tin người dùng mới (không có id vì backend sẽ gán)
 - Trả về: user mới được tạo (bao gồm id)
 - rejectValue: trả về string nếu thêm thất bại
*/
export const addUser = createAsyncThunk<User, Omit<User, 'id'>, { rejectValue: string }>(
    'users/addUser',
    async (newUser, { rejectWithValue }) => {
      const res = await fetch('https://jsonplaceholder.typicode.com/users', {
        method: 'POST',
        body: JSON.stringify(newUser),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!res.ok) return rejectWithValue(`Failed to add: ${res.status}`);
      return res.json();
    }
);

/*
 Trạng thái ban đầu của slice user
 - users: rỗng
 - loading: false vì chưa gọi API
 - error: null vì chưa có lỗi
*/
const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
};

/*
 Slice quản lý trạng thái user
 - Tên: 'users'
 - State: initialState
 - Reducers: không dùng vì toàn bộ logic là async
 - ExtraReducers: xử lý các trạng thái của fetchUsers & addUser
*/
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      /*
        Xử lý fetchUsers:
        - pending: bật loading
        - fulfilled: gán danh sách user
        - rejected: lưu lỗi nếu thất bại
      */
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Fetch failed';
      })

      /*
        Xử lý addUser:
        - fulfilled: thêm user mới vào mảng
        - rejected: lưu lỗi nếu thêm thất bại
      */
      .addCase(addUser.fulfilled, (state, action: PayloadAction<User>) => {
          state.users.push(action.payload);
        })
      .addCase(addUser.rejected, (state, action) => {
        state.error = action.payload || 'Add failed';
      });
      }
});

export default userSlice.reducer;