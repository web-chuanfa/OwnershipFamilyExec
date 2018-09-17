<template>
  <div class="info_detail_content allViewChina">
      <div class="region_detail_tabs">
        <div class="region_substance">
          <div class="region_title">
            <span @click="onBack()">
              <i class="el-icon-arrow-left"></i>返回</span>全景模式
          </div>
          <div class="region_content">
            <ul class="navTab">
              <li :class="{'active_now':now==1 || now==3 || now==4}">
                <router-link :to="'/allViewChina/vChina/vChinaL/'" @click.native="regionTabs('china');">看国内</router-link>
              </li>
              <li :class="{'active_now':now==2 || now==5 || now==6}">
                <router-link :to="'/allViewChina/vWorld/vWorldL/'" @click.native="regionTabs('world');">看世界</router-link>
              </li>
            </ul>
            <router-view>
                <china :is="currentView"></china>
            </router-view>         
          </div>
        </div>
      </div>
  </div>
</template>
<script>
import china from './vChina';
import world from './vWorld';
import dataUrl  from  '../../../static/js/urls.json'
export default {
  data () {
    return {
      currentView: 'china', //默认选中china子组件
      now: 1
    }
  },
  components: { 
    china,
    world
  },
  watch: {
    $route (nv,ol) {
      // 判断路由 存在vWorld时选中world视图，否则选中china
      if(nv.path.indexOf('vWorld')>-1 === true){
        this.now = 2;
        this.currentView = 'world';
      }
      if(nv.path.indexOf('vChina')>-1 === true){
        this.now = 1;
        this.currentView = 'china';
      }
      // 当路由中存在vChina 给你this.now赋值1
      this.now = nv.path.indexOf('vChina')>-1?1:nv.path.indexOf('vWorld')>-1?2:nv.path.indexOf('vProvince')>-1?3:nv.path.indexOf('vCity')>-1?4:nv.path.indexOf('vState')>-1?5:6;
    }
  },
  methods: {
    onBack() {
      //返回上一页
      this.$router.go(-1);
    },
     regionTabs (tabText) {
        //切换视图 对属性的设置
         this.currentView = tabText;
     }
  },
  mounted () {
    //判断路由存在vWorld，vChina 给now,currentView,curWorld赋值
    if(this.$route.path.indexOf('vWorld')>-1 === true){
        this.now = 2;
        this.currentView = 'world';
      }
    if(this.$route.path.indexOf('vChina')>-1 === true){
      this.currentView = 'china';
    }
  }
}
</script>
<style lang="less">
@import '../../assets/css/allView/allViewChina.less';
</style>