<template>
  <section class="backstatelogin">
    <div class="login" id="login">
      <div class="loginpic">
        <img src="/src/assets/img/small logo.png" alt="" />
      </div>
      <form action="#">
        <h2>管理員登入</h2>
        <input type="text" name="manid" placeholder="管理ID" v-model="textData" />
        <input type="password" name="manpsw" placeholder="Password" v-model="pswData" />
        <button @click="manLogin()">登入</button>
      </form>
    </div>
  </section>
</template>

<script>
import { MangerStory } from '/src/stores/MangerStory.js' // 引入 Pinia store

export default {
  data() {
    return {
      // 管理ID輸入框的值
      textData: '',
      // 密碼輸入框的值
      pswData: ''
    }
  },
  methods: {
    async manLogin() {
      try {
        // 獲取 Pinia Store 的實例
        const store = MangerStory()

        // fetch 資料
        const response = await fetch(`${import.meta.env.BASE_URL}public/manger.json`)
        const users = await response.json()

        // 查找用戶
        const loggedInUser = users.find(
          (u) => u.account === this.textData && u.password === this.pswData
        )

        if (loggedInUser) {
          // 設置當前用戶到 Pinia
          store.setCurrentUser(loggedInUser)
          // 重置輸入框值
          this.textData = ''
          this.pswData = ''
          // 跳轉到主頁
          this.$router.push('/home')
        } else {
          // 顯示錯誤訊息
          // 重置輸入框值
          this.textData = ''
          this.pswData = ''
        }
      } catch (error) {
        // 顯示錯誤訊息
        console.error('登入失敗:', error)
        alert('登入失敗')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.backstatelogin {
  width: 100%;
  height: 100vh;
  background-color: #f9f8f7;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(to right, #df944d, #71c4ef);
}

.login {
  border-radius: 30px;
  width: clamp(300px, 60%, 900px);
  min-height: 450px;
  border: 3px solid black;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.614);
}

.loginpic {
  width: 30%;
  aspect-ratio: 2/1;
  img {
    width: 100%;
    aspect-ratio: 2/1;
    object-fit: cover;
    object-position: 50% 50%;
  }
}

.login form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 0 40px;
  width: 50%;
  min-width: 250px;
  height: 100%;
  gap: 5px;
}

.login p {
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  margin: 20px 0;
}

.login button {
  background-color: #002451;
  color: #fff;
  font-size: 12px;
  padding: 5px 20px;
  border: 1px solid transparent;
  border-radius: 8px;
  font-weight: 600;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  margin-top: 10px;
  cursor: pointer;
}

.login input {
  background-color: #eee;
  border: none;
  margin: 8px 0;
  padding: 10px 15px;
  font-size: 13px;
  border-radius: 8px;
  width: 100%;
  outline: none;
}

.sign-in {
  left: 0;
  width: 80%;
  z-index: 2;
}
</style>
