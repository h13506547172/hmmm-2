<template>
  <el-dialog title="题目预览" :visible="visible" width="900px" @close="onClose">
    <!-- 内容区域 -->
    <div class="contain">
      <el-row>
        <el-col :span="6"
          >【题型】：<span>{{
            detailDialogList.questionType | questionTypeFilter
          }}</span></el-col
        >
        <el-col :span="6"
          >【编号】：<span>{{ detailDialogList.id }}</span></el-col
        >
        <el-col :span="6"
          >【难度】：<span>{{
            detailDialogList.difficulty | difficultyFilter
          }}</span></el-col
        >
        <el-col :span="6"
          >【标签】：<span>{{ detailDialogList.tags }}</span></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          >【学科】：<span>{{ detailDialogList.subjectName }}</span></el-col
        >
        <el-col :span="6"
          >【目录】：<span>{{ detailDialogList.directoryName }}</span></el-col
        >
        <el-col :span="6"
          >【方向】：<span>{{ detailDialogList.direction }}</span></el-col
        >
      </el-row>
      <hr />
      <div class="lh">【题干】</div>
      <!-- 【题干】内容 -->
      <div v-html="detailDialogList.question" style="color: #00f"></div>

      <!-- 单选题 -->
      <div v-if="detailDialogList.questionType == 1">
        <div class="lh">单选题 选项：（以下选中的选项为正确答案）</div>
        <el-radio-group v-model="radio">
          <el-radio
            :label="item.id"
            v-for="item in detailDialogList.options"
            :key="item.id"
          >
            {{ item.title || "无" }}</el-radio
          >
        </el-radio-group>
      </div>

      <div v-if="detailDialogList.questionType == 2">
        <div class="lh">多选题 选项：（以下选中的选项为正确答案）</div>
        <el-checkbox-group v-model="checkbox">
          <el-checkbox
            :label="item.id"
            v-for="item in detailDialogList.options"
            :key="item.id"
          >
            {{ item.title || "无" }}</el-checkbox
          >
        </el-checkbox-group>
      </div>

      <div class="lh" v-if="detailDialogList.questionType == 3">
        简答 选项：（以下选中的选项为正确答案）
      </div>
      <!--  -->
      <hr />
      <div>
        【参考答案】:
        <button class="video" @click="showVideo = true">视频答案预览</button>
        <div>
          <video width="320" height="240" controls v-show="showVideo === true">
            <source :src="detailDialogList.videoURL" type="video/mp4" />
          </video>
        </div>

        <!-- videoURL -->
      </div>
      <!-- 视频 -->
      <hr />
      <div class="lh parseFather">
        【答案解析】:
        <div v-html="detailDialogList.answer" class="parse"></div>
      </div>

      <hr />
      <div class="lh">【题目备注】: {{ detailDialogList.remarks }}</div>
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

    detailDialogList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      showVideo: false,
      form: {},
      showVideo: false,
      radio: "",
      checkbox: [],
    };
  },
  computed: {
    currentId() {
      return;
    },
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
  width: 100px;
}
.parseFather {
  position: relative;
}
.parse {
  position: absolute;
  top: -14px;
  left: 100px;
}
</style>
