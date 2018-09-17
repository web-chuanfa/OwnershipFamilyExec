<template>
  <div class="chinaPlat">
    <div class="info_map">
      <h6><span>{{ firmName }}</span>在<span>国内</span>共有<span>{{ total }}</span>家公司</h6>
      <div class="region_list">
        <div v-for="(item, index) in regionList" :class="item.englishname" @click="regionDetail(item.area_name,item.count,$event)" :plain="true">
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
  props:['filter','region','industry','order','flage'],
  data () {
    return {
      mapName: "中国",
      areaName: "",
      regionList: [],
      firmName: this.$route.query.firmName,
      total: 0,
      enterpriseId: this.$route.params.id,
      page: this.$route.query.page,
      resetAddress: false
    }
  },
  watch: {
    flage (){
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
    regionDetail (idx,count,event){
      this.areaName = idx;
      if(count == "0"){
        this.$message({
          message: '当前区域暂无数据!',
          center: true
        });
      }else{
        this.$router.push({
          path:"/infoDetail/regionSubstance/china/province/"+this.enterpriseId,
          query:{
            areaName: this.areaName,
            chooseType: this.page,
            firmName: this.firmName
          }
        })
      }
    },
    handler (){
      let that = this;
      //需要 点击选择的时候与中国地图同一个接口，用不同的参数来设置的显示的条件
      let urls = dataUrl.url +'/regionInfo/getBasicCountAreaNameByCompanyName';
      var qs = require('qs');
      //. 通过参数来限制数据的多少。"areaName": "华北"  industryName firstCompany.   flage ="2"
      let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
      };
      if(that.filter == 2){
        console.log("全部")
        let reqParams = {
            "mapName" : this.mapName,
            "enterpriseId" : this.enterpriseId,
            "flage": "2"
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            // this.childValue = true;
            this.regionList = res.data;
            let totales = 0;
            //统计所有的公司总数
            for(let i =0; i< this.regionList.length;i++){
              totales +=parseInt(this.regionList[i].count);
            }
            this.total = totales;
          }, (err) => {
            this.$message({
                message: '数据请求失败!',
                center: true
            });
          })
      }else if(that.filter == 1){
        console.log("筛选")
        let reqParams = {
            "mapName" : this.mapName,
            "enterpriseId": this.enterpriseId,
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
            //监听地区搜索
            this.$emit('resetAddress', this.resetAddress);
          }, (err) => {
            this.$message({
                message: '数据请求失败!',
                center: true
            });
          })
      }else{
        console.log("搜索")
        //地区搜索时调用的模块
        var qs = require('qs');
        // 通过参数来限制数据的多少。"areaName": "华北"  industryName firstCompany.   flage ="2"
        let config = {
              headers: {
                  'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              }
        };
        //统计大区分布
        let urls = dataUrl.url +'/regionInfo/getDomSearchInfo';
        //向后台参数
        let reqParams = {
            "addressName": this.$route.query.addressName,
            "flage": "1",
            "entName" : this.firmName,
            "enterpriseId": this.enterpriseId
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
<style scoped>

</style>