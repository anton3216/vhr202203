<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div>
        <el-input size="small" style="width: 300px" placeholder="请输入内容" v-model="emp.name">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="mini" type="primary" class="fa fa-paw">高级搜索</el-button>
      </div>
      <div>
        <el-button size="mini" type="success" class="fa fa-level-down">导入</el-button>
        <el-button size="mini" type="success" class="fa fa-level-up">导出</el-button>
        <el-button size="mini" type="primary" class="fa fa-plus">添加员工</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <div style="margin-bottom: 10px">
        <el-table :data="emps" border height="550px" style="width: 100%">
          <el-table-column fixed prop="name" label="员工姓名" width="85">
          </el-table-column>
          <el-table-column prop="gender" label="性别" width="65">
          </el-table-column>
          <el-table-column prop="idCard" label="身份证号" width="180">
          </el-table-column>
          <el-table-column prop="wedlock" label="婚否" width="65">
          </el-table-column>
          <el-table-column prop="nation.name" label="民族" width="65">
          </el-table-column>
          <el-table-column prop="nativePlace" label="籍贯" width="85">
          </el-table-column>
          <el-table-column prop="politicsstatus.name" label="政治面貌" width="85">
          </el-table-column>
          <el-table-column prop="email" label="邮箱" width="180">
          </el-table-column>
          <el-table-column prop="phone" label="联系方式" width="150">
          </el-table-column>
          <el-table-column prop="address" label="住址" width="200">
          </el-table-column>
          <el-table-column prop="department.name" label="部门" width="90">
          </el-table-column>
          <el-table-column prop="jobLevel.name" label="职称" width="120">
          </el-table-column>
          <el-table-column prop="position.name" label="职位" width="115">
          </el-table-column>
          <el-table-column prop="engageForm" label="聘用方式" width="95">
          </el-table-column>
          <el-table-column prop="tiptopDegree" label="最高学历" width="85">
          </el-table-column>
          <el-table-column prop="specialty" label="专业" width="120">
          </el-table-column>
          <el-table-column prop="school" label="学校" width="120">
          </el-table-column>
          <el-table-column prop="beginDate" label="入职日期" width="120">
          </el-table-column>
          <el-table-column prop="workState" label="工作状态" width="120">
          </el-table-column>
          <el-table-column prop="workID" label="工号" width="120">
          </el-table-column>
          <el-table-column prop="contractTerm" label="合同期限" width="120">
          </el-table-column>
          <el-table-column prop="conversionTime" label="转正日期" width="120">
          </el-table-column>
          <el-table-column prop="workState" label="工作状态" width="120">
          </el-table-column>
          <el-table-column prop="notWorkDate" label="离职日期" width="120">
          </el-table-column>
          <el-table-column prop="beginContract" label="合同生效日期" width="120">
          </el-table-column>
          <el-table-column prop="endContract" label="合同终止日期" width="120">
          </el-table-column>
          <el-table-column prop="workAge" label="工龄" width="120">
          </el-table-column>
          <el-table-column label="操作" width="220">
            <template slot-scope="scope">
              <el-button style="padding: 3px 7px;" @click="handleClick(scope.row)" type="primary" size="mini">编辑
              </el-button>
              <el-button style="padding: 3px 7px;" @click="handleClick(scope.row)" size="mini">查看更多信息</el-button>
              <el-button style="padding: 3px 7px;" type="danger" size="mini">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="display: flex;justify-content: space-between">
        <div>
          <el-button size="mini" type="danger" class="fa fa-times">批量删除</el-button>
        </div>
        <div>
          <el-pagination background layout="total, sizes, prev, pager, next, jumper" :total="total" @current-change="pageChange">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EmpBasic',
  data () {
    return {
      emp: {
        name: ''
      },
      emps: [],
      total: 0
    }
  },
  methods: {
    initEmps () {
      this.$http.getRequest('/employee/basic/emp').then(resp => {
        if (resp) {
          this.$data.emps = resp.data
          this.$data.total = resp.total
        }
      })
    },
    // 优化分页
    pageChange (currentPage) {
      this.$http.getRequest('/employee/basic/emp?page=' + currentPage + '&size=10').then(resp => {
        if (resp) {
          this.$data.emps = resp.data
          this.$data.total = resp.total
        }
      })
    }
  },
  mounted () {
    this.initEmps()
  }
}
</script>

<style>
</style>
