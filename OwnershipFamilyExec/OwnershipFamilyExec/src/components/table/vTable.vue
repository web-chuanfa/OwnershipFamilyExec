<template>
  <div class="info_detail_content vTable">
    <div class="region_detail_tabs">
      <div class="region_substance">
        <div class="region_title">
          <a href="javascript:history.go(-1)">
              <i class="el-icon-arrow-left"></i>返回
          </a>地区公司明细列表</div>
        <div class="region_content_modules">
          <div class="region_map_content region_table_content">
              <div class="region_table_content_modules">
                <el-table
                  :data="tableData3"
                  height="550"
                  @row-click="handle"
                  border
                  style="width: 100%">
                  <el-table-column
                    prop="entname"
                    label="公司名称"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="industry_name"
                    label="所属行业"
                    width="110"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="uniscid"
                    label="统一社会信用代码"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="regcap"
                    label="注册资本(万元)"
                    width="120"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="name"
                    label="法定代表人"
                    width="100"
                    align="center">
                  </el-table-column>
                  <el-table-column
                    prop="esdate"
                    label="成立日期"
                    width="120"
                    align="center">
                  </el-table-column>
                </el-table>
              </div>
              <el-pagination
                  background
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page.sync="currentPageNum"
                  :page-size="pageSize"
                  layout="total, prev, pager, next, jumper"
                  :total="Total">
              </el-pagination>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
  export default {
    props:['flage','region','industry','order'],
    data() {
      return {
        tableData3: [],
        pageSize: 10,
        currentPageNum: 1,
        input: '',
        ProvinceName: "",
        Total: 0,
        detailType: "",
        schfilter: "",
        countryNam: "",
        continentName: "",
        entName: "",
        cityName:this.$route.query.cityName
      }
    },
    watch: {
      schfilter: function(val, oldVal){
        this.tableData3 = this.tableData3.filter( item => (~item.entname.indexOf(val)));
      },
      region (newVal,oldVal){
        let that = this;
        that.region = newVal;
        this.handler();
      },
      order (newVal,oldVal){
        let that = this;
        that.order = newVal;
        this.handler();
      },
      industry (newVal,oldVal){
        let that = this;
        that.industry = newVal;
        this.handler();
      }
    },
    methods: {
      handleSizeChange(val) {

      },
      handleCurrentChange(val) {
        let that = this;
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        var qs = require('qs');
        this.ProvinceName = this.$route.query.provinceName;
        let reqParams = {
              'pageNumber': val,
              'pageSize': this.pageSize,
              "provinceName": this.ProvinceName,
              "industryName" : this.$route.query.industryName,
              "firstCompany" : this.$route.query.firstCompany,
              "cityName": this.cityName,
              "continentName": this.$route.query.continentName,
              "countryNam": this.$route.query.countryNam,
              "areaName" : this.$route.query.areaName
        }
        if(this.$route.query.getSearchResult ==1){
          let urls = dataUrl.url +'/basicInfo/getEntSearchResult';
          this.axios.post(urls,qs.stringify(reqParams),config)
            .then((res) => {
              this.tableData3 = res.data.rows;
              this.Total = res.data.total;
            }, (err) => {
              this.$message({
                message: '数据请求失败!',
                center: true
              });
            });
        }else if(this.ProvinceName != undefined){
          let urls = dataUrl.url +'/basicInfo/getBasicByAllProvinceName';
          this.axios.post(urls,qs.stringify(reqParams),config)
            .then((res) => {
              this.tableData3 = res.data.rows;
              this.Total = res.data.total;
            }, (err) => {
              this.$message({
                message: '数据请求失败!',
                center: true
              });
            });
        }else if(this.$route.query.addressName != undefined){
          let urls = dataUrl.url +'/basicInfo/getBasicByAllProvinceName';
          this.axios.post(urls,qs.stringify(reqParams),config)
            .then((res) => {
              this.tableData3 = res.data.rows;
              this.Total = res.data.total;
            }, (err) => {
              this.$message({
                message: '数据请求失败!',
                center: true
              });
          });
        }else{
          //getBasicIndustryNameByAll  getBasicByAllProvinceName
          let urls = dataUrl.url +'/basicInfo/getBasicIndustryNameByAll';
          this.axios.post(urls,qs.stringify(reqParams),config)
            .then((res) => {
              this.tableData3 = res.data.rows;
              this.Total = res.data.total;
            }, (err) => {
              this.$message({
                message: '数据请求失败!',
                center: true
              });
            });
        }   
      },
      handle (row){
        //
        this.$router.push({
            path:"/infoDetail/basicInfo/"+row.entid,
            query:{
              firmName: row.entname,
              enterpriseId: row.entid,
              page: 1,
              now:1
            }
        })
      },
      handler (){
        let that = this;
        let config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
        };
        var qs = require('qs');
        if(!this.$route.query.flage){
          if(!this.$route.query.continentName){
            //国内
            this.ProvinceName = this.$route.query.provinceName;
            let urls = dataUrl.url +'/basicInfo/getBasicByAllProvinceName';
            let reqParams = {
                "pageNumber" : this.currentPageNum,
                "pageSize" : this.pageSize,
                "areaName" : this.$route.query.areaName,
                "provinceName": this.ProvinceName,
                "cityName": this.cityName,
                "industryName" : this.$route.query.industryName,
                "firstCompany" : this.$route.query.firstCompany
            };
            this.axios.post(urls,qs.stringify(reqParams),config)
            .then((res) => {
              this.tableData3 = res.data.rows;
              this.Total = res.data.total;
            }, (err) => {
              this.$message({
                message: '数据请求失败!',
                center: true
              });
            });
          }else{
            // 世界大洲 basicInfo/getBasicByAll
            // this.continentName = this.$route.query.continentName;
            this.entName = this.$route.query.firmName;
            this.countryNam = this.$route.query.countryNam;
            let urls = dataUrl.url +'/basicInfo/getBasicIndustryNameByAll';
            let params = {
                "pageNumber" : this.currentPageNum,
                "pageSize" : this.pageSize,
                "industryName": this.$route.query.industryName,
                "continentName": this.$route.query.continentName,
                "countryNam": this.countryNam,
                "firstCompany" : this.$route.query.firstCompany
            };

            this.axios.post(urls,qs.stringify(params),config)
            .then((res) => {
              this.tableData3 = res.data.rows;
              this.Total = res.data.total;
            }, (err) => {
              this.$message({
                message: '数据请求失败!',
                center: true
              });
            });
          }
        }else{
          let urls = dataUrl.url +'/basicInfo/getEntSearchResult';
          let seParams = {
              "pageNumber" : this.currentPageNum,
              "pageSize" : this.pageSize,
              "keyword" : this.$route.query.firmName,
              "searchType" : this.$route.query.page
          };
          this.axios.post(urls,qs.stringify(seParams),config)
            .then((res) => {
              // console.log(res.data.rows);
              this.tableData3 = res.data.rows;
              this.Total = res.data.total;
            }, (err) => {
              this.$message({
                message: '数据请求失败!',
                center: true
              });
            });
        }
      }
    },
    mounted() {
      this.handler();
    }
  }
</script>
<style lang="less">
@import '../../assets/css/table/vTable.less';
</style>