<template>
 <div>
   <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="学习卡"
      width="180">
      <template slot-scope="scope">
          {{scope.row.title}}
      </template>
    </el-table-column>
    <el-table-column
      label="购买时间"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.purchase_time}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="有效期"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.validity_time}}</div>
      </template>
    </el-table-column>
  </el-table>
 </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          title: "老板卡", // 购买卡标题
          purchase_time: "2018-12-20 15:20:10", //购买卡购买时间
          validity_time: "2020-01-20 14:20:20" //购买卡有效期
        }
      ]
    };
  },
  components: {}
};
</script>

<style>
</style>
