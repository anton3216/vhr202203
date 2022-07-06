<template>
  <div>
    <div style="display: flex;justify-content: space-between">
      <div>
        <el-input size="small" style="width: 300px" placeholder="请输入内容" v-model="emp.name" @keyup.enter.native="search">
          <i slot="prefix" class="el-input__icon el-icon-search"></i>
        </el-input>
        <el-button size="mini" type="primary" class="fa fa-paw">高级搜索</el-button>
      </div>
      <div>
        <el-button size="mini" type="success" class="fa fa-level-down">导入</el-button>
        <el-button size="mini" type="success" class="fa fa-level-up">导出</el-button>
        <el-button size="mini" type="primary" class="fa fa-plus" @click="addEmp">添加员工</el-button>
      </div>
    </div>
    <div style="margin-top: 10px">
      <div style="margin-bottom: 10px">
        <el-table :data="emps" border height="550px" style="width: 100%">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
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
          <el-table-column prop="birthday" label="出生日期" width="150">
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
          <el-pagination ref="page" background layout="total, sizes, prev, pager, next, jumper" :total="total"
                         @current-change="pageChange" @size-change="sizeChange">
          </el-pagination>
        </div>
      </div>
    </div>

    <el-dialog title="添加员工" :visible.sync="dialogVisible" width="80%">
      <el-row>
        <el-col :span="6">
          <span>姓名:</span>
          <span>
            <el-input size="small" placeholder="请输入员工姓名" v-model="emp.name" class="addInput"></el-input>
          </span>
        </el-col>
        <el-col :span="6">
          <span>联系方式:</span>
          <span>
            <el-input size="small" placeholder="请输入员工姓名" v-model="emp.phone" class="addInput"></el-input>
          </span>
        </el-col>
        <el-col :span="4" style="padding-top: 5px">
          <span>性别:</span>
          <span>
             <el-radio-group v-model="emp.gender" class="addInput">
              <el-radio label="男">男</el-radio>
              <el-radio label="女">女</el-radio>
            </el-radio-group>
          </span>
        </el-col>
        <el-col :span="8" style="padding-top: 5px">
          <span>婚否:</span>
          <span>
             <el-radio-group v-model="emp.wedlock">
              <el-radio label="已婚">已婚</el-radio>
              <el-radio label="未婚">未婚</el-radio>
              <el-radio label="离异">离异</el-radio>
            </el-radio-group>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="4">
          <span>民族:</span>
          <span>
            <el-select size="small" v-model="emp.nation.id" placeholder="请选择">
              <el-option v-for="item in nations" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </span>
        </el-col>
        <el-col :span="4">
          <span>部门:</span>
          <span>
            <el-select size="small" v-model="emp.department.id" placeholder="请选择">
              <el-option v-for="item in depts" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </span>
        </el-col>
        <el-col :span="4">
          <span>职位:</span>
          <span>
            <el-select size="small" v-model="emp.position.id" placeholder="请选择">
              <el-option v-for="item in positions" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </span>
        </el-col>
        <el-col :span="4">
          <span>职称:</span>
          <span>
            <el-select size="small" v-model="emp.jobLevel.id" placeholder="请选择">
              <el-option v-for="item in jobs" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </span>
        </el-col>
        <el-col :span="4">
          <span>政治面貌:</span>
          <span>
            <el-select size="small" v-model="emp.politicsstatus.id" placeholder="请选择">
              <el-option v-for="item in politicsstatuss" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </span>
        </el-col>
        <el-col :span="4">
          <span>最高学历:</span>
          <span>
            <el-select size="small" v-model="emp.tiptopDegree" placeholder="请选择">
              <el-option v-for="item in degrees" :key="item.id" :label="item.name" :value="item.id">
              </el-option>
            </el-select>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="6">
          <span>邮箱:</span>
          <span>
            <el-input size="small" placeholder="请输入员工姓名" v-model="emp.email" class="addInput"></el-input>
          </span>
        </el-col>
        <el-col :span="6">
          <span>学校:</span>
          <span>
            <el-input size="small" placeholder="请输入员工姓名" v-model="emp.school" class="addInput"></el-input>
          </span>
        </el-col>
        <el-col :span="6">
          <span>专业:</span>
          <span>
            <el-input size="small" placeholder="请输入专业" v-model="emp.specialty" class="addInput"></el-input>
          </span>
        </el-col>
        <el-col :span="6">
          <span>籍贯:</span>
          <span>
            <el-input size="small" placeholder="请输入住址" v-model="emp.nativePlace" class="addInput"></el-input>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" style="padding-top: 5px">
          <span>聘用方式:</span>
          <span>
             <el-radio-group v-model="emp.engageForm">
              <el-radio label="劳务合同">劳务合同</el-radio>
              <el-radio label="劳动合同">劳动合同</el-radio>
            </el-radio-group>
          </span>
        </el-col>
        <el-col :span="8">
          <span>身份证号:</span>
          <span>
            <el-input size="small" placeholder="请输入身份证号" v-model="emp.idCard" style="width:200px"></el-input>
          </span>
        </el-col>
        <el-col :span="8">
          <span>住址:</span>
          <span>
            <el-input size="small" placeholder="请输入住址" v-model="emp.address"  style="width:220px"></el-input>
          </span>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <span>合同起始日期:</span>
          <el-date-picker size="small" v-model="emp.beginContract" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="8">
          <span>合同结束日期:</span>
          <el-date-picker size="small" v-model="emp.endContract" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
        <el-col :span="8">
          <span>出生日期:</span>
          <el-date-picker size="small" v-model="emp.birthday" type="date" placeholder="选择日期"></el-date-picker>
        </el-col>
      </el-row>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'EmpBasic',
  data () {
    return {
      emp: {
        name: '陈静',
        gender: '女',
        birthday: '1989-01-31',
        beginContract: '1989-01-31',
        endContract: '1989-01-31',
        idCard: '421288198902011234',
        wedlock: '已婚',
        nationId: 1,
        nativePlace: '海南',
        politicId: 1,
        email: 'chenjing@qq.com',
        phone: '18795556693',
        address: '海南省海口市美兰区',
        departmentId: 91,
        jobLevelId: 12,
        posId: 29,
        engageForm: '劳动合同',
        tiptopDegree: '高中',
        specialty: '市场营销',
        school: '武汉大学',
        department: {
          id: 91
        },
        nation: {
          id: 1
        },
        jobLevel: {
          id: 12
        },
        politicsstatus: {
          id: 1
        },
        position: {
          id: 29
        }
      },
      emps: [],
      total: 0,
      size: 0,
      currentPage: 0,
      dialogVisible: false
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
      let size = this.$data.size
      if (size === 0) {
        size = 10
      }
      this.$http.getRequest('/employee/basic/emp?page=' + currentPage + '&size=' + size + '&name=' + this.$data.emp.name).then(resp => {
        if (resp) {
          this.$data.emps = resp.data
          this.$data.total = resp.total
          this.$data.currentPage = currentPage
        }
      })
    },
    sizeChange (size) {
      let page = this.$refs.page
      this.$http.getRequest('/employee/basic/emp?page=' + page.currentPage + '&size=' + size).then(resp => {
        if (resp) {
          this.$data.emps = resp.data
          this.$data.total = resp.total
          this.$data.size = size
        }
      })
    },
    search () {
      let name = this.$data.emp.name
      let size = this.$data.size
      if (size === 0) {
        size = 10
      }
      this.$http.getRequest('/employee/basic/emp?size=' + size + '&name=' + name).then(resp => {
        if (resp) {
          this.$data.emps = resp.data
          this.$data.total = resp.total
        }
      })
    },
    addEmp () {
      this.$data.dialogVisible = true
    }
  },
  mounted () {
    this.initEmps()
  }
}
</script>

<style>
.addInput {
  width: 150px;
}

.el-col {
  margin-bottom: 10px;
}

.el-select {
  width : 80px
}
</style>
