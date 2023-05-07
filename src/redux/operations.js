import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';
// import {
//   fetchingInProgress,
//   fetchingSuccess,
//   fetchingError,
// } from "./contactsSlice";

axios.defaults.baseURL =
  'https://64579cc11a4c152cf98605f9.mockapi.io/phonebook';

export const fetchContacts = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('/contacts');
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

// export const fetchContacts = () => async dispatch => {
//   try {
//     dispatch(fetchingInProgress());
//     const response = await axios.get("/contacts");
//     dispatch(fetchingSuccess(response.data));
//   } catch (e) {
//     dispatch(fetchingError(e.message));
//   }
// };
