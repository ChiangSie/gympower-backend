<template>
  bbb
  <Table size="medium" :columns="columns" :data="CourseData" border>
    <template #o_id="{ row }">
      <strong>{{ row.o_id }}</strong>
    </template>
    <template #o_name="{ row }">
      <strong>{{ row.o_name }}</strong>
    </template>
    <template #o_mbid="{ row }">
      <strong>{{ row.o_mbid }}</strong>
    </template>
    <template #o_coach="{ row }">
      <strong>{{ row.o_coach }}</strong>
    </template>
    <template #o_price="{ row }">
      <strong>{{ row.o_price }}</strong>
    </template>
    <template #o_status="{ row }">
      <Switch
        true-color="#13ce66"
        false-color="#ff4949"
        :disabled="!row.isEditing"
        :true-value="1"
        :false-value="0"
        v-model="row.o_status"
      />
    </template>
  </Table>
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
  },
  mounted() {},
  metheds: {},
  watch: {}
}
</script>

<style lang="scss" scoped></style>
