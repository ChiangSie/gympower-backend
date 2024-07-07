<template>
  <section class="bc">
    <h2>餐盒訂單管理</h2>
    <div class="bctop">
      <div class="bento_filter">
        <button>全部</button>
        <button>未取貨</button>
        <button>已完成訂單</button>
        <button>取消訂單</button>
      </div>
      <div class="bento_func">
        <Input class="search-input" search enter-button placeholder="搜尋" style="width: 300px" />
      </div>
    </div>
    <hr />
    <Table size="medium" :columns="columns" :data="BentoListData" border></Table>
  </section>
</template>
<script>
export default {
  data() {
    return {
      columns: [
        {
          title: '訂單日期',
          key: 'bento_date',
          align: 'center'
        },
        {
          title: '會員編號',
          key: 'bento_mem_id',
          align: 'center'
        },
        {
          title: '訂單編號',
          key: 'bento_id',
          align: 'center'
        },
        {
          title: '內容',
          key: 'bento_con',
          align: 'center'
        },
        {
          title: '總價',
          key: 'bento_total',
          align: 'center'
        },
        {
          title: '據點',
          key: 'bento_place',
          align: 'center'
        },
        {
          title: '備註',
          key: 'bento_note',
          align: 'center'
        },
        {
          title: '訂單狀態',
          key: 'bento_status',
          align: 'center'
        },
        {
          title: '操作',
          key: 'bento_operate',
          align: 'center'
        }
      ],
      BentoListData: []
    }
  },
  mounted() {
    // this.fetchData()
  },
  metheds: {
    fetchData() {
      fetch('http://localhost/api/get_bentolist.php', {
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
            this.BentoListData = json.data.list.map((item) => ({
              ...item,
              bento_status: parseInt(item.bento_status)
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
.bc {
  width: 100%;
  padding: 20px;
  h2 {
    font-size: 2vw;
  }
  .bctop {
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
    .bento_func {
      display: flex;
      flex-direction: row;
      gap: 15px;
      align-items: center;
    }
  }
}
</style>
