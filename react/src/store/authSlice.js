import {createSlice} from '@reduxjs/toolkit'
import {getTokenFromLocalStorage, getUserFromLocalStorage, logout, removeUserFromLocalStorage} from "../api/auth";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
    token: getTokenFromLocalStorage(),
    user: getUserFromLocalStorage(),
  },
  reducers: {
    setUser(state, data) {
      const payload = data.payload
      state.token = payload.token || getTokenFromLocalStorage() || null
      state.user = payload.user || null
      state.isLoggedIn = !(!state.token || !state.user)
    },
    user(state, data) {
      const payload = data.payload
      state.token = getTokenFromLocalStorage() || null
      state.user = payload || null
      state.isLoggedIn = !(!state.token || !state.user)
    },
    removeUser: (state) => {
      logout().then(response => {
        if (response.message === 'success') {
          removeUserFromLocalStorage()
          state.token = null
          state.user = null
          state.isLoggedIn = false
        }
      })
    },
  },
})

export const {setUser, removeUser, user} = authSlice.actions

/*export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}*/

export const selectUser = (state) => state.user.value

export default authSlice.reducer
