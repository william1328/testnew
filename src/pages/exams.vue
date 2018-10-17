<template>
<div id="examList">
   <el-table
      :data="exams"
      style="width: 100%">
        <el-table-column   prop="id"  label="id"  width="90"></el-table-column>
        <el-table-column   prop="order_type" label="订单类型" width="100"></el-table-column>
        <el-table-column  prop="pay_type" label="支付类型" width="100"></el-table-column>
        <el-table-column prop="target_id" label="目标对象" width="100"></el-table-column>
        <el-table-column prop="money" label="金额" width="100"></el-table-column>
        <el-table-column prop="user_id"  label="用户编号"  width="100"></el-table-column>
        <el-table-column prop="ext_info"  label="扩展信息"  width="80"></el-table-column>
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
    this.loadExams(this.filter);
  },
  methods:{
    ...mapActions(['loadExams']),
  },
  computed:{
    ...mapGetters(['exams']),
  }
}
</script>


<style scoped>

</style>
