<template>
<div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>信息管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布信息</el-breadcrumb-item>
    </el-breadcrumb>

    <h5>发送信息</h5>
    <el-form :model="messages" label-width="120px">

        <el-form-item label="标题" class="input_style1">
            <el-input v-model="messages.title"></el-input>
        </el-form-item>

        <el-form-item label="请输入内容" class="input_style1">
            <el-input type="textarea" :rows="4" placeholder="" v-model="messages.content">
            </el-input>
        </el-form-item>
        <el-form-item label="发布时间" class="input_style1">

            <el-date-picker v-model="messages.updated_at" type="datetime" placeholder="选择日期时间">
            </el-date-picker>

        </el-form-item>
        <el-form-item>
            <template v-if="!buttonOff">
                <el-button type="primary" @click="saveModel" :loading="loading" >立即创建</el-button>
            </template>

        </el-form-item>

    </el-form>

</div>
</template>

<script>
import {
    mapGetters,
    mapActions
} from "vuex";
import messagesVue from './messages.vue';

export default {
    data() {
        return {
            messages: {},
            buttonOff: '',
            value1: '',
            loading:false

        }
    },
    created() {
        //判断是否新增
        if (this.$route.params['messagesData'] != undefined) {
            this.messages = this.$route.params['messagesData']
            this.buttonOff = this.$route.params['buttonOff']
        }
        console.log('m_edit' + this.buttonOff)

    },
    computed: {
        ...mapGetters(['pageTitle']),
    },
    methods: {
        saveModel() {
            if (this.loading) {
                return;
            }
            this.loading = true;
            let url = '/api/messages';
            if (this.messages.id) {
                url += '/' + this.messages.id;
            }
            this.$axios.post(url, this.messages,id).then((res) => {
                this.$message({
                    message: '保存成功！',
                    type: 'success'
                });
                this.$router.push('/messages');
                this.loading = true;
            }).catch((res) => {
                this.loading = false;
            })
        },
        /*  loadModel() {
             let url = '/api/messages';
             if (this.messages_id) {
                 url += '/' + this.messages_id;
             }
             this.$axios.post(url, this.messages).then((res) => {
                 this.messages = res.data;
             })
         }, */
    },

    components: {

    },
    watch:{
          messages:{
              handler:function(value){
                  if(value.title===''){
                      '标题不能为空'
                  }
              }
          }
    }
}
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
