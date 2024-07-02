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
            內容：<Input v-model="addcoachData.coachinfo1" />
          </Space>
          <Space class="addInput"> 專業證照：<Input v-model="addcoachData.coachinfo2" /> </Space>
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
    <Table size="medium" :columns="columns" :data="coachData" border>
      <template #coach_id="{ row }">
        <strong>{{ row.coach_id }}</strong>
      </template>
      <template #coach_name="{ row }">
        <strong>{{ row.coach_name }}</strong>
      </template>
      <template #coach_img="{ row }">
        <strong>{{ row.coach_img }}</strong>
      </template>
      <template #coach_licc="{ row }">
        <strong>{{ row.coach_licc }}</strong>
      </template>
      <template #coach_rcm="{ row }">
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          :true-value="1"
          :false-value="0"
          v-model="row.coach_rcm"
        />
      </template>
      <template #coach_info="{ row }">
        <strong>{{ row.coach_info }}</strong>
      </template>
      <!-- 編輯按鈕 -->
      <template #coach_operate="{ row }">
        <div v-if="row.isEditing">
          <button class="noneborder" @click="saveCoach(row)">
            <i class="fa-regular fa-floppy-disk"></i>
          </button>
        </div>
        <div v-else>
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
      columns: [
        {
          title: '教練編號',
          key: 'coach_id',
          align: 'center',
          width: 150,
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
          width: 150
        },
        {
          title: '專業證照',
          key: 'coach_licc',
          slot: 'coach_licc',
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
          key: 'coach_info',
          slot: 'coach_info',
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
      coachData: [],
      addcoachData: {
        coachname: '',
        coachinfo1: '',
        coachinfo2: ''
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
      fetch('http://localhost/api/get_coach.php', {
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
        coachinfo1: '',
        coachinfo2: '',
        status: 1
      }
      // 關閉燈箱
      this.modal2 = false
    },
    editCoach(row) {
      // 設置教練資料為編輯模式
      row.isEditing = true
    },
    saveCoach(row) {
      // 將教練資料儲存到伺服器
      //...
      // 設置教練資料為非編輯模式
      row.isEditing = false
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
