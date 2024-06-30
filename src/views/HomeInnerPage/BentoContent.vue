<template>
  <section class="bo">
    <h2>餐點管理</h2>
    <div class="botop">
      <div class="bento_filter">
        <button>主食</button>
        <button>副餐</button>
        <button>蔬菜</button>
        <button>配料</button>
      </div>
      <div class="bento_func">
        <Input class="search-input" search enter-button placeholder="搜尋" style="width: 300px" />
      </div>
    </div>
    <hr />
    <Table size="small" :columns="columns" :data="BoData"></Table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '食材編號',
          key: 'fd_id',
          slot: 'fd_id',
          align: 'center'
        },
        {
          title: '食材名稱',
          key: 'fd_name',
          slot: 'fd_name',
          align: 'center'
        },
        {
          title: '食材內容',
          key: 'fd_con',
          slot: 'fd_con',
          align: 'center'
        },
        {
          title: '食材照片',
          key: 'fd_img',
          slot: 'fd_img',
          align: 'center'
        },
        {
          title: '價格',
          key: 'fd_price',
          slot: 'fd_price',
          align: 'center'
        },
        {
          title: '上架狀態',
          key: 'fd_status',
          slot: 'fd_status',
          align: 'center'
        },
        {
          title: '編輯',
          key: 'fd_operate',
          slot: 'fd_operate',
          align: 'center'
        }
      ],
      BoData: []
    }
  }
}
</script>
<style lang="scss" scoped>
hr {
  width: 100%;
  border-width: 1px;
  border-color: #000000;
  margin: 10px 0;
}
.bo {
  width: 100%;
  padding: 20px;
  h2 {
    font-size: 2vw;
  }
  .botop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    height: 60px;
    .bento_filter {
      margin: 20px 0 0 0;
      button {
        margin: 0 10px;
        padding: 0 10px;
      }
    }
  }
}
</style>
