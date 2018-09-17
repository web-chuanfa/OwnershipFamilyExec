<template>
  <div class="region_map_content">
    <router-view :filter="filter" :flage="flage" :region="region" :order="order" :industry="industry" v-on:hideValue="hideValue" v-on:resetAddress="resetAddress">
        <vChinaL :is="currentView"></vChinaL>
    </router-view>
    <!-- 点击筛选 -->
    <div class="trigger_filter clear">
      <a href="javascript:;" @click="showChinaToggle">
        <img src="../../assets/images/trigger_filter.png" alt="">
      </a>
    </div>
    <!-- 显示有导航筛选区域 -->
    <div class="region_search_module_dialog" v-show="isShow">
      <div class="region_search_module">
           <div class="pos_a" @click="hide" style="z-index:1000;">
             <img src="../../assets/images/close.png" alt="">
           </div>
          <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
              <el-tab-pane label="筛选" name="first">
                <div class="region_search_content clear">
                    <div class="region_search_filter">
                      <div class="checkbox-group-module" v-if="isDisplay==true">
                        <h6 style="margin-bottom: 0rem;">按地区</h6>
                        <el-checkbox-button :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox-button>
                        <el-checkbox-group v-model="regionItem" @change="handleCheckedRegionsChange">
                          <el-checkbox-button v-for="item in regionsList" :label="item" :key="item">{{item}}</el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                      <div class="checkbox-group-module">
                        <h6 style="margin-bottom: 0rem;">按行业</h6>
                        <el-checkbox-button :indeterminate="isIndustry" v-model="industryCheckAll" @change="handleCheckAllIndustryMenuChange">全选</el-checkbox-button>
                        <el-checkbox-group v-model="industryMenu" @change="handleCheckedIndustryChange">
                          <el-checkbox-button v-for="item in industryMenuList" :label="item" :key="item">{{item}}</el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                      <div class="checkbox-group-module borderB0">
                        <h6 style="margin-bottom: 0rem;">第一级公司</h6>
                        <el-checkbox-button :indeterminate="isOrder" v-model="orderCheckAll" @change="handleCheckAllOrderMenuChange">全选</el-checkbox-button>
                        <el-checkbox-group v-model="orderMenu" @change="handleCheckedOrderChange">
                          <el-checkbox-button v-for="item in OrderMenuList" :label="item" :key="item">{{item.substring(0,4)}}</el-checkbox-button>
                        </el-checkbox-group>
                      </div>
                      <div class="handle clear">
                        <button class="filter_reset" @click="filterReset">筛选重置</button>
                        <button class="filter_confirm handle_filter_active" @click="chinaData">确认选择</button>
                      </div>
                    </div>
                </div>
              </el-tab-pane>
              <el-tab-pane label="地区搜索" name="second">
                   <div class="region_search_content clear">
                      <div class="region_search_place">
                        <div class="info_search">
                           <input type="text" placeholder="请输入您想搜索的地区" id="searchText" class="searchText" v-model="addressName">
                           <a href="javascript:void(0);" class="icon_search" @click='regionSearch'></a>
                        </div>
                      </div>
                   </div>
              </el-tab-pane>
          </el-tabs>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</template>
