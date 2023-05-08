import { fetchContacts, addContact, deleteContact } from './operations';
import { createSlice } from '@reduxjs/toolkit';
// import { createSlice, nanoid } from '@reduxjs/toolkit';

const contactsInitialState = {
  items: [],
  isLoading: false,
  error: null,
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: contactsInitialState,
  reducers: {},
  extraReducers: {
    [fetchContacts.pending](state) {
      state.isLoading = true;
    },
    [fetchContacts.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items = action.payload;
    },
    [fetchContacts.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [addContact.pending](state) {
      state.isLoading = true;
    },
    [addContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      state.items.push(action.payload);
      // prepare(values) {
      //   return {
      //     payload: {
      //       id: nanoid(),
      //       name: values.name,
      //       phone: values.number,
      //     },
      //   };
      // },
    },
    [addContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    [deleteContact.pending](state) {
      state.isLoading = true;
    },
    [deleteContact.fulfilled](state, action) {
      state.isLoading = false;
      state.error = null;
      const index = state.items.findIndex(
        task => task.id === action.payload.id
      );
      state.items.splice(index, 1);
    },
    [deleteContact.rejected](state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});
// reducers: {
//   fetchingInProgress(state) {
//     state.isLoading = true;
//   },
//   fetchingSuccess(state, action) {
//     state.isLoading = false;
//     state.error = null;
//     state.items = action.payload;
//   },
//   fetchingError(state, action) {
//     state.isLoading = false;
//     state.error = action.payload;
//   },

//   addContact: {
//     reducer(state, action) {
//       return (state = [action.payload, ...state.items]);
//     },
//     prepare(values) {
//       return {
//         payload: {
//           id: nanoid(),
//           name: values.name,
//           phone: values.number,
//         },
//       };
//     },
//   },

//   deleteContact(state, action) {
//     return state.items.filter(contact => contact.id !== action.payload);
//   },
//   // },
// });

// export const { addContact, deleteContact } = contactsSlice.actions;
// export const { fetchingInProgress, fetchingSuccess, fetchingError } =
// contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
