<template>
  <div>
    <div>
      <el-input clearable v-model="jobLevel.name" prefix-icon="el-icon-plus" style="width: 250px;" size="small">
      </el-input>
      <el-select clearable size="small" v-model="jobLevel.titleLevel" placeholder="请选择">
        <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label"></el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-plus" size="small" @click="addJobLevel"></el-button>
    </div>
    <div style="margin-top: 10px;">
      <el-table ref="jobtitletable" :data="jobTitles" border stripe style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="职称名称" width="180">
        </el-table-column>
        <el-table-column prop="titleLevel" label="职称级别">
        </el-table-column>
        <el-table-column prop="createDate" label="创建时间">
        </el-table-column>
        <el-table-column prop="enabled" label="是否启用">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
            <el-tag type="danger" v-else>未启用</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-button style="margin-top: 10px;" type="danger" @click="deleteManyJobLevel">批量删除</el-button>
    </div>
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-tag type="primary">职称名称</el-tag>
      <el-input style="width: 250px;" size="small" v-model="updateJobLevel.name" autocomplete="off"></el-input><br>
      <el-tag type="primary">职称级别</el-tag>
      <el-select style="margin: 5px 0 5px 0;" size="small" v-model="updateJobLevel.titleLevel" placeholder="请选择">
        <el-option v-for="item in options" :key="item.label" :label="item.label" :value="item.label"></el-option>
      </el-select><br>
      <el-tag type="primary">是否启用</el-tag>
      <el-switch v-model="updateJobLevel.enabled" active-text="启用" inactive-text="禁用">
      </el-switch>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doUpdateJobLevel()">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'JobTitleManager',
    data() {
      return {
        jobLevel: {
          name: '',
          titleLevel: ''
        },
        updateJobLevel: {
          name: '',
          titleLevel: '',
          enabled: false
        },
        options: [{
          label: '骨灰级'
        }, {
          label: '正高级'
        }, {
          label: '副高级'
        }, {
          label: '中级'
        }, {
          label: '初级'
        }, {
          label: '员级'
        }],
        jobTitles: [],
        dialogFormVisible: false,
        confirmVisible: false
      }
    },
    methods: {
      addJobLevel() {
        this.$http.postRequest('/system/basic/job', this.$data.jobLevel).then(resp => {
          if (resp.status == 200) {
            this.jobLevel = {
              name: '',
              titleLevel: ''
            }
            this.initJobTitles();
          }
        });
      },
      deleteManyJobLevel() {
        let ids = '';
        let rows = this.$refs.jobtitletable.selection;
        for(var row of rows){
          ids += "," + row.id;
        }
        ids = ids.substring(1);
        this.$confirm('此操作永久删除' + rows.length + '个职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.deleteRequest("system/basic/jobs/" + ids).then(resp => {
            if (resp.status == 200) {
              this.initJobTitles();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      initJobTitles() {
        this.$http.getRequest('/system/basic/job').then(resp => {
          if (resp) {
            this.$data.jobTitles = resp;
          }
        });
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        // 回显
        Object.assign(this.$data.updateJobLevel, row);
      },
      doUpdateJobLevel() {
        this.$http.putRequest('/system/basic/job', this.$data.updateJobLevel).then(resp => {
          if (resp.status == 200) {
            this.updateJobLevel = {
              name: '',
              titleLevel: '',
              enabled: false
            }
            this.initJobTitles();
            this.$data.dialogFormVisible = false;
          }
        });
      },
      handleDelete(index, row) {
        this.$confirm('此操作将永久删除' + row.name + '职称, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.deleteRequest("system/basic/job/" + row.id).then(resp => {
            if (resp.status == 200) {
              this.initJobTitles();
            }
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      }
    },
    mounted() {
      this.initJobTitles();
    }
  }
</script>

<style>
</style>
