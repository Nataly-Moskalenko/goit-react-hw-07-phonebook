import { fetchContacts, addContact, deleteContact } from './operations';
import { createSlice } from '@reduxjs/toolkit';

const contactsInitialState = {
  items: [],
  status: 'idle',  
  error: null,
};

const handleRejected = (state, action) => {
  state.status = 'rejected';  
  state.error = action.payload;
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchContacts.pending, state => {       
        state.status = 'loading';
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {        
        state.status = 'fulfilled';
        state.error = null;
        state.items = action.payload;
      })
      .addCase(fetchContacts.rejected, handleRejected)
      .addCase(addContact.pending, state => {       
        state.status = 'adding';
      })
      .addCase(addContact.fulfilled, (state, action) => {        
        state.status = 'fulfilled';
        state.error = null;
        state.items = [action.payload, ...state.items];
      })
      .addCase(addContact.rejected, handleRejected)
      .addCase(deleteContact.pending, state => {        
        state.status = 'deleting';
      })
      .addCase(deleteContact.fulfilled, (state, action) => {        
        state.status = 'fulfilled';
        state.error = null;
        const index = state.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.items.splice(index, 1);
      })
      .addCase(deleteContact.rejected, handleRejected);
  },
});

export const contactsReducer = contactsSlice.reducer;
