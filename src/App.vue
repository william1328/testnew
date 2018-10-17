<template>
<div>
<router-view v-if="!token" />
<el-container v-else>
  <el-header>
    <el-row :gutter="20">
        <el-col :span="4">
            <img src="" alt="LOGO" />
        </el-col>
        <el-col :span="16">
            <el-menu :default-active="'/'+$route.path.split('/')[1]" :router="true" mode="horizontal"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            >
              <template v-for="item in navMenus"> 
              <el-menu-item :index="item.path">{{item.meta.page_title}}</el-menu-item>
              </template>
            </el-menu>
        </el-col>
        <el-col :span="4">
            <el-dropdown>
              <a>
                管理员<i class="el-icon-edit"></i>
              </a>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item >修改资料</el-dropdown-item>
                <el-dropdown-item  @click.native="showDialog">修改密码</el-dropdown-item>
                <el-dropdown-item  @click.native="logOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
        </el-col>
    </el-row>
  </el-header>
  <el-container>
    <el-aside width="200px">
      <el-menu :default-active="$route.path" :router="true">
        <template v-for="item in leftMenus"> 
          <el-menu-item :index="item.path">{{item.meta.page_title}}</el-menu-item>
        </template>
      </el-menu>

    </el-aside>
    <el-main>
    <router-view/>
    </el-main>
  </el-container>
</el-container>
<el-dialog 
      title="修改密码"
      :visible.sync="dialogFormVisible" ref='updatePwdFrom'>
       <!-- <el-form :model="form"> -->
         <el-form>
             <el-form-item label="原始密码" >
             <el-input></el-input>
             </el-form-item>
             <el-form-item label="新密码" ref='password'>
                 <el-input></el-input>
             </el-form-item>
             <el-form-item label="确认密码" ref='confirmPassword'>
                 <el-input></el-input>
             </el-form-item>
         </el-form>
         <div slot="footer" class="dialog-footer">
             <el-button type="primary" @click="updatePassword()">确 定</el-button>
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
      activeIndex:'1',
      dialogFormVisible:false,
    }
  },
  created(){
  },
  methods:{
    logOut(){
      this.$router.push('/login')
    },
    showDialog(){
      if(this.$router.currentRoute.fullPath!='/login'){
        this.dialogFormVisible = true
      }else{
         this.$message('请登陆后再进行修改操作')
      }
    },
    updatePassword(){
      var password=this.$refs.password
      var confirmPassword=this.$refs.confirmPassword
      if(password!=confirmPassword){
        this.$message('两次密码不一致')
        return
      }
     this.$axios.post('/users/password')
    }
  },
  computed:{
    ...mapGetters(['token','errorMsg']),
    navMenus(){
      let menus = [];
      for(let i in this.$router.options.routes){
        let item = this.$router.options.routes[i];
        if(item.meta.nav_id){
          menus.push(item);
        }
      }
      return menus;
    },
    leftMenus(){
      let menus = [];
      let parent_id = this.$route.meta.nav_id;
      if(!parent_id){parent_id = this.$route.meta.parent_id}
      if(!parent_id){return menus;}
      for(let i in this.$router.options.routes){
        let item = this.$router.options.routes[i];
        if(item.meta.parent_id==parent_id && !item.meta.no_menu){
          menus.push(item);
        }
      }
      return menus;
    }
  },
  watch:{
    errorMsg(cv,ov){
      if(cv){
        this.$message({
          message: cv,
          type: 'warning',
          onClose:this.$store.commit('updateErrorMsg','')
        });
      }
    }
  }
}
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
* {margin:0;padding:0;}
ul, li, ol{
  list-style: none;
}

.el-menu--horizontal{border-bottom:none;}
.el-header {
    background-color:#545c64;
    color: #fff;
    text-align: center;
    line-height: 60px;
  }
.el-header .el-dropdown{color:#fff;cursor:pointer;}
</style>



