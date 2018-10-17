<template>
 <div>
    <el-upload
       class="avatar-uploader"
       action="/api/upload/uploadFile"
       :show-file-list="false"
       :on-change="handleChange"
       :on-success="handleAvatarSuccess"
       :before-upload="beforeAvatarUpload">
        <el-button>{{option.title}}</el-button>
    </el-upload>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
   props: {
     option: {
        default() {
          return {
            title: ''
          }
        }
     }
   },
   methods: {
     handleChange(file, fileList) {

     },
    handleAvatarSuccess(res, file) {

      },
    beforeAvatarUpload(file) {
        
      },
   },
   components: {

   }
 }
</script>

<style>

 
</style>