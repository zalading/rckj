<template>
  <div class="content">
    <sideNav />
    <div class="demo-input-suffix">
      <div class="top">
        <div class="search">
          选择关键词：
          <el-select v-model="params.keyword" placeholder="请选择关键词" @change="changeGoods">
              <el-option
                v-for="item in optionkeyword"
                :key="item"
                :label="item"
                :value="item" style="text-align: center;">
              </el-option>
            </el-select>
        </div>
        <div class="search">
          选择平台：
          <el-select v-model="params.site" placeholder="请选择平台" @change="changeGoods">
              <el-option
                v-for="item in optionsite"
                :key="item"
                :label="item"
                :value="item" style="text-align: center;">
              </el-option>
            </el-select>
        </div>
        <div class="search">
          选择地区：
          <el-select v-model="params.location" placeholder="请选择地区" @change="changeGoods">
              <el-option
                v-for="item in options"
                :key="item"
                :label="item"
                :value="item" style="text-align: center;">
              </el-option>
            </el-select>
        </div>
        <!-- <button @click="sortPrice" style="margin:0 15px">价格排序</button> -->
        
      </div>
      <!-- <button @click="exportExcel">导出当页文件</button> -->
    </div>
    <div class="demo-input" style="position: relative;">
      (默认升序)
      <button @click="sortPrice(0)" style="margin:0 15px">价格升序 <img src="@/assets/up.png" alt=""></button>
      <button @click="sortPrice(1)" style="margin:0 15px">价格降序 <img src="@/assets/down.png" alt=""></button>
      <!-- <i class="el-icon-d-caret" @click="sortPrice"></i> -->
      <div class="search">
          价格区间：<input type="number" v-model.number="minPrice" placeholder="最小价格" /> &nbsp;-&nbsp;
                    <input type="number" v-model.number="maxPrice" placeholder="最大价格" />
                    <button @click="filterPrice">筛选</button>
      </div>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="numIid"
    v-loading="loading"
    :row-class-name="getRowClass"
    height="730"
    :cell-style="{'text-align':'center'}"
    :header-cell-style="{'text-align':'center'}"
    border >
    <el-table-column type="expand" >
        <template slot-scope="{ row }" >
          <el-table :data="row.productData" style="width: 100%" v-if="row.productData&&row.productData.length > 0">
            <el-table-column prop="site" label="平台"></el-table-column>
            <el-table-column prop="skuPropertiesName" label="sku标题"></el-table-column>
            <el-table-column prop="skuPrice" label="到手价"></el-table-column>
            <el-table-column prop="skuOrginalPrice" label="原价"></el-table-column>
            <el-table-column prop="quantity" label="库存数量"></el-table-column>
            <el-table-column prop="location" label="发货地址"></el-table-column>
            <el-table-column prop="secacheDate" label="搜索时间">
              <template slot-scope="scope">
              <p>{{ getTime(scope.row.secacheDate) }}</p>
            </template>
            </el-table-column>
          </el-table>
        </template>
    </el-table-column>
    <el-table-column
      prop="site"
      label="平台"
      width="100">
    </el-table-column>
    <el-table-column
      prop="imgUrl"
      label="商品图片"
      width="110">
      <template slot-scope="scope">
        <a :href="scope.row.detailUrl" target="_blank">
          <img src="@/assets/imgerro.jpg" alt="" v-if="!scope.row.imgUrl" min-width="80" height="80">
          <img :src="scope.row.imgUrl" min-width="80" height="80" @error=handleImageError v-else /> 
        </a>
      </template>
    </el-table-column>
    <el-table-column
      prop="price"
      label="最新商品价格"
      width="130">
      <template slot-scope="scope">
        {{ scope.row.price }}
      </template>
    </el-table-column>
    <el-table-column
      prop="location"
      label="地区"
      width="120">
    </el-table-column>
    <el-table-column
      prop="shop"
      label="店铺名称">
      <template slot-scope="scope">
        <a :href="scope.row.shopUrl" target="_blank" style="text-decoration: none; color: #606266;">
           <p >{{ scope.row.shop }}</p> 
        </a>
      </template>
    </el-table-column>
    <el-table-column
      prop="title"
      label="商品标题">
    </el-table-column>
    <el-table-column
      prop="deal"
      label="付款人数"
      width="110">
    </el-table-column>
    <el-table-column
      label="预估销售额">
      <template slot-scope="scope">
        <p>{{Allsale(scope.row)}}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="searchDate"
      label="最新搜索时间" >
      <template slot-scope="scope">
        <p>{{ getTime(scope.row.searchDate) }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="isMonitored"
      label="监控状态">
      <template slot-scope="scope">
        <el-switch
            v-model="scope.row.isMonitored" @change="stateChange(scope.row)">
        </el-switch>
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
      :total="total" >
    </el-pagination>
  </div>
  </div>
</template>

<script>
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { AllGoodsApi,updataGoodApi } from '@/apis/goods'
import { getInfoApi } from '@/apis/user'
import store from '@/store'
export default {
  name: 'GoodsAlayse',
  props:['name'],
    data() {
      return {
        hasChildren: true,
        loading:true,
        params: {
          page: 1,
          size: 10,
          keywordAll:store.getters.keywordAll,
          sort:0
        },
        total: 0,
        size:0,
        getlist:[], //全部数据列表
        currentPage4: 4,
        lowerPrice: 0, //最低价
        searchValue: '', //搜索的数据
        Timer: null, //定时器
        tableData: [],
        options:['全部','安徽','澳门','北京','重庆','福建','甘肃','广东','广西','贵州','海南','河北','河南','黑龙江','湖北','湖南','吉林','江苏','江西','辽宁','内蒙古','宁夏','青海','上海','陕西','山东','山西','四川','台湾','天津', '西藏','香港','新疆','云南','浙江'],  //选择地区下拉框
        optionsite: ['全部', '淘宝', '京东', '拼多多'],
        optionkeyword: ['全部'],
        minPrice: null,
        maxPrice:null
        
      }
  },
  created() {
    console.log('this.$route.params',this.$route.params);
    if (this.$route.params.location&&this.$route.params.wordprice) {
      this.params.location = this.$route.params.location
      this.params.keyword = this.$route.params.keyword
      this.minPrice=0
      this.maxPrice=this.$route.params.wordprice
      this.params.priceRange = this.minPrice+','+this.maxPrice
    } else if (this.$route.params.location && this.$route.params.wordprice2) {
      this.params.location = this.$route.params.location
      this.params.keyword = this.$route.params.keyword
      this.minPrice=this.$route.params.wordprice2
      this.params.priceRange = this.minPrice
    }
    else if (this.$route.params.location && !this.$route.params.wordprice) {
      this.params.location = this.$route.params.location
      this.params.keyword = this.$route.params.keyword
    }
    if (this.$route.params.rangeprice) {
      this.params.keyword = this.$route.params.keyword
      this.minPrice=this.$route.params.rangeprice.slice(1).split('~')[0]
      this.maxPrice = this.$route.params.rangeprice.slice(1).split('~')[1]
      this.params.priceRange = this.minPrice+','+this.maxPrice
      console.log('his.$route.params.wordprice', this.minPrice);
    }
    this.getinfo()
    
  },
  methods: {
    //获取关键词
     async getinfo() {
       const res = await getInfoApi({ userId: store.getters.id })
        res.forEach(item => {
          this.optionkeyword.push(item.keyword)
          this.key=item.keyword
        })
      this.getGoodslist()
     },
    //时间戳转换
    getTime(time) {
      if (time) {
        let date = new Date(time)
        if (date) {
          return date.toLocaleDateString().replace(/\//g, "-") + " " + date.toTimeString().substr(0, 8);
        } else {
          return
        }
      }
    },
    Allsale(row) {
      return (row.deal*row.price).toFixed(2)
    },
    async getGoodslist() {
      
      // this.params.keyword=this.key
      // console.log('this.params',this.key);
      const res = await AllGoodsApi(this.params)
      this.tableData = res.list
      this.total=res.total
      this.size = res.size
      this.loading=false
    },
    //价格排序
    sortPrice() {
      console.log('this.params.sort',this.params.sort);
      if (this.params.sort === 0) {
        this.params.sort=1
      } else {
        this.params.sort=0
      }
      this.getGoodslist()
    },
    //获取滑块的值
    async stateChange(val) {
      let sort=''
      if (val.isMonitored ==true) {
        sort='1'
      } else {
        sort='0'
      }
       await updataGoodApi({
         numIid: val.uniqueHashId,
         isOFF:sort
       })
       this.$message({message:'链接监控状态更改成功',type:'success'})
       
         this.getGoodslist()
    },
    //隐藏没有子节点的展开图标
    getRowClass({row}) {
      if (!row.productData||row.productData.length==0) {
        return 'icon-no'
      }
    },
    //价格区间查找
    filterPrice() {
      if (!this.minPrice && !this.maxPrice) {
        this.$message('请输入价格范围')
      } else if (this.maxPrice&&this.minPrice > this.maxPrice) {
        this.$message('请输入正确的价格区间')
      } else if (this.minPrice && !this.maxPrice) {
        this.params.priceRange=this.minPrice
      } else if (!this.minPrice && this.maxPrice) {
        this.params.priceRange='0,'+this.maxPrice
      } else if (this.minPrice == this.maxPrice) {
        this.params.priceRange=this.minPrice+','+this.maxPrice
      }else {
        this.params.priceRange=this.minPrice+','+this.maxPrice
      }
      console.log('this.minprice',this.minPrice);
      console.log('this.maxprice',this.maxPrice);
      console.log('this.params.priceRange', this.params.priceRange);
      this.getGoodslist()
    },
    handleSizeChange(val) {
      this.params.size = val
      this.getGoodslist()
    },
    handleCurrentChange(val) {
      this.params.page = val
      this.getGoodslist()
    },
     changeGoods() {
       clearTimeout(this.Timer)
       if (this.params.location === '全部') {
         this.params.location=''
       }
       if (this.params.site === '全部') {
          this.params.site=''
       } 
       if (this.params.keyword === '全部') {
          this.params.keyword=''
        }
        this.Timer = setTimeout(async () => {
           this.getGoodslist()
          },300)
    },
    //图片路径错误时换成指定图片
    handleImageError(e) {
      e.srcElement.src = require("@/assets/imgerro.jpg");
    },

    //Excel表格导出功能
     exportExcel() {
      const data = [[
        '平台',
        '商品图片',
        '商品价格',
        '地区',
        '店铺名称',
        '商品标题',
        '付款人数',
        '商品详情',
        '店铺链接',
        '搜索时间',
        '监控状态'
       ]]
      
       this.tableData.forEach(item => {
        //  if (item.productData) {
        //   data.push([item.date,item.name,item.address])
        //    for (let i = 0; i < item.children.length; i++){
        //     console.log(i);
        //      data.push([item.children[i].date, item.children[i].name, item.children[i].address])
        //     console.log('push',data);
        //    }
        //  } else {
           data.push([item.site,item.imgUrl,item.price,item.location,item.shop,item.title,item.deal,item.detailUrl,item.shopUrl,item.secacheDate,item.isMonitored])
          // }
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
      saveAs(dataBlob, '商品信息详情表.xlsx');
    },

    }
  }
</script>


<style lang="scss" scoped>
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.content{
  background-image: url(@/assets/tablebgi.png); 
  width: 100%;   
  height: 100vh;  
  position: absolute;  
  // top: 0;   
  // left: 0;     
  background-repeat: no-repeat;     
  background-size: 100% 100%;
  background-color: #0c234d;
  padding:20px;
  .demo-input-suffix{
    padding-left: 40px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 10px;
    .el-input{
      width: 200px;
    }
    .top{
      display: flex;
      justify-content: space-between;
      color: #ccc;
      .search{
        display: flex;
        align-items: center;
        margin:0 20px;
        font-size: 16px;
        .lowerPrice{
        width: 70px;
        height: 36px;
        border: 1px solid #ccc;
        line-height: 36px;
        text-align: center;
        color: red;
        }
        input{
          width: 100px;
          height: 30px;
        }
        button{
          width: 70px;
          height: 30px;
          margin-left: 10px;
        }
      }
    }
    button{
      // width: 100px;
      height: 40px;
      padding: 0 15px;
      background-color: #3db3eb;
      text-align: center;
      color: #fff;
      border: none;
      
    }
  }
  .demo-input{
    padding-left: 89px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    color: #ccc;
    font-size: 12px;
    .search{
      padding-left: 8px;
        display: flex;
        align-items: center;
        margin:0 20px;
        font-size: 16px;
        .lowerPrice{
        width: 70px;
        height: 36px;
        border: 1px solid #ccc;
        line-height: 36px;
        text-align: center;
        color: red;
        }
        input{
          width: 100px;
          height: 30px;
        }
        button{
          width: 70px;
          height: 30px;
          margin-left: 10px;
          img{
            width: 11px;
            height: 9px;
          }
        }
      }
    button{
      height: 33px;
      padding: 0 10px;
      background-color: #3db3eb;
      text-align: center;
      color: #fff;
      border: none;
      &:active{
        background-color: #8aceee;
      }
    }
  }
  .el-icon-d-caret{
    position: absolute;
    bottom: -42px;
    left: 370px;
    color: #ad9399;
    z-index: 10;
  }
  .block{
    padding: 10px;
    display: flex;
    justify-content: end;
    ::v-deep .el-pagination__total{
      color: #ccc;
    }
    ::v-deep .el-pagination__jump{
      color: #ccc;
    }
  }
}
::v-deep .icon-no .el-table__expand-icon {
display: none;
}
// ::v-deep .el-select-dropdown__list{
//   text-align: center !important;
// }
// ::v-deep .el-select-dropdown__item{
//   text-align: center !important;
// }
.el-scrollbar .el-select-group__wrap ::v-deep .el-select-dropdown__item{
    text-align: center !important;
}
</style>