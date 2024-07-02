<template>
  <section class="bsm">
    <h2>後台人員管理</h2>
    <div class="bsmtop">
      <button @click="modal2 = true" style="width: 120px; height: 30px">
        <i class="fa-solid fa-plus"></i>新增
      </button>
      <!-- 燈箱 -->
      <Modal
        title="新增後台管理員"
        v-model="modal2"
        :mask-closable="false"
        class-name="vertical-center-modal "
      >
        <div style="display: flex; flex-direction: column; align-items: center; gap: 3px">
          <Space class="addInput" style="position: relative; left: -6px">
            新增管理ID：<Input v-model="addAdminData.id" />
          </Space>
          <Space class="addInput"> 新增帳號：<Input v-model="addAdminData.acc" /> </Space>
          <Space class="addInput">
            新增密碼：<Input type="password" v-model="addAdminData.psw" />
          </Space>
          <Space style="position: relative; right: 14px">
            再次輸入密碼：<Input type="password" v-model="addAdminData.firstpsw" />
          </Space>
        </div>
        <template #footer>
          <Button @click="cancelAndClear">取消</Button>
          <Button type="primary" @click="pswIdentify">送出</Button>
        </template>
      </Modal>
      <!-- 燈箱 -->
      <!-- <Input
        class="search-input"
        search
        enter-button
        placeholder="搜尋"
        v-model="search"
        style="width: 300px"
      /> -->
    </div>
    <hr />
    <Table size="medium" :columns="columns" :data="mangerdata" id="table01" border>
      <template #am_id="{ row }">
        <strong>{{ row.am_id }}</strong>
      </template>
      <template #am_acc="{ row }">
        <span>{{ row.am_acc }}</span>
      </template>
      <template #am_psw="{ row }">
        <span>{{ row.am_psw }}</span>
      </template>
      <template #am_status="{ row }">
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          :true-value="1"
          :false-value="0"
          v-model="row.am_status"
        />
      </template>
    </Table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      //<燈箱
      modal2: false,
      //<搜尋
      // search: '',
      // searchedList: [],
      //<新增管理員
      addAdminData: {
        id: '',
        acc: '',
        psw: '',
        status: 1
      },
      //<第一次輸入密碼
      firstpsw: '',
      columns: [
        {
          title: '編號',
          key: 'am_no',
          align: 'center'
        },
        {
          title: '管理ID',
          key: 'am_id',
          slot: 'am_id',
          align: 'center'
        },
        {
          title: '帳號',
          key: 'am_acc',
          slot: 'am_acc',
          align: 'center'
        },
        {
          title: '密碼',
          key: 'am_psw',
          slot: 'am_psw',
          align: 'center'
        },
        {
          title: '狀態',
          key: 'am_status',
          slot: 'am_status',
          align: 'center'
        }
      ],
      mangerdata: []
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetch('http://localhost/api/get_admin.php', {
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
            this.mangerdata = json.data.list.map((item) => ({
              ...item,
              am_status: parseInt(item.am_status) // 確保 am_status 是數字
            }))
          } else {
            console.error('API返回錯誤:', json.msg)
          }
        })
        .catch((error) => {
          console.error('獲取數據時出錯:', error)
        })
    },
    cancelAndClear() {
      this.addAdminData = {
        id: '',
        acc: '',
        psw: '',
        status: 1
      }
      // 清空 firstpsw
      this.firstpsw = ''
      // 關閉燈箱
      this.modal2 = false
    },
    pswIdentify() {
      if (this.addAdminData.psw !== this.firstpsw) {
        this.$Message.error('密碼與再次輸入密碼不相符')
      } else {
        // 進行提交操作
        this.submitAdminData()
      }
    }
  },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;
}
hr {
  width: 100%;
  border-width: 1px;
  border-color: #000000;
  margin: 10px 0;
}
.bsm {
  width: 100%;
  padding: 20px;
  .bsmtop {
    height: 60px;
    display: flex;
    flex-direction: column;
    align-items: end;
    margin: 10px 0;
    button {
      margin: auto 0;
    }
  }
  h2 {
    font-size: 2vw;
  }
}
</style>
