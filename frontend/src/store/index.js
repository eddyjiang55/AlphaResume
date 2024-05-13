
import { configureStore } from '@reduxjs/toolkit';
import resumeReducer from './features/resumeSlice'; 

const store = configureStore({
    reducer: {
        resume: resumeReducer,  
    }
});

export default store;
