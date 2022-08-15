<template>
  <div class="container">
    <el-card class="box-card">
      <span>标签名称</span>
      <el-input
        placeholder="请输入内容"
        style="width: 200px"
        v-model="input"
        clearable
      >
      </el-input>
      <!-- 选择 -->
      <span>状态</span>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <!-- 按钮 -->
      <el-button type="primary" class="btnEliminate" @click="eliminateFn"
        >清除</el-button
      >
      <el-button type="primary" @click="searchFn">搜索</el-button>
      <el-button type="success" icon="el-icon-edit" @click='addFn'>新增标签</el-button>

      <!-- 数据总条数 -->
      <div class="boxnumber">
        <span class="el-icon-info"></span>一共{{ total }}条数据
      </div>
      <!-- 表格 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column label="序号" width="60" type="index"></el-table-column>
        <el-table-column prop="subjectName" label="所属学科"></el-table-column>
        <el-table-column
          prop="directoryName"
          label="标签名称"
        ></el-table-column>
        <el-table-column prop="username" label="创建者"> </el-table-column>
        <el-table-column prop="addDate" label="创建日期">
          <template slot-scope="{ row }">
            {{ row.addDate | parseTimeByString }}
          </template>
        </el-table-column>
        <el-table-column prop="state" label="状态">
          <template slot-scope="{ row }">
            {{ row.state == 1 ? "启用" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="address" label="操作">
          <el-button type="text" size="small">启用</el-button>
          <el-button type="text" size="small">修改</el-button>
          <el-button type="text" size="small">删除</el-button>
        </el-table-column>
      </el-table>
      <!-- 页码 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage1"
        :page-sizes="[5, 10, 20, 50]"
        :page-size="pageSize"
        layout=" prev, pager, next, sizes,jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>

<script>
import { list } from "../../api/hmmm/directorys";
export default {
  data() {
    return {
      pageSize: 5,
      total: 0,
      page: 1,
      options: [
        {
          value: 1,
          label: "启用",
        },
        {
          value: 0,
          label: "禁用",
        },
      ],
      value: "",
      input: "",
      tableData: [],
      currentPage1: 1,
    };
  },
  created() {
    this.getCatalogdetails();
  },
  methods: {
    // 请求列表数据
    async getCatalogdetails() {
      const res = await list({
        page: this.page,
        pagesize: this.pageSize,
      });
      console.log(res);
      this.tableData = res.data.items;
      this.total = res.data.counts;
    },
    // 每一页多少条
    handleSizeChange(val) {
      this.pageSize = val;
      this.getCatalogdetails();
    },
    // 页数当前
    handleCurrentChange(val) {
      this.page = val;
      this.getCatalogdetails();
    },
    // 搜索
    async searchFn() {
      console.log(this.input);
      console.log(this.value);
      const res = await list({
        directoryName: this.input,
        state: this.value,
        page: 1,
        pagesize: 10,
      });
      this.tableData = res.data.items;
    },
    // 清除输入框
    eliminateFn() {
      this.input = "";
      this.value = "";
    },
    // 新增
    addFn(){
      console.log('新增');
    }
  },
};
</script>

<style scoped lang="less">
.box-card {
  margin: 5px 10px;
}
.boxnumber {
  margin-top: 20px;
  line-height: 40px;
  padding-left: 20px;
  background-color: #eee;
  height: 40px;
  border-radius: 5px;
  span {
    margin-right: 5px;
  }
}
// 清除按钮样式
.btnEliminate {
  background-color: rgba(237, 245, 255);
  color: rgb(34, 109, 249);
}
</style>
