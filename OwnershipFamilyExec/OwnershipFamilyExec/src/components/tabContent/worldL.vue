<template>
  <div class="worldPlat">
    <div class="info_map">
      <h6><span>{{ firmName }}</span>在<span>全世界</span>共有<span>{{ total }}</span>家公司</h6>
      <div class="region_list">
        <div v-for="(item, index) in continentsList" :class="item.englishname" @click="regionDetail(item.continent_name,item.count,$event)" :plain="true">
          <p class="name">{{ item.continent_name }}</p>
          <h3 class="number">{{ item.count }}</h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
export default {
  props:['filter','continent','industry','order','flage'],
  data () {
    return {
      total: 0,
      continentsList: [],
      entName: "",
      enterpriseId: this.$route.params.id,
      mapName: "世界",
      firmName: this.$route.query.firmName,
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
    handler (){
      let that = this;
      let urls = dataUrl.url +'/regionInfo/getBasicCountContinentNameByEntName';
      var qs = require('qs');
      //. 通过参数来限制数据的多少
      let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
      };
      if(that.filter == 2){
        let reqParams = {
            "mapName" : this.mapName,
            "enterpriseId" : this.enterpriseId,
            "flage": "2"
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            // this.childValue = true;
            this.continentsList = res.data;
            let totales = 0;
            //统计所有的公司总数
            for(let i =0; i< this.continentsList.length;i++){
              totales +=parseInt(this.continentsList[i].count);
            }
            this.total = totales;
          }, (err) => {
            
          })
      }else if(that.filter == 1){
        let reqParams = {
            "mapName" : this.mapName,
            "enterpriseId" : this.enterpriseId,
            "flage": "1",
            "continentName": that.continent,
            "industryName": that.industry,
            "firstCompany" : that.order
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            this.continentsList = res.data;
            let totales = 0;
            //统计所有的公司总数
            for(let i =0; i< this.continentsList.length;i++){
              totales +=parseInt(this.continentsList[i].count);
            }
            this.total = totales;
            //监听地区搜索
            this.$emit('resetAddress', this.resetAddress);
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
        //统计大洲分布
        let urls = dataUrl.url +'/regionInfo/getDomSearchInfoWorld';
        //向后台参数
        let reqParams = {
            "addressName": this.$route.query.addressName,
            "flage": "1",
            "enterpriseId" : this.enterpriseId
        };
        this.axios.post(urls,qs.stringify(reqParams),config)
          .then((res) => {
            this.continentsList = res.data;
            let totales = 0;
            //统计所有的公司总数
            for(let i =0; i< this.continentsList.length;i++){
              totales +=parseInt(this.continentsList[i].count);
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
