<template>
    <div id="questionsEdit">
        <el-form :model="questionsData"  ref="questionsData" label-width="300px" >
            <el-form-item label="id">
                <el-input v-model="questionsData.id"></el-input>
            </el-form-item>
            <el-form-item label="问题">
                <el-input v-model="questionsData.question"></el-input>
            </el-form-item>
            <el-form-item label="问题类型">
                <el-input v-model="questionsData.question_type"></el-input>
            </el-form-item>
            <el-form-item label="选项">
                <el-input v-model="questionsData.options"></el-input>
            </el-form-item>
            <el-form-item label="考试编号">
                <el-input v-model="questionsData.exam_ids"></el-input>
            </el-form-item>
            <el-form-item label="成绩">
                <el-input v-model="questionsData.score"></el-input>
            </el-form-item>
            <el-form-item label="解答">
                <el-input v-model="questionsData.answer"></el-input>
            </el-form-item>
            <el-form-item label="解答次数">
                <el-input v-model="questionsData.answer_count"></el-input>
            </el-form-item>
            <el-form-item label="创建时间">
                <el-input v-model="questionsData.created_at"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" :loading="loading" @click="saveModel">提交</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data () {
    return {
        questionsData: {},
        loading:false
    }
  },
    methods:{
        saveModel(){
            var id=this.questionsData.id  //判断是否新增
            console.log(id)
            if(id){
                this.$axios.put('/api/questions/'+id,this.questionsData).then((res)=>{
                this.$router.push('/questions');
                this.$message.success('更新成功') 
                if(res.data=="ok"){   
                  this.$router.push('/questions');
                  this.$message.success('更新成功') } 
                }).catch(error=>{
                  this.$message.error('更新失败')
                
                })
            }else{
                this.$axios.post('/api/questions',this.questionsData).then((res)=>{
                this.$router.push('/questions');
                this.loading = true;
                }).catch((res)=>{
                    this.loading = false;
                })
            }
            
        }
    },
    created() {
        this.questionsData = this.$route.query.questionsData//获取上个页面传递的id,在下面获取数据的时候先提交id
        console.log(this.questionsData)
    },
}
</script>

