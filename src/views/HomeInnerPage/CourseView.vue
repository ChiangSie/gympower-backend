<template>
  <section class="cs">
    <h2>課程資訊管理</h2>
    <div class="cstop">
      <div class="corse_filter">
        <button><router-link to="/course_content">課程內容</router-link></button>
        <button><router-link to="/course_order">課程訂單</router-link></button>
      </div>
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
    <div class="showplace">
      <router-view />
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      modal2: false,
      courseData: [],
      checkGroup: []
    }
  },
  methods: {
    cancelAndClear() {
      // this.courseData = {}
      // 關閉燈箱
      this.modal2 = false
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
