<template>
  <div class="info_detail_content">
      <div class="region_detail_tabs">
        <div class="region_substance">
          <div class="region_title">地区分布</div>
          <div class="region_content">
            <div class="region_content_substance_modules">
              <ul class="navTab">
                <li :class="{'active_now':now==1 || now==3 || now==4}">
                  <router-link :to="'/infoDetail/regionSubstance/china/chinaL/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="regionTabs('china');">看国内</router-link>
                </li>
                <li :class="{'active_now':now==2 || now==5 || now==6}">
                  <router-link :to="'/infoDetail/regionSubstance/world/worldL/'+enterpriseId+'?page='+searchType+'&firmName='+firmName" @click.native="regionTabs('world');">看世界</router-link>
                </li>
              </ul>
              <router-view>
                  <china :is="currentView"></china>
              </router-view>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import china from './china';
import world from './world';
import dataUrl  from  '../../../static/js/urls.json'
export default {
  data () {
    return {
      currentView: 'china', //默认选中china子组件
      now: 1,
      enterpriseId: this.$route.params.id,
      searchType: this.$route.query.page,
      firmName: this.$route.query.firmName
    }
  },
  components: { 
     china,
     world
  },
  watch: {
    $route (nv,ol) {
      // 判断路由 存在vWorld时选中world视图，否则选中china
      if(nv.path.indexOf('world')>-1 === true){
        this.now = 2;
        this.currentView = 'world';
      }
      if(nv.path.indexOf('china')>-1 === true){
        this.now = 1;
        this.currentView = 'china';
        this.isDisplay = true
      }
      this.now = nv.path.indexOf('china')>-1?1:nv.path.indexOf('world')>-1?2:nv.path.indexOf('province')>-1?3:nv.path.indexOf('city')>-1?4:nv.path.indexOf('state')>-1?5:6
    }
  },
  methods: {
     regionTabs (tabText) {
         this.currentView = tabText;
     }
  },
  mounted () {
    //判断路由存在vWorld，vChina 给now,currentView,curWorld赋值
    if(this.$route.path.indexOf('world')>-1 === true){
        this.now = 2;
        this.currentView = 'world';
    }
    if(this.$route.path.indexOf('china')>-1 === true){
      this.currentView = 'china';
    }
  }
}
</script>