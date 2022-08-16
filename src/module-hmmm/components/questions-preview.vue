<template>
  <el-dialog title="题目预览" :visible="visible" width="900px" @close="onClose">
    <!-- 内容区域 -->
    <div class="contain">
      <el-row>
        <el-col :span="6">【题型】：<span>单选题</span></el-col>
        <el-col :span="6">【编号】：<span>单选题</span></el-col>
        <el-col :span="6">【难度】：<span>单选题</span></el-col>
        <el-col :span="6">【标签】：<span>单选题</span></el-col>
      </el-row>
      <el-row>
        <el-col :span="6">【学科】：<span>单选题</span></el-col>
        <el-col :span="6">【目录】：<span>单选题</span></el-col>
        <el-col :span="6">【方向】：<span>单选题</span></el-col>
      </el-row>
      <hr />
      <div class="lh">【题干】</div>
      <!--  -->
      <!-- 单选题 -->
      <div class="lh">单选题 选项：（以下选中的选项为正确答案）</div>
      <!--  -->
      <hr />
      <div class="lh">
        【参考答案】:
        <span class="video"> 视频答案预览</span>
      </div>
      <!-- 视频 -->
      <hr />
      <div class="lh">【参考解析】:</div>
      <hr />
      <div class="lh">【题目备注】:</div>
    </div>

    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  props: {
    // 弹层显示隐藏
    visible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      showVideo: false,
    };
  },
  methods: {
    //关闭弹层
    onClose() {
      this.$emit("update:visible", false);
    },
  },
};
</script>

<style scoped lang="scss">
.el-col-6 {
  padding: 10px 0;
}
.lh {
  height: 32px;
  line-height: 32px;
}
.video {
  color: #fff;
  background-color: #f56c6c;
  font-size: 12px;
  padding: 7px;
  border-radius: 5px;
}
</style>
