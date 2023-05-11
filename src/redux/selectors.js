export const selectContacts = state => state.contacts.items;

export const selectIsLoading = state => state.contacts.isLoading;

export const selectIsAdding = state => state.contacts.isAdding;

export const selectIsDeleting = state => state.contacts.isDeleting;

export const selectError = state => state.contacts.error;

export const selectFilter = state => state.filter;
