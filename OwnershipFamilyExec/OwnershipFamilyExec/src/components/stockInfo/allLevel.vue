<template>
  <div class="stockTree"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="firm_stockInfo_content_title">股权信息</div>
    <div class="higherLevel_tree">
      <iframe src="/familyTree/dome_new/test2.html" frameborder="0" style="width: 100%;height: 100%;"></iframe>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      firm: this.$route.query.firmName,
      loading: true,
      enterpriseId: this.$route.params.id
    }
  },
  watch: {
    enterpriseId (newValue, oldValue){
      // console.log(newValue)
    }
  },
  methods: {
    
  },
  mounted () {
    setTimeout(() => {
      this.loading = false;
    }, 500);
  }
}
</script>
<style>

</style>