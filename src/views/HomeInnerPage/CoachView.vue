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
            教練名稱：<Input v-model="addcoachData.caochname" />
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
    <Table size="large" :columns="columns" :data="coachdata">
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
          align: 'center'
        },
        {
          title: '教練姓名',
          key: 'coach_name',
          slot: 'coach_name',
          align: 'center'
        },
        {
          title: '教練照片',
          key: 'coach_img',
          slot: 'coach_img',
          align: 'center'
        },
        {
          title: '專業證照',
          key: 'coach_licc',
          slot: 'coach_licc',
          align: 'center'
        },
        {
          title: '推薦教練',
          key: 'coach_rcm',
          slot: 'coach_rcm',
          align: 'center'
        },
        {
          title: '教練簡介',
          key: 'coach_info',
          slot: 'coach_info',
          align: 'center'
        }
      ],
      coachdata: [],
      addcoachData: {
        coachname: '',
        coachinfo1: '',
        coachinfo2: ''
      }
    }
  },
  mounted() {
    fetch(`${import.meta.env.BASE_URL}coach.json`)
      .then((res) => res.json())
      .then((json) => {
        this.coachdata = json.map((item) => ({
          ...item,
          coach_rcm: parseInt(item.coach_rcm)
        }))
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  },
  methods: {
    cancelAndClear() {
      this.addcoachData = {
        coachname: '',
        coachinfo1: '',
        coachinfo2: '',
        status: 1
      }
      // 關閉燈箱
      this.modal2 = false
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
