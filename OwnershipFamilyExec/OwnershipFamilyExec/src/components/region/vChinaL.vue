<template>
  <div class="chinaPlat">
    <div class="info_map">
      <h6>在<span>国内</span>共有<span>{{ total }}</span>家公司</h6>
      <div class="region_list">
        <div v-for="(item, index) in regionList" :class="item.englishname" :style="{width:item.curWidth + 'px',height:item.curHeight + 'px'}" @click="regionDetail(item.area_name,item.count,$event)" :plain="true">
          <p class="name">{{ item.area_name }}</p>
          <h3 class="number">{{ item.count }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
export default {
  props:['filter','region','industry','order'],
  data () {
    return {
      regionList: [],
      total: 0,
      mapName: "中国",
      hideValue: false,
      resetAddress: false
    }
  },
  watch: {
    $route (nv,ol) {
      this.handler();
    },
    region (newVal,oldVal){
      //监听地区的数据变化
      let that = this;
      that.region = newVal;
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
    },
    filter (newVal,oldVal){
      // 判断是否地区筛选 = 3， 还是按地区筛选 = 2，或者不筛选 = 1
      let that = this;
      that.filter = newVal;
      this.handler();
    }
  },
  methods: {
    regionDetail (idx,count,event){
      let that = this;
      //点击当前的地区--把当前的地区传到下一页面
      this.areaName = idx;
      //监听是否需要隐藏按地区
      this.$emit('hideValue', this.hideValue);
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
            region: that.region,
            order: that.order,
            industry: that.industry,
            addressName:this.$route.query.addressName
          }
        })
      }
    },
    handler (){
      let that = this;
      //需要 点击选择的时候与中国地图同一个接口，用不同的参数来设置的显示的条件
      if(that.filter == 2){
        //不筛选统计大区
        var qs = require('qs');
        // 通过参数来限制数据的多少。"areaName": "华北"  industryName firstCompany.   flage ="2"
        let config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
        };
        //统计大区分布
        let urls = dataUrl.url +'/basicInfo/getBasicByCountprovinceName';
        //向后台参数
        let reqParams = {
            "mapName" : this.mapName,
            "flage": "2"
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            this.regionList = res.data;
            let totales = 0;
            //统计所有的公司总数
            for(let i =0; i< this.regionList.length;i++){
              totales +=parseInt(this.regionList[i].count);
            }
            this.total = totales;
          }, (err) => {
            
        })
      }else if(that.filter == 1){
        //按地区筛选
        var qs = require('qs');
        // 通过参数来限制数据的多少。"areaName": "华北"  industryName firstCompany.   flage ="2"
        let config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
        };
        //统计大区分布
        let urls = dataUrl.url +'/basicInfo/getBasicByCountprovinceName';
        //向后台参数
        let reqParams = {
            "mapName" : this.mapName,
            "flage": "1",
            "areaName": that.region,
            "industryName": that.industry,
            "firstCompany" : that.order
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            this.regionList = res.data;
            let totales = 0;
            //统计所有的公司总数
            for(let i =0; i< this.regionList.length;i++){
              totales +=parseInt(this.regionList[i].count);
            }
            this.total = totales;
          }, (err) => {
            
        })
      }else{
        //地区搜索时调用的模块
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
            "flage": "1"
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            this.regionList = res.data;
            let totales = 0;
            //统计所有的公司总数
            for(let i =0; i< this.regionList.length;i++){
              totales +=parseInt(this.regionList[i].count);
            }
            this.total = totales;
            //监听地区搜索的文本框值
            this.$emit('resetAddress', this.resetAddress);
          }, (err) => {
            
        })
      }
    }
  },
  mounted () {
    this.handler();
  }
}
</script>