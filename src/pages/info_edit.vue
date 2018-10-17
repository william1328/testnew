<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>活动管理</el-breadcrumb-item>
        <el-breadcrumb-item>活动列表</el-breadcrumb-item>
        <el-breadcrumb-item>活动详情</el-breadcrumb-item>
    </el-breadcrumb>

    <h5>资讯创建</h5>
    <el-form :model="value" label-width="120px">
        <el-form-item label="标题" class="input_style1">
            <el-input v-model="value.name"></el-input>
        </el-form-item>
        <el-form-item label="摘要" class="input_style1">
            <el-input v-model="value.Summary"></el-input>
        </el-form-item>

        <el-form-item label="封面">
            <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                <img v-if="imageUrl" :src="imageUrl" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
        </el-form-item>

        <el-form-item label="资讯标签">
             <form-select :option="category" class="fl m-r"></form-select>
            <el-button type="text" @click="open3">+ 添加标签</el-button>
        </el-form-item>

        <el-form-item label="发布设置">
            <div class="radio">
                <el-radio v-model="radio1" label="1">立即发布</el-radio>
            </div>
            <div class="radio">
                <el-radio v-model="radio2" label="2" style="float:left;width:100px">定时发布</el-radio>
                <div class="block" style="float:left">
                    <span class="demonstration"></span>
                    <el-date-picker v-model="value.updated_at" type="datetime" placeholder="选择日期时间">
                    </el-date-picker>

                </div>
            </div>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="saveModel">立即创建</el-button>
        </el-form-item>
    </el-form>

</div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { quillEditor } from "vue-quill-editor"; //调用编辑器

import formSelect from "../components/global/form-select";

export default {
  data() {
    return {
      radio1: "1",
      radio2: "1",
      selectdate: "",
      value: {},
      value_id: "",
      loading: false,
      dialogFormVisible: false,
      imageUrl: "", //上传图片,
      category: {
        value: "",
        array: [
          {
            name: "全部",
            value: ""
          },
          {
            name: "已发送",
            value: 1
          },
          {
            name: "撤回",
            value: 2
          }
        ]
      }
    };
  },
  created() {
    //判断是否新增

    if (this.$route.params["infoData"] != undefined) {
      this.info = this.$route.params["infoData"];
    }
    // this.loadUploads();
  },
  computed: {
    ...mapGetters(["pageTitle"])
    //  ...mapGetters(['uploads']),
  },
  methods: {
    //标签
    open3() {
      this.$prompt("请输入标签", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: "邮箱格式不正确"
      })
        .then(({ value }) => {
          this.$message({
            type: "success",
            message: "你的邮箱是: " + value
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消输入"
          });
        });
    },
    //图片上传
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    saveModel() {
      if (this.loading) {
        return;
      }
      this.loading = true;
      let url = "/api/messages";
      if (this.messages.id) {
        url += "/" + this.messages.id;
      }
      this.$axios
        .post(url, this.messages)
        .then(res => {
          this.$message({
            message: "保存成功！",
            type: "success"
          });
          this.$router.push("/messagess");
          this.loading = true;
        })
        .catch(res => {
          this.loading = false;
        });
    }
  },
  components: {
    quillEditor
  }
  /*  loadModel(){
      let url = '/api/cards';
      if(this.card_id){
        url += '/' + this.card_id;
      }
      this.$axios.post(url,this.card).then((res)=>{
        this.card = res.data;
      })
    },
 */
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style>
/* 照片上传 */
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

/* 输入框 */
.input_style1 {
  width: 60%;
}

.input_style2 {
  width: 80%;
}

.el-radio {
  line-height: 40px;
}
</style>

<style scoped>
</style>
