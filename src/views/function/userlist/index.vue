<template>
  <div class="content">
    <sideNav />
    <div class="company">
      {{ companyName }}
    </div>
    <div class="demo-input-suffix">
      <div class="top">
        <div class="search">
          选择姓名：
          <el-input
            placeholder="请输入姓名"
            v-model="params.keyword"  @input="changeGoods">
            <i slot="prefix" class="el-input__icon el-icon-search"></i>
          </el-input>
        </div>
        <div class="search">
          <button @click="handleEdit()">新增员工</button>
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
      prop="name"
      label="姓名">
    </el-table-column>
    <el-table-column
      prop="phone"
      label="电话号码">
    </el-table-column>
    <el-table-column
      prop="role"
      label="角色"
      width="120">
    </el-table-column>
    <el-table-column
      prop="searchDate"
      label="添加时间">
      <template slot-scope="scope">
        <p>{{ getTime(scope.row.searchDate) }}</p>
      </template>
    </el-table-column>
    <el-table-column
      prop="isMonitored"
      label="状态">
      <template slot-scope="scope">
        <el-switch
            v-model="scope.row.isMonitored" @change="stateChange(scope.row)">
        </el-switch>
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          @click="handleEdit(scope.row)" style="padding: 10px 15px;">编辑</el-button>
        <el-button
          type="danger"
          @click="handleDelete(scope.index,scope.row.id)" style="padding: 10px 15px;">删除</el-button>
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

  <!-- 编辑/新增员工弹窗 -->
  <el-dialog :title="handleTitle" :visible.sync="usershow" center :before-close="closehandle" width="480px">
  <el-form :model="form">
    <el-form-item label="员工姓名" :label-width="formLabelWidth" style="width: 335px;">
      <el-input v-model="form.name" ></el-input>
    </el-form-item>
    <el-form-item label="员工手机号" :label-width="formLabelWidth" style="width: 335px;">
      <el-input v-model="form.phone" ></el-input>
    </el-form-item>
    <el-form-item label="员工角色" :label-width="formLabelWidth">
      <el-select v-model="form.role" placeholder="请选择角色">
        <el-option label="员工" value="员工"></el-option>
        <el-option label="管理" value="管理"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="状态" :label-width="formLabelWidth">
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
  name: 'UserList',
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
          { name: '张三', phone: 138227826766, role: '员工',searchDate:1711597937000 ,isMonitored:false},
          { name: '张四', phone: 138227826766, role: '管理',searchDate:1711597937000 , isMonitored:true},
          { name: '张无', phone: 138227826766, role: '员工',searchDate:1711597937000 , isMonitored:false},
          { name: '张五', phone: 138227826766, role: '员工',searchDate:1711597937000 , isMonitored:false},
          { name: '张留', phone: 138227826766, role: '员工',searchDate:1711597937000 , isMonitored:false},
          { name: '张流', phone: 138227826766, role: '员工',searchDate:1711597937000 , isMonitored:false}
        ],
        currentPage4: 4,
        size:0,
        Timer: null,
        usershow: false,
        form: {
          name: '',
          phone: '',
          role: '',
          isMonitored:false
        },
        formLabelWidth: '120px',
        handleTitle:''
       }
  },
  created() {
  },
  methods: {
    indexMethod(index) {
      return `${index+1}/10`
    },
    async getGoodslist() {
      
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
    //新增、编辑员工
    handleEdit(val) {
      this.usershow = true
      console.log('val',val);
      if (val) {
        this.handleTitle = '编辑员工',
        this.form.name = val.name
        this.form.phone = val.phone
        this.form.role = val.role
        this.form.isMonitored=val.isMonitored
      } else {
        if (this.tableData.length < 10) {
          this.handleTitle='新增员工'
        } else {
          this.$message('人数超出限制了')
        }
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