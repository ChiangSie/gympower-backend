<template>
  <section class="backendpage">
    <aside>
      <div class="logo">
        <img src="#" alt="" />
      </div>
      <h2>後台管理</h2>
      <nav>
        <router-link to="/backstage">後台人員管理</router-link>
        <hr />
        <router-link to="/memberaccount">會員帳號管理</router-link>
        <hr />
        <router-link to="/fitnessdiary">健身日記管理</router-link>
        <hr />
        <router-link to="/discount">優惠代碼管理</router-link>
        <hr />
        <router-link to="/popcoures">熱門課程管理</router-link>
        <hr />
        <router-link to="/course">課程資訊管理</router-link>
        <hr />
        <router-link to="/bento">餐盒訂單管理</router-link>
        <hr />
        <router-link to="/bentocontent">餐點管理</router-link>
        <hr />
        <router-link to="/coach">教練管理</router-link>
        <hr />
        <router-link to="/customserv">客服管理</router-link>
      </nav>
    </aside>
    <main>
      <router-view />
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
    border: 1px black solid;
    text-align: center;
    .logo {
      width: 90%;
      aspect-ratio: 2/1;
      margin: 15px auto;
      img {
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
      }
    }
  }
  main {
    width: calc(83% - 10px);
    border: 1px black solid;
    .loginaccount {
      width: 100%;
      padding: 20px;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-self: center;
    }
  }
}
</style>
