import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './features/resumeSlice';
import userReducer from './slices/userSlice'; // 添加 userSlice

const store = configureStore({
    reducer: {
        resume: resumeReducer,
        user: userReducer // 添加 user reducer
    }
});

export default store;
