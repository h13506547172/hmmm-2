<template>
  <!-- 面试技巧 -->
  <div class="container">
    <el-card class="box-card">
      <span>标签名称</span>
      <el-input
        placeholder="请输入内容"
        style="width: 200px"
        v-model="input"
        clearable
      >
      </el-input>
      <!-- 选择 -->
      <span>状态</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 按钮 -->
      <el-button type="primary" class="btnEliminate" @click="eliminateFn"
        >清除</el-button
      >
      <el-button type="primary" @click="searchFn">搜索</el-button>
      <el-button type="success" icon="el-icon-edit" @click="addFn"
        >新增标签</el-button
      >

      <!-- 数据总条数 -->
      <div class="boxnumber">
        <span class="el-icon-info"></span>一共{{ total }}条数据
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column prop="articleBody" label="文章标题">
          <template slot-scope="{ row }">
            <div v-html="row.articleBody"></div>
          </template>
        </el-table-column>
        <el-table-column prop="visits" label="阅读数"></el-table-column>
        <el-table-column prop="username" label="录入人"> </el-table-column>
        <el-table-column prop="createTime" label="录入时间">
          <template slot-scope="{ row }">
            {{ row.createTime | parseTimeByString }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="{ row }">
            {{ row.state == 1 ? "已禁用" : "已启用" }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="操作">
          <template slot-scope="{ row }">
            <el-button type="text" size="small" @click="previewFn(row)">
              预览</el-button
            >
            <el-button
              type="text"
              size="small"
              @click="switchFn(row.id, row.state)"
              >{{ row.state == 1 ? "启用" : "禁用" }}</el-button
            >
            <el-button
              v-show="row.state"
              type="text"
              size="small"
              @click="modifyFn(row)"
            >
              修改</el-button
            >
            <el-button
              v-show="row.state && !row.totals"
              type="text"
              size="small"
              @click="removeFn(row)"
              >删除</el-button
            >
            <el-button v-show="!row.state" type="text" size="small" disabled>
              修改</el-button
            >
            <el-button
              v-show="!row.state || row.totals"
              type="text"
              size="small"
              disabled
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout=" prev, pager, next, sizes,jumper"
        :total="total"
      >
      </el-pagination>
      <!-- 对话框 -->
      <el-dialog
        title="新增文章"
        width="50%"
        :visible.sync="dialogVisible"
        @close="onClose"
      >
        <el-form :model="form" :rules="rules" ref="form">
          <el-form-item label="文章标题" prop="articleBody">
            <el-input
              style="width: 90%"
              placeholder="请输入视频地址"
              v-model="form.articleBody"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="所属学科">
            <NewText :text.sync="form.title"></NewText>
          </el-form-item>
          <el-form-item label="视频地址">
            <el-input
              style="width: 90%"
              placeholder="请输入视频地址"
              v-model="form.videoURL"
              autocomplete="off"
            ></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancelFn">取 消</el-button>
          <el-button type="primary" @click="determineFn">确 定</el-button>
        </span>
      </el-dialog>
    </el-card>
    <!-- 预览框 -->
    <el-dialog title="提示" :visible.sync="dialogV" width="40%">
      <h3 v-html="preview.articleBody"></h3>
      <span> {{ preview.createTime | parseTimeByString }} </span>
      <span> {{ preview.username }} </span>
      <i class="el-icon-view"></i><span> {{ preview.visits }} </span>
      <p>{{ preview.videoURL }}</p>
    </el-dialog>
  </div>
</template>

<script>
import {
  list,
  add,
  changeState,
  update,
  remove,
} from "../../api/hmmm/articles";
import { simple } from "../../api/hmmm/subjects";
import NewText from "../components/newText.vue";
export default {
  data() {
    return {
      dialogV: false,
      dialogVisible: false,
      pageSize: 10,
      total: 0,
      page: 1,
      subject: [],
      switchS: "",
      preview: {},
      form: {
        articleBody: "",
        id: "",
        videoURL: "",
        title: "",
      },
      options: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 0,
          label: "禁用",
        },
      ],
      id: "",
      value: "",
      input: "",
      tableData: [],
      currentPage1: 1,
      rules: {
        articleBody: [{ required: true, message: "请输入", trigger: "blur" }],
      },
    };
  },
  created() {
    this.getCatalogdetails();
  },
  methods: {
    // 请求列表数据
    async getCatalogdetails() {
      const res = await list({
        page: this.page,
        pagesize: this.pageSize,
      });
      console.log(res);
      this.tableData = res.data.items;
      this.total = res.data.counts;
    },
    // 每一页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCatalogdetails();
    },
    // 页数当前
    handleCurrentChange(val) {
      this.page = val;
      this.getCatalogdetails();
    },
    // 搜索
    async searchFn() {
      console.log(this.input);
      console.log(this.value);
      const res = await list({
        keyword: this.input,
        state: this.value,
        page: 1,
        pagesize: 10,
      });
      this.tableData = res.data.items;
      this.getCatalogdetails();
    },
    // 清除输入框
    eliminateFn() {
      this.input = "";
      this.value = "";
    },
    // 新增
    addFn() {
      this.dialogVisible = true;
      console.log("新增");
    },
    // 修改
    modifyFn(row) {
      this.form.articleBody = row.articleBody;
      this.form.videoURL = row.videoURL;
      this.form.title = row.title;
      console.log(row.id);
      this.form.id = row.id;
      // this.id= row.subjectID
      this.dialogVisible = true;
    },
    // 取消
    cancelFn() {
      this.dialogVisible = false;
    },
    // 确定
    async determineFn() {
      await this.$refs.form.validate();
      this.dialogVisible = false;
      if (this.form.id) {
        await update({
          articleBody: this.form.title,
          id: this.form.id,
          title: this.form.articleBody,
          videoURL: this.form.videoURL,
        });
      } else {
        await add(this.form);
      }
      this.getCatalogdetails();
    },
    onClose() {
      this.form = {
        articleBody: "",
        videoURL: "",
        id: "",
        title: "",
      };
    },
    // 删除
    async removeFn(row) {
      await remove(row);
      this.getCatalogdetails();
    },
    async choiceFn() {
      console.log(111);
      const res = await simple();
      console.log(res);
      this.subject = res.data;
    },
    // 切换
    async switchFn(id, state) {
      if (state === 1) {
        state = 0;
      } else state = 1;
      await changeState({
        id,
        state,
      });
      this.getCatalogdetails();
    },
    // 预览
    previewFn(row) {
      this.dialogV = true;
      console.log(row);
      this.preview = row;
    },
  },
  components: {
    NewText,
  },
};
</script>

<style scoped lang="less">
.box-card {
  margin: 5px 10px;
}
.boxnumber {
  margin-top: 20px;
  line-height: 40px;
  padding-left: 20px;
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  span {
    margin-right: 5px;
  }
}
// 清除按钮样式
.btnEliminate {
  background-color: rgba(237, 245, 255);
  color: rgb(34, 109, 249);
}
.btnmodify {
  color: #409eff;
}
// .el-form-item__label{
//   font: 1em sans-serif;
// }
</style>
