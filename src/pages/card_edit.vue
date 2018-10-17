<template>
<div>
<h4>{{pageTitle}}</h4>
<el-form :model="card" label-width="120px">
  <el-form-item label="卡片名称">
    <el-input v-model="card.name"></el-input>
  </el-form-item>
  <el-form-item label="卡片价格">
    <el-input v-model="card.price"></el-input>
  </el-form-item>
  <el-form-item label="卡片的介绍">
    <el-input v-model="card.content" type="textarea" :autosize="{ minRows: 2}"></el-input>
  </el-form-item>
  <el-form-item label="卡片封面">
        <el-button type="primary" :loading="loading" @click="dialogFormVisible = true">选择</el-button>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" :loading="loading" @click="saveModel">立即创建</el-button>
  </el-form-item>
</el-form>

<el-dialog 
      title="选择图片"
      :visible.sync="dialogFormVisible" ref='choiceImg'>
            <div v-for="item in uploads"     style="display: block;">
              <img :src="item.file_url" width="100" height="100" :alt="item.file_name" /> 
              <span>{{item.file_name}}</span>
            </div>
         <div slot="footer" class="dialog-footer">
             <el-button type="primary" >确 定</el-button>
             <el-button @click="dialogFormVisible = false">取 消</el-button>
         </div>
 </el-dialog>
</div>
</template>



<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  data () {
    return {
      card:{},
      card_id:'',
      loading:false,
      dialogFormVisible:false
  
    }
  },
  created(){
    //判断是否新增
    
    if(this.$route.params['cardsData']!=undefined){
      this.card =this.$route.params['cardsData']
    }
   this.loadUploads();

  },
  computed:{
    ...mapGetters(['pageTitle']),
    ...mapGetters(['uploads']),
  },
  methods:{
    // uploadFile(){
    //    const formData = new FormData();
    //     const file = this.$refs.upload.uploadFiles[0];
    //     console.log('filefile:',file)
    //     const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
    //     if (!file) { // 若未选择文件
    //       alert('请选择文件');
    //       return;
    //     }
    //     formData.append('file', file.raw);
    //     this.$axios.post('/api/uploads', formData, headerConfig).then(res => {
    //       console.log('res:',res);
    //     })
    // },
    ...mapActions(['loadUploads']),
    saveModel(){
      if(this.loading){return;}
      this.loading = true;
      let url = '/api/cards';
      if(this.card_id){
        url += '/' + this.card_id;
      }
      this.$axios.post(url,this.card).then((res)=>{
        this.$message({message: '保存成功！',type: 'success'});
        this.$router.push('/cards');
        this.loading = true;
      }).catch((res)=>{
        this.loading = false;
      })
    },
    loadModel(){
      let url = '/api/cards';
      if(this.card_id){
        url += '/' + this.card_id;
      }
      this.$axios.post(url,this.card).then((res)=>{
        this.card = res.data;
      })
    },

  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
