<template>
  <div class="province_modules">
    <div class="provinceList" :class="className"  :style="{background: 'url('+ imgUrl +')'}" style="background-size: 100% 100%;">
      <div class="northWest" v-for="item in tradeList" @click="tradeDetail(item)" :class="{'lefts':tradeList.length > 3}">
        <p class="name">{{ item.industry_name}}</p>
        <h3 class="number">{{ item.count}}</h3>
      </div>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
export default {
  data () {
    return {
      continentName: "",
      trade: "",
      tradeList: [],
      countryNam: "",
      entName: "",
      imgUrl: "",
      className: "",
      enterpriseId: this.$route.params.id
    }
  },
  methods: {
    tradeDetail (idx){
      this.trade = idx.industry_name;
      this.entName = this.$route.query.firmName;
      console.log(this.entName)
      this.$router.push({
          path:"/infoDetail/table/"+this.enterpriseId,
          query:{
            countryNam: this.trade,
            page: this.$route.query.choiceType,
            firmName: this.entName,
            continentName: this.$route.query.continentName
          }
        })
    }
  },
  mounted () {
    this.entName = this.$route.query.firmName;
    console.log(this.entName)
  let urls = dataUrl.url +'/regionInfo/getBasicCountIndustryNameByEntNameAndContinentNameAndCountryNam';
    var qs = require('qs');
    let reqParams = {
          "continentName" : this.$route.query.continentName,
          "enterpriseId": this.enterpriseId,
          "countryNam": this.$route.query.countryNam
      };
    let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      this.axios.post(urls,qs.stringify(reqParams),config)
      .then((res) => {
        this.tradeList = res.data;
      }, (err) => {
        
      })
     // 显示背景图--接口
    let urlBgs = dataUrl.url + '/entMenuInfo/getMapImgUrl';
    //判断是否进行搜索过
    let Params = {
        "imgName" : this.$route.query.countryNam
    };
    this.axios.post(urlBgs,qs.stringify(Params),config)
      .then((res) => {
        this.imgUrl =  dataUrl.url + res.data[0].IMGURL;
        this.className = res.data[0].CLASSNAME
      }, (err) => {
        
    });
  }
}
</script>
<style scoped>
.province_modules .provinceList{
  background-size: 100% 100% !important;
  margin: 0px auto;
}
.province_modules .Yazhou{
  width: 5.98rem;
  height: 5.25rem;
}
.province_modules .China{
  width: 6.26rem;
  height: 5.05rem;
}
.provinceList{
  padding: 20px;
}
.provinceList div{
  width: 1rem;
  height: 1rem;
  display: inline-block;
  margin-right: 0.2rem;
  border-radius: 50%;
  color: #ffffff;
  text-align: center;
  background: #d7c86f;
  position: relative;
  left: 46%;
  top: 40%;
}
</style>