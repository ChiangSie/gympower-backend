<template>
  <Table size="small" :columns="columns" :data="CourseData"></Table>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '名稱',
          key: 'c_name',
          slot: 'c_name',
          align: 'center'
        },
        {
          title: '熱門課程',
          key: 'c_hot',
          slot: 'c_hot',
          align: 'center'
        },
        {
          title: '內容',
          key: 'c_content',
          slot: 'c_content',
          align: 'center'
        },
        {
          title: '教練',
          key: 'c_coacj_id',
          slot: 'c_coacj_id',
          align: 'center'
        },
        {
          title: '時間',
          key: 'c_time',
          slot: 'c_time',
          align: 'center'
        },
        {
          title: '價格',
          key: 'c_price',
          slot: 'c_price',
          align: 'center'
        },
        {
          title: '狀態',
          key: 'c_status',
          slot: 'c_status',
          align: 'center'
        },
        {
          title: '操作',
          key: 'c_control',
          slot: 'c_control',
          align: 'center'
        }
      ],
      CourseData: []
    }
  }
}
</script>
<style lang="scss" scoped></style>
