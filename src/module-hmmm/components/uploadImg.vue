<template>
  <el-upload
    class="avatar-uploader"
    action="#"
    :show-file-list="false"
    :http-request="onRequest"
  >
    <img v-if="obj.img" :src="obj.img" class="avatar" />
    <i v-else class="avatar-uploader-icon"><span>上传图片</span></i>
  </el-upload>
</template>

<script>
import COS from "cos-js-sdk-v5";
const cos = new COS({
  SecretId: "AKIDNbdS3QbXHn7E9qIXZOyd5JJ4bu0rUt53",
  SecretKey: "6ye8On9HBuQj2EF3d9SXOCqHUTEoBLI1",
});
export default {
  props: {
    obj: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {};
  },

  created() {},

  methods: {
    // 上传图片
    onRequest({ file }) {
      cos.putObject(
        {
          Bucket: "heima-31-2-1313341642" /* 必须 */,
          Region: "ap-shanghai" /* 存储桶所在地域，必须字段 */,
          Key: file.name /* 上传文件名称*/,
          StorageClass: "STANDARD",
          Body: file, // 上传文件对象
          onProgress: function (progressData) {
            console.log(JSON.stringify(progressData));
          },
        },
        (err, data) => {
          if (err || data.statusCode !== 200) {
            return this.$message.error("上传失败请重试");
          }
          this.obj.img = "https://" + data.Location;
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
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
