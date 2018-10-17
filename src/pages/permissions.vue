<template>
<div id="permissionList">
   <el-table
      :data="permissions"
      style="width: 100%">
        <el-table-column  prop="id"  label="id"  width="90"></el-table-column>
        <el-table-column  prop="url" label="路径" width="200"></el-table-column>
        <el-table-column  prop="configs" label="配置" width="500"></el-table-column>
        <el-table-column  prop="role_id" label="角色编号" width="100"></el-table-column>
        <el-table-column  prop="status" label="状态"  width="100"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="questionsDelete(scope.$index, questions)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
</div>
</template>



<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      filter: {}
    };
  },
  created() {
    this.loadPermissions(this.filter);
  },
  methods: {
    ...mapActions(["loadPermissions"])
  },
  computed: {
    ...mapGetters(["permissions"])
  }
};
</script>


<style scoped>
</style>
