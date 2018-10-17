<template>
<div id="uploadList">
   <el-table
      :data="uploads"
      style="width: 100%">
        <el-table-column   prop="id"  label="id"  width="230"></el-table-column>
        <el-table-column   prop="user_id" label="用户编号" width="100"></el-table-column>
        <el-table-column  prop="file_url" label="文件路径" width="100">
            <template slot-scope="scope"> 
            <img :src="scope.row.file_url" width="100" height="100"/> 
            </template>
        </el-table-column>
        <el-table-column prop="file_name" label="文件名称" width="100"></el-table-column>
        <el-table-column prop="status"  label="状态"  width="80"></el-table-column>

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
import { mapGetters,mapActions } from 'vuex'
export default {
  data () {
    return {
      filter:{},
    }
  },
  created(){
    this.loadUploads(this.filter);
  },
  methods:{
    ...mapActions(['loadUploads']),
  },
  computed:{
    ...mapGetters(['uploads']),
  }
}
</script>


<style scoped>

</style>
