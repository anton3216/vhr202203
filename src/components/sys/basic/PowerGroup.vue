<template>
  <div>
    <div>
      <el-input size="small" class="addRole" placeholder="请输入角色英文名称" v-model="role.name">
        <template slot="prepend">ROLE_</template>
      </el-input>
      <el-input size="small" class="addRole" placeholder="请输入角色中文名称" v-model="role.nameZh"></el-input>
      <el-button size="small" type="primary">添加角色</el-button>
    </div>
    <div>
      <el-collapse accordion v-model="activeNames" @change="changeChecked">
        <el-collapse-item :title="item.nameZh" :key="index" v-for="(item,index) in roles" :name="item.id">
          <div>
            可访问的资源
            <el-button size="mini" circle icon="el-icon-delete" style="float: right;color: #f56c6c;"></el-button>
          </div>
          <div>
            <el-tree ref="tree" :data="menus" show-checkbox node-key="id" :default-checked-keys="checkedIds"
              :props="defaultProps">
              <span class="custom-tree-node" slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text" style="font-weight:700;color:#e6a23c;" size="mini" @click="() => append(data)">
                    追加
                  </el-button>
                  <el-button  type="text" style="font-weight:700;color:#f56c6c;" size="mini" @click="() => remove(node, data)">
                    删除
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'PowerGroup',
    data() {
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
          label: 'name'
        },
        checkedIds: []
      }
    },
    methods: {
      initRoles() {
        this.$http.getRequest('system/config/role').then(resp => {
          if (resp) {
            this.roles = resp;
          }
        });
      },
      initMenus() {
        this.$http.getRequest('system/basic/menus').then(resp => {
          if (resp) {
            this.menus = resp;
          }
        });
      },
      changeChecked() {
        let rid = this.$data.activeNames;
        this.initMenus();
        if (rid != '') {
          this.$http.getRequest('system/basic/menus/' + rid).then(resp => {
            if (resp) {
              let arr = [];
              let returnarr = this.pushCheckedId(resp, arr);
              this.$data.checkedIds = returnarr;
            }
          });
        }
      },
      pushCheckedId(obj, arr) {
        obj.forEach(o => {
          if (o && o.id > 6) {
            arr.push(o.id);
          }
          if (o.children && o.children instanceof Array) {
            this.pushCheckedId(o.children, arr);
          }
        });
        return arr;
      }
    },
    mounted() {
      this.initRoles();
      this.initMenus();
    }
  }
</script>

<style>
  .addRole,
  .input {
    width: 250px;
  }
</style>
