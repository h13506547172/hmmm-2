<template>
  <div>
    <div v-if="questionType == 1">
      <div v-for="(item, index) in options" :key="item.title" class="option">
        <el-radio
          v-model="item.isRight"
          :label="true"
          @change="passRadioFn($event, index)"
        >
          <span>{{ item.title }}:</span>
          <el-input v-model="item.code" placeholder="请输入内容"></el-input>
        </el-radio>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="avatar-uploader-icon">上传图片</i>
        </el-upload>
      </div>
    </div>
    <div v-if="questionType == 2">
      <div v-for="item in options" :key="item.title" class="option">
        <el-checkbox v-model="item.isRight" :label="true" class="checkbox">
          <span>{{ item.title }}:</span>
          <el-input v-model="item.code" placeholder="请输入内容"></el-input>
        </el-checkbox>
        <el-upload
          class="avatar-uploader"
          action="https://jsonplaceholder.typicode.com/posts/"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :auto-upload="false"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="avatar-uploader-icon"
            ><i class="el-icon-circle-close"></i><span>上传图片</span></i
          >
        </el-upload>
      </div>
    </div>

    <el-button type="danger" :disabled="questionType == 1" @click="addOptions"
      >+增加选项与答案</el-button
    >
  </div>
</template>

<script>
export default {
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
      imageUrl: "",
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
    // 上传图片
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    addOptions() {
      if (this.options.length === 26) return;
      const zimu = this.xArr[this.options.length].toUpperCase();
      let newOption = {
        code: "", //
        title: "", // ABCD
        img: "",
        isRight: false,
      };
      newOption.title = zimu;
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
</style>
