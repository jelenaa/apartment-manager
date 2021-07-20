export const state = () => ({
  apartments: [],
  apartmentModalDisplay: false,
  confirmationModalDisplay: false,
  selectedApartment: {}
})

export const getters = {
  apartments (state) {
    return state.apartments
  },
  confirmationModalDisplay (state) {
    return state.confirmationModalDisplay
  },
  apartmentModalDisplay (state) {
    return state.apartmentModalDisplay
  },
  selectedApartment (state) {
    return state.selectedApartment
  }
}

export const mutations = {
  ADD_APARTMENT (state, item) {
    const { apartments } = state
    apartments.push(item)
    state.apartments = apartments
  },
  DELETE_APARTMENT (state, item) {
    state.apartments.splice(state.apartments.indexOf(item), 1)
  },
  TOGGLE_CONFIRMATION_MODAL (state) {
    state.confirmationModalDisplay = !state.confirmationModalDisplay
  },
  TOGGLE_APARTMENT_DIALOG (state) {
    state.apartmentModalDisplay = !state.apartmentModalDisplay
  },
  SET_SELECTED_APARTMENT (state, apartment) {
    state.selectedApartment = apartment || {}
  },
  SET_APARTMENTS (state, apartments) {
    state.apartments = apartments || []
  }
}

export const actions = {
  toggleConfirmationModal ({ commit }) {
    commit('TOGGLE_CONFIRMATION_MODAL')
  },
  toggleApartmentDialog ({ commit }) {
    commit('TOGGLE_APARTMENT_DIALOG')
  },
  setSelectedApartment ({ commit }, apartment) {
    commit('SET_SELECTED_APARTMENT', apartment)
  },
  deleteApartment ({ commit, getters }) {
    commit('DELETE_APARTMENT', getters.selectedApartment)
    commit('SET_SELECTED_APARTMENT')
  },
  setApartments ({ commit }, apartments) {
    commit('SET_APARTMENTS', apartments)
  },
  addApartment ({ commit }, apartment) {
    commit('ADD_APARTMENT', apartment)
  },
  editApartment ({ commit, getters }, { index, apartment }) {
    const items = getters.apartments
    items[index] = apartment
    commit('SET_APARTMENTS', items)
  }
}
