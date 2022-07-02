<template>
  <div>
    <el-container>
      <el-header class="homeHeader">
        <h3 class="title">微人事</h3>
        <el-dropdown class="userInfo" @command="commandHandler">
          <span class="el-dropdown-link">
            {{user.name}}<i><img :src="user.userface" /></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="info">个人信息</el-dropdown-item>
            <el-dropdown-item command="settings">设置</el-dropdown-item>
            <el-dropdown-item command="logout" divided>注销</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-scrollbar class="nav-scrollbar">
            <el-menu router unique-opened>
              <el-submenu :index="index+''" v-for="(item,index) in routes" v-if="!item.hidden" :key="index">
                <template slot="title">
                  <i style="color: #2775b6;" :class="item.iconCls"></i>
                  <span>{{item.name}}</span>
                </template>
                <el-menu-item :index="child.path" v-for="(child,indexj) in item.children" :key="indexj">{{child.name}}</el-menu-item>
              </el-submenu>
            </el-menu>
          </el-scrollbar>
        </el-aside>
        <el-main>
          <el-breadcrumb separator-class="el-icon-arrow-right" v-if="this.$router.currentRoute.path != '/home'">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{this.$router.currentRoute.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <div class="homeWelcome" v-if="this.$router.currentRoute.path == '/home'">
            Welcome to use vhr System!
          </div>
          <router-view style="margin-top: 25px;"></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    name: 'Home',
    data() {
      return {
        user: JSON.parse(window.sessionStorage.getItem('user'))
      }
    },
    methods: {
      commandHandler(cmd) {
        if (cmd == 'logout') {
          this.$confirm('此操作将注销用户, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$http.getRequest('/logout').then(resp => {
              this.$router.push('/');
            });
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消'
            });
          });
        }
      }
    },
    computed : {
      routes () {
        return this.$store.state.routes;
      }
    }
  }
</script>

<style>
  body {
    margin: 0 auto;
  }

  .el-menu {
    margin: auto 0;
  }

  .homeHeader {
    background-color: #2775b6;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0px 15px;
    box-sizing: border-box;
  }

  .homeHeader .title {
    color: #fff;
    font-size: 40px;
    font-family: 楷体;
  }

  .homeHeader .userInfo {
    color: #FFFFFF;
    cursor: pointer;
    font-family: 微软雅黑;
    font-size: 15px;
  }

  .el-dropdown-link img {
    width: 45px;
    height: 45px;
    border-radius: 25px;
    margin-left: 5px;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
  }

  .homeWelcome {
    text-align: center;
    font-size: 50px;
    font-family: 'Permanent';
    color: #8cc269;
    margin-top: 130px
  }
</style>
