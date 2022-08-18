<template>
  <div class="container">
    <!-- 学科搜索 -->
    <el-row>
      <el-col :span="6"
        ><el-form label-width="80px">
          <el-form-item label="学科名称金哲豪" class="search">
            <el-input v-model="form.subjectName"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="6">
        <el-button size="small" @click="clearFn">清除</el-button>
        <el-button type="primary" size="small" @click="searchFn"
          >搜索</el-button
        >
      </el-col>
      <el-col :span="12" class="searchBtn">
        <el-button
          type="success"
          icon="el-icon-edit"
          size="small"
          @click="addDialogShowFn"
          >新增学科</el-button
        >
      </el-col>
    </el-row>
    <AlertMsg :total="total"></AlertMsg>
    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" width="50"> </el-table-column>
      <el-table-column property="subjectName" label="学科名称">
      </el-table-column>
      <el-table-column property="username" label="创建者"> </el-table-column>
      <el-table-column label="创建日期" width="160">
        <template #default="{ row }">
          {{ row.addDate | formatTime11 }}
        </template>
      </el-table-column>
      <el-table-column label="前台是否显示">
        <template #default="{ row }">
          {{ row.isFrontDisplay == 1 ? "是" : "否" }}
        </template>
      </el-table-column>
      <el-table-column property="twoLevelDirectory" label="二级目录">
      </el-table-column>
      <el-table-column property="tags" label="标签"> </el-table-column>
      <el-table-column property="totals" label="题目数量"> </el-table-column>
      <el-table-column label="操作" class="operate" width="240">
        <template #default="{ row }">
          <a href="javascript:;" @click="goDirectorys(row)">学科分类</a>
          <a href="javascript:;" @click="goTags(row)">学科标签</a>
          <a href="javascript:;" @click="amendFn(row)">修改</a>
          <a href="javascript:;" @click="removeFn(row)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[5, 10, 20, 50]"
      :page-size="pagesize"
      layout="prev, pager, next,sizes,jumper"
      :total="total"
      :current-page="page"
    >
    </el-pagination>
    <!-- 新增弹出层 -->
    <el-dialog
      title="新增学科"
      :visible.sync="addDialogShow"
      width="30%"
      @close="closeFn"
    >
      <el-form ref="form" :model="addForm" label-width="80px" :rules="rules">
        <el-form-item label="学科名称" prop="subjectName">
          <el-input v-model="addForm.subjectName"></el-input>
        </el-form-item>
        <el-form-item label="是否显示">
          <el-switch
            v-model="addForm.isFrontDisplay"
            active-color="#13ce66"
            inactive-color="#ff4949"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeFn">取 消</el-button>
        <el-button type="primary" @click="addFn">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AlertMsg from "../components/AlertMsg.vue";
import {
  list as getSubjectListAPI,
  add as addSubjectAPI,
  remove as removeSubjectAPI,
} from "@/api/hmmm/subjects";
export default {
  name: "SubjectList",
  components: {
    AlertMsg,
  },
  data() {
    return {
      // 搜索表单
      form: {
        subjectName: "",
      },
      tableData: [],
      // 分页
      total: 0,
      page: 1,
      pagesize: 10,
      // 新增弹层
      addDialogShow: false,
      addForm: {
        subjectName: "",
        isFrontDisplay: 1,
      },
      rules: {
        subjectName: [
          { required: true, message: "请输入学科名称", trigger: "blur" },
        ],
      },
    };
  },
  created() {
    this.getSubjectList();
  },
  methods: {
    // 清除搜索
    clearFn() {
      this.form.subjectName = "";
    },
    // 获取学科列表
    async getSubjectList() {
      const res = await getSubjectListAPI({
        page: this.page,
        pagesize: this.pagesize,
        subjectName: this.form.subjectName,
      });
      console.log(res);
      this.tableData = res.data.items;
      this.total = res.data.counts;
    },
    // 分页改变
    handleCurrentChange(page) {
      this.page = page;
      this.getSubjectList();
    },
    // 每页条数变化
    handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getSubjectList();
    },
    // 搜索事件
    searchFn() {
      this.getSubjectList();
    },
    // 去目录页面
    goDirectorys(row) {
      this.$router.push({
        path: "/subjects/directorys",
        query: {
          id: row.id,
          name: row.subjectName,
        },
      });
    },
    // 去tags页面
    goTags(row) {
      this.$router.push({
        path: "/subjects/tags",
        query: {
          id: row.id,
          name: row.subjectName,
        },
      });
    },
    // 关闭新增弹出层
    closeFn() {
      this.addDialogShow = false;
    },
    // 打开新增
    addDialogShowFn() {
      if (this.addForm.subjectName) {
        this.addForm.subjectName = "";
        this.addForm.isFrontDisplay = 1;
      }
      this.addDialogShow = true;
    },
    // 新增函数
    async addFn() {
      await this.$refs.form.validate();
      await addSubjectAPI(this.addForm);
      this.$refs.form.resetFields();
      await this.getSubjectList();
    },
    // 修改函数
    amendFn(row) {
      // console.log(row);
      this.addForm = row;
      this.addDialogShow = true;
    },
    // 删除函数
    async removeFn(row) {
      // console.log(row);
      await this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      await removeSubjectAPI(row);
      this.$message.success("删除成功");
      await this.getSubjectList();
    },
  },
};
</script>

<style scoped lang="less">
.container {
  background-color: #fff;
  padding: 20px;
  .searchBtn {
    text-align: right;
  }
  /deep/ .el-table tr {
    height: 60px;
  }
  /deep/ .cell {
    a {
      color: #409eff;
      margin-right: 5px;
    }
  }
}
</style>
