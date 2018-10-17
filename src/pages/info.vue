<template>
<div id="messageList">

    <div class="search">
        <div class="fl">
            <form-select :option="optionStatus" class="fl m-r"></form-select>
            <form-select :option="cat" class="fl"></form-select>
        </div>

        <div class="sear">
            <el-input v-model="input" placeholder="请输入内容"></el-input>
        </div>

        <div class="fl">
            <el-button>查询</el-button>
        </div>

        <div class="fr">
            <el-button>创建</el-button>
        </div>

    </div>

    <el-table :data="messages" style="width: 100%">
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column prop="msg_type_name" label="标签"></el-table-column>
        <el-table-column prop="receiver" label="访问量"></el-table-column>
        <el-table-column prop="title" label="点赞量"></el-table-column>
        <el-table-column prop="created_at" label="发布时间"></el-table-column>

        <el-table-column label="操作" style="min-width:50%">
            <template slot-scope="scope">
                <div class="editorder">
                    <span><router-link to="/">预览</router-link></span>
                    <span><router-link to="/">隐藏</router-link></span>
                    <span><router-link to="/messages/edit">编辑</router-link></span>
                    <span @click="dialogVisible = true">删除</span>

                </div>
            </template>
        </el-table-column>
    </el-table>
    <div class="clear1em"></div>
    <div class="block">
        <span class="demonstration"></span>
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizes" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageCount.messages ? pageCount.messages.total_count : 0">
        </el-pagination>
    </div>
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
        <span>是否删除此信息！</span>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
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
                        name: "状态",
                        value: ""
                    },
                    {
                        name: "显示",
                        value: 1
                    },
                    {
                        name: "隐藏",
                        value: 2
                    }
                ]
            },
            value5: [], //分类1
            value11: [], //分类2
            input: "", //搜索
            //分页
            pageSizes: [2, 3, 4, 5],
            currentPage: 1,
            page: 1,
            pageSize: 2,

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
        handleClose(done) {
            this.$confirm("确认关闭？")
                .then(_ => {
                    done();
                })
                .catch(_ => {});
        },
        //分页
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val;
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page = val;
            this.loadMessages({
                page: this.page,
                pageSize: this.pageSize
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
    width: 30%;
    float: left;
    margin-left: 20px;
    margin-right: 20px;
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
