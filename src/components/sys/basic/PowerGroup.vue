<template>
  <div>
    <div>
      <el-input size="small" class="addRole" placeholder="请输入角色英文名称" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="small" class="addRole" placeholder="请输入角色中文名称" v-model="role.nameZh"></el-input>
      <el-button size="small" type="primary" @click="addRole">添加角色</el-button>
    </div>
    <div style="margin-top: 10px; width: 600px;">
      <el-collapse accordion v-model="activeNames" @change="changeChecked">
        <el-collapse-item :title="item.nameZh" :key="index" v-for="(item,index) in roles" :name="item.id">
          <div style="height:40px">
            可访问的资源
            <el-button size="mini" circle icon="el-icon-delete" @click="deleteRole(item.id)"
                       style="float: right;color: #f56c6c;"></el-button>
          </div>
          <div>
            <el-tree default-expand-all ref="tree" :data="menus" show-checkbox node-key="id"
                     :default-checked-keys="checkedIds"
                     :props="defaultProps">
            </el-tree>
            <div style="display: flex;justify-content: flex-end;">
              <el-button size="mini" @click="cancelUpdate">取消修改</el-button>
              <el-button size="mini" type="primary" @click="updateRole(item.id,index)">确认修改</el-button>
            </div>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PowerGroup',
  data () {
    return {
      role: {
        name: '',
        nameZh: ''
      },
      activeNames: '',
      roles: '',
      menus: [],
      defaultProps: {
        children: 'children',
        label: 'name',
        id: 'id'
      },
      checkedIds: []
    }
  },
  methods: {
    initRoles () {
      this.$http.getRequest('system/config/role').then(resp => {
        if (resp) {
          this.roles = resp
        }
      })
    },
    initMenus () {
      this.$http.getRequest('system/basic/menus').then(resp => {
        if (resp) {
          this.menus = resp
        }
      })
    },
    changeChecked () {
      this.$data.checkedIds = []
      this.initMenus()
      let rid = this.$data.activeNames
      this.$http.getRequest('system/basic/menus/' + rid).then(resp => {
        if (resp) {
          let arr = []
          this.$data.checkedIds = this.pushCheckedId(resp, arr)
        }
      })
    },
    pushCheckedId (obj, arr) {
      obj.forEach(o => {
        if (o && o.id > 6) {
          arr.push(o.id)
        }
        if (o.children && o.children instanceof Array) {
          this.pushCheckedId(o.children, arr)
        }
      })
      return arr
    },
    addRole () {
      this.$http.postRequest('system/config/role', this.$data.role).then(resp => {
        if (resp) {
          this.initRoles()
          this.initMenus()
        }
      })
    },
    deleteRole (id) {
      this.$http.deleteRequest('system/config/role/' + id).then(resp => {
        if (resp) {
          this.initRoles()
          this.initMenus()
        }
      })
    },
    cancelUpdate () {
      this.$data.activeNames = -1
    },
    updateRole (rid, index) {
      let temp = this.$refs.tree[index].getCheckedKeys()
      let mids = []
      for (let i of temp) {
        if (i > 6) {
          mids.push(i)
        }
      }

      this.$http.postRequest('/system/basic/menuRole/?rid=' + rid + '&mids=' + mids).then(res => {
        if (res) {
          this.$data.activeNames = -1
        }
      })
    }
  },
  mounted () {
    this.initRoles()
    this.initMenus()
  }
}
</script>

<style>
.addRole,
.input {
  width: 250px;
}
</style>
