<template>
  <div>
    <!-- table -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="number" label="试题编号"> </el-table-column>
      <el-table-column prop="subject" label="学科"> </el-table-column>
      <el-table-column prop="catalog" label="目录"> </el-table-column>
      <el-table-column prop="questionType" label="题型">
        <template slot-scope="scope">
          {{ scope.row.questionType | questionTypeFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="question" label="题干">
        <template slot-scope="scope">
          <div v-html="scope.row.question"></div>
        </template>
      </el-table-column>
      <el-table-column prop="addDate" label="录入时间">
        <template slot-scope="scope">
          {{ scope.row.addDate | doneTime }}
        </template>
      </el-table-column>
      <el-table-column prop="difficulty" label="难度">
        <template slot-scope="scope">
          {{ scope.row.difficulty | difficultyFilter }}
        </template>
      </el-table-column>
      <el-table-column prop="creator" label="录入人"> </el-table-column>
      <!-- 0 待审核 1 通过 2 拒绝 -->
      <el-table-column prop="chkState" label="审核状态" :formatter="chkType">
        <!-- chkType -->
      </el-table-column>
      <el-table-column prop="chkRemarks" label="审核意见"> </el-table-column>
      <el-table-column prop="chkUser" label="审核人"> </el-table-column>
      <el-table-column prop="publishState" label="发布状态"> </el-table-column>
      <el-table-column label="操作" width="200" class="operate" fixed="right">
        <template slot-scope="scope">
          <!-- 预览 -->
          <span
            style="color: #409eff; font-size: 12px"
            @click="questionsPreview(scope.row.id)"
          >
            预览
          </span>
          <el-button
            disabled
            v-if="scope.row.chkState != 0"
            @click="reviewDialogClick"
            style="color: #c0c4cc; font-size: 12px; border: none"
            >审核
          </el-button>

          <el-button
            v-if="scope.row.chkState == 0"
            @click="reviewDialogClick"
            style="color: #409eff; font-size: 12px; border: none"
            >审核
          </el-button>

          <span
            style="color: #409eff; font-size: 12px"
            @click="revise(scope.row.id)"
            >修改
          </span>

          <span
            v-if="scope.row.publishState == 1"
            @click="stackingDialogClick(scope.row)"
            style="color: #409eff; font-size: 12px"
            >上架
          </span>

          <span
            v-else-if="scope.row.publishState == 0"
            @click="stackingDialogClick(scope.row)"
            style="color: #409eff; font-size: 12px"
            >下架
          </span>

          <span
            style="color: #409eff; font-size: 12px"
            @click="onRemove(scope.row)"
            >删除
          </span>
          <span
            style="color: #409eff; font-size: 12px"
            @click="addChoice(scope.row)"
            >取消加入精选
          </span>
        </template>
      </el-table-column>
    </el-table>
    <!-- 弹框预览 -->
    <questionsPreview
      :visible.sync="questionsPreviewDialogVisible"
      :detailDialogList="detailDialogList"
    ></questionsPreview>

    <!-- 审核 -->
    <el-dialog title="题目审核" :visible.sync="reviewDialog" width="400px">
      <el-form :model="reviewForm">
        <el-radio v-model="chkState" label="1">通过</el-radio>
        <el-radio v-model="chkState" label="2">拒绝</el-radio>

        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="chkRemarks"
          style="margin-top: 18px"
        >
        </el-input>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="reviewDialog = false">取 消</el-button>
        <el-button type="primary" @click="reviewDialogSave">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 上架 -->
    <el-dialog
      title="提示"
      :visible.sync="stackingDialog"
      width="400px"
      style="z-index: 9999999"
    >
      <span v-if="publishStateItem.publishState == 0"
        >您确认下架这道题目吗?</span
      >
      <span v-else-if="publishStateItem.publishState == 1"
        >您确认上架这道题目吗?</span
      >
      <span slot="footer" class="dialog-footer">
        <el-button @click="stackingDialog = false">取 消</el-button>
        <el-button type="primary" @click="stackingDialogSave()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
// 映射表
import { chkType, publishType } from "@/api/hmmm/constants";
import { remove, choiceAdd, detail, choicePublish } from "@/api/hmmm/questions";
// 弹框对话框
import questionsPreview from "./questions-preview";
export default {
  data() {
    return {
      // 预览弹框
      questionsPreviewDialogVisible: false,
      //预览数据
      detailDialogList: {},
      // 审核
      reviewDialog: false,
      reviewForm: {},
      chkRemarks: "",
      chkState: "1",
      //上架
      stackingDialog: false,
      // 点击的行数据
      publishStateItem: {},
    };
  },
  props: {
    //table数据
    tableData: {
      type: Array,
      required: true,
    },
  },
  created() {},
  components: {
    questionsPreview,
  },
  methods: {
    // 点击修改按钮
    revise(id) {
      console.log(id);
      this.$router.push({
        path: "/questions/new",
        query: {
          id,
        },
      });
    },
    // 预览对话框
    async questionsPreview(id) {
      this.questionsPreviewDialogVisible = true;
      const res = await detail({ id: id });
      // console.log(res);
      this.detailDialogList = res.data;
    },

    // 精选题库删除与基础接口一致
    async onRemove(row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该题目, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await remove(row);
          this.$emit("onSuccess");
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 该题目取消加入精选
    async addChoice(row) {
      this.$emit("onSuccess");
      this.$confirm("请确认是否取消精选题库?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(async () => {
          await choiceAdd({ choiceState: 0, id: row.id });

          this.$message({
            type: "success",
            message: "取消成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "取消失败",
          });
        });
    },

    // 利用映射表过滤---精品题库
    chkType(row, column, cellValue, index) {
      const findItem = chkType.find((item) => item.value == cellValue);
      //   console.log(cellValue);
      return findItem.label;
    },

    publishType(row, column, cellValue, index) {
      const findItem = publishType.find((item) => item.value == cellValue);
      //   console.log(cellValue);
      return findItem.label;
    },
    // 审核
    reviewDialogClick() {
      this.reviewDialog = true;
    },
    reviewDialogSave() {
      this.reviewDialog = false;
    },

    // 上架
    stackingDialogClick(row) {
      this.publishStateItem = row;

      this.stackingDialog = true;
    },

    async stackingDialogSave() {
      this.stackingDialog = false;
      this.$emit("onSuccess");
      console.log(this.publishStateItem);
      await choicePublish(this.publishStateItem);

      if (this.publishStateItem.publishState == 1) {
        this.$message.success("上架成功");
      } else {
        this.$message.success("下架成功");
      }
      this.$emit("onSuccess");
    },
  },
};
</script>

<style scoped></style>
