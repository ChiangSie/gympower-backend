<template>
  <section class="backendpage">
    <aside>
      <div class="logo">
        <img src="/src/assets/img/small logo.png" alt="" />
      </div>
      <h2>後台管理</h2>
      <nav>
        <router-link to="/backstage">後台人員管理</router-link>
        <hr />
        <router-link to="/memberaccount">會員帳號管理</router-link>
        <hr />
        <router-link to="/fitnessdiary">健身日記管理</router-link>
        <hr />
        <!-- <router-link to="/discount">優惠代碼管理</router-link>
        <hr /> -->
        <!-- <router-link to="/popcoures">熱門課程管理</router-link>
        <hr /> -->
        <router-link to="/course_content">課程資訊管理</router-link>
        <hr />
        <router-link to="/bento">餐盒訂單管理</router-link>
        <hr />
        <router-link to="/bentocontent">餐點管理</router-link>
        <hr />
        <router-link to="/coach">教練管理</router-link>
        <!-- <hr />
        <router-link to="/customserv">客服管理</router-link> -->
      </nav>
    </aside>
    <main>
      <div class="mangeridshow">
        <!-- <h2>使用者:{{ store.$state.currentAccount }}</h2> -->
        <button class="sign-out" @click="memsignout()">登出</button>
      </div>
      <div class="showplace">
        <router-view />
      </div>
    </main>
  </section>
</template>

<script></script>

<style lang="scss" scoped>
hr {
  width: 90%;
  border-width: 1px;
  border-color: #000000;
  margin: 1px auto;
}
.backendpage {
  width: 100%;
  height: auto;
  padding: 15px 50px;
  display: flex;
  flex-direction: row;
  gap: 10px;
  aside {
    width: 17%;
    max-width: 300px;
    height: 90vh;
    border: 1px black solid;
    text-align: center;
    .logo {
      width: 90%;
      aspect-ratio: 2/1;
      margin: 15px auto;
      img {
        width: 100%;
        aspect-ratio: 2/1;
        object-fit: cover;
        object-position: 50% 50%;
      }
    }
    h2 {
      font-size: 2vw;
    }
    nav {
      width: fit-content;
      border-radius: 15px;
      margin: 15px auto;
      padding: 7%;
      background-color: #d4eaf7;
      height: auto;
      display: flex;
      flex-direction: column;
      a {
        text-decoration: none;
        padding: 10px;
        text-align: left;
        font-size: 1.2vw;
        color: black;
      }
    }
  }
  main {
    width: calc(83% - 10px);
    gap: 5px;
    display: flex;
    flex-direction: column;
    // border: 1px black solid;
    .mangeridshow {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        padding: 0 15px;
        background-color: transparent;
        border: 0.5px black solid;
      }
    }
    .showplace {
      // border: 1px black solid;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
