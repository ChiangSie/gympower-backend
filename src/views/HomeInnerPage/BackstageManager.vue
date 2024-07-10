<template>
  <section class="bsm">
    <h2>後台人員管理</h2>
    <div class="bsmtop">
      <!-- 新增管理員button -->
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
            再次輸入密碼：<Input type="password" v-model="firstpsw" />
          </Space>
        </div>
        <template #footer>
          <Button @click="cancelAndClear">取消</Button>
          <Button type="primary" @click="pswIdentify">送出</Button>
        </template>
      </Modal>
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
          :disabled="!row.isEditing"
          :true-value="1"
          :false-value="0"
          v-model="row.am_status"
        />
      </template>
      <template #coach_operate="{ row }">
        <div v-if="row.isEditing">
          <!-- 儲存按鈕 -->
          <button class="noneborder" @click="saveAdmin(row)">
            <i class="fa-regular fa-floppy-disk"></i>
          </button>
        </div>
        <div v-else>
          <!-- 編輯按鈕 -->
          <button class="noneborder" @click="editAdmin(row)">
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
      //燈箱
      modal2: false,
      //新增管理員相關資料
      addAdminData: {
        id: '',
        acc: '',
        psw: '',
        status: 1
      },
      //管理員密碼再輸入
      firstpsw: '',
      //修改管理員狀態
      editAdminData: {
        status: ''
      },
      //資料庫抓取資料存放
      mangerdata: [],
      //table標題
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
        },
        {
          title: '編輯',
          key: 'coach_operate',
          slot: 'coach_operate',
          align: 'center',
          width: 100
        }
      ]
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    //發送 POST 請求到 PHP 後端
    //資料庫抓取資料
    fetchData() {
      fetch(`${import.meta.env.VITE_PHP_URL}get_admin.php`, {
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
    //編輯button
    editAdmin(row) {
      // 設定設定模式
      row.isEditing = true
      this.editAdminData.status = row.am_status
    },
    //儲存button
    saveAdmin(row) {
      // 發送的資料
      const updatedData = {
        am_no: row.am_no,
        am_status: row.am_status
      }
      // 發送 POST 請求到 PHP 後端
      // 將更新內容寫入資料庫
      fetch(`${import.meta.env.VITE_PHP_URL}update_admin.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200 || !data.error) {
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
    },
    //清空新增管理員燈箱的資料
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
    //新增管理員
    pswIdentify() {
      if (this.firstpsw == this.addAdminData.psw) {
        // 密碼一致，執行提交操作
        this.addAdmin()
      } else {
        // 密碼不一致，彈出提示
        alert('兩次輸入的密碼不一致')
      }
    },
    addAdmin() {
      if (!(this.addAdminData.id && this.addAdminData.acc && this.addAdminData.psw)) {
        alert('請填寫所有輸入值')
        return
      }
      fetch(`${import.meta.env.VITE_PHP_URL}add_admin.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.addAdminData)
      })
        .then((response) => response.json())
        .then((response) => {
          if (!response.error) {
            //重新讀取資料庫
            console.log(response)
            this.fetchData()
            //輸入清空
            this.cancelAndClear()
            //關閉燈箱
            this.modal2 = false
            // window.location.reload()
          } else {
            alert(response.msg)
          }
        })
        .catch((error) => {
          console.error('Error', error)
        })
    }
  },
  watch: {},
  computed: {}
}
</script>

<style lang="scss" scoped>
.noneborder {
  background-color: transparent;
  border: none;
}
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
