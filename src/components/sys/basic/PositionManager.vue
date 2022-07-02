<template>
  <div>
    <div>
      <el-input style="width: 250px;" v-model="position.name" size="small" placeholder="添加职位..."
        prefix-icon="fa fa-plus-square"></el-input>
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addPosition"></el-button>
    </div>
    <div style="margin-top: 15px;">
      <el-table ref="positonsTable" :data="positions" stripe border style="width: 100%">
        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="id" label="编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column prop="createDate" label="日期">
        </el-table-column>
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
      <el-button style="margin-top: 10px;" type="danger" @click="deletePositionMany()">批量删除</el-button>
      <el-dialog title="修改职位" :visible.sync="dialogFormVisible">
        <el-tag type="warning">职位名称</el-tag>
        <el-input style="width: 150px;" size="small" v-model="updatePosition.name" placeholder="修改职位..." autocomplete="off"></el-input>
        <el-switch @change="doUpdatePosition()" v-model="updatePosition.enabled" active-text="启用" inactive-text="禁用">
        </el-switch>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="doUpdatePosition">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  // import axios from '../../../utils/axiosUtil.js';
  export default {
    name: 'PositionManager',
    data() {
      return {
        position: {
          name: ''
        },
        positions: [],
        dialogFormVisible: false,
        updatePosition: {
          name: '',
          enabled: false
        }
      }
    },
    methods: {
      initPosition() {
        this.$http.getRequest("system/basic/pos").then(resp => {
          if (resp) {
            this.$data.positions = resp;
          }
        });
      },
      addPosition() {
        this.$http.postRequest("system/basic/pos", this.$data.position).then(resp => {
          if (resp.status == 200) {
            this.$data.position.name = '';
            this.initPosition();
          }
        });
      },
      handleEdit(index, row) {
        this.dialogFormVisible = true;
        Object.assign(this.updatePosition, row);
      },
      doUpdatePosition() {
        this.$http.putRequest("system/basic/pos", this.updatePosition).then(resp => {
          if (resp.status == 200) {
            this.dialogFormVisible = false;
            this.updatePosition = {
              name: ''
            }
            this.initPosition();
          }
        });
      },
      handleDelete(index, row) {
        this.$http.deleteRequest("system/basic/pos/" + row.id).then(resp => {
          if (resp.status == 200) {
            this.initPosition();
          }
        });
      },
      deletePositionMany() {
        let ids = '';
        let rows = this.$refs.positonsTable.selection;
        rows.forEach(row => {
          ids += "," + row.id;
        });
        ids = ids.substring(1);
        this.$confirm('此操作将删除' + ids + '职位, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.deleteRequest("system/basic/pos/many/" + ids).then(resp => {
            if (resp.status == 200) {
              this.initPosition();
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
      this.initPosition();
    }
  }
</script>

<style>
</style>
