<template>
 <div class="user-detail">
   <div class="user">
     <p class="title">会员信息</p>
     <div class="user-info">
       <img src="../assets/logo.png" alt="">
       <div class="user-info-right">
         <span>周先生</span>
         <p>手机号码 <span>15074747923</span></p>
       </div>
     </div>
   </div>
   <div class="user-table">
      <el-tabs v-model="active_name" @tab-click="handleClick">
        <el-tab-pane v-for="item in detail_list" :key="item.comments_name" :label="item.title" :name="item.id"></el-tab-pane>
      </el-tabs>
    <component :is="current_view"></component>
   </div>
 </div>
</template>

<script>
import tabCard from '../components/users_info/table-card'
import tabBuy from '../components/users_info/table-buy'
import tabExam from '../components/users_info/table-exam'
import tabLike from '../components/users_info/table-like'
 export default {
   data () {
     return {
       detail_list: [
         {
           id:"0",
           title: '学习卡',
           comments_name: 'tabCard'
         },
         {
           id:"1",
           title: '购买记录',
           comments_name: 'tabBuy'
         },
         {
           id:"2",
           title: '喜欢记录',
           comments_name: 'tabLike'
         },
         {
           id:"3",
           title: '考试记录',
           comments_name: 'tabExam'
         },
       ],
       active_name: "0",
       current_view: "tabCard",
     }
   },
   methods: {
     handleClick(tab) {
        console.log(tab.index)
        this.current_view = this.detail_list[tab.index].comments_name
     },

   },
   components: {
     tabCard,
     tabBuy,
     tabExam,
     tabLike,
   }
 }
</script>

<style scoped>
.user-detail {
  
}
.user-detail .user .title{
  font-weight: 600;  
}
.user-detail .user-info {
  display: flex;
  margin: 30px 0;
}
.user-detail .user-info img{
  width: 70px;
  height: 70px;
  margin-right: 30px;
}
.user-info-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.user-table ul{
  display: flex;

}
 
</style>
