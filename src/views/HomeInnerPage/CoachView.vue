<template>
  <section>
    <h2>教練管理</h2>
    <div class="coachtop">
      <button @click="modal2 = true" style="width: 120px; height: 30px">
        <i class="fa-solid fa-plus"></i>新增
      </button>
      <!-- 燈箱 -->
      <Modal
        title="新增教練資訊"
        v-model="modal2"
        :mask-closable="false"
        class-name="vertical-center-modal "
      >
        <div style="display: flex; flex-direction: column; align-items: center; gap: 10px">
          <Space class="addInput" style="position: relative; left: 0px">
            教練名稱：<Input v-model="addcoachData.coachname" />
          </Space>
          <Space class="addInput" style="position: relative; left: 14.5px">
            內容：<Input v-model="addcoachData.eintro" />
          </Space>
          <Space class="addInput"> 專業領域：<Input v-model="addcoachData.etag" /> </Space>
          <Space class="addInput" style="position: relative; left: -74px">
            推薦教練：
            <Switch
              true-color="#13ce66"
              false-color="#ff4949"
              :true-value="1"
              :false-value="0"
              style="position: relative; left: 0px"
            />
          </Space>
          <Space class="addInput"> 課程圖片：<Input type="file" /> </Space>
        </div>
        <template #footer>
          <Button @click="cancelAndClear">取消</Button>
          <Button type="primary" @click="pswIdentify">送出</Button>
        </template>
      </Modal>
      <!-- 燈箱 -->
    </div>
    <hr />
    <!-- 表格項目 -->
    <Table size="medium" height="450" :columns="columns" :data="coachData" border>
      <!-- 教練ID -->
      <template #coach_id="{ row }">
        <strong>{{ row.coach_id }}</strong>
      </template>
      <!-- 教練姓名 -->
      <template #coach_name="{ row }">
        <strong>{{ row.coach_name }}</strong>
      </template>
      <!-- 教練照片 -->
      <template #coach_img="{ row }">
        <div v-if="row.isEditing"><input v-on="editCoachData.img" type="file" /></div>
        <div v-else>
          <strong>{{ row.coach_img }}</strong>
        </div>
      </template>
      <!-- 教練證照 -->
      <template #tag="{ row }">
        <div v-if="row.isEditing"><input v-model="editCoachData.tag" type="text" /></div>
        <div v-else>
          <strong>{{ row.tag }}</strong>
        </div>
      </template>
      <!-- 推薦教練 -->
      <template #coach_rcm="{ row }">
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          :disabled="!row.isEditing"
          :true-value="1"
          :false-value="0"
          v-model="row.coach_rcm"
        />
      </template>
      <!-- 教練介紹 -->
      <template #intro="{ row }">
        <div v-if="row.isEditing">
          <textarea
            v-model="editCoachData.intro"
            cols="30"
            rows="10"
            style="width: 95%; aspect-ratio: 2/1; margin: 10px auto"
          ></textarea>
        </div>
        <div v-else>
          <strong>{{ row.intro }}</strong>
        </div>
      </template>
      <!-- 編輯按鈕 -->
      <template #coach_operate="{ row }">
        <div v-if="row.isEditing">
          <!-- 儲存按鈕 -->
          <button class="noneborder" @click="saveCoach(row)">
            <i class="fa-regular fa-floppy-disk"></i>
          </button>
        </div>
        <div v-else>
          <!-- 編輯按鈕 -->
          <button class="noneborder" @click="editCoach(row)">
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
      modal2: false,
      //編輯器開關
      editIndex: -1,
      // columns為表格項目
      columns: [
        {
          title: '教練編號',
          key: 'coach_id',
          align: 'center',
          width: 120,
          fixed: 'left'
        },
        {
          title: '教練姓名',
          key: 'coach_name',
          slot: 'coach_name',
          align: 'center',
          width: 150
        },
        {
          title: '教練照片',
          key: 'coach_img',
          slot: 'coach_img',
          align: 'center',
          width: 250
        },
        {
          title: '專業領域',
          key: 'tag',
          slot: 'tag',
          align: 'center',
          width: 200
        },
        {
          title: '推薦教練',
          key: 'coach_rcm',
          slot: 'coach_rcm',
          align: 'center',
          width: 100
        },
        {
          title: '教練簡介',
          key: 'intro',
          slot: 'intro',
          align: 'center',
          width: 400
        },
        {
          title: '編輯',
          key: 'coach_operate',
          slot: 'coach_operate',
          align: 'center',
          width: 100
        }
      ],
      // coachData為php撈table資料的儲存處
      coachData: [],
      // addcoachData為新增表格所需
      addcoachData: {},
      //編輯資料所需的表格
      editCoachData: {
        img: '',
        intro: '',
        status: '',
        tag: ''
      }
    }
  },
  mounted() {
    this.fetchData()
    // fetch(`${import.meta.env.BASE_URL}coach.json`)
    //   .then((res) => res.json())
    //   .then((json) => {
    //     this.coachdata = json.map((item) => ({
    //       ...item,
    //       coach_rcm: parseInt(item.coach_rcm)
    //     }))
    //   })
    //   .catch((error) => {
    //     console.error('Error fetching data:', error)
    //   })
  },
  methods: {
    fetchData() {
      fetch(`${import.meta.env.VITE_PHP_URL}get_coach.php`, {
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
            this.coachData = json.data.list.map((item) => ({
              ...item,
              coach_rcm: parseInt(item.coach_rcm)
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
      this.addcoachData = {
        coachname: '',
        eintro: '',
        etag: '',
        status: 1
      }
      // 關閉燈箱
      this.modal2 = false
    },
    editCoach(row) {
      // Set the row to editing mode
      row.isEditing = true
      // Initialize the editCoachData with the current row's values
      this.editCoachData.img = row.coach_img
      this.editCoachData.tag = row.tag
      this.editCoachData.intro = row.intro
      this.editCoachData.status = row.coach_status
    },
    saveCoach(row) {
      // 準備要發送的數據
      const updatedData = {
        coach_id: row.coach_id,
        coach_img: this.editCoachData.img,
        tag: this.editCoachData.tag,
        intro: this.editCoachData.intro,
        coach_rcm: row.coach_rcm
      }

      // 發送 POST 請求到 PHP 後端
      fetch(`${import.meta.env.VITE_PHP_URL}update_coach.php`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200 || !data.error) {
            row.coach_img = this.editCoachData.img
            row.tag = this.editCoachData.tag
            row.intro = this.editCoachData.intro
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
  .coachtop {
    display: flex;
    justify-content: end;
    margin: 10px 0;
    button {
      margin: 10px 0;
    }
  }
}
</style>
