<template>
  <section class="cs">
    <h2>課程資訊管理</h2>
    <div class="cstop">
      <div class="course_func">
        <button @click="modal2 = true" style="width: 120px; height: 30px">
          <i class="fa-solid fa-plus"></i>新增
        </button>
        <Input
          class="search-input"
          search
          enter-button
          placeholder="搜尋"
          style="width: 200px; height: 16px"
        />
        <Modal title="課程內容管理" v-model="modal2" :mask-closable="false" style="top: 30px">
          <div>
            <h4>課程名稱</h4>
            <input type="text" />
          </div>
          <div>
            <h4>課程內容</h4>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              style="width: 80%; aspect-ratio: 2/1"
            ></textarea>
          </div>
          <div>
            <h4>教練</h4>
            <Dropdown trigger="click" style="margin-left: 0; color: black">
              <a href="javascript:void(0)">
                教練選擇
                <Icon type="ios-arrow-down"></Icon>
              </a>
              <template #list>
                <DropdownMenu>
                  <DropdownItem>111</DropdownItem>
                  <DropdownItem>222</DropdownItem>
                  <DropdownItem>333</DropdownItem>
                  <DropdownItem>444</DropdownItem>
                  <DropdownItem>555</DropdownItem>
                </DropdownMenu>
              </template>
            </Dropdown>
          </div>
          <div>
            <h4>星期</h4>
            <CheckboxGroup v-model="checkGroup">
              <Checkbox label="一"></Checkbox>
              <Checkbox label="二"></Checkbox>
              <Checkbox label="三"></Checkbox>
              <Checkbox label="四"></Checkbox>
              <Checkbox label="五"></Checkbox>
              <Checkbox label="六"></Checkbox>
              <Checkbox label="日"></Checkbox>
            </CheckboxGroup>
          </div>
          <div>
            <h4>選擇時段</h4>
            <TimePicker
              :steps="[1, 30]"
              format="HH:mm"
              type="timerange"
              placement="bottom-end"
              placeholder="Select Time"
              style="width: 168px"
            />
          </div>
          <template #footer>
            <Button @click="cancelAndClear">取消</Button>
            <Button type="primary">送出</Button>
          </template>
        </Modal>
      </div>
    </div>
    <hr />
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
        <div v-if="row.isEditing"><input type="text" v-model="editCourseData.content" /></div>
        <div v-else>
          <strong>{{ row.c_content }}</strong>
        </div>
      </template>
      <template #coach_name="{ row }">
        <strong>{{ row.coach_name }}</strong>
      </template>
      <template #c_time="{ row }">
        <strong>{{ row.c_start }}~{{ row.c_end }}</strong>
      </template>
      <template #c_price="{ row }">
        <div v-if="row.isEditing"><input type="number" v-model="editCourseData.price" /></div>
        <div v-else>
          <strong>{{ row.c_price }}</strong>
        </div>
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
  </section>
</template>

<script>
export default {
  data() {
    return {
      modal2: false,
      courseData: [],
      checkGroup: [],
      CourseContentData: [],
      editCourseData: {
        price: '',
        content: ''
      },
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
          key: 'coach_name',
          slot: 'coach_name',
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
          width: 200
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
    cancelAndClear() {
      // this.courseData = {}
      // 關閉燈箱
      this.modal2 = false
    },
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
      this.editCouresData.price = row.c_price
      this.editCouresData.content = row.c_content
      this.editCouresData.status = row.c_status
    },
    saveCourseCon(row) {
      // 實現保存邏輯
      row.isEditing = false
      const updatedData = {
        c_id: row.c_id,
        c_content: this.editCourseData.content,
        c_price: this.editCourseData.price,
        c_status: row.c_status
      }
      // 發送 POST 請求到 PHP 後端
      fetch('http://localhost/api/update_course_con.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200 || !data.error) {
            row.c_price = this.editCourseData.price
            row.c_content = this.editCourseData.content
            row.isEditing = false
            this.$Message.success(data.msg || '教練資料更新成功')
          } else {
            // 更新失敗，顯示錯誤信息
            this.$Message.error(data.msg || '更新失敗')
          }
        })
        .catch((error) => {
          console.error('Error:', error)
          this.$Message.error('更新過程中發生錯誤')
        })
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
.noneborder {
  background-color: transparent;
  border: none;
}
.cs {
  width: 100%;
  padding: 20px;
  h2 {
    font-size: 2vw;
  }
  .cstop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    height: 60px;
    .corse_filter {
      margin: 20px 0 0 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: end;
      button {
        margin: 0 10px;
        padding: 0 10px;
        a {
          font-size: 14px;
          line-height: 21px;
          color: black;
        }
      }
    }
    .course_func {
      display: flex;
      flex-direction: row;
      gap: 15px;
    }
  }
  .showplace {
    width: 100%;
    height: auto;
  }
}
</style>
