import { createSlice } from '@reduxjs/toolkit';

export const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumeVisible: false,
        cards: [], // 存储 ResumeCard 的数据
        userDetails: null // 存储用户详情数据
    },
    reducers: {
        toggleResume: (state, action) => {
            state.resumeVisible = action.payload;
        },
        addResumeCard: (state, action) => {
            state.cards.push(action.payload);
        },
        setResumeCards: (state, action) => {
            state.cards = action.payload ? action.payload : [];
        },
        setUserDetail: (state, action) => {
            state.userDetails = action.payload;
        },
        deleteResumeCard: (state, action) => {
            state.cards = state.cards.filter(card => card !== action.payload);
        }
    }
});

export const { toggleResume, addResumeCard, setResumeCards, setUserDetail, deleteResumeCard } = resumeSlice.actions;
export const resumeReducer = resumeSlice.reducer;
