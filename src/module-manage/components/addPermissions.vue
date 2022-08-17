<template>
  <el-dialog
    :title="bigTitle"
    :visible="dialogVisible"
    width="50%"
    @close="closeFn"
  >
    <!-- 表单 -->
    <el-form ref="myForm" :model="myForm" label-width="220px" :rules="rules">
      <el-form-item label="用户名" class="input50" prop="title">
        <el-input v-model="myForm.title"></el-input>
      </el-form-item>
      <el-form-item label="权限分配">
        <el-tree
          :data="treeData"
          :props="treeProps"
          show-checkbox
          :default-expanded-keys="[0]"
          @check-change="handleCheckChange"
          node-key="id"
          ref="myTree"
        >
        </el-tree>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="$emit('update:dialogVisible', false)">取 消</el-button>
      <el-button type="primary" @click="onCon">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { list as treeList } from "@/api/base/menus";
import { add, detail, update } from "@/api/base/permissions";
export default {
  name: "addPermissions",
  props: {
    //控制弹窗开关
    dialogVisible: {
      type: Boolean,
      required: true,
    },
  },
  data() {
    return {
      //标题
      bigTitle: "创建权限组",
      //表单
      myForm: {
        title: "", //权限名字
        permissions: [], //选择权限id
      },
      //表单校验规则
      rules: {
        title: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
      },
      //树形图
      treeProps: {
        label: "title",
        children: "childs",
      },
      //树形数据
      treeData: [],
    };
  },

  created() {
    //获取树形列表
    this.getTreeList();
  },

  methods: {
    //递归处理树状结构
    pointsTochilds(data) {
      let arr = [];
      data.forEach((item) => {
        if (item.points) {
          item.childs = item.points;
          this.pointsTochilds(item.childs);
          arr.push(item);
        } else if (item.childs) {
          this.pointsTochilds(item.childs);
          arr.push(item);
        } else {
          arr.push(item);
        }
      });
      return arr;
    },
    //重置树形
    resetTree() {
      this.$refs.myTree.setCheckedKeys([]); //删除所有选中节点
    },
    //获取树形列表
    async getTreeList() {
      let { data } = await treeList();

      data = this.pointsTochilds(data);
      let rootData = [
        {
          title: "系统菜单和页面权限点",
          id: 0,
          childs: data,
        },
      ];
      this.treeData = rootData;
    },
    //树形图改变
    handleCheckChange(data, checked, indeterminate) {
      const one = this.$refs.myTree.getCheckedNodes();
      let one2 = one.map((item) => item.id);
      this.myForm.permissions = one2;
    },

    //弹窗关闭时
    closeFn() {
      this.$emit("update:dialogVisible", false);
      this.$refs.myForm.resetFields();
    },
    //弹窗点击确认后！
    async onCon() {
      await this.$refs.myForm.validate();
      if (this.bigTitle == "创建权限组") {
        if (this.myForm.permissions.length <= 0)
          return this.$message.error("你可以试试选择一个节点~");
        await this.addPermissions();
        this.$message.success("添加成功");
        this.$emit("update:dialogVisible", false);
      } else {
        await update(this.myForm);
        //如果成功就调用父组件刷新
        this.$emit("renderList");
        this.$message.success("编辑成功");
        this.$emit("update:dialogVisible", false);
      }
    },
    //添加权限的请求
    async addPermissions() {
      await add(this.myForm);
      //如果成功就调用父组件刷新
      this.$emit("renderList");
    },
    //点击编辑按钮后调用的函数
    async editWay(row) {
      this.bigTitle = "编辑权限组";
      //状态回显
      const { data } = await detail(row);
      this.myForm = data;
      this.$refs.myTree.setCheckedKeys(data.permissions);
    },
  },
};
</script>

<style scoped lang="less">
/deep/.input50 {
  .el-input {
    width: 50%;
  }
}
</style>
