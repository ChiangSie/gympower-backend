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
          v-model="search"
        />
        <Modal title="課程內容管理" v-model="modal2" :mask-closable="false" style="top: 10px">
          <div>
            <h4>課程名稱</h4>
            <input type="text" v-model="addCourseConData.name" />
          </div>
          <br />
          <div>
            <h4>課程內容</h4>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              style="width: 100%; aspect-ratio: 4/1"
              v-model="addCourseConData.content"
            ></textarea>
          </div>
          <br />
          <div>
            <h4>教練</h4>
            <Select v-model="addCourseConData.coach" style="width: 200px" placeholder="請選擇教練">
              <Option v-for="item in coachlist" :key="item.coach_id" :value="item.coach_id">{{
                item.coach_name
              }}</Option>
            </Select>
          </div>
          <br />
          <div>
            <h4>星期</h4>
            <CheckboxGroup v-model="addCourseConData.week">
              <Checkbox label="一"></Checkbox>
              <Checkbox label="二"></Checkbox>
              <Checkbox label="三"></Checkbox>
              <Checkbox label="四"></Checkbox>
              <Checkbox label="五"></Checkbox>
              <Checkbox label="六"></Checkbox>
              <Checkbox label="日"></Checkbox>
            </CheckboxGroup>
          </div>
          <br />
          <div style="display: flex; align-items: center; gap: 95px">
            <div>
              <h4>選擇時段</h4>
              <TimePicker
                :steps="[1, 30]"
                type="time"
                placeholder="Select time"
                style="width: 168px"
              />
            </div>
            <div>
              <h4>價格</h4>
              <input type="number" v-model="addCourseConData.price" />
            </div>
          </div>
          <br />
          <div style="display: flex">
            <div>
              <h4>課程圖片</h4>
              <input type="file" @change="handleImageUpload" accept="image/*" />
            </div>
            <div>
              <h4>課程封面</h4>
              <input type="file" @change="handleImageUpload" accept="coverimage/*" />
            </div>
          </div>
          <br />
          <div style="display: flex; justify-content: space-between">
            <div>
              <h4>上架狀態</h4>
              <Switch
                true-color="#13ce66"
                false-color="#ff4949"
                :true-value="1"
                :false-value="0"
                v-model="addCourseConData.status"
              />
            </div>
            <div>
              <h4>課程人數</h4>
              <input type="number" v-model="addCourseConData.people" />
            </div>
          </div>
          <br />
          <div style="display: flex; justify-content: space-between">
            <div>
              <h4>熱門課程</h4>
              <Switch
                true-color="#13ce66"
                false-color="#ff4949"
                :true-value="1"
                :false-value="0"
                v-model="addCourseConData.hot"
              />
            </div>
            <div>
              <h4>課程地點</h4>
              <Select
                v-model="addCourseConData.location"
                style="width: 200px"
                placeholder="請選擇地點"
              >
                <Option :value="1">1</Option>
                <Option :value="2">2</Option>
                <Option :value="3">3</Option>
                <Option :value="4">4</Option>
                <Option :value="5">5</Option>
                <Option :value="6">6</Option>
              </Select>
            </div>
          </div>
          <template #footer>
            <Button @click="cancelAndClear">取消</Button>
            <Button type="primary" @click="submitCourseData">送出</Button>
          </template>
        </Modal>
      </div>
    </div>
    <hr />
    <Table size="medium" height="450" :columns="columns" :data="searchedList" border>
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
      addCourseConData: {
        name: '',
        content: '',
        coach: '',
        week: [],
        time: [],
        price: '',
        image: null,
        coverimage: null,
        status: 0,
        hot: 0,
        people: ''
      },
      modal2: false,
      search: '',
      searchedList: [],
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
      ],
      coachlist: []
    }
  },
  mounted() {
    this.fetchData(), this.fetchCoach()
  },
  methods: {
    cancelAndClear() {
      this.modal2 = false
      this.addCourseConData = {
        name: '',
        content: '',
        coach: '',
        week: [],
        time: [],
        price: '',
        image: null,
        coverimage: null,
        status: 0,
        hot: 0,
        people: ''
      }
    },
    fetchCoach() {
      fetch(`${import.meta.env.VITE_PHP_URL}get_course_con.php`, {
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
            this.coachlist = json.data.list.map((item) => ({
              ...item,
              coach_rcm: parseInt(item.coach_rcm)
            }))
            this.updateSearchedList()
          } else {
            console.error('API返回錯誤:', json.msg)
          }
        })
        .catch((error) => {
          console.error('獲取數據時出錯:', error)
        })
    },
    fetchData() {
      fetch(`${import.meta.env.VITE_PHP_URL}get_course_con.php`, {
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
            this.updateSearchedList()
          } else {
            console.error('API返回錯誤:', json.msg)
          }
        })
        .catch((error) => {
          console.error('獲取數據時出錯:', error)
        })
    },
    updateSearchedList() {
      if (this.search.trim() === '') {
        this.searchedList = this.CourseContentData
      } else {
        this.searchedList = this.CourseContentData.filter(
          (CourseContent) =>
            CourseContent.c_name.includes(this.search) ||
            CourseContent.c_content.includes(this.search) ||
            CourseContent.coach_name.includes(this.search) ||
            CourseContent.c_time.includes(this.search) ||
            CourseContent.c_price.toString().includes(this.search)
        )
      }
    },
    editCourseCon(row) {
      row.isEditing = true
      this.editCourseData.price = row.c_price
      this.editCourseData.content = row.c_content
      this.editCourseData.status = row.c_status
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
      fetch(`${import.meta.env.VITE_PHP_URL}update_course_con.php`, {
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
            this.$Message.success(data.msg || '課程資料更新成功')
          } else {
            // 更新失敗，顯示錯誤信息
            this.$Message.error(data.msg || '更新失敗')
          }
        })
        .catch((error) => {
          console.error('Error:', error)
          this.$Message.error('更新過程中發生錯誤')
        })
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (file) {
        this.addCourseConData.image = file
      }
    },
    submitCourseData() {
      const formData = new FormData()
      for (const key in this.addCourseConData) {
        if (key === 'date') {
          formData.append(key, JSON.stringify(this.addCourseConData[key]))
        } else if (key === 'time') {
          formData.append('start_time', this.addCourseConData[key][0])
          formData.append('end_time', this.addCourseConData[key][1])
        } else if (key === 'image' && this.addCourseConData[key]) {
          formData.append(key, this.addCourseConData[key], this.addCourseConData[key].name)
        } else {
          formData.append(key, this.addCourseConData[key])
        }
      }
      fetch(`${import.meta.env.VITE_PHP_URL}add_course_con.php`, {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200) {
            this.$Message.success('課程新增成功')
            this.modal2 = false
            this.fetchData() // 重新獲取課程列表
            this.cancelAndClear() // 清空表單
          } else {
            this.$Message.error(data.msg || '課程新增失敗')
          }
        })
        .catch((error) => {
          console.error('Error:', error)
          this.$Message.error('新增過程中發生錯誤')
        })
    }
  },
  watch: {
    search: 'updateSearchedList'
  }
}
</script>

<style lang="scss" scoped>
h4 {
  font-size: 14px;
  margin: 5px 0;
}
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
    justify-content: end;
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
