<template>
  <div class="content">
    <sideNav />
    <div class="company">
      {{ companyName }}
    </div>
    <div class="demo-input-suffix">
      <div class="top">
        <div class="search">
          选择关键词：
          <el-input
            placeholder="请输入关键词"
            v-model="params.keyword"  @input="changeGoods">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="search">
          <!-- <button @click="handleEdit()">新增关键词</button> -->
        </div>
      </div>
    </div>
    <el-table
    :data="tableData"
    style="width: 100%;margin-bottom: 20px;"
    row-key="id"
    v-loading="loading"
    height="660"
    :cell-style="{'text-align':'center'}"
    :header-cell-style="{'text-align':'center'}"
    border>
    <el-table-column
      type="index"
      width="100"
      :index="indexMethod">
      
    </el-table-column>
    <el-table-column
      prop="keyword"
      label="关键词">
    </el-table-column>
    <el-table-column
      prop="shopNum"
      label="商家数量">
    </el-table-column>
    <el-table-column
      prop="productNum"
      label="商品数量">
    </el-table-column>
    <el-table-column
      prop="productDel"
      label="商品销量">
    </el-table-column>
    <el-table-column
      prop="jiank"
      label="链接监控数量">
    </el-table-column>
    <el-table-column
      prop="isMonitored"
      label="状态">
      <template slot-scope="scope">
        <el-switch disabled
            v-model="scope.row.isMonitored" @change="stateChange(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    <!-- <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          @click="handleEdit(scope.row)" style="padding: 10px 15px;">编辑</el-button>
        <el-button
          type="danger"
          @click="handleDelete(scope.index,scope.row.id)" style="padding: 10px 15px;">删除</el-button>
      </template>
    </el-table-column> -->
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

  <!-- 编辑/新增员工弹窗 -->
  <el-dialog :title="handleTitle" :visible.sync="usershow" center :before-close="closehandle" width="450px">
  <el-form :model="form">
    <el-form-item label="关键词" :label-width="formLabelWidth">
      <el-input v-model="form.keyword"  style="width: 280px;"></el-input>
    </el-form-item>
    <el-form-item label="状态" :label-width="formLabelWidth" >
      <el-switch
        v-model="form.isMonitored">
</el-switch>
    </el-form-item>
  </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="closehandle" style="padding: 10px 15px;">取 消</el-button>
    <el-button type="primary" @click="usershow = false" style="padding: 10px 15px;">确 定</el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>

export default {
  name: 'KeyWord',
    data() {
      return {
        companyName:'欣善怡有限公司',
        total: 0,
        params: {
          page: 1,
          size: 10
        },
        loading:false,
        tableData: [
          { keyword: '欣善怡', shopNum: 233, productNum: '575',productDel:712779,jiank:19, isMonitored:true},
          // { keyword: '欣善怡麦片', shopNum:45, productNum: '564', productDel:778,jiank:10, isMonitored:true},
          // { keyword: '欣善怡燕麦块', shopNum:45,productNum: '345',productDel:778, jiank:10, isMonitored:false},
          // { keyword: '欣善怡燕麦饼干', shopNum:45, productNum: '345', productDel:778,jiank:10, isMonitored:true},
          // { keyword: '欣善怡麦片无糖', shopNum:45, productNum: '345', productDel:778,jiank:10, isMonitored:true},
        ],
        currentPage4: 4,
        size:0,
        Timer: null,
        usershow: false,
        form: {
          keyword: '',
          isMonitored:false
        },
        formLabelWidth: '80px',
        handleTitle:''
       }
  },
  created() {
  },
  methods: {
    indexMethod(index) {
      return `${index+1}`
    },
    async getGoodslist() {
      
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
         this.Timer = setTimeout(async() => {
             this.getGoodslist()
         },300)
    },
    //新增、编辑关键词
    handleEdit(val) {
      this.usershow = true
      console.log('val',val);
      if (val) {
        this.handleTitle = '编辑关键词',
        this.form.keyword = val.keyword
        this.form.isMonitored=val.isMonitored
      } else {
          this.handleTitle='新增关键词'
     }
    },
    //关闭弹窗
    closehandle() {
      this.usershow = false
      this.form={
          name: '',
          phone: '',
          role: '',
          isMonitored:false
        }
    },
    //删除员工
    handleDelete(index,id) {
      this.$confirm('确认删除？').then(() => {
        console.log('删除成功', id);
        this.tableData.splice(index, 1)
        this.$message('删除成功')
      }).catch(()=>{})
    }
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
  background-repeat: no-repeat;     
  background-size: 100% 100%;
  background-color: #0c234d;
  padding:20px;
  .company{
    color: #fff;
    margin-left: 100px;
    height: 70px;
    font-size: 26px;
    font-weight: bolder;
    line-height: 54px;
  }
  .demo-input-suffix{
    display: flex;
    justify-content: space-between;
    margin-bottom: 13px;
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
      height: 36px;
      border-radius: 5px;
      background-color: #3db3eb;
      text-align: center;
      color: #fff;
      border: none;
      
    }
  }
  .el-form .el-input{
    margin-bottom: 15px;
  }
  .block{
    padding: 20px;
    display: flex;
    justify-content: end;
  }
}
</style>