<template>
  <el-card class="box-card">
    <el-row type="flex" style="margin-bottom: 15px">
      <el-col>
        <el-alert title="说明：目前支持学科和关键字条件筛选" type="success">
        </el-alert
      ></el-col>
      <el-col>
        <el-row type="flex" justify="end">
          <el-button
            type="success"
            icon="el-icon-edit"
            @click="$router.push('/questions/new')"
            >新增试题</el-button
          >
        </el-row>
      </el-col>
    </el-row>

    <!-- 选框 -->
    <el-form ref="form" :model="form" label-width="80px">
      <!-- 第一行 -->
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="学科">
              <el-select
                v-model="form.subject"
                placeholder="请选择"
                @change="chioceSubject(form.subject)"
              >
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in subjectList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="二级目录">
              <el-select v-model="form.category" placeholder="请选择">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in categoryList"
                  :key="item.value"
                ></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="标签">
              <el-select v-model="form.tag" placeholder="请选择">
                <el-option
                  :label="item.label"
                  :value="item.value"
                  v-for="item in tagsSimpleList"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple"></div>
          <el-form-item label="关键字">
            <el-input v-model="form.keywords"></el-input> </el-form-item
        ></el-col>
      </el-row>
      <!-- 第二行  -->
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="试题类型">
              <el-select v-model="form.type" placeholder="请选择">
                <el-option label="单选" value="1"></el-option>
                <el-option label="多选" value="2"></el-option>
                <el-option label="简答" value="3"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="难度">
              <el-select v-model="form.difficulty" placeholder="请选择">
                <el-option label="简单" value="1"></el-option>
                <el-option label="一般" value="2"></el-option>
                <el-option label="困难" value="3"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="方向">
              <el-select v-model="form.toward" placeholder="请选择">
                <!-- o2o，外包服务，企业服务，互联网金融，企业咨询，互联网，电子商务，其他 -->
                <el-option label="o2o" value="o2o"></el-option>
                <el-option label="外包服务" value="外包服务"></el-option>
                <el-option label="企业服务" value="企业服务"></el-option>
                <el-option label="互联网金融" value="互联网金融"></el-option>
                <el-option label="企业咨询" value="企业咨询"></el-option>
                <el-option label="互联网" value="互联网"></el-option>
                <el-option label="电子商务" value="电子商务"></el-option>
                <el-option label="其他" value="其他"></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="录入人">
              <el-select v-model="form.people" placeholder="请选择">
                <el-option
                  :label="item.username"
                  :value="item.id"
                  v-for="item in userSimpleList"
                  :key="item.id"
                ></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
      </el-row>

      <!-- 第三行 -->
      <el-row :gutter="20">
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="题目备注">
              <el-input v-model="form.remark"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="企业简称">
              <el-input v-model="form.simpleName"></el-input>
            </el-form-item></div
        ></el-col>
        <el-col :span="6"
          ><div class="grid-content bg-purple">
            <el-form-item label="城市">
              <el-select
                v-model="form.cityone"
                placeholder="请选择"
                class="cityone"
                @change="chioceProvinces(form.cityone)"
              >
                <el-option
                  :label="item"
                  :value="item"
                  v-for="item in provinces"
                  :key="item"
                ></el-option>
              </el-select>
              <el-select
                v-model="form.citytwo"
                placeholder="请选择"
                class="citytwo"
              >
                <el-option
                  :label="item"
                  :value="item"
                  v-for="item in citysList"
                  :key="item"
                ></el-option>
              </el-select>
            </el-form-item></div
        ></el-col>
        <el-col :span="6">
          <el-row type="flex" justify="end">
            <el-button @click="removeSearch">清除</el-button>
            <el-button
              type="primary"
              @click="searchList(form.subject, form.category)"
              >搜索</el-button
            >
          </el-row>
        </el-col>
      </el-row>
    </el-form>

    <!--  数据一共4条  -->
    <!-- 第二部分 -->
    <el-alert
      type="info"
      show-icon
      style="margin-bottom: 20px"
      :closable="false"
    >
      <template #title v-if="activeName == 'second'">
        共 {{ total1 }}条记录
      </template>
      <template #title v-else-if="activeName == 'third'">
        共 {{ total2 }}条记录
      </template>
      <template #title v-else-if="activeName == 'fourth'">
        共 {{ total3 }}条记录
      </template>
      <template #title v-else> 共 {{ total }}条记录 </template>
    </el-alert>
    <!--第三部分  -->
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
      <!-- 全部 -->
      <el-tab-pane label="全部" name="first">
        <questionChoiceTable
          @onSuccess="choice1"
          :tableData="tableDataAll"
        ></questionChoiceTable>
      </el-tab-pane>

      <!-- 待审核 -->
      <el-tab-pane label="待审核" name="second">
        <questionChoiceTable
          @onSuccess="choice2"
          :tableData="tableDataAwait"
        ></questionChoiceTable>
      </el-tab-pane>

      <!-- 已审核 -->
      <el-tab-pane label="已审核" name="third">
        <questionChoiceTable
          @onSuccess="choice3"
          :tableData="tableDataDone"
        ></questionChoiceTable>
      </el-tab-pane>

      <!-- 已拒绝 -->
      <el-tab-pane label="已拒绝" name="fourth">
        <questionChoiceTable
          @onSuccess="choice4"
          :tableData="tableDataRejected"
        ></questionChoiceTable>
      </el-tab-pane>
    </el-tabs>

    <!-- 分页 -->
    <pageTool
      v-if="activeName == 'first'"
      :paginationPage="pageChange"
      :paginationPagesize="pageSizeChange"
      :total="total"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
    ></pageTool>
    <pageTool
      v-if="activeName == 'second'"
      :paginationPage="pageChange"
      :paginationPagesize="pageSizeChange"
      :total="total1"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
    ></pageTool>
    <pageTool
      v-if="activeName == 'third'"
      :paginationPage="pageChange"
      :paginationPagesize="pageSizeChange"
      :total="total2"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
    ></pageTool>
    <pageTool
      v-if="activeName == 'fourth'"
      :paginationPage="pageChange"
      :paginationPagesize="pageSizeChange"
      :total="total3"
      @pageChange="pageChange"
      @pageSizeChange="pageSizeChange"
    ></pageTool>
  </el-card>
