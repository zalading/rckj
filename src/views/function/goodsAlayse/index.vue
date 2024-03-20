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
    border
    default-expand-all
    :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
    <el-table-column
      prop="date"
      label="日期"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      sortable
      width="180">
    </el-table-column>
    <el-table-column
      prop="address"
      label="地址">
    </el-table-column>
  </el-table>
  <div class="block">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage4"
      :page-sizes="[100, 200, 300, 400]"
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
export default {
    name:'GoodsAlayse',
    data() {
      return {
        getlist:[], //全部数据列表
        currentPage4: 4,
        lowerPrice: 0, //最低价
        searchValue: '', //搜索的数据
        Timer: null, //定时器
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }],
        zhejiang: [
        { title:'瑞幸拿铁咖啡速溶瑞星咖啡萃取液胶囊粒手冲生椰拿铁冰美式提神 咖啡 瑞星 咖啡',location: '浙江 温州', price: 127.7, del: 0, shop: '夸香特产直销', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星速溶咖啡瑞幸咖啡速溶粉瑞幸即溶咖啡元气弹冷萃冻干美式拿铁 瑞星 咖啡 咖啡 咖啡',location: '浙江 金华', price: 21, del: 0, shop: '尚展裕腾', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2215787740617/O1CN01cospJk1GQdE4CefRJ_!!2215787740617.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 嘉兴', price: 25.9, del: 4, shop: '发财树树陆店', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 5.5, del: 96, shop: '冰美式yyds', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 134, del: 96, shop: '美村集品食品专营店', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 35, del: 96, shop: '中国杭州妙瑞餐饮管理有限公司', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 温州', price: 127.7, del: 0, shop: '夸香特产直销', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 金华', price: 21, del: 0, shop: '尚展裕腾', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2215787740617/O1CN01cospJk1GQdE4CefRJ_!!2215787740617.jpg_580x580q90.jpg_.webp' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 嘉兴', price: 25.9, del: 4, shop: '发财树树陆店', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 5.5, del: 96, shop: '冰美式yyds', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 134, del: 96, shop: '美村集品食品专营店', imgurl: '' },
        { title:'瑞星咖啡优惠券瑞辛代下单非礼品卡卡券全国通用代下冰美式热拿铁 瑞星 咖啡',location: '浙江 杭州', price: 35, del: 96, shop: '中国杭州妙瑞餐饮管理有限公司', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' }
      ],
        wuliangye: [
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 999, del: 16, shop: '五粮浓香官方旗舰店', imgurl: 'https://img.alicdn.com/imgextra/i2/1106960035/O1CN01QaLAcm1C84g5ESj4P_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '辽宁 沈阳', price: 399, del: 68, shop: '酒富盛酩酒类专营店', imgurl: 'https://img.alicdn.com/imgextra/i2/120634331/O1CN01PgavvV1hreIDJ5HjR_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 25.9, del: 4, shop: '天猫超市', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/6000000003630/O1CN01XO9X0D1cgaePiynYt_!!6000000003630-0-sm.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 5.5, del: 96, shop: '五粮浓香官方旗舰店', imgurl: 'https://picasso.alicdn.com/imgextra/O1CNA1MBPOjT2MRRsY9qvuy_!!2207953779824-0-psf.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 134, del: 96, shop: '五粮浓香官方旗舰店', imgurl: 'https://picasso.alicdn.com/imgextra/O1CNA1GC4yhR2MRRsUW3Mzw_!!2207953779824-0-psf.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '江苏 南京', price: 35, del: 96, shop: '苏宁易购官方旗舰店', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2616970884/O1CN01xoqlQN1IOv2tV4r5u_!!0-item_pic.jpg_580x580q90.jpg_.webp' }
        ],
        coffee: [
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '福建 泉州', price: 999, del: 16, shop: 'Lantek兰泰克食品', imgurl: 'https://img.alicdn.com/imgextra/i4/314020065/O1CN011rlLuB1CLoUDxR5VH_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '福建 泉州', price: 399, del: 68, shop: 'Lantek兰泰克食品', imgurl: 'https://img.alicdn.com/imgextra/i1/314020065/O1CN0194jVQR1CLoZ2kHKGG_!!0-saturn_solar.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '广东 广州', price: 25.9, del: 4, shop: '天猫超市', imgurl: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i3/2070505646/O1CN01MC4moY1rZv6RmScFk_!!2070505646.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '浙江 温州', price: 5.5, del: 96, shop: '毛球美食优惠', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i4/2209424462113/O1CN01fKFbaS1RTnftdh5rJ_!!2209424462113.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '四川 宜宾', price: 134, del: 96, shop: '夸香特产直销', imgurl: 'https://g-search2.alicdn.com/img/bao/uploaded/i4/i1/2215864919718/O1CN01GZ6Unp2LetpxbPM8u_!!2215864919718.jpg_580x580q90.jpg_.webp' },
        { title:'宜宾五粮液股份出品五粮醇红淡雅浓香型42度白酒500ml*6收藏自饮 五粮醇',location: '江苏 苏州', price: 35, del: 96, shop: '发财树树陆店', imgurl: 'https://g-search3.alicdn.com/img/bao/uploaded/i4/i2/2616970884/O1CN01xoqlQN1IOv2tV4r5u_!!0-item_pic.jpg_580x580q90.jpg_.webp' },
        ],
      }
  },
  created() {
    this.getlist=this.zhejiang
  },
  methods: {
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