<template>
  bbb
  <Table size="medium" :columns="columns" :data="CourseData" border></Table>
</template>

<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '訂單編號',
          key: 'o_id',
          slot: 'o_id',
          align: 'center'
        },
        {
          title: '課程名稱',
          key: 'o_name',
          slot: 'o_name',
          align: 'center'
        },
        {
          title: '會員編號',
          key: 'o_mbid',
          slot: 'o_mbid',
          align: 'center'
        },
        {
          title: '教練',
          key: 'o_coach',
          slot: 'o_coach',
          align: 'center'
        },
        {
          title: '價格',
          key: 'o_price',
          slot: 'o_price',
          align: 'center'
        },
        {
          title: '狀態',
          key: 'o_status',
          slot: 'o_status',
          align: 'center'
        }
      ],
      CourseData: []
    }
  }
}
</script>

<style lang="scss" scoped></style>