</template>

<script>
import { choice } from "@/api/hmmm/questions";
import { provinces, citys } from "@/api/hmmm/citys";
import { simple } from "@/api/hmmm/subjects";
import { simple as directorysSimple } from "@/api/hmmm/directorys";
import { simple as userSimple } from "@/api/base/users";
import { simple as tagsSimple } from "@/api/hmmm/tags";

// 分页
import pageTool from "@/module-manage/components/page-tool.vue";

// 组件table

import questionChoiceTable from "../components/questionChoiceTable.vue";
export default {
  data() {
    return {
      form: {
        subject: "",
        category: "",
        tag: "",
        keywords: "",

        type: "",
        difficulty: "",
        toward: "",
        people: "",

        remark: "",
        simpleName: "",
        cityone: "",
        citytwo: "",
      },

      // 初始化列表--全部
      tableDataAll: [],
      // 初始化列表--待审核
      tableDataAwait: [],
      // 初始化列表  -已审核
      tableDataDone: [],
      // 初始化列表  -已拒绝
      tableDataRejected: [],

      provinces: provinces(),
      // 市级列表
      citysList: [],
      subjectList: [],
      // 二级目录列表
      categoryList: [],

      // 录入人
      userSimpleList: [],
      // 标签
      tagsSimpleList: [],
      // 分页
      total: 0,
      total1: 0,
      total2: 0,
      total3: 0,
      pagesize: 5,
      page: 1,
      detailDialogList: {},
      // tab
      activeName: "first",
    };
  },
  created() {
    this.choice1();
    this.choice2();
    this.choice3();
    this.choice4();
    this.simpleSubjectList();
    this.userSimple();
  },
  //  questionType(row, column, cellValue, index) {
  //     if (cellValue === 1) return "单选";
  //     if (cellValue === 2) return "多选";
  //     if (cellValue === 3) return "简答";
  //   },
  //   difficulty(row, column, cellValue, index) {
  //     if (cellValue === 1) return "简单";
  //     if (cellValue === 2) return "一般";
  //     if (cellValue === 3) return "困难";
  //   },

  // 2022-08-15 21:20:58
  components: {
    // questionsPreview,
    pageTool,
    questionChoiceTable,
  },

  methods: {
    // 1.1获取初始化的列表--全部
    async choice1() {
      const res = await choice({ page: this.page, pagesize: this.pagesize });
      this.total = res.data.counts;
      this.tableDataAll = res.data.items;
      console.log(res);
    },
    //1.2 获取初始化的列表--待审核
    async choice2() {
      const res = await choice({
        page: this.page,
        pagesize: this.pagesize,
        chkState: 0,
      });
      this.total1 = res.data.counts;

      this.tableDataAwait = res.data.items;
    },
    // 1.3获取初始化的列表--已审核
    async choice3() {
      const res = await choice({
        page: this.page,
        pagesize: this.pagesize,
        chkState: 1,
      });
      this.total2 = res.data.counts;

      this.tableDataDone = res.data.items;
    }, //1.4 获取初始化的列表--已拒绝
    async choice4() {
      const res = await choice({
        page: this.page,
        pagesize: this.pagesize,
        chkState: 2,
      });
      this.total3 = res.data.counts;

      this.tableDataRejected = res.data.items;
    },

    // 初始化一级目录
    async simpleSubjectList() {
      const res = await simple();
      this.subjectList = res.data;
      // console.log(res.data);
    },

    //二级目录 以及 标签列表，依据科目获取subjectID
    async chioceSubject(subject) {
      // 二级目录列表
      // console.log(subject); //id
      const res = await directorysSimple({ subjectID: subject });
      // console.log(res);
      this.categoryList = res.data;

      //标签列表
      const res1 = await tagsSimple({ subjectID: subject });
      console.log(res1);
      this.tagsSimpleList = res1.data;
    },

    //城市列表，市级的铺设
    chioceProvinces(provinces) {
      // console.log(provinces);
      this.citysList = citys(provinces);
    },

    // 录入人列表
    async userSimple() {
      const res = await userSimple();
      this.userSimpleList = res.data;
    },

    // 清除按钮
    removeSearch() {
      this.form = {
        subject: "",
        category: "",
        tag: "",
        keywords: "",

        type: "",
        difficulty: "",
        toward: "",
        people: "",

        remark: "",
        simpleName: "",
        cityone: "",
        citytwo: "",
      };
    },
    // 搜索按钮
    async searchList() {
      const res = await choice({
        subjectID: this.form.subject || "",
        keyword: this.form.keywords || "",
        difficulty: this.form.difficulty || "",
        questionType: this.form.type || "",
        page: this.page,
        pagesize: this.pagesize,
      });
      console.log(res);
      this.total = res.data.counts;
      this.tableDataAll = res.data.items;
    },

    // 分页
    pageChange(val) {
      // console.log(`当前页: ${val}`);
      this.page = val;
      this.choice1();
      this.choice2();
      this.choice3();
      this.choice4();
    },
    pageSizeChange(val) {
      this.pagesize = val;
      this.choice1();
      this.choice2();
      this.choice3();
      this.choice4();
    },

    // tab
    handleClick(tab, event) {
      this.activeName = tab.name;
    },
  },
};
</script>

<style scoped lang="less">
.el-alert {
  padding: 0;
}
.el-alert--success.is-light {
  background-color: #fff;
  color: pink;
  font-size: 12px;
}
/deep/.el-alert__title {
  font-size: 12px;
}
.el-button--success {
  width: 97px;
  height: 32px;
  font-size: 12px;
}
/deep/.el-input__inner {
  width: 251px;
}
/deep/.cityone {
  width: 45%;
  margin-right: 10px;

  .el-input__inner {
    width: 100%;
  }
}
/deep/.citytwo {
  width: 45%;
  .el-input__inner {
    width: 100%;
  }
}

.el-button--success {
  width: 32px;
}
// 没起作用
.operate span {
  font-size: 12px;
  color: #409eff;
}
</style>
