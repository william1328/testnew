<template>
  <div>
      <!-- 标签栏 -->
      <el-form :model="login_data" label-width="80px" v-if="is_login">
      <el-tabs v-model="login_mode" type="border-card">
        <el-tab-pane label="密码登录" name="password">
            <el-form-item label="手机号码">
            <el-input v-model="login_data.mobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="密码">
            <el-input v-model="login_data.password" placeholder="密码长度为6-16个字符（不能包括空格）"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-loading="is_loading" @click="login">登录</el-button>
              </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="验证码登录" name="vcode">
            <el-form-item label="手机号码">
            <el-input v-model="login_data.mobile" placeholder="手机号码"></el-input>
            </el-form-item>
            <el-form-item label="验证码">
            <el-input v-model="login_data.valicode" placeholder="短信验证码">
                <a slot="append" @click="valicode">{{wait>0?wait+'秒':'获取验证码'}}</a>
            </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-loading="is_loading" @click="login">登录</el-button>
              </el-form-item>

            <el-alert
                title="首次登录将自动注册"
                type="success">
              </el-alert>
        </el-tab-pane>
      </el-tabs>
      </el-form>
    <!-- 完善信息 -->
    <el-form :model="user" label-width="80px" v-else>
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>完善信息</span>
          </div>
          
            <el-form-item label="昵称">
                <el-input v-model="user.nickname" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="设置密码">
                <el-input v-model="user.password" placeholder=""></el-input>
            </el-form-item>
            <el-form-item label="邀请人">
                <el-input v-model="user.inviter" placeholder="邀请人ID/手机号"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" v-loading="is_loading" @click="register">同意协议并注册</el-button>
              </el-form-item>
            <el-form-item>
            <a @click="showModel=true">美业人注册协议</a>
            </el-form-item>
        </el-card>
    </el-form>

    <el-dialog
      title="美业人注册协议"
      :visible.sync="showModel"
      width="60%">
      <p>美业人注册协议</p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="showModel = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  
export default {
  name: 'login',
  data () {
    return {
      user:{nickname:'',inviter:'',reg_token:'',mobile:'',password:''},
      is_login:true,
      wait:0,
      login_mode:'password',
      login_data: {mobile:'',password:'',valicode:''},
      is_loading:false,
      showModel:false
    }
  },
  watch:{

  },
  created(){

  },
  methods:{
    register(){
        this.error_msg = '';
        if(this.user){
          if(this.user.nickname==''){return this.error_msg='密码输入有误';}
          if(this.user.inviter==''){return this.error_msg='邀请人输入有误';}
        }
        this.$axios.post('/api/users',this.user).then((res)=>{
            this.$store.commit('updateUser',res.data.data);
            this.$store.commit('updateToken',res.data.token);
            this.$db.set('token',res.data.token);
            this.$router.replace('/');
        }).catch((err)=>{
          this.is_loading =false;
        })
    },    
    login(){
        if(this.is_loading){return;}
        if(this.login_data.mobile==''){this.$store.commit('updateErrorMsg','手机号输入有误');return;}
        this.is_loading =true;
        this.error_msg = '';
        if(this.login_mode=='vcode'){
          this.login_data.password = '';
        }else{
          this.login_data.valicode = '';
        }
        this.$axios.post('/api/users/login',this.login_data).then((res)=>{
            this.is_loading =false;
            this.$store.commit('updateUser',res.data.data);
            this.$store.commit('updateToken',res.data.token);
            this.$db.set('token',res.data.token);
            if(!res.data.reg_token){
              this.$router.replace('/');
            }else{
              this.success_msg='';
              this.user.mobile=this.login_data.mobile;
              this.user.reg_token=res.data.reg_token;
              this.is_login=false;
            }
        }).catch((err)=>{
          this.is_loading =false;
        })
    },
    waitTimer(){
      if(this.wait<=0){return;}
      this.wait -= 1;
      setTimeout(this.waitTimer,1000);
    },
    valicode(){
        if(!this.login_data.mobile){return;}
        if(this.is_loading){return;}
        this.is_loading =true;
        var post_data = {mobile:this.login_data.mobile};
        post_data.token = '';
        try{
          var token = post_data.mobile;
          post_data.timestamp = parseInt(new Date().getTime()/1000)+'';
          var key = post_data.timestamp;
          
          for(var i=0;i<key.length;i++){
            if(token.length<=i){break;}
            post_data.token += String.fromCharCode(48+(token.charCodeAt(i)+key.charCodeAt(i)) % 74);
          }
        }catch(e){
          // console.error(e);
        }
        this.$axios.post('/api/valicode',post_data).then((res)=>{
            this.is_loading =false;
            this.success_msg = res.data;
            this.wait = 60;
            this.waitTimer();
        }).catch((err)=>{
          this.is_loading =false;
          if(err.response){
            if(typeof(err.response.data)=='object'){
              this.error_msg = err.response.data.message;
            }else{
              this.error_msg = err.response.data;
            }
          }
        })
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->

<style scoped>
form.el-form{
    position: absolute;
    width: 400px;
    left:50%;
    top:200px;
    margin-left: -200px;
}
</style>
