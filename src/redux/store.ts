import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import userReducer from './userSlice';

/*
Cấu hình store Redux với các reducer.
- reducer: là đối tượng chứa tất cả các slice reducer cần thiết cho store.
- counter: phần trạng thái ứng dụng quản lý giá trị của counter, sử dụng counterReducer.
- users: phần trạng thái ứng dụng quản lý danh sách người dùng, sử dụng userReducer.
*/
const store = configureStore({
  reducer: {
    counter: counterReducer, // Gán reducer counter vào phần state có tên là counter
    users: userReducer, // Gán reducer user vào phần state có tên là users
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;