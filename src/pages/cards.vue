<template>
<div>
<el-row>
  <el-col :span="14">
  <router-link to="/cards/new" size="small" class="el-button el-button--primary">创建卡片</router-link>
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
      :data="cards"
      style="width: 100%">
      <el-table-column
        prop="id"
        label="编号"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="名称"
        width="180">
      </el-table-column>
      <el-table-column
        prop="price"
        label="价格">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态">
      </el-table-column>
      <el-table-column>
        <template slot-scope="scope">
        <el-button
          @click.native.prevent="editCard(scope.$index,scope.row)"
          type="text"
          size="small">
          编辑
        </el-button>
          <el-button
          @click.native.prevent="deleteCard(scope.$index,cards)"
          type="text"
          size="small">
          刪除
        </el-button>
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
      filter:['user_id','cover','name','status'],
    }
  },
  created(){
    this.loadCards(this.filter);
  },
  methods:{
    ...mapActions(['loadCards']),
    editCard(index,rows){
      console.log('rows',rows)
    this.$router.push({name:'cardsEditOrAdd', params: {'cardsData': rows}})  
    },
    deleteCard(index,rows){
        var id=rows[index].id
        this.$axios.delete("/api/cards/"+id).then(res=>{
          console.log('res:',res)
                if(res.data=="OK"){   
                  rows.splice(index, 1);    
                  this.$message.success('删除成功') } 
                }).catch(error=>{
                  this.$message.error('删除失败')
        })
    }
  },
  computed:{
    ...mapGetters(['cards']),
  }
}
</script>


<style scoped>

</style>
