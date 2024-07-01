<template>
  <section class="fd">
    <h2>健身日記檢舉</h2>
    <div class="fdtop">
      <div class="fd_filter">
        <button @click="filter('')">全部</button>
        <button @click="filter('已下架')">已下架</button>
        <button @click="filter('未處理')">未處理</button>
        <button @click="filter('已處理')">已處理</button>
      </div>
      <Input
        class="search-input"
        search
        enter-button
        placeholder="搜尋"
        style="width: 300px; height: 16px"
        v-model="search"
      />
    </div>
    <hr />
    <Table size="small" :columns="columns" :data="searchedList">
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
      <template #r_finish="{ row }">
        <Switch size="large" v-model="row.r_finish">
          <template #open>
            <span>已處理</span>
          </template>
          <template #close>
            <span>未處理</span>
          </template>
        </Switch>
      </template>
    </Table>
  </section>
</template>

<script>
export default {
  data() {
    return {
      search: '',
      searchedList: [],
      DiaryData: [],
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
        },
        {
          title: '處理',
          key: 'r_finish',
          slot: 'r_r_finish',
          align: 'center'
        }
      ]
    }
  },
  methods: {
    updateSearchedList() {
      if (this.search.trim() === '') {
        this.searchedList = this.DiaryData
      } else {
        this.searchedList = this.DiaryData.filter(
          (diary) =>
            diary.r_time.toString().includes(this.search) ||
            diary.r_name.includes(this.search) ||
            diary.r_type.includes(this.search) ||
            diary.r_reason.includes(this.search) ||
            diary.r_title.includes(this.search)
        )
      }
    }
  },
  watch: {
    search: 'updateSearchedList'
  },
  mounted() {
    fetch(`${import.meta.env.BASE_URL}diary.json`)
      .then((res) => res.json())
      .then((json) => {
        this.DiaryData = json.map((item) => ({
          ...item,
          r_status: parseInt(item.r_status)
        }))
        this.updateSearchedList()
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
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
    height: 60px;
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
      margin: auto 0;
    }
  }
}
</style>
