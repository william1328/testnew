<template>
<div>
<h4>{{pageTitle}}</h4>
<el-form :model="subject" label-width="120px">
  <el-form-item label="专辑名称">
    <el-input v-model="subject.name"></el-input>
  </el-form-item>
  <el-form-item label="专辑简介">
    <el-input v-model="card.price"></el-input>
  </el-form-item>
  <el-form-item label="封面">
    <el-upload
  class="upload-demo"
  drag
  action="/api/uploads"
  :success="uploadFinish()"
  multiple>
  <i class="el-icon-upload"></i>
  <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
  <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
</el-upload>
  </el-form-item>

  <el-form-item>
    <el-button type="primary" :loading="loading" @click="saveModel">立即创建</el-button>
  </el-form-item>
</el-form>

</div>
</template>



<script>
import { mapGetters,mapActions } from 'vuex'
export default {
  data () {
    return {
      subject:{},
      card_id:'',
      loading:false,
  
    }
  },
  created(){
    //判断是否新增
    
    if(this.$route.params['subjectsData']!=undefined){
      this.card =this.$route.params['subjectsData']
    }
      
        // if(this.card_id){
        //   this.loadModel()
        // }
    // }
    // this.$route.query.questionsData

  },
  computed:{
    ...mapGetters(['pageTitle']),
  },
  methods:{
    saveModel(){
      if(this.loading){return;}
      this.loading = true;
      let url = '/api/cards';
      if(this.card_id){
        url += '/' + this.card_id;
      }
      this.$axios.post(url,this.card).then((res)=>{
        this.$message({message: '保存成功！',type: 'success'});
        this.$router.push('/subjects');
        this.loading = true;
      }).catch((res)=>{
        this.loading = false;
      })
    },
    loadModel(){
      let url = '/api/subjects';
      if(this.card_id){
        url += '/' + this.card_id;
      }
      this.$axios.post(url,this.card).then((res)=>{
        this.card = res.data;
      })
    },
    uploadFinish(res){
      if(res){
          if(res.code===20000){
              this.$message({
                  message: '上传成功！',
                  type: 'success'
              });
          }else {
              this.$message({
                  message: res.msg,
                  type: 'error'
              });
          }
      }
    }
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
