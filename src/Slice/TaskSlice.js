import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  value: []
}

export const TaskSlice = createSlice({
    name:'task',
    initialState,
    reducers :{
        AddTask : (state, action) => {
            state.value = action.payload;
        },
        UpdateTask: (state, action) => {
            state.value = state.value.map(task =>
                task.id === action.payload.id ? action.payload : task
            );
        },
        DeleteTask: (state, action) => {
            state.value = action.payload;
        }
    },
})

export const { AddTask, UpdateTask, DeleteTask } = TaskSlice.actions

export default TaskSlice.reducer