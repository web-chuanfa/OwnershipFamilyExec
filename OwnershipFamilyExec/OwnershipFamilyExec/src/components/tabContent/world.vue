<template>
  <div class="region_map_content">
    <router-view :filter="filter" :flage="flage" :continent="continent" :order="order" :industry="industry" v-on:resetAddress="resetAddress">
        <worldL :is="currentView"></worldL>
    </router-view>
    <!-- 点击筛选 -->
    <div class="trigger_filter clear">
        <a href="javascript:;" @click="showToggle">
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
import worldL from './worldL';
import dataUrl  from  '../../../static/js/urls.json';
const cityOptions = ['欧洲', '亚洲', '非洲','南美洲','大洋洲','北美洲'];
const industryOptions = ['金融','制造','工程承包','房地产','资源与能源','其他'];
const OrderOptions = ['中信控股有限责任公司','中信云网有限公司','中信银行股份有限公司'];
export default {
  data () {
    return {
      currentView: "worldL",
      mapName: "世界",
      total: 0,
      entName: "",
      enterpriseId: this.$route.params.id,
      firmName: this.$route.query.firmName,
      page: this.$route.query.page,
      isShow: false,
      activeName2: 'first',
      orderMenu: [''],
      industryMenuList: industryOptions,
      OrderMenuList: OrderOptions,
      continent: "",
      industry: "",
      order: "",
      addressName: "",
      flage: 1,
      filter: 2,
      isDisplay: false,
      isContinent: true,
      continentCheckAll: true,
      industryCheckAll: true,
      orderCheckAll: false,
      continentList: cityOptions,
      continentItem: cityOptions,
      industryMenu: industryOptions,
      isIndustry: true,
      isOrder: true
    }
  },
  watch: {
    $route (nv,ol) {
      if(nv.path.indexOf('chinaL')>-1 === true){
        this.isDisplay = true;
      }
    },
    isDisplay (newVal,oldVal){
      this.isDisplay = newVal;
    }
  },
  methods: {
    handleContinentCheckAllChange(val) {
      this.continentItem = val ? cityOptions : [];
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
    regionDetail (idx,count,event){
      this.entName = idx;
      if(count == "0"){
        this.$message({
          message: '当前区域暂无数据!',
          center: true
        });
      }else{
        this.$router.push({
          path:"/infoDetail/regionSubstance/world/state/"+this.enterpriseId,
          query:{
            continentName: this.entName,
            chooseType: this.page,
            firmName: this.firmName
          }
        })
      }
    },
    resetAddress: function (resetAddress) {
      // hideValue就是子组件传过来的值
      this.$route.query.addressName = "";
    },
    handleClick(tab, event) {
        // console.log(tab, event);
    },
    showToggle (){
        this.isShow = !this.isShow;
      //判断是否存在 vChinaL 显示按地区
      if(this.$route.path.indexOf('worldL')>-1 === true){
        this.isDisplay = true;
      }else{
        this.isDisplay = false;
      }
      let urls = dataUrl.url +'/entMenuInfo/getMapEntMenuInfo';
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      var qs = require('qs');
      //  getBasicCountContinentNameByEntName 世界
      let reqParams = {
          "mapName": "世界"
      };
      this.axios.post(urls,qs.stringify(reqParams),config)
      .then((res) => {
        // console.log(res);
        this.continentList = res.data.reslutArealDistribution;
        this.OrderMenuList = res.data.reslutFirstOrder;
        this.industryMenuList = res.data.reslutIndustry;
      }, (err) => {
        this.$message({
            message: '数据请求失败!',
            center: true
        });
      });
    },
    hide (){
      this.isShow = false;
    },
    continentData (){
      let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        var qs = require('qs');
        let continentItem = (this.continentItem).join(","),
            industryMenu = (this.industryMenu).join(","),
            orderMenu = (this.orderMenu).join(",");
        // console.log(this.regionItem + this.regionItem.length +"yy"+ regionItem == "全部")
        // 判断当只选全部的时候，传所有的大区
        // if(this.continentItem.length == 1 && continentItem == "全部"){
        //   continentItem = (this.continentList.slice(1,9)).join(",");
        // }
        // if(this.industryMenu.length == 1 && industryMenu == "所有行业"){
        //   industryMenu = (this.industryMenuList.slice(1,7)).join(",");
        // }
        // if(this.orderMenu.length == 1 && orderMenu == "所有"){
        //   orderMenu = (this.OrderMenuList.slice(1,4)).join(",");
        // }
        this.continent = continentItem;
        this.industry = industryMenu;
        this.order = orderMenu;
        // flage = 1 ---> 右导航栏，否则 flage为2
        //. 这里加了一个 entName.  continentName
        // 国内地图
        let urls = dataUrl.url +'/regionInfo/getBasicCountContinentNameByEntName';
        let params = {
          "continentName": this.continent,
          "industryName": this.industry,
          "firstCompany": this.order,
          "flage": "1",
          "enterpriseId": this.enterpriseId
        };
        this.axios.post(urls,qs.stringify(params),config)
          .then((res) => {
            this.filter = 1;
            this.resetAddress();
            this.hide();
          }, (err) => {
            this.$message({
                message: '数据请求失败!',
                center: true
            });
        });
    },
    filterReset (){
        //重置筛选向的数据绑定属性
        this.continentItem = this.continentList.slice(0,8);
        this.orderMenu = this.OrderMenuList.slice(0,0);
        this.industryMenu = this.industryMenuList.slice(0,6);
    },
    regionSearch (){
      this.filterReset();
      //判断搜索市国内，还是世界
      let Url = dataUrl.url +'/regionInfo/getDomSearchInfoWorld';
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      var qs = require('qs');
      // flage  = 3
      let params = {
          "addressName": this.addressName,
          "flage": "3",
          "enterpriseId" : this.enterpriseId
      };
      this.axios.post(Url,qs.stringify(params),config)
        .then((res) => {
          if(res.data.length != 0){
            this.filter = 3;
            // this.flag  = 3
            this.flage = res.data[0].flage;
            if(this.flage == 1){
            // 跳转到大洲 1
            this.$router.push({
              path:"/infoDetail/regionSubstance/world/worldL/"+this.enterpriseId,
              query:{
                addressName: this.addressName,
                chooseType: this.$route.query.page,
                flage: this.flage,
                firmName: this.firmName
              }
            });
            }else if(this.flage == 2){
              // 跳转到国家    2
              this.$router.push({
                path:"/infoDetail/regionSubstance/world/state/"+this.enterpriseId,
                query:{
                  addressName: this.addressName,
                  chooseType: this.$route.query.page,
                  flage: this.flage,
                  firmName: this.firmName
                }
              });
            }else{
              //跳转到行业 3
              this.$router.push({
                path:"/infoDetail/regionSubstance/world/trade/"+this.enterpriseId,
                query:{
                  addressName: this.addressName,
                  chooseType: this.$route.query.page,
                  flage: this.flage,
                  firmName: this.firmName
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
          this.$message({
              message: '数据请求失败!',
              center: true
          });
      });
    }
  },
  mounted () {
    // this.handler();
  }
}
</script>
<style scoped>

</style>
