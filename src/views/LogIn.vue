<template>
  <section class="backstatelogin">
    <div class="login" id="login">
      <div class="loginpic">
        <img src="/src/assets/img/small logo.png" alt="" />
      </div>
      <form @submit.prevent="adminlogin">
        <h2>管理員登入</h2>
        <input type="text" name="manid" placeholder="管理員帳號" @blur="checkAcc" v-model="acc" />
        <input type="password" name="manpsw" placeholder="密碼" @blur="checkPsw" v-model="psw" />
        <button type="submit">登入</button>
      </form>
    </div>
  </section>
</template>

<script>
// 從 stores 文件夾中引入 useAdminStore
import { useAdminStore } from '/src/stores/admin.js'

export default {
  data() {
    return {
      acc: '', // 管理員帳號
      psw: '', // 管理員密碼
      errorMsg: {
        acc: '', // 帳號錯誤訊息
        psw: '' // 密碼錯誤訊息
      }
    }
  },
  methods: {
    // 檢查帳號是否為空
    checkAcc() {
      if (this.acc === '') {
        this.errorMsg.acc = '*請輸入帳號'
      } else {
        this.errorMsg.acc = ''
      }
    },
    // 檢查密碼是否為空
    checkPsw() {
      if (this.psw === '') {
        this.errorMsg.psw = '*請輸入密碼'
      } else {
        this.errorMsg.psw = ''
      }
    },
    // 管理員登入方法
    async adminlogin() {
      try {
        // 發送登入請求到後端 API
        const response = await fetch(`${import.meta.env.VITE_PHP_URL}admin.php`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            u_account: this.acc,
            u_psw: this.psw
          })
        })

        // 解析後端返回的 JSON 數據
        const data = await response.json()

        if (data.code === 1) {
          // 如果返回的 code 為 1，表示登入成功
          const adminStore = useAdminStore()
          adminStore.setCurrentUser({
            id: data.adminInfo.am_id, // 設置當前用戶的 ID
            acc: data.adminInfo.am_acc // 設置當前用戶的帳號
          })
          alert('登入成功!')
          this.acc = ''
          this.psw = ''
          this.$router.push('/backstage') // 導向後台頁面
        } else {
          // 如果返回的 code 不為 1，表示登入失敗，顯示錯誤訊息
          alert(data.msg || '帳號或密碼錯誤!')
          this.acc = ''
          this.psw = ''
        }
      } catch (error) {
        // 處理請求錯誤
        console.error('登入失敗:', error)
        alert('登入失敗')
      }
    }
  },
  mounted() {
    // 組件掛載時檢查是否已登入
    const adminStore = useAdminStore()
    adminStore.loadCurrentUser()
    if (adminStore.currentUser) {
      // 如果已登入，直接導向後台頁面
      this.$router.push('/backstage')
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
