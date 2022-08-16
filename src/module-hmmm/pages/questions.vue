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
                <el-option label="区域一" value="shanghai"></el-option>
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
                <el-option label="区域一" value="shanghai"></el-option>
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
      <template #title> 共 {{ total }}条记录 </template>
    </el-alert>
    <!--第三部分  -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="number" label="试题编号" width="120">
      </el-table-column>
      <el-table-column prop="subject" label="学科" width="80">
      </el-table-column>
      <el-table-column prop="catalog" label="目录" width="80">
      </el-table-column>
      <el-table-column prop="questionType" label="题型" width="80">
      </el-table-column>
      <el-table-column prop="question" label="题干" width="260">
        <template slot-scope="scope">
          <div v-html="scope.row.question"></div>
        </template>
      </el-table-column>
      <el-table-column prop="addDate" label="录入时间" width="180">
        <template slot-scope="scope">
          {{ scope.row.addDate | doneTime }}
        </template>
      </el-table-column>
      <el-table-column prop="difficulty" label="难度" width="80">
      </el-table-column>
      <el-table-column prop="creator" label="录入人" width="80">
      </el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <!-- 预览 -->
          <el-button
            type="primary"
            plain
            circle
            icon="el-icon-view"
            @click="questionsPreview"
          ></el-button>
          <el-button
            type="success"
            plain
            circle
            icon="el-icon-edit"
            @click="revise(scope.row.id)"
          ></el-button>
          <el-button
            type="danger"
            plain
            circle
            icon="el-icon-delete"
          ></el-button>
          <el-button
            type="warning"
            plain
            circle
            icon="el-icon-check"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <!-- 弹框预览 -->
    <questionsPreview
      :visible.sync="questionsPreviewDialogVisible"
    ></questionsPreview>
  </el-card>
</template>

<script>
import { list } from "@/api/hmmm/questions";
import { provinces, citys } from "@/api/hmmm/citys";

import { simple } from "@/api/hmmm/subjects";
import { simple as directorysSimple } from "@/api/hmmm/directorys";
// 弹框对话框
import questionsPreview from "../components/questions-preview";
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
      page: 1,
      pagesize: 5,
      // 初始化列表
      tableData: [],
      total: 0,
      provinces: provinces(),
      // 市级列表
      citysList: [],
      subjectList: [],
      // 二级目录列表
      categoryList: [],
      questionsPreviewDialogVisible: true,
    };
  },
  created() {
    this.list();
    this.simpleSubjectList();
  },
  // 2022-08-15 21:20:58
  components: {
    questionsPreview,
  },
  methods: {
    // 获取初始化的代码
    async list() {
      const res = await list();
      this.total = res.data.counts;
      this.tableData = res.data.items;
    },
    // 初始化一级目录
    async simpleSubjectList() {
      const res = await simple();
      this.subjectList = res.data;
      // console.log(res.data);
    },
    //二级目录
    async chioceSubject(subject) {
      // console.log(subject); //id
      const res = await directorysSimple({ subjectID: subject });
      // console.log(res);
      this.categoryList = res.data;
    },

    //城市列表，市级的铺设
    chioceProvinces(provinces) {
      // console.log(provinces);
      this.citysList = citys(provinces);
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
      const res = await list({
        subjectID: this.form.subject || "",
        keyword: this.form.keywords || "",
        difficulty: this.form.difficulty || "",
        questionType: this.form.type || "",
        page: this.page,
        pagesize: this.pagesize,
      });
      console.log(res);
      this.total = res.data.counts;
      this.tableData = res.data.items;
    },
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
    questionsPreview() {
      this.questionsPreviewDialogVisible = true;
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
</style>
