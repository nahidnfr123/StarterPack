import {createSlice} from '@reduxjs/toolkit'
import {logout} from "../services/auth.service.js";
import accessToken from "../services/token.service";

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: !!(accessToken()),
    token: accessToken(),
    user: {},
  },
  reducers: {
    setTokenUser(state, data) {
      const payload = data.payload
      state.token = accessToken(payload.token)
      state.user = payload.user || null
      state.isLoggedIn = !!(state.token && state.user && Object.keys(state.user).length)
    },
    setUser(state, data) {
      const payload = data.payload
      console.log(data.payload)
      state.token = accessToken() || null
      state.user = payload || null
      state.isLoggedIn = !!(state.token && state.user && Object.keys(state.user).length)
    },
    removeUser: (state) => {
      logout().then(response => {
        if (response.message === 'success') {
          accessToken(null, true)
          unsetUser()
        }
      })
    },
    unsetUser: (state) => {
      state.token = null
      state.user = null
      state.isLoggedIn = false
    }
  },
})

export const {setTokenUser, setUser, removeUser, unsetUser} = authSlice.actions

/*export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount))
  }, 1000)
}*/

export const selectUser = (state) => state.user.value

export default authSlice.reducer
