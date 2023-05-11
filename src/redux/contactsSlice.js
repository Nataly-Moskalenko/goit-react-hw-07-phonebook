import { fetchContacts, addContact, deleteContact } from './operations';
import { createSlice } from '@reduxjs/toolkit';

const contactsInitialState = {
  items: [],
  isLoading: false,
  isDeleting: false,
  isAdding: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {
        state.isLoading = true;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleting = false;
        state.isAdding = false;
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleting = false;
        state.isAdding = false;
        state.error = action.payload;
      })
      .addCase(addContact.pending, state => {
        state.isLoading = false;
        state.isAdding = true;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleting = false;
        state.isAdding = false;
        state.error = null;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleting = false;             
        state.isAdding = false;
        state.error = action.payload;
      })
      .addCase(deleteContact.pending, state => {
        state.isLoading = false;
        state.isDeleting = true;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isDeleting = false;
        state.isAdding = false;
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.isLoading = false;
        state.isDeleting = false;      
        state.error = action.payload;
      });
  },
});

export const contactsReducer = contactsSlice.reducer;
