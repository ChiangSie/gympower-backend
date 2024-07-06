import { defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', {
  state: () => ({
    currentUser: null
  }),
  actions: {
    setCurrentUser(user) {
      this.currentUser = user
      localStorage.setItem('currentUser', JSON.stringify(user)) // 保存到本地存儲
    },
    loadCurrentUser() {
      const user = JSON.parse(localStorage.getItem('currentUser'))
      if (user) {
        this.currentUser = user
      }
    },
    clearCurrentUser() {
      this.currentUser = null
      localStorage.removeItem('currentUser')
    }
  }
})
