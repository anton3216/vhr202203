<template>
  <div style="width : 500px">
    <el-input size="mini" placeholder="输入关键字进行过滤" v-model="filterText">
    </el-input>
    <el-tree ref="tree" :data="depts" :props="defaultProps" node-key="id" :filter-node-method="filterNode"
             :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }" style="width : 100%">
        <span>{{ node.label }}</span>
        <span>
          <el-button size="mini" type="primary" @click="() => append(data)" class="treebutton">
            添加部门
          </el-button>
          <el-button size="mini" type="danger" @click="() => remove(node, data)" class="treebutton">
            删除部门
          </el-button>
        </span>
      </span>
    </el-tree>

    <el-dialog title="添加部门" :visible.sync="dialogFormVisible" width="500px">
      <el-tag type="warning">上级部门</el-tag>
      <el-input style="margin-bottom: 10px;width: 180px" v-model="department.parentId" disabled
                autocomplete="off"></el-input>
      <br>
      <el-tag type="warning">部门名称</el-tag>
      <el-input style="width: 180px" placeholder="请输入部门名称..." v-model="department.name" autocomplete="off"></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doInsert">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'DeptManager',
  data () {
    return {
      filterText: '',
      depts: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      dialogFormVisible: false,
      department: {
        parentId: 0,
        name: ''
      }
    }
  },
  methods: {
    initDept () {
      this.$http.getRequest('system/basic/dept').then(resp => {
        if (resp) {
          this.$data.depts = resp
        }
      })
    },
    filterNode (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },
    append (data) {
      this.$data.dialogFormVisible = true
      this.$data.department.parentId = data.id
    },
    doInsert () {
      this.$http.postRequest('system/basic/dept', this.$data.department).then(resp => {
        if (resp) {
          this.initDept()
          this.$data.dialogFormVisible = false
        }
      })
    },
    remove (node, data) {
      this.$http.deleteRequest('system/basic/dept/' + data.id).then(resp => {
        if (resp) {
          this.initDept()
          this.$data.dialogFormVisible = false
        }
      })
    }
  },
  mounted () {
    this.initDept()
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    }
  }
}
</script>

<style>
.treebutton {
  padding: 3px 7px;
}
</style>
