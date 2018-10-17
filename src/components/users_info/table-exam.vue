<template>
 <div>
   <el-table
    :data="exams"
    style="width: 100%">
    <el-table-column
      label="考试时间"
      width="180">
      <template slot-scope="scope">
          {{scope.row.exam_time}}
      </template>
    </el-table-column>
    <el-table-column
      label="试卷"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.exam_paper}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="用时"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.exam_using_time}}</div>
      </template>
    </el-table-column>
        <el-table-column
      label="答对/题目"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.exam_true}}</div>
      </template>
    </el-table-column>
        <el-table-column
      label="分数"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.exam_true +"/"+scope.row.exam_subject}}</div>
      </template>
    </el-table-column>
        <el-table-column
      label="称号"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.exam_nick}}</div>
      </template>
    </el-table-column>
  </el-table>
 </div>
</template>

<script>
import { mapGetters, mapActions, mapState } from "vuex";
 export default {
   data () {
     return {
        //  exams: [
        //      {
        //         exam_time: '2018-12-20 20:20:20', //考试时间
        //         exam_paper: '新时代美业战略', // 考试试卷
        //         exam_using_time: '20分钟', // 考试用时
        //         exam_true: '20', // 答对几道
        //         exam_subject: '30', //题目
        //         exam_grade: '50', //分数
        //         exam_nick: '学霸', // 称号
        //     }
        //  ]
     }
   },
   created() {
       this.loadExams();
   },
   computed: {
    ...mapGetters(["exams"]),
    ...mapState(["pageCount"]),
   },
    methods: {
        ...mapActions(["loadExams"]),
    },
   components: {

   }
 }
</script>

<style>

 
</style>
