<template>
  <div class="province_modules vTrade">
    <div class="provinceList" :class="className"  :style="{background: 'url('+ imgUrl +')'}" style="background-size: 100% 100%;">
      <div v-for="item in tradeList" @click="tradeDetail(item)" :style="{width:item.curWidth + 'px',height:item.curHeight + 'px'}" :class="classNow(tradeList.length)">
        <p class="name">{{ item.industry_name}}</p>
        <h3 class="number">{{ item.count}}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
export default {
  props:['flage','continent','industry','order'],
  data () {
    return {
      continentName: "",
      trade: "",
      tradeList: [],
      countryNam: "",
      entName: "",
      imgUrl: "",
      className: "",
      addressName: "",
      imgName: ""
    }
  },
  watch: {
    continent (newVal,oldVal){
      let that = this;
      that.continent = newVal;
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
    tradeDetail (idx){
      this.trade = idx.industry_name;
      this.$router.push({
          path:"/vTable/",
          query:{
            industryName: this.trade,
            continentName: this.$route.query.continentName,
            countryNam: this.$route.query.countryNam
          }
        })
    },
    classNow (len){
      if(len <= 4){
        return "vTradeList"
      }else{
        return ""
      }
    },
    handler (){
      let that = this;
      let urls = dataUrl.url +'/basicInfo/getBasicCountIndustryNameByAll';
      var qs = require('qs');
      let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      //定义地区搜索的属性
      this.addressName = this.$route.query.addressName;
      //判断是否地区搜索
      if(this.$route.query.flage == 3){
        //地区搜索--省份时调用的模块
        //统计大洲分布
        let urls = dataUrl.url +'/basicInfo/getDomSearchInfoWorld';
        //向后台参数
        let reqParams = {
            "addressName": this.addressName,
            "flage": "3"
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            this.tradeList = res.data;
          }, (err) => {
            
        })
      }else{
        let reqParams = {
              "continentName" : this.$route.query.continentName,
              "countryNam": this.$route.query.countryNam,
              "industryName" : that.industry,
              "firstCompany" : that.order
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
        .then((res) => {
          this.tradeList = res.data;
        }, (err) => {
          
        })
      }
      // 判断是否进行过地区搜索
      if(this.$route.query.addressName != undefined){
        this.imgName = this.$route.query.addressName;
      }else{
        this.imgName = this.$route.query.countryNam;
      }
      let urlBgs = dataUrl.url + '/entMenuInfo/getMapImgUrl';
      let Params = {
          "imgName" : this.imgName,
          "country": "world"
      };
      this.axios.post(urlBgs,qs.stringify(Params),config)
        .then((res) => {
          this.imgUrl =  dataUrl.url + res.data[0].IMGURL;
          this.className = res.data[0].CLASSNAME
        }, (err) => {
          
      });
       
    }
  },
  mounted () {
    this.handler();
  }
}
</script>
<style lang="less">
  .allViewChina .region_detail_tabs .region_substance .region_content .region_map_content .province_modules .provinceList .vTradeList {
      left: 10%;
      top: 30%;
  }
</style>