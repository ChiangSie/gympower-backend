// /src/stores/admin.js
import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    currentUser: null,
    currentUsername: null
  }),
  actions: {
    setCurrentUser(user) {
      this.currentUser = user
      if (user) {
        this.currentUsername = user.username
        localStorage.setItem('currentUser', JSON.stringify(user))
      } else {
        this.currentUsername = null
        localStorage.removeItem('currentUser')
      }
    },
    clearCurrentUser() {
      this.currentUser = null
      this.currentUsername = null
      localStorage.removeItem('currentUser')
    },
    loadCurrentUser() {
      const storedUser = localStorage.getItem('currentUser')
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser)
        this.currentUser = parsedUser
        this.currentUsername = parsedUser.username
      }
    }
  }
})
