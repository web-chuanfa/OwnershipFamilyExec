<template>
  <div class="insideStockholder"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="firm_stockInfo_content_title">内部股东</div>
    <div class="insideStockholder_content">
      <el-table
        :data="tableData"
        border
        style="width: 100%;height:100%;">
        <el-table-column
          prop="invname"
          align="center"
          label="股东名称">
        </el-table-column>
        <el-table-column
          prop="inv_type_desc"
          label="股东性质"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="conam"
          align="center"
          label="投资金额（万元）">
        </el-table-column>
        <el-table-column
          prop="conprop"
          align="center"
          label="持股占比">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
export default {
  data () {
    return {
      tableData: [],
      pageSize: 10,
      currentPageNum: 1,
      enterpriseId: this.$route.params.id,
      loading: true
    }
  },
  mounted () {
    let urls = dataUrl.url +'/EntinvInfo/getEntinSideShareholderInfo';
    let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
    };
    var qs = require('qs');
    let reqParams = {
        "pageNumber" : this.currentPageNum,
        "pageSize" : this.pageSize,
        "enterpriseId": this.enterpriseId
    };
    this.axios.post(urls,qs.stringify(reqParams),config)
    .then((res) => {
      setTimeout(() => {
          this.loading = false;
          this.tableData = res.data;
      }, 500);
    }, (err) => {
      this.$message({
          message: '数据请求失败!',
          center: true
      });
    })
  }
}
</script>
<style>

</style>
