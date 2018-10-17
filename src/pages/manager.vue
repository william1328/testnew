<template>
<div class="manager">
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
          <el-button>添加管理员账号</el-button>
        </div>
    </div>
    <el-table
      :data="manager"
      style="width: 100%">
      <el-table-column
        label="账号"
        >
        <template slot-scope="scope">
          {{scope.row.user}}
        </template>
      </el-table-column>
      <el-table-column
        label="姓名"
        >
        <template slot-scope="scope">
          {{scope.row.name}}
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
        label="登录IP"  
        >
        <template slot-scope="scope">
          {{scope.row.IP}}
        </template>
      </el-table-column>
      <el-table-column
        label="角色"
        >
        <template slot-scope="scope">
          {{scope.row.action}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-button
            @click="handleStop(scope.$index, scope.row)">禁用</el-button>
          <el-button
            @click="edit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            @click="deleteUser(scope.$index, scope.row)">删除</el-button>
        </template>
        </el-table-column>
    </el-table>
    <div class="block"
    v-if="manager.length > 7"
    >
      <span class="demonstration">共xx条</span>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="7"
          layout="prev, pager, next, jumper"
          :total="10">
        </el-pagination>
    </div>
</div>
</template>



<script>
import formSelect from "../components/global/form-select";

export default {
  data() {
    return {
      placeholder: '请输入账号',
      manager: [
        {
          user: 15074747923,
          name: "张三",
          created_at: "2017-10-01 17:20:20",
          updated_at: "2017-10-01 17:20:20",
          IP: "192.168.0.1:8080",
          action: "运营人员"
        }
      ],
      currentPage: 1,
      optionStatus: {
        value: "",
        array: [
          {
            name: "所有",
            value: ""
          },
          {
            name: "启用",
            value: 1
          },
          {
            name: "禁用",
            value: 2
          }
        ]
      },
      optionName: {
        value: "账号",
        inputValue: "",
        array: [
          {
            name: "账号",
            value: "user"
          },
          {
            name: "姓名",
            value: "name"
          },
          {
            name: "手机号码",
            value: "mobile"
          }
        ]
      }
    };
  },
  created() {},
    watch: {
    optionName: {
      handler: function(v) {
            switch (v.value) {
              case 'user':
                this.placeholder = "请输入账号";
                break;
              case 'name':
                this.placeholder = "请输入姓名";
                break;
              case 'mobile':
                this.placeholder = "请输入手机号码";
                break;
            }  
      },
      deep: true
    }
  },
  methods: {
    handleStop() {},
    edit() {},
    deleteUser() {},
    handleSizeChange() {},
    handleCurrentChange() {},
    initData(){},
    search() {}
  },
  components: {
    formSelect
  }
};
</script>


<style scoped>
.manager {
}
.manager .top {
  display: flex;
}
.manager .item {
  margin: 0 20px 0 10px;
}

.manager .input-style {
  margin-right: 20px;
}
.manager .block {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  margin-top: 30px;
}

</style>
