<template>
<div id="userList">
    <div class="top">
        <form-select :option="optionStatus"></form-select>
        <div class="item">
          <form-select :option="optionName"></form-select>
        </div>
        <div class="input-style">
        <el-input v-model="optionName.inputValue" :placeholder="placeholder" @clear="initData" clearable></el-input>
        </div>
        <div>
          <el-button @click="search">查询</el-button>
          <el-button>导出名单</el-button>
        </div>
    </div>
    <el-table
      :data="users"
      style="width: 100%">
      <el-table-column
        label="头像"
        width="150">
        <template slot-scope="scope">
          <div class="avater">
            <img src="../assets/logo.png" alt="">
          </div>
        </template>
      </el-table-column>
      <el-table-column
        label="昵称"
        >
        <template slot-scope="scope">
          {{scope.row.nickname}}
        </template>
      </el-table-column>
      <el-table-column
        label="手机号码"
        >
        <template slot-scope="scope">
          {{scope.row.mobile}}
        </template>
      </el-table-column>
      <el-table-column
        label="用户创建时间"
        >
        <template slot-scope="scope">
          {{scope.row.created_at}}
        </template>
      </el-table-column>
      <el-table-column
        label="最后登录时间"
        >
        <template slot-scope="scope">
          {{scope.row.updated_at}}
        </template>
      </el-table-column>
      <el-table-column
        label="已购"
        >
        <template slot-scope="scope">
          {{scope.row.tatal_money}}
        </template>
      </el-table-column>
      <el-table-column
        label="消费总金额"
        >
        <template slot-scope="scope">
          {{scope.row.tatal_money}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <el-button
            @click="handleStop(scope.$index, scope.row)">禁用</el-button>
          <el-button
            @click="toInfo(scope.$index, scope.row)">详情</el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="block">
    <span class="demonstration">共{{pageCount.users ? pageCount.users.total_count : 0}}条</span>
      <el-pagination
        v-if="(pageCount.users ? pageCount.users.total_count : 0) > 6"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="pageCount.users ? pageCount.users.total_count : 0">
      </el-pagination>
  </div>
</div>
</template>



<script>
import { mapGetters, mapActions, mapState } from "vuex";
import * as api from '../api/users.js';
import formSelect from "../components/global/form-select";
export default {
  data() {
    return {
      placeholder: '请输入昵称',
      page: 1,
      pageSize: 6,
      currentPage: 1,
      optionStatus: {
        value: 0,
        array: [
          {
            name: "所有",
            value: 0
          },
          {
            name: "已购",
            value: 1
          },
          {
            name: "禁用",
            value: 2
          }
        ]
      },
      optionName: {
        value: "nickname",
        inputValue: "",
        array: [
          {
            name: "昵称",
            value: "nickname"
          },
          {
            name: "手机号码",
            value: "mobile"
          }
        ]
      }
    };
  },
  watch: {
    optionName: {
      handler: function(v) {
            if (v.value == 0) {
              this.placeholder = "请输入昵称";              
            } else if (v.value == 1) {
              this.placeholder = "请输入手机号码";  
            }        
      },
      deep: true
    }
  },
  created() {
    this.loadUsers({page: this.page, pageSize: this.pageSize});
  },
  methods: {
    ...mapActions(["loadUsers"]),
   
    handleCurrentChange(val) {
        this.page = val;
        this.loadUsers({page: this.page, pageSize: this.pageSize});
    },
    handleStop() {},
    toInfo() {
      this.$router.push({ name: "usersInfo" })
    },
    initData() {
      this.loadUsers();
    },
    search() {
      let params = {
        status: this.optionStatus.value,
        key_type: this.optionName.value,
        keyword: this.optionName.inputValue,
      };
      this.loadUsers(params);
    }
  },
  computed: {
    ...mapGetters(["users"]),
    ...mapState(["pageCount"]),
  },
  components: {
    formSelect
  }
};
</script>


<style scoped>
#userList {
}
#userList .avater img {
  width: 50px;
  height: 50px;
}
#userList .top {
  display: flex;
}
#userList .item {
  margin: 0 20px 0 10px;
}

#userList .input-style {
  margin-right: 20px;
}
#userList .block {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  margin-top: 30px;
}
</style>
