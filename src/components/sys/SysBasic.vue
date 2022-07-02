<template>
  <div>
    <el-tabs type="border-card">
      <el-tab-pane label="部门管理" name="deptManager">
        <DeptManager></DeptManager>
      </el-tab-pane>
      <el-tab-pane label="职位管理" name="positionManager">
        <PositionManager></PositionManager>
      </el-tab-pane>
      <el-tab-pane label="职称管理" name="jobTitleManager">
        <JobTitleManager></JobTitleManager>
      </el-tab-pane>
      <el-tab-pane label="奖惩规则" name="RpRules">
        <RpRules></RpRules>
      </el-tab-pane>
      <el-tab-pane label="权限组" name="powerGroup">
        <PowerGroup></PowerGroup>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import DeptManager from './basic/DeptManager.vue';
  import PositionManager from './basic/PositionManager.vue';
  import JobTitleManager from './basic/JobTitleManager.vue';
  import RpRules from './basic/RpRules.vue';
  import PowerGroup from './basic/PowerGroup.vue';
  export default {
    name: 'SysBasic',
    data() {
      return {
        activeName: 'positionManager'
      }
    },
    components : {
      'DeptManager' : DeptManager,
      'PositionManager' : PositionManager,
      'JobTitleManager' : JobTitleManager,
      'RpRules' : RpRules,
      'PowerGroup' : PowerGroup
    }
  }
</script>

<style>
</style>
