<template>
  <el-dialog title="题目预览" :visible="visible" width="900px" @close="onClose">
    <!-- 内容区域 -->
    <div class="contain">
      <el-row>
        <el-col :span="6"
          >【题型】：<span>{{ questionType }}</span></el-col
        >
        <el-col :span="6"
          >【编号】：<span>{{ detail.id }}</span></el-col
        >
        <el-col :span="6"
          >【难度】：<span>{{ difficulty }}</span></el-col
        >
        <el-col :span="6"
          >【标签】：<span>{{ detail.tags }}</span></el-col
        >
      </el-row>
      <el-row>
        <el-col :span="6"
          >【学科】：<span>{{ detail.subjectName }}</span></el-col
        >
        <el-col :span="6"
          >【目录】：<span>{{ detail.directoryName }}</span></el-col
        >
        <el-col :span="6"
          >【方向】：<span>{{ detail.direction }}</span></el-col
        >
      </el-row>
      <hr />
      <div class="lh">【题干】</div>
      <div v-html="detail.question"></div>
      <!--  -->
      <!-- 单选题 -->
      <div v-if="detail.questionType == 1">
        <div class="lh">单选题 选项：（以下选中的选项为正确答案）</div>
        <div v-for="item in detail.options" :key="item.code">
          <el-radio :value="item.isRight" :label="1">{{ item.title }}</el-radio>
        </div>
      </div>
      <!-- 多选题 -->
      <div v-if="detail.questionType == 2">
        <div class="lh">多选题 选项：（以下选中的选项为正确答案）</div>
        <div v-for="item in detail.options" :key="item.code">
          <el-radio :value="item.isRight" :label="1">{{ item.title }}</el-radio>
        </div>
      </div>
      <hr />
      <div class="lh" style="height: unset">
        【参考答案】:
        <span class="video" @click="showVideo = true"> 视频答案预览</span>
        <div class="videoBox" v-show="showVideo">
          <video
            id="video"
            :src="detail.videoURL"
            controls="true"
            preload="auto"
            webkit-playsinline="true"
            playsinline="true"
            x-webkit-airplay="allow"
            x5-video-player-type="h5"
            x5-video-orientation="portraint"
            style="object-fit: fill"
          ></video>
        </div>
      </div>
      <hr />
      <div class="lh flex">
        <p>【参考解析】:</p>
        <span v-html="detail.answer"></span>
      </div>
      <hr />
      <div class="lh">【题目备注】:{{ detail.remarks }}</div>
    </div>

    <!-- 底部按钮 -->
    <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="onClose">关闭</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: "preview",
  props: {
    // 弹层显示隐藏
    visible: {
      type: Boolean,
      required: true,
    },
    detail: {
      type: Object,
      required: true,
    },
  },
  computed: {
    questionType() {
      if (this.detail.questionType == 1) return "单选题";
      if (this.detail.questionType == 2) return "多选题";
      if (this.detail.questionType == 3) return "简答题";
    },
    difficulty() {
      if (this.detail.difficulty == 1) return "简单";
      if (this.detail.difficulty == 2) return "一般";
      if (this.detail.difficulty == 3) return "困难";
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
  // height: 32px;
  line-height: 32px;
}
.video {
  color: #fff;
  background-color: #f56c6c;
  font-size: 12px;
  padding: 7px;
  border-radius: 5px;
}
.flex {
  display: flex;
}
.videoBox {
  width: 400px;
  height: 300px;
  video {
    width: 100%;
    height: 100%;
  }
}
</style>
