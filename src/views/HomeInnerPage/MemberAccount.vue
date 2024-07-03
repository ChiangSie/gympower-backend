<template>
  <section>
    <h2>會員帳號管理</h2>
    <div class="memtop">
      <Input
        class="search-input"
        search
        enter-button
        placeholder="搜尋"
        v-model="search"
        style="width: 300px; height: 16px"
      />
    </div>
    <hr />
    <Table size="medium" :columns="columns" :data="searchedList" border>
      <template #mem_id="{ row }">
        <strong>{{ row.mem_id }}</strong>
      </template>
      <template #mem_name="{ row }">
        <strong>{{ row.mem_name }}</strong>
      </template>
      <template #mem_phone="{ row }">
        <strong>{{ row.mem_phone }}</strong>
      </template>
      <template #mem_img="{ row }">
        <strong>{{ row.mem_img }}</strong>
      </template>
      <template #mem_email="{ row }">
        <strong>{{ row.mem_email }}</strong>
      </template>
      <template #mem_status="{ row }">
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          :disabled="!row.isEditing"
          :true-value="1"
          :false-value="0"
          v-model="row.mem_status"
        />
      </template>
      <template #mem_operate="{ row }">
        <div v-if="row.isEditing">
          <!-- 儲存按鈕 -->
          <button class="noneborder" @click="saveMember(row)">
            <i class="fa-regular fa-floppy-disk"></i>
          </button>
        </div>
        <div v-else>
          <!-- 編輯按鈕 -->
          <button class="noneborder" @click="editMember(row)">
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
      memberData: [],
      editMemberData: {
        status: ''
      },
      columns: [
        {
          title: '會員編號',
          key: 'mem_id',
          align: 'center',
          fixed: 'left',
          width: 150
        },
        {
          title: '會員姓名',
          key: 'mem_name',
          slot: 'mem_name',
          align: 'center',
          width: 200
        },
        {
          title: '會員手機',
          key: 'mem_phone',
          slot: 'mem_phone',
          align: 'center',
          width: 200
        },
        {
          title: '會員頭像',
          key: 'mem_img',
          slot: 'mem_img',
          align: 'center',
          width: 200
        },
        {
          title: '電子信箱',
          key: 'mem_email',
          slot: 'mem_email',
          align: 'center',
          width: 250
        },
        {
          title: '狀態',
          key: 'mem_status',
          slot: 'mem_status',
          align: 'center',
          width: 100
        },
        {
          title: '編輯',
          key: 'mem_operate',
          slot: 'mem_operate',
          align: 'center',
          width: 100
        }
      ]
    }
  },
  mounted() {
    this.fetchData()
    // fetch(`${import.meta.env.BASE_URL}member.json`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.memdata = json.map((item) => ({
    //       ...item,
    //       mem_status: parseInt(item.mem_status)
    //     }))
    //     this.updateSearchedList()
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error)
    //   })
  },
  methods: {
    fetchData() {
      fetch('http://localhost/api/get_member.php', {
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
            this.memberData = json.data.list.map((item) => ({
              ...item,
              mem_status: parseInt(item.mem_status)
            }))
            this.updateSearchedList() // <--- Add this line
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
        this.searchedList = this.memberData
      } else {
        this.searchedList = this.memberData.filter(
          (member) =>
            member.mem_id.toString().includes(this.search) ||
            member.mem_name.includes(this.search) ||
            member.mem_phone.includes(this.search) ||
            member.mem_email.includes(this.search)
        )
      }
    },
    editMember(row) {
      // Set the row to editing mode
      row.isEditing = true
      // Initialize the editCoachData with the current row's values
      this.editMemberData.status = row.mem_status
    },
    saveMember(row) {
      // 準備要發送的數據
      const updatedData = {
        mem_id: row.mem_id,
        mem_status: row.mem_status
      }

      // 發送 POST 請求到 PHP 後端
      fetch('http://localhost/api/update_member.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200 || !data.error) {
            // 檢查兩種可能的成功響應
            // 更新成功，更新本地數據
            row.isEditing = false
            this.$Message.success(data.msg || '教練資料更新成功')
          } else {
            // 更新失敗，顯示錯誤信息
            this.$Message.error(data.msg || '更新失敗')
          }
        })
        .catch((error) => {
          console.error('Error:', error)
          this.$Message.error('更新過程中發生錯誤')
        })
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
section {
  width: 100%;
  padding: 20px;
  h2 {
    font-size: 2vw;
  }
  .memtop {
    display: flex;
    justify-content: end;
    margin: 10px 0;
    height: 60px;
    .search-input {
      margin: auto 0;
    }
  }
}
</style>
