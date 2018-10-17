<template>
<div id="messageList">

    <div class="search">
        <div class="fl">
            <form-select :option="optionStatus" class="fl m-r"></form-select>
        </div>

        <div class="sear">
            <el-input v-model="searchInput" placeholder="请输入内容" style="width:300px" class="fl m-r"></el-input>
            <el-date-picker v-model="dataValue" type="date" placeholder="选择日期" class="fl m-r">
            </el-date-picker>
            <div class="fl">
                <el-button @click="search">查询</el-button>
            </div>

            <div class="fr">
                <el-button>创建</el-button>
            </div>
        </div>
    </div>

    <div class="clear1em"></div>

    <el-table :data="messages" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="created_at" label="发布时间"></el-table-column>
        <el-table-column prop="receiver" label="状态"></el-table-column>

        <el-table-column>
            <template slot-scope="scope">
                <el-button @click.native.prevent="details(scope.$index,scope.row)" type="text" size="small">
                    详情
                </el-button>
                <template v-if="scope.row.status>0">
                    <el-button type="text" size="small" disabled>
                        编辑 {{scope.row.status}}
                    </el-button>
                </template>
                <template v-else>
                    <el-button @click="edit(scope.$index,scope.row)" type="text" size="small">
                        编辑 {{scope.row.status}}
                    </el-button>
                </template>
                <template v-if="scope.row.status>0">
                    <el-button @click.native.prevent="del(scope.$index,scope.row)" type="text" size="small">
                        撤回
                    </el-button>
                </template>
                <template v-else>
                    <el-button disabled type="text" size="small">
                        撤回
                    </el-button>

                </template>
            </template>
        </el-table-column>
    </el-table>
    <div class="clear1em"></div>
    <div class="block">
        <span class="demonstration"></span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount.messages ? pageCount.messages.total_count : 0">
        </el-pagination>
    </div>
    <!--<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>是否撤回此信息！</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>-->
</div>
</template>

<script>
import {
    mapGetters,
    mapActions,
    mapState
} from "vuex";
import formSelect from "../components/global/form-select";
export default {
    data() {
        return {
            filter: {},
            cat: {},
            optionStatus: {
                value: "",
                array: [{
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
            },
            dataValue: [], //日期
            searchInput: "", //搜索
            //分页
            pageSizes: [5, 10, 20, 30],
            currentPage: 1,
            page: 1,
            pageSize: 10,

            //删除提示框
            dialogVisible: false
        };
    },
    created() {
        this.loadMessages({
            page: this.page,
            pageSize: this.pageSize
        });
    },
    methods: {
        ...mapActions(["loadMessages"]),
        //删除提示
        /* handleClose(done) {
                this.$confirm("确认关闭？")
                    .then(_ => {
                        done();
                    })
                    .catch(_ => {});
            }, */
        //搜索
        search() {
            let params = {
                status: this.optionStatus.value,
                key_type: this.optionName.value,
                keyword: this.optionName.inputValue,
            }
            this.loadUsers(params);
        },

        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
            this.loadMessages({
                page: this.page,
                pageSize: this.pageSize
            });
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.loadMessages({
                page: this.page,
                pageSize: this.pageSize
            });
        },
        //操作
        details(index, rows) {
            this.$router.push({
                name: "messagesEditOrNew",
                params: {
                    'messagesData': rows,
                    'buttonOff':true
                }
            });
        },
        edit(index, rows) {
         //   console.log('edit')
      //      console.log("rows", rows);
            this.$router.push({
                name:'messagesEditOrNew',              
                params:{'messagesData':rows}
               
            });
        },
        del(index, rows) {
            // console.log("index:" + index,'rows' + rows);
            console.log(rows);
            var id = rows.id;

            this.$axios
                .delete("/api/messages/" + id)
                .then(res => {
                    console.log("res:", res);
                    if (res.data == "OK") {
                        rows.splice(index, 1);
                        this.$message.success("删除成功");
                    }
                })
                .catch(error => {
                    this.$message.error("删除失败");
                });
        }
    },
    computed: {
        ...mapGetters(["messages"]),
        ...mapState(["pageCount"])
    },
    components: {
        formSelect
    }
};
</script>

<style scoped>
.search .sear {
    margin: 0 10px;
}

.editorder span {
    float: left;
    margin: 0 10px;
}
</style><style>
.m-r {
    margin-right: 10px;
}

.m-l {
    margin-left: 10px;
}

.fl {
    float: left;
}

.fr {
    float: right;
}

.clear1em {
    clear: both;
    height: 1em;
}

a:link,
a:visited {
    color: rgb(109, 156, 255);
    text-decoration: none;
}
</style>
