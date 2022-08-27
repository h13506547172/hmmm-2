<template>
  <div class="container">
    <el-row>
      <el-col :span="12"
        ><el-form label-width="80px">
          <el-form-item label="关键字金哲豪" class="search">
            <el-input v-model="form.id" placeholder="根据编号搜索"></el-input>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="12" class="searchBtn">
        <el-button size="small" @click="clearFn">清除</el-button>
        <el-button type="primary" size="small" @click="searchFn"
          >搜索</el-button
        >
      </el-col>
    </el-row>
    <AlertMsg :total="total"></AlertMsg>
    <!-- 表格部分 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="id" label="编号" width="220"> </el-table-column>
      <el-table-column
        prop="questionType"
        label="题型"
        width="80"
        :formatter="formatterFn"
      >
      </el-table-column>
      <el-table-column label="题目编号" width="220">
        <template #default="{ row }">
          <div
            v-for="(item, index) in row.questionIDs"
            :key="index"
            class="quertionsID"
          >
            <a href="javascript:;" @click="topicPreviewFn(item.id)">{{
              item.number
            }}</a>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="addTime" label="录入时间"> </el-table-column>
      <el-table-column prop="totalSeconds" label="答题时间（s）">
      </el-table-column>
      <el-table-column prop="accuracyRate" label="正确率"> </el-table-column>
      <el-table-column prop="userName" label="录入人"> </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <div class="removeBtn" @click="removeFn(row)">
            <i class="el-icon-delete"></i>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :page-sizes="[20, 30, 50, 100]"
      :page-size="pagesize"
      layout="prev, pager, next,sizes,jumper"
      :total="total"
      :current-page="page"
    >
    </el-pagination>
    <!-- 弹出层 -->
    <preview :visible.sync="visible" :detail="detail"></preview>
  </div>
</template>

<script>
import AlertMsg from "../components/AlertMsg.vue";
import preview from "../components/preview.vue";
import {
  randoms as getRandomsAPI,
  detail as getQuestionDetailAPI,
  remove as removeQuestionAPI,
} from "@/api/hmmm/questions";
export default {
  name: "questions-randoms",
  components: {
    AlertMsg,
    preview,
  },
  data() {
    return {
      // 搜索
      form: {
        id: "",
      },
      // 表格数据
      tableData: [],
      // 分页相关
      page: 1,
      pagesize: 20,
      total: 0,
      // 弹出层
      visible: false,
      detail: {},
    };
  },
  created() {
    this.getRandoms();
  },
  methods: {
    // 获取列表数据
    async getRandoms() {
      const res = await getRandomsAPI({
        page: this.page,
        pagesize: this.pagesize,
        keyword: this.form.id,
      });
      // console.log(res);
      this.total = res.data.counts;
      this.tableData = res.data.items;
    },
    // 清除搜索数据
    clearFn() {
      this.form.id = "";
    },
    // 搜索事件
    searchFn() {
      this.getRandoms();
    },
    formatterFn(row, column, cellValue, index) {
      // console.log(cellValue);
      if (cellValue == 1) return "单选";
      if (cellValue == 2) return "多选";
      return "简答";
    },
    // 改变每页条数
    async handleSizeChange(pagesize) {
      this.pagesize = pagesize;
      this.getRandoms();
    },
    // 改变页码
    async handleCurrentChange(page) {
      this.page = page;
      this.getRandoms();
    },
    // 获取问题详情
    async getQuestionDetail(data) {
      const res = await getQuestionDetailAPI(data);
      this.detail = res.data;
    },
    // 题目预览
    async topicPreviewFn(id) {
      // console.log(id);
      await this.getQuestionDetail({ id: id });
      this.visible = true;
    },
    // 删除题目
    async removeFn(row) {
      console.log(row);
      await this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
      await removeQuestionAPI(row);
      this.$message.success("删除成功");
      await this.getRandoms();
      if (this.tableData.length <= 0 && this.page !== 1) {
        this.page--;
      }
      await this.getRandoms();
    },
  },
};
</script>

<style scoped lang="less">
.container {
  background-color: #fff;
  padding: 20px;
  .search {
    .el-input {
      width: 240px;
    }
  }
  .searchBtn {
    text-align: right;
  }
  .removeBtn {
    width: 36px;
    height: 36px;
    color: #f56c6c;
    background: #fef0f0;
    border-color: #fbc4c4;
    text-align: center;
    line-height: 36px;
    border-radius: 50%;
  }
  .quertionsID {
    color: rgb(0, 153, 255);
  }
}
</style>
