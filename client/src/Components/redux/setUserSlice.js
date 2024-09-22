import { createSlice } from "@reduxjs/toolkit";
const initialState=
{
    user: localStorage.getItem('user'),
}
console.log("🚀 ~ initialState:", initialState)

 
const setUserFunc =(state,action)=>
{
  state.user = action.payload;
}
const clearUserFunc = (state,action)=>
{
    state.user={};
}

export const userSlice= createSlice(
    {
        name :'userInfo',
        initialState,
        reducers:
        {
            // state -> current state
            // action -> data sent by components
            setUser : setUserFunc,
            clearUser : clearUserFunc
        }
    }
)
export const {setUser,clearUser}=userSlice.actions
export default userSlice.reducer