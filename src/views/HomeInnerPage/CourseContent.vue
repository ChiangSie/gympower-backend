<template>
  <Table size="large" :columns="columns" :data="mangerdata" id="table01"></Table>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '名稱'
        }
      ]
    }
  }
}
</script>
<style lang="scss" scoped></style>
