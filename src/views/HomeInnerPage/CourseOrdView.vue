<template>
  <section class="cs">
    <h2>課程訂單管理</h2>
    <div class="cstop">
      <div class="course_func">
        <Input
          class="search-input"
          search
          enter-button
          placeholder="搜尋"
          style="width: 200px; height: 16px"
        />
      </div>
    </div>
    <hr />
    <Table size="medium" :columns="columns" :data="CourseOrderData" border>
      <template #o_id="{ row }">
        <strong>{{ row.o_id }}</strong>
      </template>
      <template #o_date="{ row }">
        <strong>{{ row.o_date }}</strong>
      </template>
      <!-- <template #o_name="{ row }">
      <strong>{{ row.o_name }}</strong>
    </template> -->
      <template #o_mbid="{ row }">
        <strong>{{ row.o_mbid }}</strong>
      </template>
      <!-- <template #o_coach="{ row }">
      <strong>{{ row.o_coach }}</strong>
    </template> -->
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
  </section>
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
          title: '訂單時間',
          key: 'o_date',
          slot: 'o_date',
          align: 'center'
        },
        // {
        //   title: '課程名稱',
        //   key: 'o_name',
        //   slot: 'o_name',
        //   align: 'center'
        // },
        {
          title: '會員編號',
          key: 'o_mbid',
          slot: 'o_mbid',
          align: 'center'
        },
        // {
        //   title: '教練',
        //   key: 'o_coach',
        //   slot: 'o_coach',
        //   align: 'center'
        // },
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
      CourseOrderData: []
    }
  },
  mounted() {
    this.fetchData()
  },
  metheds: {
    fetchData() {
      fetch('http://localhost/api/get_course_ord.php', {
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
            this.CourseOrderData = json.data.list.map((item) => ({
              ...item,
              o_status: parseInt(item.o_status),
              o_disprice: parseInt(item.o_disprie),
              o_pay: parseInt(item.o_pay)
            }))
          } else {
            console.error('API返回錯誤:', json.msg)
          }
        })
        .catch((error) => {
          console.error('獲取數據時出錯:', error)
        })
    }
  },
  watch: {}
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
