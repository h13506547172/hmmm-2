<template>
  <el-dialog
    title="创建菜单"
    :visible="dialogVisible"
    width="50%"
    @close="closeFn"
  >
    <el-form ref="formM" :rules="rules" :model="formPoints" label-width="220px">
      <el-form-item label="权限组名称">
        <el-radio-group v-model="formPoints.is_point">
          <el-radio :label="false">菜单</el-radio>
          <el-radio :label="true">权限点</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="权限组名称">
        <el-select
          ref="mySelect"
          v-model="formPoints.pidName"
          placeholder="请选择活动区域"
          popper-class="popperClass"
        >
          <el-option :value="pidValue" class="treeOptin">
            <el-tree
              :expand-on-click-node="false"
              :default-expanded-keys="TreeArr"
              :data="selectList"
              :props="treeProps"
              @node-click="handleNodeClick"
              :render-content="
                !formPoints.is_point ? renderContentPoint : renderContent
              "
            >
            </el-tree>
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="权限代码" class="input50" prop="code">
        <el-input v-model="formPoints.code"></el-input>
      </el-form-item>
      <el-form-item label="权限标题" class="input50" prop="title">
        <el-input v-model="formPoints.title"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="onCon">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { add } from "@/api/base/menus";
export default {
  name: "myAddPoints",
  props: {
    dialogVisible: {
      type: Boolean,
      required: true,
    },
    list: {
      type: Array,
      required: true,
    },
  },
  watch: {
    list: {
      handler(val) {
        this.selectList = val;
      },
      immediate: true,
    },
  },
  data() {
    return {
      TreeArr: [],
      //表单
      formPoints: {
        is_point: false, //是否是权限点
        pid: 0, //选择pid
        code: "", //权限代码
        title: "", //权限标题
        pidName: "主导航",
      },
      //校验规则
      rules: {
        code: [{ required: true, message: "代码不能为空", trigger: "blur" }],
        title: [{ required: true, message: "标题不能为空", trigger: "blur" }],
      },
      selectList: [], //选择pid的数组
      //树图配置
      treeProps: {
        label: "title",
        children: "childs",
      },
      pidValue: "", //下拉选中的值展示
    };
  },

  created() {},

  methods: {
    //自定义树形
    renderContent(h, { node, data, store }) {
      if (data.id == 0) {
        return (
          <span class="headerTree">
            <span>{node.label}</span>
          </span>
        );
      } else if (data.childs && !data.points) {
        return (
          <span class="custom-tree-node-none">
            <span>{node.label}</span>
          </span>
        );
      } else if (!data.is_point) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      } else if (!data.childs && !data.points) {
        return;
      }
    },
    renderContentPoint(h, { node, data, store }) {
      if (data.id == 0) {
        return (
          <span class="headerTree">
            <span>{node.label}</span>
          </span>
        );
      } else if (!data.is_point) {
        return (
          <span class="custom-tree-node">
            <span>{node.label}</span>
          </span>
        );
      }
    },
    //点击树图
    handleNodeClick(val) {
      if (this.formPoints.is_point) {
        if (val.childs && !val.points) return;
        console.log(val);
        this.formPoints.pid = val.id;
        this.formPoints.pidName = val.title;
        this.$refs.mySelect.blur();
      } else {
        console.log(val);
        this.formPoints.pid = val.id;
        this.formPoints.pidName = val.title;
        this.$refs.mySelect.blur();
      }
    },
    //关闭窗口时~
    closeFn() {
      this.$emit("update:dialogVisible", false);
    },
    //确认窗口时~
    async onCon() {
      await this.$refs.formM.validate();
      this.add();
    },
    //添加菜单
    async add() {
      await add(this.formPoints);
      this.closeFn();
      this.$emit("loadList");
    },
  },
};
</script>

<style scoped lang="less">
.el-select-dropdown__item {
  height: 260px;
}
.el-select-dropdown__item.hover,
.el-select-dropdown__item:hover {
  background-color: #fff;
}
/deep/ .el-tree-node__content > .el-tree-node__expand-icon {
  display: none;
}
/deep/.el-tree-node__content {
  height: unset;
}
/deep/.custom-tree-node {
  color: #606266;
  font-size: 14px;
  font-weight: 400;
}
/deep/.custom-tree-node-none {
  cursor: not-allowed;
  pointer-events: none;
  color: #c0c4cc;
}
/deep/.headerTree {
  font-weight: 700;
  color: #409eff !important;
}
/deep/.input50 {
  .el-input {
    width: 50%;
  }
}
</style>
<style>
.treeOptin {
  height: 260px;
  overflow: unset;
}
</style>
