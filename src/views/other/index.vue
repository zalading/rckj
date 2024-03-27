<template>
  <div class="content">
  <el-table :data="tableData" style="width: 100%" :row-class-name="getRowClass">
    <el-table-column type="expand" >
        <template slot-scope="{ row }" >
          <el-table :data="row.children" style="width: 100%" v-if="row.children&&row.children.length > 0">
            <el-table-column prop="value" label="数值"></el-table-column>
            <el-table-column prop="name" label="姓名"></el-table-column>
          </el-table>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="姓名"></el-table-column>
      <el-table-column prop="date" label="日期"></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      
    </el-table>
  </div>
</template>

<script>
export default {
  name: 'map-chart',
    data() {
      return {
        tableData: [{
          id: 1,
          date: '2016-05-02',
          name: '王1',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          id: 2,
          date: '2016-05-04',
          name: '王2',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          id: 3,
          date: '2016-05-01',
          name: '王3',
          address: '上海市普陀区金沙江路 1519 弄',
          children: [{
              id: 31,
              date: '2016-05-01',
              name: '王31',
              value: 45
            }, {
              id: 32,
              date: '2016-05-01',
              name: '王32',
              value: 23
          }]
        }, {
          id: 4,
          date: '2016-05-03',
          name: '王4',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
  },
  methods: {
    getRowClass({row}) {
      if (!row.children||row.children.length==0) {
        return 'icon-no'
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.content{
  width: 100%;
  height: 100%;
  background-color: #a2c6ee;
}
::v-deep .icon-no .el-table__expand-icon {
	display: none;
}
</style>