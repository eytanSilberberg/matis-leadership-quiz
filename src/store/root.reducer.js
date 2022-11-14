// import { configureStore } from '@reduxjs/toolkit';
import { configureStore } from '@reduxjs/toolkit'
import { questionReducer } from './questions/question.reducer'


export const store = configureStore({
  reducer: {
    questionModule: questionReducer
  }
})

window.myStore = store