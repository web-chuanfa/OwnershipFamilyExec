<template>
<div class="equity-homePage" 
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <!-- 头部区域 -->
    <div class="head"></div>
    <!-- 导航筛选 -->
    <div class="infoNav">
      <ul id="info">
        <li @click='toggle1(2)' :class="{ 'active': isA === true}"></li>
        <li @click='toggle2(3)' :class="{ 'active': isB === true}"></li>
        <li @click='toggle3(4)' :class="{ 'active': isC === true}"></li>
      </ul>
    </div>
    <!-- 查询区域 -->
    <div class="searchRegion">
      <el-autocomplete
        v-model="reqParams.keyword"
        :fetch-suggestions="querySearchAsync"
        placeholder="请输入中信集团下属公司"
        @select="handleSelect"
        @blur="onBlur($event)"
        class="input_autocomplete"
      ></el-autocomplete>
        <a href="javascript:void(0);" class="icon-search" @click='searchInfo'></a>
    </div>
    <div class="historyList" v-if="queryhistory.length != 0">
        <strong>热搜：</strong>
        <b v-for="(item, index) in queryhistory" @click="historyDetail(item.entName,$event)">
          <a>{{ item.entName}}</a>
        </b>
        <span class="index-hot-company" @click="zhugeTrack">换一批</span>
        <span @click="recentClear" style="display:none;">删除</span>
    </div>
    <!-- 分布区域 -->
    <div class="mapRegion">
      <div class="mapChina">
        <router-link to="/allViewChina/vChina/vChinaL"></router-link>
      </div>
      <div class="mapWorld">
        <router-link to="/allViewChina/vWorld/vWorldL"></router-link>
      </div>
    </div>
    <!-- 请求失败时 -->
    <div class="error" v-if="error">
      <i class="el-icon-warning"></i>
      <p class="error-text">数据加载失败</p>
    </div>
