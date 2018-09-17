<template>
  <div class="province_modules city_modules">
    <div class="provinceList" :class="className"  :style="{background: 'url('+ imgUrl +')'}" style="background-size: 100% 100%;">
      <div v-for="item in cityList" @click="cityDetail(item)">
        <p class="name">{{ item.city_name}}</p>
        <h3 class="number">{{ item.count}}</h3>
      </div>
    </div>
  </div>
</template>

<script>
import dataUrl  from  '../../../static/js/urls.json'
export default {
  props:['filter','region','industry','order','flage'],
  data () {
    return {
      areaName: "",
      provinceName: "",
      cityList: [],
      addressName: "",
      entName: this.$route.query.firmName,
      imgUrl: "",
      className: "",
      cityName: "",
      enterpriseId: this.$route.params.id,
      imgName: ""
    }
  },
  watch: {
    flage (newVal,oldVal){
      let that = this;
      //. 监听到当前每次调用 this.handler()变化
      this.handler();
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
    },
    filter (newVal,oldVal){
      // 判断是否地区筛选 = 3， 还是按地区筛选 = 2，或者不筛选 = 1
      let that = this;
      that.filter = newVal;
      this.handler();
    }
  },
  methods: {
    cityDetail (idx){
      this.cityName = idx.city_name;
      this.$router.push({
          path:"/infoDetail/table/"+this.enterpriseId,
          query:{
            provinceName: this.$route.query.provinceName,
            page: this.$route.query.choiceType,
            firmName: this.entName,
            areaName: this.$route.query.areaName,
            cityName: this.cityName,
            flage: this.$route.query.flage,
            addressName: this.$route.query.addressName
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
      if(this.$route.query.flage == 3){
        let Url = dataUrl.url +'/regionInfo/getDomSearchInfo';
        // flage  = 3
        let params = {
            "addressName": this.$route.query.addressName,
            "flage": "3",
            "enterpriseId": this.enterpriseId
        };
        this.axios.post(Url,qs.stringify(params),config)
          .then((res) => {
            if(res.data.length == 0){
              this.cityList = [{"count":"0","curHeight":"60","curWidth":"60","province_name":"暂无","city_name":"暂无"}];
            }else{
              this.cityList = res.data;
            }
          }, (err) => {
            
        });
      }else{
        this.areaName = this.$route.query.areaName;
        this.addressName = this.$route.query.addressName;
        let urls = dataUrl.url +'/regionInfo/getBasicCountcityNameByAll';
        let reqParams = {
              "areaName" : this.areaName,
              "addressName" : this.addressName,
              "enterpriseId": this.enterpriseId,
              "provinceName": this.$route.query.provinceName,
              "areaName": this.$route.query.areaName,
              "industryName": that.industry,
              "firstCompany" : that.order
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            if(res.data.length == 0){
              this.cityList = [{"count":"0","curHeight":"60","curWidth":"60","province_name":"暂无","city_name":"暂无"}];
            }else{
              this.cityList = res.data;
            }
          }, (err) => {
            
          });
      }
      //. 背景图  entMenuInfo/getMapImgUrl   imgName = "东北"
      if(this.addressName === undefined){
        this.imgName = this.$route.query.provinceName;
      }else{
        this.imgName = this.$route.query.addressName;
      }
      let urlBgs = dataUrl.url + '/entMenuInfo/getMapImgUrl';
      let Params = {
            "imgName" : this.imgName,
            "country": "china"
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