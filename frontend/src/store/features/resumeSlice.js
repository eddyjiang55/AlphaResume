import { createSlice } from '@reduxjs/toolkit';

const resumeSlice = createSlice({
    name: 'resume',
    initialState: {
        resumeVisible: false,
        cards: [] ,// 存储 ResumeCard 的数据
        userDetails: null // 存储用户详情数据
    },
    reducers: {
        toggleResume: state => {
            state.resumeVisible = !state.resumeVisible;
        },
        addResumeCard: (state, action) => {
            state.cards.push(action.payload);
          },
        setResumeCards: (state, action) => {
            state.cards = action.payload;
          },
        setUserDetail: (state, action) => {
            state.userDetails = action.payload;
          },
        deleteResumeCard: (state, action) => {
            state.cards = state.cards.filter(card => card.id !== action.payload);
          }
    }
});

export const { toggleResume ,addResumeCard,setResumeCards,deleteResumeCard} = resumeSlice.actions;
export default resumeSlice.reducer;
