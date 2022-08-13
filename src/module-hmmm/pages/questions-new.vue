<template>
  <div class="container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>{{
          $route.params.id ? "试题修改金哲豪" : "试题录入金哲豪"
        }}</span>
      </div>
      <div class="main">
        <el-form
          ref="form"
          :model="formData"
          label-width="100px"
          class="add-form"
        >
          <el-form-item label="学科:">
            <el-select v-model="formData.subjectID" placeholder="请选择">
              <el-option value=""> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="目录:">
            <el-select v-model="formData.catalogID" placeholder="请选择">
              <el-option value=""> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="企业:">
            <el-select v-model="formData.enterpriseID" placeholder="请选择">
              <el-option value=""> </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="城市:" class="city">
            <el-select v-model="formData.provinces" placeholder="请选择">
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
          <el-form-item label="方向：">
            <el-select v-model="formData.direction" placeholder="请选择">
              <el-option value=""> </el-option>
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
          <el-form-item label="题干：">
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
          <el-form-item label="解析答案：">
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
            <el-select v-model="formData.tags" placeholder="请选择">
              <el-option value=""> </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button type="primary">确认提交</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
import { datas } from "@/api/hmmm/citys";
import newText from "../components/newText.vue";
import newOptions from "../components/newOptions.vue";
export default {
  name: "questionsNew",
  components: {
    newText,
    newOptions,
  },
  computed: {
    curCity() {
      return this.datas.find((item) => {
        return item.city === this.formData.provinces;
      });
    },
  },
  data() {
    return {
      formData: {
        subjectID: "",
        catalogID: "",
        enterpriseID: "",
        province: "",
        provinces: "", // 城市
        city: "", // 下地区
        direction: "",
        questionType: "1",
        difficulty: "1",
        question: "",
        options: [
          {
            code: "", //
            title: "A", // ABCD
            img: "",
            isRight: false,
          },
          {
            code: "", //
            title: "B", // ABCD
            img: "",
            isRight: false,
          },
          {
            code: "", //
            title: "C", // ABCD
            img: "",
            isRight: false,
          },
          {
            code: "", //
            title: "D", // ABCD
            img: "",
            isRight: false,
          },
        ],
        videoURL: "",
        answer: "",
        remarks: "",
        tags: "",
      },
      datas, // 城市数据
    };
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
