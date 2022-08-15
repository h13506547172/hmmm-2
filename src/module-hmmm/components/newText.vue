<template>
  <quill-editor
    class="editor"
    ref="myTextEditor"
    v-model="content"
    :options="editorOption"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @ready="onEditorReady($event)"
    @change="onEditorChange($event)"
  >
  </quill-editor>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: null,
      editorOption: {
        modules: {
          toolbar: [
            ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
            [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
            ["blockquote", "code-block"], // 引用  代码块
            ["link", "image"], // 链接、图片、视频
          ], //工具菜单栏配置
        },
        placeholder: "", //提示
        readyOnly: false, //是否只读
        theme: "snow", //主题 snow/bubble
        syntax: true, //语法检测
      },
    };
  },
  methods: {
    // 失去焦点
    onEditorBlur(editor) {},
    // 获得焦点
    onEditorFocus(editor) {},
    // 开始
    onEditorReady(editor) {},
    // 值发生变化
    onEditorChange(editor) {
      this.$emit("update:text", editor.html);
      // console.log(editor);
    },
  },
  computed: {
    editor() {
      return this.$refs.myTextEditor.quillEditor;
    },
  },
  mounted() {
    // console.log('this is my editor',this.editor);
  },
  watch: {
    text(val) {
      this.content = val;
      // console.log(val);
    },
  },
};
</script>

<style lang="less" scoped>
/deep/ .ql-container {
  height: 200px;
}
</style>
