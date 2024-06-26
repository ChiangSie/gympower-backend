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
      <template #mem_status="{ row }">
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          :true-value="1"
          :false-value="0"
          v-model="row.mem_status"
        />
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
      memdata: []
    }
  },
  mounted() {
    fetch(`${import.meta.env.BASE_URL}member.json`)
      .then((res) => res.json())
      .then((json) => {
        this.memdata = json.map((item) => ({
          ...item,
          mem_status: parseInt(item.mem_status)
        }))
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
