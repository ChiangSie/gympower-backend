<template>
  <Table size="medium" :columns="columns" :data="CourseContentData" border>
    <template #c_name="{ row }">
      <strong>{{ row.c_name }}</strong>
    </template>
    <template #c_hot="{ row }">
      <Switch
        true-color="#13ce66"
        false-color="#ff4949"
        :disabled="!row.isEditing"
        :true-value="1"
        :false-value="0"
        v-model="row.c_hot"
      />
    </template>
    <template #c_content="{ row }">
      <strong>{{ row.c_content }}</strong>
    </template>
    <template #coach_id="{ row }">
      <strong>{{ row.coach_id }}</strong>
    </template>
    <template #c_time="{ row }">
      <strong>{{ row.c_start }}~{{ row.c_end }}</strong>
    </template>
    <template #c_price="{ row }">
      <strong>{{ row.c_price }}</strong>
    </template>
    <template #c_status="{ row }">
      <Switch
        true-color="#13ce66"
        false-color="#ff4949"
        :disabled="!row.isEditing"
        :true-value="1"
        :false-value="0"
        v-model="row.c_status"
      />
    </template>
    <template #c_operate="{ row }">
      <div v-if="row.isEditing">
        <!-- 儲存按鈕 -->
        <button class="noneborder" @click="saveCourseCon(row)">
          <i class="fa-regular fa-floppy-disk"></i>
        </button>
      </div>
      <div v-else>
        <!-- 編輯按鈕 -->
        <button class="noneborder" @click="editCourseCon(row)">
          <i class="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
    </template>
  </Table>
</template>
<script>
export default {
  data() {
    return {
      CourseContentData: [],
      columns: [
        {
          title: '名稱',
          key: 'c_name',
          slot: 'c_name',
          align: 'center',
          fixed: 'left',
          width: 150
        },
        {
          title: '熱門課程',
          key: 'c_hot',
          slot: 'c_hot',
          align: 'center',
          width: 100
        },
        {
          title: '內容',
          key: 'c_content',
          slot: 'c_content',
          align: 'center',
          width: 500
        },
        {
          title: '教練',
          key: 'coach_id',
          slot: 'coach_id',
          align: 'center',
          width: 150
        },
        {
          title: '時間',
          key: 'c_time',
          slot: 'c_time',
          align: 'center',

          width: 200
        },
        {
          title: '價格',
          key: 'c_price',
          slot: 'c_price',
          align: 'center',
          width: 100
        },
        {
          title: '狀態',
          key: 'c_status',
          slot: 'c_status',
          align: 'center',
          width: 100
        },
        {
          title: '編輯',
          key: 'c_operate',
          slot: 'c_operate',
          align: 'center',
          width: 100
        }
      ]
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      fetch('http://localhost/api/get_course_con.php', {
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
            this.CourseContentData = json.data.list.map((item) => ({
              ...item,
              c_status: parseInt(item.c_status),
              c_hot: parseInt(item.c_hot)
            }))
          } else {
            console.error('API返回錯誤:', json.msg)
          }
        })
        .catch((error) => {
          console.error('獲取數據時出錯:', error)
        })
    },
    editCourseCon(row) {
      row.isEditing = true
    },
    saveCourseCon(row) {
      // 實現保存邏輯
      row.isEditing = false
    }
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.noneborder {
  background-color: transparent;
  border: none;
}
</style>
