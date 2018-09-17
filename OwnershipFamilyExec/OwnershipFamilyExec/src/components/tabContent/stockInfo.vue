<template>
  <div class="firm_stockInfo_bg">
    <div class="firm_stockInfo_content">
      <router-view :min="min" :max="max" @nextevent = "nextevent">
          <allLevel :is="currentView"></allLevel>
      </router-view>
    </div>
    <div class="firm_stockInfo_nav" style="display: none;">
      <span class="ratio">占股比例</span>
      <span class="textL">{{ min }}%</span>
      <div class="slider">
        <el-slider
          @change="sliderChange"
          v-model="ratio"
          range
          show-stops
          :max="100" style="width: 150px;">
        </el-slider>
      </div>
      <span class="textR">{{ max }}%</span>
      <div class="stockInfo_tabs">
        <ul>
          <li :class="{'active':now==1}">
            <router-link :to="'/infoDetail/stockInfo/higherLevel/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="stockTabs('higherLevel');">全部上级</router-link>
          </li>
          <li :class="{'active':now==2}">
            <router-link :to="'/infoDetail/stockInfo/firstLevel/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="stockTabs('firstLevel');">只列上一级</router-link>
          </li>
          <li :class="{'active':now==3}">
            <router-link :to="'/infoDetail/stockInfo/nextLevel/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="stockTabs('nextLevel');">只列下一级</router-link>
          </li>
          <li :class="{'active':now==4}">
            <router-link :to="'/infoDetail/stockInfo/allLowerLevel/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="stockTabs('allLowerLevel');">全部下级</router-link>
          </li>
          <li :class="{'active':now==5}">
            <router-link :to="'/infoDetail/stockInfo/insideStockholder/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="stockTabs('insideStockholder');">内部股东</router-link>
          </li>
          <li :class="{'active':now==6}">
            <router-link :to="'/infoDetail/stockInfo/allLevel/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="stockTabs('allLevel');">全部展开</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import OrgTree from '../org-tree'
import higherLevel from '../stockInfo/higherLevel';
import firstLevel from '../stockInfo/firstLevel';
import insideStockholder from '../stockInfo/insideStockholder';
import nextLevel from '../stockInfo/nextLevel';
import allLowerLevel from '../stockInfo/allLowerLevel';
import allLevel from '../stockInfo/allLevel';
export default {
  data () {
    return {
      ratio: [0, 100],
      currentView: 'allLevel',
      min: 0,
      max: 100,
      enterpriseId: this.$route.params.id,
      searchType: this.$route.query.page,
      firmName: this.$route.query.firmName,
      nextFirm: true,
      now: 1
    }
  },
  components: { 
     higherLevel,
     firstLevel,
     insideStockholder,
     nextLevel,
     allLowerLevel,
     allLevel
  },
  watch: {
    $route (nv,ol) {
      this.enterpriseId = nv.params.id;
      this.firmName = nv.query.firmName;
    }
  },
  methods: {
    sliderChange (){
      this.min = this.ratio[0];
      this.max = this.ratio[1];
    },
    nextevent (data){
      this.nextFirm = data;
      this.$emit('nextfirm',this.nextFirm);
    },
    stockTabs (text){
      this.currentView = text;
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.bg-white {
  background-color: white;
}
</style>
