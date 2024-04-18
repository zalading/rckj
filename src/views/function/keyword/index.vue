<template>
  <div class="content">
    <sideNav />
    <div class="company">
      {{ companyName }}有限公司
    </div>
    <div class="demo-input-suffix">
      <div class="top">
        <!-- <div class="search">
          选择关键词：
          <el-input
            placeholder="请输入关键词"
            v-model="params.keyword"  @input="changeGoods">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div> -->
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
    height="760"
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
      prop="lowestPrice"
      label="低价">
    </el-table-column>
    <el-table-column
      prop="merchantCount"
      label="商家数量">
    </el-table-column>
    <el-table-column
      prop="productCount"
      label="商品数量">
    </el-table-column>
    <el-table-column
      prop="productSales"
      label="商品销量">
    </el-table-column>
    <el-table-column
      prop="linkMonitorCount"
      label="链接监控数量">
    </el-table-column>
    <el-table-column
      prop=" createTime"
      label="创建时间">
      <template slot-scope="scope">
        <p>{{ getTime(scope.row.createTime)}}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="updateTime"
      label="更新时间">
      <template slot-scope="scope">
        <p>{{ getTime(scope.row.updateTime)  }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="linkUpCount"
      label="监控链接上架数量">
    </el-table-column>
    <el-table-column
      prop="linkDownCount"
      label="监控链接下架数量">
    </el-table-column>
    <el-table-column
      prop="status"
      label="状态">
      <template slot-scope="scope">
        <el-switch disabled :active-value="1" :inactive-value="0"
            v-model="scope.row.status" @change="stateChange(scope.row)">
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
import { getInfoApi,statisticsApi } from '@/apis/user'
import store from '@/store'
export default {
  name: 'KeyWord',
    data() {
      return {
        companyName:store.getters.companyName,
        total: 0,
        params: {
          userId: store.getters.id
        },
        loading:false,
        tableData: [
          { keyword: '欣善怡', merchantCount: 233, productCount: '575',productSales:712779,linkMonitorCount:19,createTime:[2024,4,7], updateTime:[2024,4,7],status:1},
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
  async created() {
    await this.getStatistics()
    this.getGoodslist()
  },
  methods: {
    //统计数据
    async getStatistics() {
      await statisticsApi({ userId: store.getters.id })
    },
    //时间处理
    getTime(time) {
      if (time) {
        return time.slice(0,3).join('/')
      }
    },
    indexMethod(index) {
      return `${index+1}`
    },
    async getGoodslist() {
      const res = await getInfoApi(this.params)
      this.tableData=res
    },
     changeGoods() {
       clearTimeout(this.Timer)
         this.Timer = setTimeout(async() => {
             this.getGoodslist()
         },300)
    },
    //状态变化
    stateChange(val) {
      console.log('statechange',val);
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