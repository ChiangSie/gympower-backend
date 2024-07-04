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
    <Table size="medium" :columns="columns" :data="searchedList" border>
      <template #r_memid="{ row }">
        <strong>{{ row.r_memid }}</strong>
      </template>
      <template #r_time="{ row }">
        <strong>{{ row.r_time }}</strong>
      </template>
      <template #r_type="{ row }">
        <strong>{{ getTypeLabel(row.r_type) }}</strong>
      </template>
      <template #r_reason="{ row }">
        <strong>{{ row.r_reason }}</strong>
      </template>
      <template #r_content="{ row }">
        <strong>{{ row.r_content }}</strong>
      </template>
      <template #r_status="{ row }">
        <Select v-model="row.r_status" style="width: 100px" :disabled="!row.isEditing">
          <Option :value="1">已下架</Option>
          <Option :value="2">未處理</Option>
          <Option :value="3">已處理</Option>
        </Select>
      </template>
      <template #r_operate="{ row }">
        <div v-if="row.isEditing">
          <!-- 儲存按鈕 -->
          <button class="noneborder" @click="saveReport(row)">
            <i class="fa-regular fa-floppy-disk"></i>
          </button>
        </div>
        <div v-else>
          <!-- 編輯按鈕 -->
          <button class="noneborder" @click="editReport(row)">
            <i class="fa-regular fa-pen-to-square"></i>
          </button>
        </div>
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
          title: '檢舉人ID',
          key: 'r_memid',
          slot: 'r_memid',
          align: 'center',
          fixed: 'left',
          width: 150
        },
        {
          title: '檢舉日期',
          key: 'r_time',
          slot: 'r_time',
          align: 'center',
          width: 150
        },
        {
          title: '檢舉類型',
          key: 'r_type',
          slot: 'r_type',
          align: 'center',
          width: 150
        },
        {
          title: '檢舉原因',
          key: 'r_reason',
          slot: 'r_reason',
          align: 'center',
          width: 150
        },
        {
          title: '文章內容',
          key: 'r_Ccontent',
          slot: 'r_content',
          align: 'center',
          width: 500
        },
        {
          title: '狀態',
          key: 'r_status',
          slot: 'r_status',
          align: 'center',
          width: 200
        },
        {
          title: '編輯',
          key: 'r_operate',
          slot: 'r_operate',
          align: 'center',
          width: 100
        }
      ]
    }
  },
  mounted() {
    this.fetchData()
    // fetch(`${import.meta.env.BASE_URL}diary.json`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.DiaryData = json.map((item) => ({
    //       ...item,
    //       r_status: parseInt(item.r_status)
    //     }))
    //     this.updateSearchedList() // Call updateSearchedList here
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error)
    //   })
  },
  methods: {
    fetchData() {
      fetch('http://localhost/api/get_report.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({})
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`)
          }
          return res.json()
        })
        .then((json) => {
          if (json.code === 200) {
            this.DiaryData = json.data.list.map((item) => ({
              ...item,
              r_type: parseInt(item.r_type),
              r_status: parseInt(item.r_status)
            }))
            this.updateSearchedList()
          } else {
            console.error('API返回錯誤:', json.msg)
          }
        })
        .catch((error) => {
          console.error('獲取數據時出錯:', error)
        })
    },
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
    },
    editReport(row) {
      row.isEditing = true
    },
    saveReport(row) {
      row.isUpdating = false
      const updatedData = {
        r_id: row.r_id,
        r_status: row.r_status
      }

      fetch('http://localhost/api/update_report.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            row.isEditing = false
            this.$Message.success('報告狀態更新成功')
          } else {
            this.$Message.error(data.msg || '更新失敗')
            // 如果更新失敗，恢復原來的狀態
            row.r_status = this.DiaryData.find((item) => item.r_id === row.r_id).r_status
          }
        })
        .catch((error) => {
          console.error('Error:', error)
          this.$Message.error('更新過程中發生錯誤')
          // 如果發生錯誤，恢復原來的狀態
          row.r_status = this.DiaryData.find((item) => item.r_id === row.r_id).r_status
        })
        .finally(() => {
          row.isUpdating = false
        })
    }
  },
  computed: {
    getTypeLabel() {
      return (type) => {
        switch (type) {
          case 1:
            return '虛假/不實消息'
          case 2:
            return '未成年不宜'
          case 3:
            return '廣告內容'
          default:
            return ''
        }
      }
    }
  },
  watch: {
    search: 'updateSearchedList'
  }
}
</script>

<style lang="scss" scoped>
.noneborder {
  background-color: transparent;
  border: none;
}
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
