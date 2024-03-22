<template>
  <div class="content">
    <sideNav />
    <div class="demo-input-suffix">
      <div class="top">
        <div class="search">
      选择商品：
      <el-input
        placeholder="请输入内容"
        v-model="params.Keyword"  @input="changeGoods">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
        </div>
        <div class="search">
      选择平台：
      <el-input
        placeholder="请输入平台"
        v-model="params.site"  @input="changeGoods">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
      </el-input>
        </div>
        <div class="search">
      最低价：<div class="lowerPrice" v-if="searchValue">{{ lowerPrice }}</div>
      <div class="lowerPrice" v-else style="color: #ccc;font-size: 14px;">未显示</div>
        </div>
      </div>
      <button @click="exportExcel">导出文件</button>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    v-loading="loading"
    height="730"
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="brand"
      label="品牌"
      width="120">
    </el-table-column>
    <el-table-column
      prop="picUrl"
      label="商品图片"
      width="100">
      <template slot-scope="scope">
        <img :src="scope.row.picUrl" min-width="70" height="70" @error=handleImageError />
      </template>
    </el-table-column>
    
    <el-table-column
      prop="price"
      label="价格"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="orginalPrice"
      label="原始价格"
      sortable
      width="120">
    </el-table-column>
    <el-table-column
      prop="nick"
      label="店铺名称"
      width="280">
    </el-table-column>
    <el-table-column
      prop="title"
      label="商品标题"
      width="180">
    </el-table-column>
    <el-table-column
      prop="num"
      label="销量"
      width="180">
    </el-table-column>
    <el-table-column
      prop="detailUrl"
      label="商品网址">
      <template slot-scope="scope">
        <a :href="scope.row.detailUrl" target="_blank" class="buttonText" rel="noreferrer">{{scope.row.detailUrl}}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="zhuy"
      label="商店网址">
      <template slot-scope="scope">
        <a :href="scope.row.zhuy" target="_blank" class="buttonText" rel="noreferrer">{{scope.row.zhuy}}</a>
      </template>
    </el-table-column>
    <el-table-column
      prop="secacheDate"
      label="搜索时间">
      <template slot-scope="scope">
        <p>{{ getTime(scope.row.secacheDate) }}</p>
      </template>
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AllGoodsApi,searchGoodApi } from '@/apis/goods'

export default {
    name:'GoodsAlayse',
    data() {
      return {
        hasChildren: true,
        loading:true,
        params: {
          page: 1,
          size: 10
        },
        total: 0,
        size:0,
        getlist:[], //全部数据列表
        currentPage4: 4,
        lowerPrice: 0, //最低价
        searchValue: '', //搜索的数据
        Timer: null, //定时器
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '李四',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '张三',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '二哥',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
       
      }
  },
  created() {
    this.getGoodslist()
    this.getlist=this.zhejiang
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
    async getGoodslist() {
      const res = await AllGoodsApi(this.params)
      console.log(res);
      this.tableData = res.data.data.list
      this.total=res.data.data.total
      this.size = res.data.data.size
      this.loading=false
    },
    handleSizeChange(val) {
      this.params.size = val
      this.getGoodslist()
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getGoodslist()
      console.log(`当前页: ${val}`);
    },
     changeGoods() {
       clearTimeout(this.Timer)
       if (!this.params.Keyword && !this.params.site) {
        this.getGoodslist()
       } else {
         this.Timer = setTimeout(async() => {
           console.log(this.params);
           const res = await searchGoodApi(this.params)
           console.log(res);
           this.tableData = res.data.data.list
           this.total=res.data.data.total
           this.size = res.data.data.size
           this.loading=false
         },300)
      }
    },
    //图片路径错误时换成指定图片
    handleImageError(e) {
      e.srcElement.src = require("@/assets/imgerro.jpg");
    },

    //Excel表格导出功能
     exportExcel() {
      const data = [[
        '品牌',
        '商品图片',
        '价格',
        '原始价格',
        '店铺名称',
        '商品标题',
        '销量',
        '商品网址',
        '商店网址',
        '搜索时间'
       ]]
      
       this.tableData.forEach(item => {
         if (item.children) {
          data.push([item.date,item.name,item.address])
           for (let i = 0; i < item.children.length; i++){
            console.log(i);
             data.push([item.children[i].date, item.children[i].name, item.children[i].address])
            console.log('push',data);
           }
         } else {
           data.push([item.brand,item.picUrl,item.price,item.orginalPrice,item.nick,item.title,item.num,item.detailUrl,item.zhuy,item.secacheDate])
          }
         })
      console.log('data',data);
        // 将数据转换为工作表
      const worksheet = XLSX.utils.aoa_to_sheet(data);
      // 创建工作簿并添加工作表
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
      
      // 生成Excel文件并导出
      const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8' });
      saveAs(dataBlob, '商品信息.xlsx');
    },

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