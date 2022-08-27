<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{
          $route.query?.id ? "试题修改金哲豪" : "试题录入金哲豪"
        }}</span>
      </div>
      <div class="main">
        <el-form
          ref="form"
          :model="formData"
          :rules="rules"
          label-width="100px"
          class="add-form"
        >
          <el-form-item label="学科:" prop="subjectID">
            <el-select
              v-model="formData.subjectID"
              placeholder="请选择"
              @change="changeSubject"
            >
              <el-option
                v-for="item in simpleList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目录:" prop="catalogID">
            <el-select v-model="formData.catalogID" placeholder="请选择">
              <el-option
                v-for="item in directorysList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业:" prop="enterpriseID">
            <el-select v-model="formData.enterpriseID" placeholder="请选择">
              <el-option
                v-for="item in companysList"
                :key="item.id"
                :label="item.shortName"
                :value="item.id"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市:" class="city" prop="city">
            <el-select v-model="formData.province" placeholder="请选择">
              <el-option
                v-for="item in datas"
                :key="item.city"
                :value="item.city"
              >
              </el-option>
            </el-select>
            <el-select
              v-model="formData.city"
              placeholder="请选择"
              class="city"
            >
              <el-option
                v-for="item in curCity?.area"
                :key="item"
                :value="item"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="方向：" prop="direction">
            <el-select v-model="formData.direction" placeholder="请选择">
              <el-option label="o2o" value="o2o"> </el-option>
              <el-option label="外包服务" value="外包服务"> </el-option>
              <el-option label="企业服务" value="企业服务"> </el-option>
              <el-option label="互联网金融" value="互联网金融"> </el-option>
              <el-option label="企业咨询" value="企业咨询"> </el-option>
              <el-option label="互联网" value="互联网"> </el-option>
              <el-option label="电子商务" value="电子商务"> </el-option>
              <el-option label="其他" value="其他"> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题型：">
            <el-radio v-model="formData.questionType" label="1">单选</el-radio>
            <el-radio v-model="formData.questionType" label="2">多选</el-radio>
            <el-radio v-model="formData.questionType" label="3">简答</el-radio>
          </el-form-item>
          <el-form-item label="难度：">
            <el-radio v-model="formData.difficulty" label="1">简单</el-radio>
            <el-radio v-model="formData.difficulty" label="2">一般</el-radio>
            <el-radio v-model="formData.difficulty" label="3">困难</el-radio>
          </el-form-item>
          <el-form-item label="题干：" prop="question">
            <newText :text.sync="formData.question"></newText>
          </el-form-item>
          <!-- 单选多选 -->
          <el-form-item
            label="选项："
            v-if="formData.questionType == 1 || formData.questionType == 2"
          >
            <newOptions
              :options="formData.options"
              :questionType="formData.questionType"
              @radio="radioFn"
              @addOption="addOptionFn"
            ></newOptions>
          </el-form-item>
          <el-form-item label="解析视频:" class="video">
            <el-input v-model="formData.videoURL"></el-input>
          </el-form-item>
          <el-form-item label="解析答案：" prop="answer">
            <newText :text.sync="formData.answer"></newText>
          </el-form-item>
          <el-form-item label="题目备注：">
            <el-input
              type="textarea"
              v-model="formData.remarks"
              class="remarks"
            ></el-input>
          </el-form-item>
          <el-form-item label="试题标签:">
            <el-select
              multiple
              filterable
              allow-create
              default-first-option
              v-model="formData.tags"
              placeholder="请选择"
            >
              <el-option
                v-for="item in tagsList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary" @click="confirmFn">确认提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { datas } from "@/api/hmmm/citys";
import newText from "../components/newText.vue";
import newOptions from "../components/newOptions.vue";
import { simple } from "@/api/hmmm/subjects";

import { list as getCompanysListAPI } from "@/api/hmmm/companys";
import { simple as getdirectorysListAPI } from "@/api/hmmm/directorys";
import { simple as getTagsListAPI } from "@/api/hmmm/tags";
import {
  add as addQuestionAPI,
  detail as getSubjectDetail,
} from "@/api/hmmm/questions";

