import {createSlice} from '@reduxjs/toolkit';

export const connectivitySlice = createSlice({
  name: 'connectivity',
  initialState: {
    isConnected: true,
  },
  reducers: {
    setConnectivity: (state, action) => {
      state.isConnected = action.payload;
    },
  },
});

export const {setConnectivity} = connectivitySlice.actions;

export default connectivitySlice.reducer;
