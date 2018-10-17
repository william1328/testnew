<template>
 <div>
   <el-table
    :data="tableData"
    style="width: 100%">
    <el-table-column
      label="时间"
      width="180">
      <template slot-scope="scope">
          {{scope.row.history_time}}
      </template>
    </el-table-column>
    <el-table-column
      label="商品"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.goods_title}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="支付方式"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.payment}}</div>
      </template>
    </el-table-column>
    <el-table-column
      label="购买价格"
      width="180">
      <template slot-scope="scope">
          <div>{{scope.row.goods_price}}</div>
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
                history_time: '2018-02-20 15:20:20', //购买记录的购买时间
                goods_title: '新时代的美业战略', // 购买记录的商品标题
                payment: '微信', //购买记录的支付方式
                goods_price: '365', // 购买记录的价格
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