export default {
  name: "questionsNew",
  components: {
    newText,
    newOptions,
  },
  computed: {
    curCity() {
      return this.datas.find((item) => {
        return item.city === this.formData.province;
      });
    },
  },
  data() {
    return {
      formData: {
        subjectID: "",
        catalogID: "",
        enterpriseID: "",
        province: "", // 城市
        city: "", // 下地区
        direction: "",
        questionType: "1",
        difficulty: "1",
        question: "",
        options: [
          {
            code: "A", //
            title: "", // ABCD
            img: "",
            isRight: false,
          },
          {
            code: "B", //
            title: "", // ABCD
            img: "",
            isRight: false,
          },
          {
            code: "C", //
            title: "", // ABCD
            img: "",
            isRight: false,
          },
          {
            code: "D", //
            title: "", // ABCD
            img: "",
            isRight: false,
          },
        ],
        videoURL: "",
        answer: "",
        remarks: "",
        tags: "",
      },
      rules: {
        subjectID: [{ required: true, message: "请选择", trigger: "change" }],
        catalogID: [{ required: true, message: "请选择", trigger: "change" }],
        enterpriseID: [
          { required: true, message: "请选择", trigger: "change" },
        ],
        province: [{ required: true, message: "请选择", trigger: "change" }],
        city: [{ required: true, message: "请选择", trigger: "change" }],
        direction: [{ required: true, message: "请选择", trigger: "change" }],
        question: [{ required: true, message: "请填写", trigger: "blur" }],
        answer: [{ required: true, message: "请填写", trigger: "blur" }],
        tags: [{ required: true, message: "请填写", trigger: "blur" }],
      },
      datas, // 城市数据
      simpleList: [], //学科简单列表
      companysList: [], // 公司列表
      directorysList: [], // 目录列表
      tagsList: [], // 标签列表
    };
  },
  async created() {
    await this.getSimpleList();
    await this.getCompanysList();
    if (this.$route.query.id) {
      console.log(this.$route.query.id);
      const res = await getSubjectDetail({ id: 21 });
      // console.log(res);
      this.formData = res.data;
      if (this.formData.tags) {
        this.formData.tags = this.formData.tags.split(',')
      }else {
        this.formData.tags = []
      }
    }
  },
  methods: {
    // 单选选中题目
    radioFn(index) {
      this.formData.options.forEach((item, ind) => {
        if (index !== ind) {
          item.isRight = false;
        }
      });
    },
    // 增加选项
    addOptionFn(obj) {
      // console.log(obj);
      this.formData.options.push(obj);
    },
    // 获取简单学科列表
    async getSimpleList() {
      const res = await simple();
      // console.log(res);
      this.simpleList = res.data;
    },
    // 获取公司列表
    async getCompanysList() {
      const res = await getCompanysListAPI({ pagesize: 10000 });
      // console.log(res);
      this.companysList = res.data.items;
    },
    // 选中学科
    async changeSubject(val) {
      // console.log(val);
      const res = await getdirectorysListAPI({ subjectID: val });
      // console.log(res);
      this.directorysList = res.data;
      const res2 = await getTagsListAPI({ subjectID: val });
      this.tagsList = res2.data;
    },
    // 确认提交事件
    async confirmFn() {
      await this.$refs.form.validate();
      if (Array.isArray(this.formData.tags)) {
        console.log(11);
        this.formData.tags = this.formData.tags.join(",");
      }

      await addQuestionAPI(this.formData);
      if (this.$route.query.id) {
        this.$router.back();
      } else {
        this.$router.push("/questions/list");
      }
      this.$message.success("添加题目成功");
    },
  },
  watch: {
    "formData.questionType"() {
      this.formData.options.forEach((item) => {
        item.isRight = false;
      });
    },
  },
};
</script>

<style scoped lang="less">
.container {
  background-color: #fff;
  .add-form {
    .el-select {
      width: 400px;
    }
    .city {
      .el-select {
        width: 200px !important;
      }
    }
    .remarks {
      width: 400px;
      height: 100px;
      /deep/ .el-textarea__inner {
        height: 96px;
      }
    }
    .video {
      width: 400px;
    }
  }
}
</style>
