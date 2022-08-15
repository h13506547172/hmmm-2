<template>
  <div>
    <div v-if="questionType == 1">
      <div v-for="(item, index) in options" :key="item.code" class="option">
        <el-radio
          v-model="item.isRight"
          :label="true"
          @change="passRadioFn($event, index)"
        >
          <span>{{ item.code }}:</span>
          <el-input v-model="item.title" placeholder="请输入内容"></el-input>
          <i class="el-icon-circle-close" @click="item.img = ''"></i>
        </el-radio>
        <uploadImg :obj="item"></uploadImg>
      </div>
    </div>
    <div v-if="questionType == 2">
      <div v-for="item in options" :key="item.code" class="option">
        <el-checkbox v-model="item.isRight" :label="true" class="checkbox">
          <span>{{ item.code }}:</span>
          <el-input v-model="item.title" placeholder="请输入内容"></el-input>
          <i class="el-icon-circle-close" @click="item.img = ''"></i>
        </el-checkbox>
        <uploadImg :obj="item"></uploadImg>
      </div>
    </div>

    <el-button type="danger" :disabled="questionType == 1" @click="addOptions"
      >+增加选项与答案</el-button
    >
  </div>
</template>

<script>
import uploadImg from "./uploadImg.vue";
export default {
  name: "newOptions",
  components: {
    uploadImg,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    questionType: {
      type: String || Number,
      required: true,
    },
  },
  data() {
    return {
      xArr: [
        "a",
        "b",
        "c",
        "d",
        "e",
        "f",
        "g",
        "h",
        "i",
        "j",
        "k",
        "l",
        "m",
        "n",
        "o",
        "p",
        "q",
        "r",
        "s",
        "t",
        "u",
        "v",
        "w",
        "x",
        "y",
        "z",
      ],
    };
  },

  created() {},

  methods: {
    passRadioFn(val, index) {
      this.$emit("radio", index);
    },
    addOptions() {
      if (this.options.length === 26) return;
      const zimu = this.xArr[this.options.length].toUpperCase();
      let newOption = {
        code: "", // ABCD
        title: "", // 
        img: "",
        isRight: false,
      };
      newOption.code = zimu;
      this.$emit("addOption", newOption);
    },
  },
};
</script>

<style lang="less" scoped>
.checkbox {
  width: 240px;
  .el-input {
    width: 240px;
  }
}
.el-radio {
  margin-right: 0;
}
.option {
  display: flex;
  align-items: center;
}
/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  left: 50px;
}
/deep/ .avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  position: relative;
  display: block;
  font-size: 14px;
  color: #8c939d;
  width: 100px;
  height: 60px;
  line-height: 60px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 60px;
  line-height: 60px;
  display: block;
}
.el-icon-circle-close {
  z-index: 999;
  position: absolute;
  top: -23px;
  right: -160px;
}
</style>
