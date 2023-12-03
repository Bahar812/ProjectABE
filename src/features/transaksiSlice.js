import { createSlice } from "@reduxjs/toolkit";

export const transSlice = createSlice({
    name : "transaction",
    initialState : {
        pesanan : "",
        total : 0,
        uuidTransaction: "",
        totalSebelumReset: 0,
    },
    reducers : {
        update: (state, action) =>{
            console.log("Payload:", action.payload); 
            state.pesanan = action.payload.deliveryOption;
            state.total = action.payload.totalfix;
            state.uuidTransaction = action.payload.uuidTransaction;
            state.totalSebelumReset = action.payload.totalbelum;
        }
    }
})

// export const saveStateToLocalStorage = (state) => {
//     localStorage.setItem("reduxState", JSON.stringify(state));
// };


export const {update} = transSlice.actions;
export default transSlice.reducer;