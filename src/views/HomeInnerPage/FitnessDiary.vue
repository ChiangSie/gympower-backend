<template>
  <section class="fd">
    <h2>健身日記檢舉</h2>
    <div class="fdtop">
      <div class="fd_filter">
        <button>全部</button>
        <button>未處理</button>
        <button>已下架</button>
      </div>
      <Input
        class="search-input"
        search
        enter-button
        placeholder="搜尋"
        style="width: 300px; height: 16px"
      />
    </div>
    <hr />
    <Table size="large" :columns="columns" :data="diarydata">
      <template #r_time="{ row }">
        <strong>{{ row.r_time }}</strong>
      </template>
      <template #r_name="{ row }">
        <strong>{{ row.r_name }}</strong>
      </template>
      <template #r_type="{ row }">
        <strong>{{ row.r_type }}</strong>
      </template>
      <template #r_reason="{ row }">
        <strong>{{ row.r_reason }}</strong>
      </template>
      <template #r_title="{ row }">
        <strong>{{ row.r_title }}</strong>
      </template>
      <template #r_status="{ row }">
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          :true-value="1"
          :false-value="0"
          v-model="row.r_status"
        />
      </template>
    </Table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '檢舉日期',
          key: 'r_time',
          slot: 'r_time',
          align: 'center'
        },
        {
          title: '檢舉人',
          key: 'r_name',
          slot: 'r_name',
          align: 'center'
        },
        {
          title: '檢舉類型',
          key: 'r_type',
          slot: 'r_type',
          align: 'center'
        },
        {
          title: '檢舉原因',
          key: 'r_reason',
          slot: 'r_reason',
          align: 'center'
        },
        {
          title: '文章標題',
          key: 'r_title',
          slot: 'r_title',
          align: 'center'
        },
        {
          title: '狀態',
          key: 'r_status',
          slot: 'r_status',
          align: 'center'
        }
      ]
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
.fd {
  width: 100%;
  padding: 20px;
  h2 {
    font-size: 2vw;
  }
  .fdtop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin: 10px 0;
    .fd_filter {
      margin: 20px 0 0 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: end;
      button {
        margin: 0 10px;
        padding: 0 10px;
      }
    }
    .search-input {
      margin: 10px 0;
    }
  }
}
</style>
