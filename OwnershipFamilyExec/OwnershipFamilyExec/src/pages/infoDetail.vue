<template>
  <div class="basic_info_detail">
     <!-- 菜单头部 -->
    <div class="info_detail_header">
       <div class="header_home">
        <!-- <a href="javascript:history.go(-1)">返回</a> -->
        <!-- <a href="javascript:history.back()">返回上一步</a> -->
         <router-link to="/home">
           <img src="../assets/images/home.png" alt="">
         </router-link>
       </div>
       <ul class="menu">
          <li :class="{'active_now':now==1}">
            <router-link :to="'/infoDetail/basicInfo/'+enterpriseId+'?page='+searchType+'&firmName='+firmName">基本信息</router-link>
          </li>
          <li :class="{'active_now':now==2}">
            <router-link  :to="'/infoDetail/stockInfo/allLevel/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="stockMessage();">股权信息</router-link>
          </li>
          <li :class="{'active_now':now==3 || now==5}">
            <router-link :to="'/infoDetail/regionSubstance/china/chinaL/'+enterpriseId+'?page='+searchType+'&firmName='+firmName">地区分布</router-link>
          </li>
       </ul>
       <div class="firm_search">
         <span>公司搜索:</span>
         <div class="info_search" style="top: 0rem;width: 2.55rem;position: relative;">
           <el-autocomplete
            v-model="reqParams.keyword"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入中信集团下属公司"
            @select="handleSelect"
            style="width: 100%;"
          >
          </el-autocomplete>
          <i class="el-icon-search" @click="firmSearch" style="position: absolute;top: 0.2rem;font-size: 0.2rem;right: 0.1rem;color: #dcdfe6;"></i>
         </div>
       </div>
    </div>
    <router-view @nextfirm = "nextfirm">
      <basicInfo :is="currentView"></basicInfo>
    </router-view>
  </div>
</template>
<script>
import basicInfo from '../components/tabContent/basicInfo';
import stockInfo from '../components/tabContent/stockInfo';
import regionSubstance from '../components/tabContent/regionSubstance';
import dataUrl  from  '../../static/js/urls.json';
export default {
  data () {
    return {
      type:2,
      now:1,
      currentView: 'basicInfo',
      enterpriseId: this.$route.params.id,
      searchType: this.$route.query.page,
      firmName: this.$route.query.firmName,
      reqParams: {
          keyword :""
      },
      states: '',
      parents: true,
      restaurants: [],
      timeout:  null
    }
  },
  watch:{
    type (newVal,oldVal) {
      this.currentView = newVal == 4?'regionSubstance':newVal==3?'stockInfo':'basicInfo'
    },
    $route (nv,ol) {
      this.enterpriseId = nv.params.id;
      this.firmName = nv.query.firmName;
      this.now = nv.path.indexOf('basicInfo')>-1?1:nv.path.indexOf('stockInfo')>-1?2:nv.path.indexOf('regionSubstance')>-1?3:nv.path.indexOf('table')>-1?5:4;
    }
  },
  components: {
       basicInfo,
       stockInfo,
       regionSubstance
  },
  methods: {
    handleroute (route) {
      let self = this;
      self.$router.push({
        path:'/infoDetail/'+ route+'/'+self.enterpriseId,
        query:{
          page:self.type,
          firmName:self.firmName
        }
      })
    },
    nextfirm (data){
      this.parents = data;
      this.$emit('nextfirm',this.parents);
    },
    toggleTabs (tabText) {
      this.currentView = tabText;
    },
    loadAll() {
      //一开始加载后台数据
      let urls = dataUrl.url +'/basicInfo/getRealtimeQueryEntName1';
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      this.axios.post(urls).then((res) => {
        //判断是否后台有数据
        this.restaurants = res.data.entNames;   
      }, (err) => {
        this.$message({
          message: '数据请求失败!',
          center: true
        });
      })
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
      if(item.value == "不是中信集团下属公司！"){
        this.$message({
          message: '暂无数据!',
          center: true
        });
        this.reqParams.keyword = "";
      }else{
        this.$router.push({
            path:"/infoDetail/basicInfo/"+item.entid,
            query:{
              page: this.reqParams.searchType,
              firmName: item.value
            }
        });
      }
    },
    firmSearch (){
      let urls = dataUrl.url +'/basicInfo/getEntSearchResult';
      var qs = require('qs');
      let reqParams = {
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
        this.axios.post(urls,qs.stringify(reqParams),config)
            .then((res) => {
              this.$router.push({
                path:"/infoDetail/basicInfo/"+res.data.rows[0].entid,
                query:{
                  page: this.reqParams.searchType,
                  firmName: this.reqParams.keyword
                }
            });
            }, (err) => {
              this.$message({
                  message: '数据请求失败!',
                  center: true
              });
        });
      }
    },
    stockMessage (){
        //给iOS传参数
        // window.postMessage("close");
        // window.postMessage("open");
    }
  },
  mounted () {
    this.type = this.$route.query.page;
    this.now = this.$route.query.now;
    this.loadAll();
  }
}
</script>
<style lang="less">
@import '../assets/css/common/reset.less';
@import '../assets/css/infoDetail/infoDetail.less';
</style>