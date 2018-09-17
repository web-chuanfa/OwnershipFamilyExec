<template>
  <div class="province_modules">
    <div class="provinceList" :class="className"  :style="{background: 'url('+ imgUrl +')'}" style="background-size: 100% 100%;">
      <div class="northWest" v-for="item in stateList" @click="stateDetail(item)">
        <p class="name">{{ item.country_nam}}</p>
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
      state: "",
      stateList: [],
      countryNam: "",
      entName: "",
      imgUrl: "",
      className: "",
      enterpriseId: this.$route.params.id,
      imgName: "",
      addressName: ""
    }
  },
  methods: {
    stateDetail (idx){
      //获取选中国家
      this.state = idx.country_nam;
      this.entName = this.$route.query.firmName;
      this.$router.push({
          path:"/infoDetail/table/"+this.enterpriseId,
          query:{
            countryNam: this.state,
            choiceType: this.$route.query.chooseType,
            firmName: this.entName,
            continentName: this.$route.query.continentName
          }
        })
    }
  },
  mounted () {
    this.continentName = this.$route.query.continentName;
    this.entName = this.$route.query.firmName;
    //  getBasicCountCountryNamByEntNameAndContinentName
    let urls = dataUrl.url +'/regionInfo/getBasicCountCountryNamByEntNameAndContinentName';
    var qs = require('qs');
    let reqParams = {
          "continentName" : this.continentName,
          "enterpriseId": this.enterpriseId
      };
    let config = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      this.axios.post(urls,qs.stringify(reqParams),config)
      .then((res) => {
        this.stateList = res.data;
      }, (err) => {
        this.$message({
            message: '数据请求失败!',
            center: true
        });
      })
     // 显示背景图--借口
    let urlBgs = dataUrl.url + '/entMenuInfo/getMapImgUrl';
    //判断是否进行搜索过
    this.addressName = this.$route.query.addressName;
    if(this.addressName === undefined){
      this.imgName = this.continentName;
    }else{
      this.imgName = this.addressName;
    }
    let Params = {
        "imgName" : this.imgName
    };
    this.axios.post(urlBgs,qs.stringify(Params),config)
      .then((res) => {
        this.imgUrl =  dataUrl.url + res.data[0].IMGURL;
        this.className = res.data[0].CLASSNAME
      }, (err) => {
        this.$message({
            message: '数据请求失败!',
            center: true
        });
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
  height: 5.05rem;
}
.province_modules .China{
  width: 6.26rem;
  height: 5.05rem;
}
.province_modules .NorthAmerica{
  width: 9rem;
  height: 5.05rem;
}
.province_modules .Oceania{
  width: 5.8rem;
  height: 5.05rem;
}
.province_modules .Africa{
  width: 4.32rem;
  height: 5.05rem;
}
.province_modules .Africa{
  width: 4.32rem;
  height: 5.05rem;
}
.province_modules .SouthAmerica{
  width: 3.20rem;
  height: 5.05rem;
}
.province_modules .European{
  width: 7.1rem;
  height: 5.05rem;
}
.province_modules .Asia{
  width: 8.22rem;
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