<script>
import vChinaL from './vChinaL';
import dataUrl  from  '../../../static/js/urls.json';
const cityOptions = ['东北', '华东', '西北','华中','华南','西南','华北','港澳台'];
const industryOptions = ['金融','制造','工程承包','房地产','资源与能源','其他'];
const OrderOptions = ['中信控股有限责任公司','中信云网有限公司','中信银行股份有限公司'];
export default {
  data () {
    return {
      currentView: "vChinaL",
      mapName: "中国",
      areaName: "",
      total: 0,
      industryName: "",
      firstCompany: "",
      isShow: false,
      activeName2: 'first',
      orderMenu: [''],
      industryMenuList: industryOptions,
      OrderMenuList: OrderOptions,
      region: "",
      industry: "",
      order: "",
      addressName: "",
      flage: 1,
      filter: 2,
      isDisplay: false,
      isIndeterminate: true,
      checkAll: true,
      industryCheckAll: true,
      orderCheckAll: false,
      regionsList: cityOptions,
      regionItem: cityOptions,
      industryMenu: industryOptions,
      isIndustry: true,
      isOrder: true
    }
  },
  watch: {
    $route (nv,ol) {
      if(nv.path.indexOf('vChinaL')>-1 === true){
        this.isDisplay = true;
      }
    },
    isDisplay (newVal,oldVal){
      this.isDisplay = newVal;
    }
  },
  methods: {
    handleCheckAllChange(val) {
      this.regionItem = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    handleCheckedRegionsChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.regionsList.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.regionsList.length;
    },
    handleCheckAllIndustryMenuChange (val){
      this.industryMenu = val ? industryOptions : [];
      this.isIndustry = false;
    },
    handleCheckedIndustryChange (value){
      let checkedCount = value.length;
      this.industryCheckAll = checkedCount === this.industryMenuList.length;
      this.isIndustry = checkedCount > 0 && checkedCount < this.industryMenuList.length;
    },
    handleCheckAllOrderMenuChange (val){
      this.orderMenu = val ? OrderOptions : [];
      this.isOrder = false;
    },
    handleCheckedOrderChange (value){
      let checkedCount = value.length;
      this.orderCheckAll = checkedCount === this.OrderMenuList.length;
      this.isOrder = checkedCount > 0 && checkedCount < this.OrderMenuList.length;
    },
    regionDetail (idx,count,event){
      //点击当前的地区--把当前的地区传到下一页面
      this.areaName = idx;
      //判断是否数据是否为0，零的话不可点击
      if(count == "0"){
        this.$message({
          message: '当前区域暂无数据!',
          center: true
        });
      }else{
        //跳转到省份的页面
        this.$router.push({
          path:"/allViewChina/vChina/vProvince/",
          query:{
            areaName: this.areaName,
            region: this.region,
            order: this.order,
            industry: this.industry
          }
        })
      }
    },
    hideValue: function (hideValue) {
      // hideValue就是子组件传过来的值
      this.isDisplay = hideValue;
    },
    resetAddress: function (resetAddress) {
      // hideValue就是子组件传过来的值
      this.$route.query.addressName = "";
    },
    filterReset (){
        //重置筛选向的数据绑定属性
        this.regionItem = this.regionsList.slice(0,8);
        this.orderMenu = this.OrderMenuList.slice(0,0);
        this.industryMenu = this.industryMenuList.slice(0,6);
    },
    chinaData (){
        //国内--筛选模块--确认提交
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        var qs = require('qs');
        let regionItem = (this.regionItem).join(","),
            industryMenu = (this.industryMenu).join(","),
            orderMenu = (this.orderMenu).join(",");
        this.region = regionItem;
        this.industry = industryMenu;
        this.order = orderMenu;
        // flage = 1 ---> 右导航栏，否则 flage为2
        // //按地图查询菜单（国内）getBasicByCountprovinceName
        let urls = dataUrl.url +'/basicInfo/getBasicByCountprovinceName';
        let params = {
          "areaName": this.region,
          "industryName": this.industry,
          "firstCompany": this.order,
          "flage": "1"
        };
        this.axios.post(urls,qs.stringify(params),config)
          .then((res) => {
            //   this.flag = 1  filter 筛选时过滤
            this.filter = 1;
            this.resetAddress();
            this.hide();
          }, (err) => {
            alert("error")
        });
    },
    hide (){
        //隐藏筛选模块区域
        this.isShow = false;
    },
    regionSearch (){
      this.filterReset();
      // /basicInfo/getDomSearchInfo   flage 1 区。  2 省。   3 市
      let Url = dataUrl.url +'/basicInfo/getDomSearchInfo';
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      var qs = require('qs');
      // flage  = 3
      let params = {
          "addressName": this.addressName,
          "flage": "3"
      };
      this.axios.post(Url,qs.stringify(params),config)
        .then((res) => {
          if(res.data.length != 0){
            this.filter = 3;
            // this.flag  = 3
            this.flage = res.data[0].flage;
            if(this.flage == 1){
              // 跳转到区 
              this.$router.push({
                path:"/allViewChina/vChina/vChinaL/",
                query:{
                  addressName: this.addressName,
                  chooseType: this.$route.query.page,
                  flage: this.flage
                }
              });
            }else if(this.flage == 2){
              // 跳转到省    3
              this.$router.push({
                path:"/allViewChina/vChina/vProvince/",
                query:{
                  addressName: this.addressName,
                  chooseType: this.$route.query.page,
                  flage: "3"
                }
              });
            }else{
              //跳转到市 3
              this.$router.push({
                path:"/allViewChina/vChina/vCity/",
                query:{
                  addressName: this.addressName,
                  chooseType: this.$route.query.page,
                  flage: "3"
                }
              });
            }
            this.hide();
          }else{
            this.$message({
              message: '当前区域暂无数据!',
              center: true
            });
          }
        }, (err) => {
          alert("error")
      });
    },
    handleClick(tab, event) {
        // console.log(tab, event);
    },
    showChinaToggle (){
      //重置按地区 按行业 第一级公司
      this.isShow = !this.isShow;
      //判断是否存在 vChinaL 显示按地区
      if(this.$route.path.indexOf('vChinaL')>-1 === true){
        this.isDisplay = true;
      }else{
        this.isDisplay = false;
      }
      //按地图查询菜单（国内）
      let Url = dataUrl.url +'/entMenuInfo/getMapEntMenuInfo';
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      var qs = require('qs');
      //向后台传递参数
      let params = {
          "mapName": this.mapName
      };
      this.axios.post(Url,qs.stringify(params),config)
        .then((res) => {
          this.regionsList = res.data.reslutArealDistribution;
          this.OrderMenuList = res.data.reslutFirstOrder;
          this.industryMenuList = res.data.reslutIndustry;
        }, (err) => {
          alert("error")
      });
    }
  },
  mounted () {
    //需要 点击选择的时候与中国地图同一个接口，用不同的参数来设置的显示的条件
  }
}
</script>
<style lang="less">
.allViewChina .region_search_module_dialog .region_search_module .el-checkbox-group label{
  margin-right: 0rem !important;
}
.allViewChina .region_search_module_dialog .region_search_module .el-checkbox-group label,.allViewChina .region_search_module_dialog .region_search_module .el-checkbox-group .el-checkbox-button__inner{
  padding: 6px 8px !important;
  border-radius: 0.05rem !important;
}
.region_search_content .el-checkbox-button, .region_search_content .el-checkbox-button__inner{
    padding: 6px 8px !important;
    border-radius: 0.05rem !important;
}
</style>