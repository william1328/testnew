<template>
 <div>
   <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="名称"
      width="180">
      <template slot-scope="scope">
          {{scope.row.like_title}}
      </template>
    </el-table-column>
    <el-table-column
      label="类型"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.like_type}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="时间"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.like_time}}</div>
      </template>
    </el-table-column>
  </el-table>
 </div>
</template>

<script>
 export default {
   data () {
     return {
         tableData: [
            {
                like_title: '新时代的美业战略', //喜欢记录的标题
                like_type: '资讯', //喜欢记录的类型
                like_time: '2018-12-20 20:20:20', //喜欢记录的时间
            }
         ]
     }
   },
   props: {
      
   },
   components: {

   }
 }
</script>

<style>

 
</style>
