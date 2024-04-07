<template>
  <div class="content">
    <sideNav />
    <div class="demo-input-suffix">
      <div class="top">
        <div class="search">
      选择商品：
      <el-input
        placeholder="请输入内容"
        v-model="searchValue"  @input="changeGoods">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
        </div>
        <div class="search">
      选择地区：
      <el-input
        placeholder="请输入内容"
        v-model="searchValue"  @input="changeGoods">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
        </div>
      </div>
      <button @click="exportExcel">导出文件</button>
    </div>
  <el-table
    :data="getlist"  
    height="730"
    border
    v-loading="loading"
    style="width: 100%"
    :header-cell-style="{'text-align':'center'}">
    <el-table-column
      prop="imgurl"
      label="商品图片"
      width="100">
      <template slot-scope="scope">
        <img :src="scope.row.img_url" min-width="70" height="70" @error=handleImageError />
      </template>
    </el-table-column>
    <el-table-column
      prop="url"
      label="店铺图片">
      <template slot-scope="scope">
        <a :href="scope.row.url" target="_blank" class="buttonText" rel="noreferrer">{{scope.row.url}}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="price"
      label="商品价格"
      width="180">
      <template slot-scope="scope">
       ￥{{  scope.row.price }}
      </template>
    </el-table-column>
    <el-table-column
      prop="search_date"
      label="搜索时间">
    </el-table-column>
    <el-table-column
      prop="shop"
      label="店铺名称">
    </el-table-column>
    <el-table-column
      prop="site"
      label="site">
    </el-table-column>
    <el-table-column
      prop="title"
      label="商品名称">
    </el-table-column>
    <el-table-column
      prop="search_date"
      label="搜索时间">
      <template slot-scope="scope">
        <p>{{ getTime(scope.row.search_date) }}</p>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[10, 15, 20, 30]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
// import axios from 'axios'
export default {
  name: 'SaleAlayse',
    props:['name'],
    data() {
      return {
        loading:false,
        getlist:[], //全部数据列表
        currentPage4: 4,
        lowerPrice: 0, //最低价
        searchValue: '', //搜索的数据
        Timer:null, //定时器
      }
  },
  created() {
   
    // this.getallList()
  },
  methods: {
    //时间戳转换
    getTime(time) {
      // eslint-disable-next-line no-undef
      let date = new Date(time)
      // console.log('date', date);
      if (date) {
        return date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
        
      } else {
        return
      }
    },
    async getallList() {
      // const res= await axios({
      //     url: 'http://192.168.1.84:9977',
      //     method: 'get',
      //   })
      // console.log(res);
      // this.loading=false
      // this.getlist = res.data.items
        console.log('this.getlist',this.getlist);
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    changeGoods() {
      clearTimeout(this.Timer)
      this.Timer = setTimeout(() => {
        if (this.searchValue === '') {
          this.getlist=this.zhejiang
        } else if (this.searchValue === '五粮醇') {
          this.getlist=this.wuliangye
        } else if(this.searchValue === '瑞幸咖啡') {
          this.getlist=this.coffee
        } else {
          console.log('没有该选项');
        }
      },300)
    },
    //图片路径错误时换成指定图片
    handleImageError(e) {
      e.srcElement.src = require("@/assets/imgerro.jpg");
    },
    //Excel表格导出功能
     exportExcel() {
      const data = [[
        '标题',
        '地址',
        '价格',
        '成交量',
        '店铺名称',
        '图片地址'
      ]]
        this.coffee.forEach(item => {
          data.push([item.title,item.location,item.price,item.del,item.shop,item.imgurl])
      })
        // 将数据转换为工作表
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      // 创建工作簿并添加工作表
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
      // 生成Excel文件并导出
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      saveAs(dataBlob, '商品信息.xlsx');
      }
    }
  }
</script>


<style lang="scss" scoped>
.content{
  padding:20px;
  .demo-input-suffix{
    padding-left: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
    .el-input{
      width: 200px;
    }
    .top{
      display: flex;
      justify-content: space-between;
      .search{
        display: flex;
        align-items: center;
        margin:0 20px;
        .lowerPrice{
        width: 70px;
        height: 36px;
        border: 1px solid #ccc;
        line-height: 36px;
        text-align: center;
        color: red;
      }
      }
    }
    button{
      width: 100px;
      height: 44px;
      background-color: #3db3eb;
      text-align: center;
      color: #fff;
      border: none;
    }
  }
  .block{
    padding: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>