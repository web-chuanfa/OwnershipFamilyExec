<template>
  <div class="stockTree"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div class="firm_stockInfo_content_title">全部上级</div>
    <div class="higherLevel_tree">
      <org-tree
          :data="data"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :label-class-name="labelClassName"
          :render-content="renderContent"
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
        >
      </org-tree>
    </div>
  </div>
</template>
<script>
import dataUrl  from  '../../../static/js/urls.json'
import OrgTree from '../org-tree'
export default {
  data () {
    return {
      data: {
        id: 385,
        label: "暂无信息",
        children: [
          {
            id: 67119,
            label: "暂无信息",
            children: []
          }
        ]
      },
      horizontal: false,
      collapsable: true,
      labelClassName: 'bg-white',
      firm: this.$route.query.firmName,
      treeWidth: "",
      treeContainer: "",
      loading: true
    }
  },
  watch: {
    treeWidth (newValue, oldValue){
      // console.log(newValue)
    },
    treeContainer (newValue, oldValue){
      // console.log(newValue)
    }
  },
   components: { 
     OrgTree
  },
  methods: {
    renderContent (h, data) {
      return data.label
    },
    onExpand (data) {
      //获取屏幕的高度
      let widthBig=window.innerWidth,
          that = this;
      //获取元素的高度
      let orgTree=document.querySelector(".org-tree"),TreeContainer = document.querySelector(".org-tree-container");
      let widthSmall=parseFloat(window.getComputedStyle(orgTree).width);
      //
      if ('expand' in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
      document.getElementsByClassName("org-tree-container")[0].setAttribute('style', 'min-width:'+ 10000+'rem');
      this.$nextTick(()=>{
        that.treeWidth = document.querySelector(".org-tree").offsetWidth;
        widthSmall = that.treeWidth;
        that.treeContainer = document.querySelector(".org-tree-container").offsetWidth;
        that.treeContainer = orgTree.offsetWidth;
        widthBig = document.querySelector(".firm_stockInfo_content").offsetWidth;
        if(that.treeWidth < 900){
            orgTree.style.marginLeft=(widthBig-widthSmall)/2+"px";
            document.getElementsByClassName("org-tree-container")[0].setAttribute('style', 'min-width:'+ 100+'%');
          }else{
            if(that.treeWidth < 900 && orgTree.offsetWidth < 900){
              orgTree.style.marginLeft=(widthBig-widthSmall)/2+"px";
            }else{
              orgTree.style.marginLeft="0px";
            }
        }
      });
    },
    onNodeClick (e, data) {
      // alert(data.label)
    },
    collapse (list) {
      list.forEach(child => {
        if (child.expand) {
          child.expand = false
        }
        child.children && this.collapse(child.children)
      })
    }
  },
  mounted () {
    //获取元素的高度 firm_stockInfo_content
    let orgTree=document.querySelector(".org-tree");
    let widthSmall=parseFloat(window.getComputedStyle(orgTree).width);
    let that = this;
    document.getElementsByClassName("org-tree-container")[0].setAttribute('style', 'min-width:'+ 10000+'rem');
    this.$nextTick(()=>{
      that.treeWidth = document.querySelector(".org-tree").offsetWidth;
      widthSmall = that.treeWidth;
      if(that.treeWidth < 900){
        // orgTree.style.marginLeft=(widthBig-widthSmall)/2+"px";
        document.getElementsByClassName("org-tree")[0].setAttribute('style', 'margin:0 auto');
        document.getElementsByClassName("org-tree-container")[0].setAttribute('style', 'min-width:'+ 100+'%');
      }else{
        orgTree.style.marginLeft= "0px";
      }
    });
    let urls = dataUrl.url +'/EntinvInfo/getEntinvAllSuperiorInfo';
    var qs = require('qs');
    let config = {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        }
    };
    let reqParams = {
        "enterpriseId" : this.$route.params.id,
        "enterpriseName": this.firm
    };
    this.axios.post(urls,qs.stringify(reqParams),config)
      .then((res) => {
        setTimeout(() => {
          this.loading = false;
          if(res.data.data == ""){
            this.data["label"] = this.firm;
            this.data["id"] = this.$route.params.id;
            this.data = this.data;
          }else{
            this.data = res.data.data;
          }
        }, 500);
      }, (err) => {
        this.$message({
          message: '数据请求失败!',
          center: true
        });
    })
  }
}
</script>
<style>
.org-tree-node {
    padding-top: 0.12rem;
}
.org-tree-node:not(:first-child):before, .org-tree-node:not(:last-child):after{
  border-top: 1px solid #738ee5;
}
.org-tree-node:after{
  border-left: 1px solid #738ee5;
}
.org-tree-node:before, .org-tree-node:after{
  height: 13px;
}
.org-tree-node-btn{
  border: 1px solid #738ee5;
  margin-top: 20px;
}
.collapsable .org-tree-node.collapsed .org-tree-node-label:after{
  border-right: 1px solid #738ee5;
}
.org-tree-node-btn.expanded{
  margin-top: 1px;
}
.org-tree-node-btn:before{
  border-top: 1px solid #738ee5;
}
.org-tree-node-children:before{
  border-left: 1px solid #738ee5;
  top: 10px;
  height: 10px;
}
.org-tree-node-btn:after{
  border-left: 1px solid #738ee5;
}
/*.org-tree-node-btn:hover{
  background: none;
}*/
.org-tree-node-label .org-tree-node-label-inner{
    padding: 5px 6px;
    /*width: 1.6rem;
    height: 0.27rem !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;*/
    background-image: linear-gradient(205deg,#f58b6f 0%,#dd2c2b 100%), linear-gradient(#ffffff,#ffffff);
    background-blend-mode: normal,normal;
    border-radius: 0.12rem;
    font-size: 0.13rem;
    color: #ffffff;
  }
</style>
