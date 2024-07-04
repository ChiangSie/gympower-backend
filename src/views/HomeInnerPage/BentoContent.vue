<template>
  <section class="bo">
    <h2>餐點管理</h2>
    <div class="botop">
      <div class="bento_filter">
        <button>全部</button>
        <button>主食</button>
        <button>肉類</button>
        <button>蔬菜類</button>
        <button>海鮮類</button>
        <button>蛋豆類</button>
      </div>
      <div class="bento_func">
        <Input class="search-input" search enter-button placeholder="搜尋" style="width: 300px" />
      </div>
    </div>
    <hr />
    <Table size="medium" :columns="columns" :data="BentoContentData">
      <template #fd_id="{ row }">
        <strong>{{ row.fd_id }}</strong>
      </template>
      <template #fd_name="{ row }">
        <div v-if="row.isEditing">
          <input type="text" v-model="editBentoData.name" style="width: 90%" />
        </div>
        <div v-else>
          <strong>{{ row.fd_name }}</strong>
        </div>
      </template>
      <template #fd_cal="{ row }">
        <div v-if="row.isEditing">
          <input type="text" v-model="editBentoData.cal" style="width: 90%" />
        </div>
        <div v-else>
          <strong>{{ row.fd_cal }}</strong>
        </div>
      </template>
      <template #fd_protein="{ row }">
        <div v-if="row.isEditing">
          <input type="text" v-model="editBentoData.protein" style="width: 90%" />
        </div>
        <div v-else>
          <strong>{{ row.fd_protein }}</strong>
        </div>
      </template>
      <template #fd_sugar="{ row }">
        <div v-if="row.isEditing">
          <input type="text" v-model="editBentoData.sugar" style="width: 90%" />
        </div>
        <div v-else>
          <strong>{{ row.fd_sugar }}</strong>
        </div>
      </template>
      <template #fd_fat="{ row }">
        <div v-if="row.isEditing">
          <input type="text" v-model="editBentoData.fat" style="width: 90%" />
        </div>
        <div v-else>
          <strong>{{ row.fd_fat }}</strong>
        </div>
      </template>
      <template #fd_img="{ row }">
        <div v-if="row.isEditing">
          <input type="file" v-on="editBentoData.img" style="width: 90%" />
        </div>
        <div v-else>
          <strong>{{ row.fd_img }}</strong>
        </div>
      </template>
      <template #fd_price="{ row }">
        <div v-if="row.isEditing">
          <input type="text" v-model="editBentoData.price" style="width: 90%" />
        </div>
        <div v-else>
          <strong>{{ row.fd_price }}</strong>
        </div>
      </template>
      <template #fd_status="{ row }">
        <Switch
          true-color="#13ce66"
          false-color="#ff4949"
          :disabled="!row.isEditing"
          :true-value="1"
          :false-value="0"
          v-model="row.fd_status"
        />
      </template>
      <template #fd_operate="{ row }">
        <div v-if="row.isEditing">
          <!-- 儲存按鈕 -->
          <button class="noneborder" @click="saveBentoCon(row)">
            <i class="fa-regular fa-floppy-disk"></i>
          </button>
        </div>
        <div v-else>
          <!-- 編輯按鈕 -->
          <button class="noneborder" @click="editBentoCon(row)">
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
      BentoContentData: [],
      editBentoData: {
        name: '',
        cal: '',
        protein: '',
        fat: '',
        sugar: '',
        img: '',
        price: ''
      },
      columns: [
        {
          title: '食材編號',
          key: 'fd_id',
          slot: 'fd_id',
          align: 'center',
          width: 100,
          fixed: 'left'
        },
        {
          title: '食材名稱',
          key: 'fd_name',
          slot: 'fd_name',
          align: 'center',
          width: 150
        },
        {
          title: '食材熱量',
          key: 'fd_cal',
          slot: 'fd_cal',
          align: 'center',
          width: 120
        },
        {
          title: '食材蛋白質',
          key: 'fd_protein',
          slot: 'fd_protein',
          align: 'center',
          width: 120
        },
        {
          title: '食材醣',
          key: 'fd_sugar',
          slot: 'fd_sugar',
          align: 'center',
          width: 120
        },
        {
          title: '食材脂肪',
          key: 'fd_fat',
          slot: 'fd_fat',
          align: 'center',
          width: 120
        },
        {
          title: '食材照片',
          key: 'fd_img',
          slot: 'fd_img',
          align: 'center',
          width: 250
        },
        {
          title: '價格',
          key: 'fd_price',
          slot: 'fd_price',
          align: 'center',
          width: 150
        },
        {
          title: '上架狀態',
          key: 'fd_status',
          slot: 'fd_status',
          align: 'center',
          width: 100
        },
        {
          title: '編輯',
          key: 'fd_operate',
          slot: 'fd_operate',
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
      fetch('http://localhost/api/get_food.php', {
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
            this.BentoContentData = json.data.list.map((item) => ({
              ...item,
              fd_status: parseInt(item.fd_status)
            }))
          } else {
            console.error('API返回錯誤:', json.msg)
          }
        })
        .catch((error) => {
          console.error('獲取數據時出錯:', error)
        })
    },
    editBentoCon(row) {
      row.isEditing = true
      this.editBentoData.img = row.fd_img
      this.editBentoData.name = row.fd_name
      this.editBentoData.cal = row.fd_cal
      this.editBentoData.fat = row.fd_fat
      this.editBentoData.sugar = row.fd_sugar
      this.editBentoData.protein = row.fd_protein
      this.editBentoData.price = row.fd_price
      this.editBentoData.status = row.fd_status
    },
    saveBentoCon(row) {
      // 實現保存邏輯
      row.isEditing = false
      const updatedData = {
        fd_id: row.fd_id,
        fd_img: this.editBentoData.img,
        fd_name: this.editBentoData.name,
        fd_cal: this.editBentoData.cal,
        fd_fat: this.editBentoData.fat,
        fd_sugar: this.editBentoData.sugar,
        fd_protein: this.editBentoData.protein,
        fd_price: this.editBentoData.price,
        fd_status: row.fd_status
      }
      // 發送 POST 請求到 PHP 後端
      fetch('http://localhost/api/update_food.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.code === 200 || !data.error) {
            row.fd_img = this.editBentoData.img
            row.fd_name = this.editBentoData.name
            row.fd_cal = this.editBentoData.cal
            row.fd_fat = this.editBentoData.fat
            row.fd_sugar = this.editBentoData.sugar
            row.fd_protein = this.editBentoData.protein
            row.fd_price = this.editBentoData.price
            row.isEditing = false
            this.$Message.success(data.msg || '資料更新成功')
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
  },
  watch: {}
}
</script>
<style lang="scss" scoped>
.noneborder {
  background-color: transparent;
  border: none;
}
hr {
  width: 100%;
  border-width: 1px;
  border-color: #000000;
  margin: 10px 0;
}
.bo {
  width: 100%;
  padding: 20px;
  h2 {
    font-size: 2vw;
  }
  .botop {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin: 10px 0;
    height: 60px;
    .bento_filter {
      margin: 20px 0 0 0;
      button {
        margin: 0 10px;
        padding: 0 10px;
      }
    }
  }
}
</style>
