<template>
  <div class="province_modules city_modules vCity">
    <div class="provinceList" :class="className"  :style="{background: 'url('+ imgUrl +')'}" style="background-size: 100% 100%;">
      <div v-for="item in cityList" @click="cityDetail(item)" :class="classNow(cityList.length)" :style="{width:item.curWidth + 'px',height:item.curHeight + 'px'}">
        <p class="name">{{ item.city_name}}</p>
        <h3 class="number">{{ item.count}}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
export default {
  props:['industry','order'],
  data () {
    return {
      areaName: "",
      provinceName: "",
      cityList: [],
      addressName: "",
      imgUrl: "",
      className: "",
      cityName: "",
      firstCompany: "",
      industryName: "",
      hideValue: false
    }
  },
  watch: {
    $route (nv,ol) {
      this.handler();
    },
    order (newVal,oldVal){
      //监听第一级公司的数据变化
      let that = this;
      that.order = newVal;
      this.handler();
    },
    industry (newVal,oldVal){
      //监听按行业的数据变化
      let that = this;
      that.industry = newVal;
      this.handler();
    }
  },
  methods: {
    cityDetail (idx){
      //点击当前的地区--把当前的城市传到下一页面
      this.cityName = idx.city_name;
      //隐藏按地区
      this.$emit('hideValue', this.hideValue);
      this.$router.push({
          path:"/vTable/",
          query:{
            provinceName: this.$route.query.provinceName,
            areaName: this.$route.query.areaName,
            cityName: this.cityName,
            firstCompany: this.firstCompany,
            industryName: this.industryName,
            addressName:this.$route.query.addressName
          }
        })
    },
    classNow (len){
      if(len <= 2){
        return "vCityList"
      }else if(len >= 8){
        return "vCityLength"
      }else{
        return ""
      }
    },
    handler (){
      let that = this;
      this.areaName = this.$route.query.areaName;
      this.addressName = this.$route.query.addressName;
      this.firstCompany = that.order;
      this.industryName = that.industry;
      var industry ="";
      industry = this.industryName.split(",");
      //当默认选中 所有行业时传全部
      if(this.industryName == "所有行业" && industry.length === 1){
        this.industryName = "";
      }
      //
      if(this.$route.query.flage == 3){
        //地区搜索--省份时调用的模块
        var qs = require('qs');
        // 通过参数来限制数据的多少。"areaName": "华北"  industryName firstCompany.   flage ="2"
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        //统计大区分布
        let urls = dataUrl.url +'/basicInfo/getDomSearchInfo';
        //向后台参数
        let reqParams = {
            "addressName": this.$route.query.addressName,
            "flage": "3"
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            this.cityList = res.data;
          }, (err) => {
            
        })
      }else{
        //统计大区城市
        let urls = dataUrl.url +'/basicInfo/getBasicByALLCountCityName';
        var qs = require('qs');
        //向后台参数
        let reqParams = {
              "areaName" : this.areaName,
              "addressName" : this.addressName,
              "provinceName": this.$route.query.provinceName,
              "industryName" : this.industryName,
              "firstCompany" : that.order
        };
        let config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            this.cityList = res.data;
          }, (err) => {
            
        });
      }
      //判断是否存在
      if(this.$route.query.addressName != undefined){
        let urlBgs = dataUrl.url + '/entMenuInfo/getMapImgUrl';
        var qs = require('qs');
        let Params = {
              "imgName" : this.$route.query.addressName,
              "country": "china"
        };
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        this.axios.post(urlBgs,qs.stringify(Params),config)
          .then((res) => {
            this.imgUrl =  dataUrl.url + res.data[0].IMGURL;
            this.className = res.data[0].CLASSNAME
          }, (err) => {
            
        });
      }else{
        //. 背景图。entMenuInfo/getMapImgUrl   imgName = "东北"
        let urlBgs = dataUrl.url + '/entMenuInfo/getMapImgUrl';
        var qs = require('qs');
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        let Params = {
              "imgName" : this.$route.query.provinceName,
              "country": "china"
        };
        this.axios.post(urlBgs,qs.stringify(Params),config)
          .then((res) => {
            this.imgUrl =  dataUrl.url + res.data[0].IMGURL;
            this.className = res.data[0].CLASSNAME
          }, (err) => {
            
        });
      }
      
    }
  },
  mounted () {
    this.handler();
  }
}
</script>
<style lang="less">
  .allViewChina .region_detail_tabs .region_substance .region_content .region_map_content .province_modules .provinceList .vCityLength {
      left: 10%;
      top: 30%;
  }
</style>