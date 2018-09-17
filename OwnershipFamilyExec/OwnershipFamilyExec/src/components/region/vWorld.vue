<template>
  <div class="region_map_content">
    <router-view :filter="filter" :flage="flage" :continent="continent" :order="order" :industry="industry" v-on:hideValue="hideValue" v-on:resetAddress="resetAddress">
        <vWorldL :is="currentView"></vWorldL>
    </router-view>
    <!-- 点击筛选 -->
    <div class="trigger_filter clear">
        <a href="javascript:;" @click="showWorldToggle">
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
                        <el-checkbox-button :indeterminate="isContinent" v-model="continentCheckAll" @change="handleContinentCheckAllChange">全选</el-checkbox-button>
                        <el-checkbox-group v-model="continentItem" @change="handleCheckedContinentChange">
                          <el-checkbox-button v-for="item in continentList" :label="item" :key="item">{{item}}</el-checkbox-button>
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
                        <button class="filter_confirm handle_filter_active" @click="continentData">确认选择</button>
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
import vWorldL from './vWorldL';
import dataUrl  from  '../../../static/js/urls.json';
const continentOptions = ['亚洲', '非洲', '欧洲','大洋洲','北美洲','南美洲'];
const industryOptions = ['金融','制造','工程承包','房地产','资源与能源','其他'];
const OrderOptions = ['中信控股有限责任公司','中信云网有限公司','中信银行股份有限公司'];
export default {
  data () {
    return {
      isShow:false,
      OrderMenuList: [],
      orderMenu: [''],
      total: 0,
      entName: "",
      mapName: "世界",
      continent: "",
      industry: "",
      order: "",
      filter: 2,
      activeName2: 'first',
      isDisplay: true,
      isContinent: true,
      continentCheckAll: true,
      continentList: continentOptions,
      continentItem: continentOptions,
      industryMenu: industryOptions,
      isIndustry: true,
      industryCheckAll: true,
      industryMenuList: industryOptions,
      isOrder: true,
      orderCheckAll: false,
    }
  },
  methods: {
    handleContinentCheckAllChange(val) {
      this.continentItem = val ? continentOptions : [];
      this.isContinent = false;
    },
    handleCheckedContinentChange(value) {
      let checkedCount = value.length;
      this.continentCheckAll = checkedCount === this.continentList.length;
      this.isContinent = checkedCount > 0 && checkedCount < this.continentList.length;
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
    resetAddress: function (resetAddress) {
      // hideValue就是子组件传过来的值
      this.$route.query.addressName = "";
    },
    regionDetail (idx,count,event){
      this.entName = idx;
      if(count == "0"){
        this.$message({
          message: '当前区域暂无数据!',
          center: true
        });
      }else{
        this.$router.push({
          path:"/allViewChina/vWorldL/vState/",
          query:{
            continentName: this.entName
          }
        })
      }
    },
    showWorldToggle (){
      //重置按地区 按行业 第一级公司
      this.orderMenu = [''];
      this.isShow = !this.isShow;
      //判断是否存在 vChinaL 显示按地区
      if(this.$route.path.indexOf('vChinaL')>-1 === true){
        this.isDisplay = true;
      }else{
        this.isDisplay = false;
      }
      //按地图查询菜单（世界）
      let urls = dataUrl.url +'/entMenuInfo/getMapEntMenuInfo';
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      var qs = require('qs');
      //向后台传递参数
      let reqParams = {
          "mapName": this.mapName
        };
      this.axios.post(urls,qs.stringify(reqParams),config)
      .then((res) => {
        //世界-按地区,第一级公司,按行业 --请求数据
        this.continentList = res.data.reslutArealDistribution;
        this.OrderMenuList = res.data.reslutFirstOrder;
        this.industryMenuList = res.data.reslutIndustry;
      }, (err) => {
        alert("error")
      });
    },
    hideValue: function (hideValue) {
      // hideValue就是子组件传过来的值
      this.isDisplay = hideValue;
    },
    continentData (){
      //设置请求头的类型
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      var qs = require('qs');
      //处理数据--向后台传字符串的格式
      let industryMenu = (this.industryMenu).join(","),
          orderMenu = (this.orderMenu).join(","),
          continentItem = (this.continentItem).join(",");
      //赋值到data属性上
      this.continent = continentItem;
      this.industry = industryMenu;
      this.order = orderMenu;
      //世界-统计各国家的数量
      let worldurls = dataUrl.url +'/basicInfo/getBasicByAllContinentName';
      // 大洲：continentName || 行业：industryName || 第一级公司：firstCompany
      let reqParams = {
        "continentName": this.continent,
        "industryName": this.industry,
        "firstCompany": this.order,
        "flage": "1"
      };
      this.axios.post(worldurls,qs.stringify(reqParams),config)
        .then((res) => {
          this.filter = 1;
          this.resetAddress();
          this.hide();
        }, (err) => {
          alert("error")
      });
    },
    filterReset (){
        //重置筛选向的数据绑定属性
        this.continentItem = this.continentList.slice(0,8);
        this.orderMenu = this.OrderMenuList.slice(0,0);
        this.industryMenu = this.industryMenuList.slice(0,6);
    },
    hide (){
        //隐藏筛选模块区域
        this.isShow = false;
    },
    handleClick(tab, event) {
        // console.log(tab, event);
    },
    regionSearch (){
      this.filterReset();
      //判断搜索市国内，还是世界
      let Url = dataUrl.url +'/basicInfo/getDomSearchInfoWorld';
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
              path:"/allViewChina/vWorld/vWorldL/",
              query:{
                addressName: this.addressName,
                chooseType: this.$route.query.page,
                flage: this.flage
              }
            });
            }else if(this.flage == 2){
              // 跳转到省    3
              this.$router.push({
                path:"/allViewChina/vWorld/vState/",
                query:{
                  addressName: this.addressName,
                  chooseType: this.$route.query.page,
                  flage: "3"
                }
              });
            }else{
              //跳转到市 3
              this.$router.push({
                path:"/allViewChina/vWorld/vTrade/",
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
    }
  },
  mounted () {
    
  }
}
</script>