<template>
<div class="materail">
  <el-tabs v-model="active_name" @tab-click="handleClick">
    <el-tab-pane v-for="(item, index) in source_list" :label="item.title" :name="item.id" :key="index"></el-tab-pane>
  </el-tabs>
  <div class="materail-edit">
      <el-button style="margin-right:10px;">删除</el-button>
      <upload-img :option="option"></upload-img>    
  </div>
    <ul class="img-box"> 
      <li v-for="(item, index) in material_list" :key="index" >
        <img :src="item.img_url" alt="">
        <div class="choose-img">
          <el-checkbox-group v-model="checked_imgs" @change="handleCheckedCitiesChange">
            <el-checkbox :label="item" :key="item.id"><span class="title">{{item.title}}</span></el-checkbox>
          </el-checkbox-group>
        </div>
      </li>
    </ul>
</div>
</template>
<script>
import { mapGetters,mapActions } from 'vuex'
import uploadImg from '../components/global/upload-img'
export default {
          data() {
            return {
            option: {
              title: '上传图片',
            },
             source_list: [
               {
                 id: '0',
                 title: '图片',
               },
               {
                 id: '1',
                 title: '视频',
               },
             ],
             active_name: "0",
             checked_imgs: [],
             material_list: [
               {
                id: 0,
                img_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=313691132,2774609708&fm=27&gp=0.jpg',
                title: '微信图片_2018212121212',
               },
              {
                id: 1,
                img_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=313691132,2774609708&fm=27&gp=0.jpg',
                title: '微信图片_2018212121212',
              },
              {
                id: 2,
                img_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=313691132,2774609708&fm=27&gp=0.jpg',
                title: '微信图片_2018212121212',
               },
              {
                id: 3,
                img_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=313691132,2774609708&fm=27&gp=0.jpg',
                title: '微信图片_2018212121212',
               },
              {
                id: 4,
                img_url: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=313691132,2774609708&fm=27&gp=0.jpg',
                title: '微信图片_2018212121212',
               },
             ]
          }
        },
  computed:{
    ...mapGetters(['pageTitle']),
  },
  methods:{
    handleCheckedCitiesChange() {

    },
    handleClick(item) {
      console.log(item.index);
      
    },
    uploadFile(){
        const formData = new FormData();
        const file = this.$refs.upload.uploadFiles[0];
        const headerConfig = { headers: { 'Content-Type': 'multipart/form-data' } };
        if (!file) { // 若未选择文件
          alert('请选择文件');
          return;
        }
        var file_type=this.$refs.fileType.value
        formData.append('file',file.raw)
        formData.append('file_type',file_type)
        console.log('formData:',formData)
        this.$axios.post('/api/uploads',formData,headerConfig).then(res => {
          console.log('res:',res);
        }).catch(error =>{
          console.log(error);
        })
    },
    // uploadFinish(res){
    //   if(res){
    //       if(res.code===20000){
    //           this.$message({
    //               message: '上传成功！',
    //               type: 'success'
    //           });
    //       }else {
    //           this.$message({
    //               message: res.msg,
    //               type: 'error'
    //           });
    //       }
    //   }
    // }
  },
  components: {
    uploadImg
  }

}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.materail {
  
}
.materail .materail-edit {
  display: flex;
  justify-content: flex-end;
}
.materail .img-box {
  display: flex;
  flex-wrap: wrap;
}
.img-box {
  padding-left: 20px;
  margin-top: 30px;
}
.img-box li {
  width: 200px;
  border: 1px solid #ebebeb;
  margin-right: 20px;
  margin-bottom: 20px;
}
.img-box li img {
  width: 100%;
  height: 150px;
}
.img-box li .choose-img {
  padding: 10px;
}
.img-box .choose-img .title {
  display: inline-block;
  width: 158px;
  overflow:hidden; 
  text-overflow:ellipsis;
  white-space:nowrap; 
  color: #333;
  vertical-align: -4px;
}
</style>