</div>
</template>
<script>
import dataUrl  from  '../../static/js/urls.json'
export default {
  name:"home",
  data () {
    return {
      reqParams: {
          searchType : 1,
          keyword :"",
          curPage :"1",
          pageSize :"10"
      },
      restaurants: [],
      timeout:  null,
      searchState: {
        "searchtext": '',
        "showsug": false
      },
      infoNav: [
        {
          searchType: 2
        },
        {
          searchType: 3
        },
        {
          searchType: 4
        }
      ],
      flage: 1,
      queryhistory: [],
      historyParams: {
        pageNumber: "1",
        pageSize: "3",
        pages: "",
        total: 0
      },
      isA: false,
      isB: false,
      isC: false,
      loading: true,
      error: false
    }
  },
  methods: {
    toggle1: function(index){
      this.isA=!this.isA;
      if(this.isA == true){
        this.reqParams.searchType = index;
        this.isB = false;
        this.isC = false;
      }else if(this.isB == false && this.isC == false){
        this.reqParams.searchType = 1;
      }
    },
    toggle2: function(index){
      this.isB=!this.isB;
      if(this.isB == true){
        this.reqParams.searchType = index;
        this.isA = false;
        this.isC = false;
      }else if(this.isA == false && this.isC == false){
        this.reqParams.searchType = 1;
      }
    },
    toggle3: function(index){
      this.isC=!this.isC;
      if(this.isC == true){
        this.reqParams.searchType = index;
        this.isA = false;
        this.isB = false;
      }else if(this.isA == false && this.isB == false){
        this.reqParams.searchType = 1;
      }
    },
    loadAll() {
      //一开始加载后台数据
      let urls = dataUrl.url +'/basicInfo/getRealtimeQueryEntName1';
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      this.axios.post(urls)
      .then((res) => {
        //判断是否后台有数据
        this.restaurants = res.data.entNames;
      }, (err) => {
        this.$message({
          message: '数据请求失败!',
          center: true
        });
      })
    },
    onBlur (e){
      // console.log(e);
    },
    querySearchAsync(queryString, cb) {
        var results = queryString ? this.restaurants.filter(this.createStateFilter(queryString)) : this.restaurants;
        if (results.length === 0) {
            //待确定
             results = [{value: '不是中信集团下属公司！'}];
        }
        cb(results);
    },
    createStateFilter(queryString) {
        return (state) => {
          return (state.value.indexOf(queryString) > -1);
        };
    },
    handleSelect(item) {
      //判断是否有后台提供的数据，如果没有的话，就提示相关信息
      if(item.value == "不是中信集团下属公司！"){
        this.$message({
          message: '暂无数据!',
          center: true
        });
        this.reqParams.keyword = "";
      }else{
        //控制跳转到当前页面
        if(this.reqParams.searchType === 1 || this.reqParams.searchType === 2){
          this.$router.push({
            path:"/infoDetail/basicInfo/"+item.entid,
            query:{
              page: this.reqParams.searchType,
              firmName: item.value,
              now:1
            }
          })
        }else if(this.reqParams.searchType === 3){
          this.$router.push({
            path:"/infoDetail/stockInfo/allLevel/"+item.entid,
            query:{
              page: this.reqParams.searchType,
              now:2,
              firmName: item.value
            }
        })
        }else{
          this.$router.push({
            path:"/infoDetail/regionSubstance/china/chinaL/"+item.entid,
            query:{
              page: this.reqParams.searchType,
              firmName: item.value,
              now:3
            }
          })
        }
      } 
    },
    searchInfo() {
      let urls = dataUrl.url +'/basicInfo/getEntSearchResult';
      var qs = require('qs');
      let reqParams = {
          "searchType" : this.reqParams.searchType,
          "keyword" : this.reqParams.keyword
      };
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      if(this.reqParams.keyword == ""){
        this.$message({
          message: '请输入查询信息！',
          center: true
        });
      }else{
         this.axios.post(urls, qs.stringify(reqParams),config)
           .then((res) => {
          //判断是否有数据
          if(res.data.rows.length == 0){
            this.$message({
              message: '暂无数据!',
              center: true
            });
          }else{
            //判断不选择信息导航或者选中基本信息导航时,并且只有一条时执行跳转到基本信息页面，否则执行跳转到基本信息表格页面
            if(this.reqParams.searchType === 1 || this.reqParams.searchType === 2){
              if(res.data.rows.length > 1 && res.data != ""){
                this.$router.push({
                  path:"/infoDetail/table/"+null,
                  query:{
                    page: this.reqParams.searchType,
                    firmName: this.reqParams.keyword,
                    flage: this.flage,
                    now:1,
                    getSearchResult:1
                  }
                })
              }else{
                this.$router.push({
                  path:"/infoDetail/basicInfo/"+res.data.rows[0].entid,
                  query:{
                    page: this.reqParams.searchType,
                    firmName: this.reqParams.keyword,
                    flage: this.flage,
                    now:1
                  }
                })
              }
            }else if(this.reqParams.searchType === 3){
              //判断选中股权信息导航时,并且只有一条时执行跳转到股权信息页面，否则执行跳转到股权信息表格页面
                if(res.data.rows.length > 1 && res.data != ""){
                  this.$router.push({
                    path:"/infoDetail/table/"+null,
                    query:{
                      page: this.reqParams.searchType,
                      firmName: this.reqParams.keyword,
                      flage: this.flage,
                      now:2,
                      getSearchResult:1
                    }
                  })
                }else{
                  this.$router.push({
                    path:"/infoDetail/stockInfo/allLevel/"+res.data.rows[0].entid,
                    query:{
                      page: this.reqParams.searchType,
                      flage: this.flage,
                      now:2,
                      firmName: this.reqParams.keyword
                    }
                  })
                }
            }else{
              //判断选中分布信息导航时,并且只有一条时执行跳转到分布信息页面，否则执行跳转到分布信息表格页面
              if(res.data.rows.length > 1 && res.data != ""){
                  this.$router.push({
                    path:"/infoDetail/table/"+null,
                    query:{
                      page: this.reqParams.searchType,
                      firmName: this.reqParams.keyword,
                      flage: this.flage,
                      now:3,
                      getSearchResult:1
                    }
                  })
                }else{
                  this.$router.push({
                    path:"/infoDetail/regionSubstance/china/chinaL/"+res.data.rows[0].entid,
                    query:{
                      page: this.reqParams.searchType,
                      firmName: this.reqParams.keyword,
                      flage: this.flage,
                      now:3
                    }
                  })
                }
            }
          }
        }, (err) => {
          this.$message({
              message: '数据请求失败!',
              center: true
          });
        })
      }
    },
    historyDetail (item,event){
      this.reqParams.keyword = item;
      this.searchInfo();
    },
    recentClear (){
      //清空数据  /browseHistoryInfo/clearHistoryRecords
      let urls = dataUrl.url +'/browseHistoryInfo/clearHistoryRecords';
      var qs = require('qs');
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      this.axios.post(urls)
      .then((res) => {
         
        }, (err) => {
          this.$message({
            message: '数据请求失败!',
            center: true
          });
      })
    },
    zhugeTrack (){
      this.historyParams.pageNumber = this.historyParams.pageNumber + 1;
      if(this.historyParams.pageNumber > this.historyParams.pages){
        this.historyParams.pageNumber = 1;
      }
      let urls = dataUrl.url +'/browseHistoryInfo/queryhistory';
      var qs = require('qs');
      let params = {
        "pageNumber" : this.historyParams.pageNumber,
        "pageSize" : this.historyParams.pageSize
      };
      let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
      };
      this.axios.post(urls, qs.stringify(params),config)
        .then((res) => {
          this.historyParams.pages = res.data.pages;
          this.queryhistory = res.data.rows;
        }, (err) => {
          this.$message({
            message: '数据请求失败!',
            center: true
          });
      })
    }
  },
  mounted () {
    // 搜索模糊查询--加载时
    this.loadAll();
    // 历史记录 /browseHistoryInfo/queryhistory?pageNumber=1&pageSize=5
    let urls = dataUrl.url +'/browseHistoryInfo/queryhistory';
    var qs = require('qs');
    let params = {
        "pageNumber" : this.historyParams.pageNumber,
        "pageSize" : this.historyParams.pageSize
    };
    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    this.axios.post(urls, qs.stringify(params),config)
      .then((res) => {
        this.historyParams.pages = res.data.pages;
        this.queryhistory = res.data.rows;
        //数据请求成功时
        setTimeout(() => {
          this.loading = false;
        }, 1000);
      }, (err) => {
        this.loading = false;
        this.$message({
          message: '数据请求失败!',
          center: true
        });
    })
  }
}
</script>
<style lang="less">
@import '../assets/css/index.less';
</style>