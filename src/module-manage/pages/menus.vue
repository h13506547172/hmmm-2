<template>
  <div class="main">
    <el-card class="box-card">
      <el-row type="flex" justify="end">
        <el-button
          type="success"
          icon="el-icon-edit"
          class="addMenus"
          size="small"
          @click="addMenusFn"
          >添加菜单</el-button
        >
      </el-row>

      <el-table
        ref="tb"
        :data="tableData"
        style="width: 100%"
        empty-text="没有数据了~"
        :header-cell-style="{
          background: 'rgb(250,250,250)',
          color: '#909399',
        }"
        row-key="id"
        :tree-props="treeProps"
        default-expand-all
        v-loading="tbLoading"
      >
        <el-table-column label="标题" width="200">
          <template v-slot="{ row }">
            <i v-if="row.is_point" class="el-icon-view"></i>
            <i v-else :class="classMy(row)"></i>

            {{ row.title }}
          </template>
        </el-table-column>
        <el-table-column prop="code" label="权限点代码"> </el-table-column>
        <el-table-column prop="address" label="操作" width="150">
          <template>
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              plain
              @click="editBtn"
            ></el-button>
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              plain
              @click="delBtn"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <myAddPoints
      :dialogVisible.sync="dialogVisible"
      :list="selectList"
      @loadList="getList"
    />
  </div>
</template>

<script>
import { list } from "@/api/base/menus";
import myAddPoints from "../components/myAddPoints.vue";

export default {
  components: {
    myAddPoints,
  },
  data() {
    return {
      tableData: [], //表格数据
      treeProps: {
        children: "childs", //绑定childs为孩子
      },
      tbLoading: false, //表格是否加载
      dialogVisible: false, //控制【新建】弹出层
      selectList: [],
    };
  },

  created() {
    //获取列表
    this.getList();
  },

  methods: {
    //处理文件的图标
    classMy(row) {
      if (row.points) {
        return "el-icon-document-remove";
      } else if (!row.points && !row.childs) {
        return "el-icon-document-remove";
      } else if (row.points && row.childs) {
        return "el-icon-folder-opened";
      } else {
        return "el-icon-folder-opened";
      }
    },

    //添加按钮
    addMenusFn() {
      this.dialogVisible = true;
    },
    //获取列表
    async getList() {
      this.tbLoading = true;
      let { data } = await list();
      //将所有points替换为childs
      this.selectList = [{ id: 0, title: "主导航" }, ...data];
      let res = this.pointsTochilds(data);
      this.tableData = res;
      this.tbLoading = false;
    },
    //修改按钮
    editBtn() {},
    //删除按钮
    delBtn() {},
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
  },
};
</script>

<style scoped lang="less">
.main {
  //添加按钮
  .addMenus {
    margin-bottom: 20px;
    background-color: #67c23a;
    &:hover {
      opacity: 0.8;
    }
  }
  //表单表头下划线
  /deep/ .el-table th.el-table__cell.is-leaf {
    border-bottom: 2px solid #e8e8e8;
  }
}
/deep/ .el-table [class*="el-table__row--level"] .el-table__expand-icon {
  display: none;
}
.el-icon-folder-opened,
.el-icon-document-remove,
.el-icon-view {
  font-size: 19px;
}
</style>
