<template>
  <div class="nextLevel_modules"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="firm_stockInfo_content_title">下一级</div>
    <div class="firstLevelBottom">
      <div class="firmName" style="top: 0;">{{ invName }}</div>
      <div class="line" style="top: 0.25rem;"></div>
      <div class="triangle-down" style="top: 0.48rem;"></div>
    </div>
    <ul class="nextLevel_content maxH" v-if="subordinateInfo.length === 0">
      <li style="float: none;margin: 0 auto;text-align:center;">
        <span style="position: absolute;left: 0rem;">0%</span>
        <b>暂无下一级信息</b>
      </li>
    </ul>
    <ul class="nextLevel_content" v-if="subordinateInfo.length === 1">
      <li v-for="(item,index) in subordinateInfo" @click="infoFirmDetail(item)" style="float: none;margin: 0 auto;text-align:center;">
        <span style="position: absolute;left: 0rem;">{{ Number((item.conprop).toFixed(0)) +"%"}}</span><b>{{ item.inv_entname }}</b>
      </li>
    </ul>
    <ul class="nextLevel_content" v-if="subordinateInfo.length > 1">
      <li v-for="(item,index) in subordinateInfo" @click="infoFirmDetail(item)">
        <span>{{ Number((item.conprop).toFixed(0)) +"%"}}</span><b>{{ item.inv_entname }}</b>
      </li>
    </ul>
    <div class="nextLevel_module_dialog" v-show="isShow">
      <div class="nextLevel_detail">
        <h6>{{ invEntname }}</h6>
        <div class="delete" @click="hide" style="z-index:1000;top: 0.1rem;">
          <img src="../../assets/images/close.png" alt="">
        </div>
        <p class="names">{{ entName }} <span>占股{{ conprop }}%</span></p>
        <p class="info_title">统一社会信用代码：</p>
        <p class="creditCode">{{ uniscid }}</p>
        <p class="info_title">所属行业：</p>
        <p class="creditCode industry">{{ industry_name }}</p>
        <p class="info_title">法定代表人：</p>
        <p class="creditCode legal">{{ fr_name }}</p>
        <p class="info_title">成立日期：</p>
        <p class="creditCode establishment_date">{{ esdate }}</p>
        <div class="handle_button">
          <router-link :to="'/infoDetail/basicInfo/'+invEntid+'?page='+searchType+'&firmName='+invEntname" class="button clearBRR">查看基本信息</router-link>
          <router-link :to="'/infoDetail/stockInfo/higherLevel/'+invEntid+'?page='+searchType+'&firmName='+invEntname" class="button clearBorderR">查看股权结构</router-link>
          <router-link :to="'/infoDetail/regionSubstance/china/chinaL/'+invEntid+'?page='+searchType+'&firmName='+invEntname" class="button">查看地区分布</router-link>
        </div>
      </div>
      <div class="mask"></div>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
export default {
  props: ['min','max'],
  data () {
    return {
      conprop: "",
      invEntname: "暂无信息",
      invName: "暂无信息",
      entName: "",
      subordinateInfo: [],
      isShow:false,
      fr_name: "",
      industry_name: "",
      esdate: "",
      invEntid: "",
      enterpriseId: this.$route.params.id,
      searchType: this.$route.query.page,
      uniscid: "",
      others: false,
      itemId: this.$route.params.id,
      loading: true
    }
  },
  methods: {
    infoFirmDetail (idx){
      this.isShow = !this.isShow;
      this.invEntname = idx.inv_entname;
      this.entName = idx.entname;
      this.itemId = idx.inv_entid;
      this.invEntid = idx.inv_entid;
      this.conprop = (idx.conprop).toFixed(0);
      // 给子组件绑定一个事件，触发到父组件传值
      this.$emit('nextevent',this.others);
      // /basicInfo/getBasicInfo. "enterpriseId" : this.enterpriseId
      let urls = dataUrl.url +'/basicInfo/getBasicInfo';
      var qs = require('qs');
      let reqParams = {
            "enterpriseId" : this.itemId
      };
      let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
      };
      this.axios.post(urls,qs.stringify(reqParams),config)
      .then((res) => {
        setTimeout(() => {
          this.loading = false;
        }, 800);
        this.fr_name = res.data[0].fr_name;
        this.uniscid = res.data[0].uniscid;
        this.industry_name = res.data[0].industry_name;
        this.esdate = res.data[0].esdate;
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
    handle () {
      let self = this;
      let url = dataUrl.url +'/EntinvInfo/getEntinvSubordinateInfo';
      var qs = require('qs');
      let param = {
          "enterpriseId" : this.enterpriseId,
          "proportionMin" : self.min,
          "proportionMax": self.max
      };
      let configs = {
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          }
      };
      this.axios.post(url,qs.stringify(param),configs)
      .then((res) => {
        setTimeout(() => {
          this.loading = false;
          if(res.data.subordinateInfototal === 0){
            this.invName = this.$route.query.firmName;
            this.conprop = "0";
          }else{
            this.subordinateInfo = res.data.subordinateInfo;
            this.invName = this.$route.query.firmName;
          }
        }, 500);
      }, (err) => {
        this.$message({
          message: '数据请求失败!',
          center: true
        });
      });
    }
  },
  watch:{
    min (oldval,newval){
      this.handle();
    },
    max (oldval,newval){
      this.handle();
    },
    $route (nv,ol) {
      this.itemId = nv.params.id;
      this.invEntname = nv.query.firmName;
    }
  },
  mounted () {
    this.handle();
  }
}
</script>
<style>

</style>
