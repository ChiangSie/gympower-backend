<template>
  <section>
    <h2>會員帳號管理</h2>
    <div class="memtop">
      <Input class="search-input" search enter-button placeholder="搜尋" style="width: 300px" />
    </div>
    <hr />
    <Table size="large" :columns="columns" :data="memdata">
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
      <template #mem_status="{}">
        <Switch true-color="#13ce66" false-color="#ff4949" :true-value="1" :false-value="0" />
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
          title: '會員編號',
          key: 'mem_id',
          align: 'center'
        },
        {
          title: '會員姓名',
          key: 'mem_name',
          slot: 'mem_name',
          align: 'center'
        },
        {
          title: '會員手機',
          key: 'mem_phone',
          slot: 'mem_phone',
          align: 'center'
        },
        {
          title: '會員頭像',
          key: 'mem_img',
          slot: 'mem_img',
          align: 'center'
        },
        {
          title: '電子信箱',
          key: 'mem_email',
          slot: 'mem_email',
          align: 'center'
        },
        {
          title: '狀態',
          key: 'mem_status',
          slot: 'mem_status',
          align: 'center'
        }
      ],
      memdata: [
        {
          mem_id: 1,
          mem_name: 'test1',
          mem_phone: '123456789',
          mem_img: '',
          mem_email: 'test1@gmail.com',
          mem_status: '1'
        },
        {
          mem_id: 2,
          mem_name: 'test2',
          mem_phone: '123456789',
          mem_img: '',
          mem_email: 'test2@gmail.com',
          mem_status: '1'
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
section {
  width: 100%;
  padding: 20px;
  h2 {
    font-size: 2vw;
  }
  .memtop {
    display: flex;
    justify-content: end;
  }
}
</style>
