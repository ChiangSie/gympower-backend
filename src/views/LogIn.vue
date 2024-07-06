<template>
  <section class="backstatelogin">
    <div class="login" id="login">
      <div class="loginpic">
        <img src="/src/assets/img/small logo.png" alt="" />
      </div>
      <form @submit.prevent="adminlogin()">
        <h2>管理員登入</h2>
        <input type="text" name="manid" placeholder="管理員帳號" @blur="checkAcc()" v-model="acc" />
        <input
          type="password"
          name="manpsw"
          placeholder="Password"
          @blur="checkPsw()"
          v-model="psw"
        />
        <button type="submit">登入</button>
      </form>
    </div>
  </section>
</template>

<script>
import apiInstance from '@/plugin/api'
import { useAdminStore } from '/src/stores/admin.js' // 引入 Pinia store

export default {
  data() {
    return {
      acc: '',
      psw: '',
      errorMsg: {
        acc: '',
        psw: ''
      }
    }
  },
  methods: {
    // 確認帳號欄位密碼欄位有輸入值
    checkAcc() {
      if (this.acc === '') {
        this.errorMsg.acc = '*請輸入帳號'
      } else {
        this.errorMsg.acc = ''
      }
    },
    checkPsw() {
      if (this.psw === '') {
        this.errorMsg.psw = '*請輸入密碼'
      } else {
        this.errorMsg.psw = ''
      }
    },
    async adminlogin() {
      try {
        const response = await apiInstance.post('http://localhost/api/admin.php', {
          u_account: this.acc,
          u_psw: this.psw
        })
        if (response.data.code === 1) {
          const adminStore = useAdminStore()
          adminStore.setCurrentUser({
            username: response.data.adminInfo.username,
            // 添加其他需要的用戶信息
            id: response.data.adminInfo.id, // 假設API返回了用戶ID
            role: response.data.adminInfo.role // 假設API返回了用戶角色
          })
          alert('登入成功!')
          this.acc = ''
          this.psw = ''
          this.$router.push('/backstage')
        } else {
          alert(response.data.msg || '帳號或密碼錯誤!')
          this.acc = ''
          this.psw = ''
        }
      } catch (error) {
        console.error('登入失敗:', error)
        alert('登入失敗')
      }
    }
  },
  mounted() {
    // 在組件掛載時檢查是否有存儲的用戶信息
    const adminStore = useAdminStore()
    adminStore.loadCurrentUser()
    if (adminStore.currentUser) {
      // 如果有存儲的用戶信息,直接跳轉到後台頁面
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
