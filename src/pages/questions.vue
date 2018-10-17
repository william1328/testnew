<template>
<div>
    <el-table
      :data="questions"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="id"
        width="50">
      </el-table-column>
      <el-table-column
        prop="exam_ids"
        label="考试编号"
        width="100">
      </el-table-column>
      <el-table-column
        prop="question_type"
        label="问题类型"
        width="100">
      </el-table-column>
      <el-table-column
        prop="question"
        label="问题"
        width="100">
      </el-table-column>
      <el-table-column
        prop="options"
        label="选项"
        width="100">
      </el-table-column>
      <el-table-column
        prop="score"
        label="成绩"
        width="100">
      </el-table-column>
      <el-table-column
        prop="answer"
        label="解答"
        width="100">
      </el-table-column>
      <el-table-column
        prop="answer_count"
        label="解答次数"
        width="100">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="100">
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
        width="200">
      </el-table-column>
    <el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="questionsEdit(scope.$index, scope.row)">编辑</el-button>
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
    this.loadQuestions(this.filter);
  },
  methods:{
    ...mapActions(['loadQuestions']),
    questionsEdit(index,row){
     this.$router.push({path: '/questionsEdit', query: {questionsData: row}})
    },
    questionsDelete(index, rows){
      this.$confirm('确认删除吗？', '提示', {}).then(() => {
      var id=rows[index].id
        this.$axios.delete("/api/questions/"+id).then(res=>{
                if(res.data=="OK"){   
                  rows.splice(index, 1);    
                  this.$message.success('删除成功') } 
                }).catch(error=>{
                  this.$message.error('删除失败')
        })
     })
    }
  },
  computed:{
    ...mapGetters(['questions']),
  }
}
</script>


<style scoped>

</style>
