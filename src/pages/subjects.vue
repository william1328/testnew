<template>
<div id="subjectList">
<el-row>
  <el-col :span="14">
  <router-link to="/cards/new" size="small" class="el-button el-button--primary">新建专辑</router-link>
  </el-col>
  <el-col :span="4" >
<el-input  placeholder="姓名"></el-input>
  </el-col>
  <el-col :span="1">
  </el-col>
  <el-col :span="2" >
<el-button type="primary" >搜索</el-button>
  </el-col>
</el-row>
   <el-table
      :data="subjects"
      style="width: 100%">
        <el-table-column  prop="id"  label="id"  width="90"></el-table-column>
        <el-table-column  prop="cover" label="封面" width="100"></el-table-column>
        <el-table-column  prop="auther" label="作者" width="100"></el-table-column>
        <el-table-column  prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column  prop="lesson_count" label="课节数" width="100"></el-table-column>
        <el-table-column  prop="price"  label="价格"  width="100"></el-table-column>
        <el-table-column  prop="card_ids"  label="卡片编号"  width="80"></el-table-column>
        <el-table-column  prop="status"  label="状态"  width="80"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
             >内容管理</el-button>
            <el-button
              size="mini"
              >下架</el-button>
            <el-button
              size="mini"
              @click="subjectsEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="subjectsDelete(scope.$index, questions)">删除</el-button>
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
    this.loadSubjects(this.filter);
  },
  methods:{
    ...mapActions(['loadSubjects']),
    subjectsEdit(index,rows){
      this.$router.push({name:'subjectsEditOrAdd',params: {'subjectsData': rows}})
    }
  },
  computed:{
    ...mapGetters(['subjects']),
  }
}
</script>


<style scoped>

</style>
