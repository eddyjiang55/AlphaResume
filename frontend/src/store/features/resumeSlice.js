// src/features/resumeSlice.js
import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumeVisible: false
    },
    reducers: {
        toggleResume: state => {
            state.resumeVisible = !state.resumeVisible;
        }
    }
});

export const { toggleResume } = resumeSlice.actions;
export default resumeSlice.reducer;
