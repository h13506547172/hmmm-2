<template>
  <el-dialog
    :title="title"
    :visible="dialogVisible"
    width="50%"
    @close="onClose"
  >
    <el-form
      ref="form"
      :model="form"
      label-width="80px"
      :rules="formRules"
      class="dialog-form"
    >
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" v-if="title === '创建用户'" prop="password">
        <el-input v-model="form.password"></el-input></el-form-item
      ><el-form-item label="角色">
        <el-input v-model="form.role"></el-input>
      </el-form-item>
      <el-form-item label="权限组名称">
        <el-select v-model="form.permission_group_id" placeholder="请选择">
          <el-option
            v-for="item in list"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="form.introduction"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="onClose">取 消</el-button>
      <el-button type="primary" @click="onSave">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { update, add } from "@/api/base/users";
// import getters from "@/store/getters";

export default {
  name: "userDialog",
  props: {
    dialogVisible: {
      type: Boolean,

      required: true,
    },
    list: {
      type: Array,
    },
    title: {
      type: String,
    },
    rowList: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      form: {
        email: "",
        introduction: "",
        password: "",
        permission_group_id: "",
        phone: "",
        role: "",
        username: "",
      },
      formRules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
        ],
        email: [{ required: true, message: "邮箱不能为空", trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
        ],
      },
    };
  },

  created() {},

  methods: {
    async onSave() {
      await this.$refs.form.validate();
      if (this.title === "创建用户") {
        console.log(this.form);
        this.form.sex = 1;
        await add(this.form);

        this.$message.success("新增成功");
        this.onClose();
        this.$emit("add-success");
      } else {
        // id
        // 请求
        // 修改功能所需数据
        // console.log(this.rowId);
        this.form.id = this.rowList.id;
        this.form.permission_group_id = this.rowList.permission_group_id;
        const res = await update(this.form);
        console.log(res);
        this.$message.success("新增成功");
        this.onClose();
        //重新渲染数据
        this.$emit("add-success");
      }
    },

    // 关闭
    onClose() {
      this.$emit("update:dialogVisible", false);
      this.$refs.form.resetFields();
      this.form = {
        email: "",
        introduction: "",
        password: "",
        permission_group_id: "",
        phone: "",
        role: "",
        username: "",
      };
    },
  },
};
</script>

<style scoped>
.dialog-form {
  width: 400px;
  margin-left: 120px;
}
</style>
