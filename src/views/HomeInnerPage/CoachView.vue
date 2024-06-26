<template>
  <section>
    <h2>教練管理</h2>
    <div class="memtop">
      <Input class="search-input" search enter-button placeholder="搜尋" style="width: 300px" />
    </div>
    <hr />
    <Table size="large" :columns="columns" :data="memdata">
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
      <template #coach_rcm="{}">
        <Switch true-color="#13ce66" false-color="#ff4949" :true-value="1" :false-value="0" />
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
      memdata: [
        {
          coach_id: '1',
          coach_name: 'wakawaka',
          coach_img: '',
          coach_licc: '',
          coach_rcm: '1',
          coach_info: 'wwwwwwwwwwwwwwwwwwwwwwwwwwwwwwww'
        },
        {
          coach_id: '2',
          coach_name: 'galagala',
          coach_img: '',
          coach_licc: '',
          coach_rcm: '1',
          coach_info: 'BBbbbbbbBBBBbbBBBbBBBBB'
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
  .coachtop {
    display: flex;
    justify-content: end;
  }
}
</style>
