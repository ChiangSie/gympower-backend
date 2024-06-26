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
          <Space class="addInput" style="position: relative; left: 7.5px">
            新增ID：<Input v-model="addAdminData.id" />
          </Space>
          <Space class="addInput"> 新增帳號：<Input v-model="addAdminData.acc" /> </Space>
          <Space class="addInput"> 新增密碼：<Input v-model="addAdminData.psw" /> </Space>
          <Space style="position: relative; right: 14px">
            再次輸入密碼：<Input type="password" v-model="addAdminData.firstpsw" />
          </Space>
        </div>
      </Modal>
      <!-- 燈箱 -->
      <Input
        class="search-input"
        search
        enter-button
        placeholder="搜尋"
        v-model="search"
        style="width: 300px"
      />
    </div>
    <hr />
    <Table size="large" :columns="columns" :data="mangerdata" id="table01">
      <template #am_id="{ row }">
        <strong>{{ row.am_id }}</strong>
      </template>
      <template #am_acc="{ row }">
        <span>{{ row.am_acc }}</span>
      </template>
      <template #am_psw="{ row }">
        <span>{{ row.am_psw }}</span>
      </template>
      <template #am_status="{}">
        <Switch true-color="#13ce66" false-color="#ff4949" :true-value="1" :false-value="0" />
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
      //<燈箱
      //<新增管理員
      addAdminData: {
        id: '',
        acc: '',
        psw: '',
        status: 1
      },
      //<新增管理員
      //<第一次輸入密碼
      firstpsw: '',
      //<第一次輸入密碼
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
      mangerdata: [
        {
          am_no: '1',
          am_id: 'admin01',
          am_acc: 'admin01',
          am_psw: '123456',
          am_status: '1'
        },
        {
          am_no: '2',
          am_id: 'admin02',
          am_acc: 'admin02',
          am_psw: '123456',
          am_status: '1'
        }
      ]
    }
  },
  methods: {}
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
    display: flex;
    flex-direction: column;
    align-items: end;
    button {
      margin: 10px 0;
    }
  }
  h2 {
    font-size: 2vw;
  }
}
</style>
