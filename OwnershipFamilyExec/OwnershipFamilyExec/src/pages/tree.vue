<template>
  <div id="app" style="container">
    <div class="col-md-10 col-md-offset-1">
      <div class="page-header">
        <h3>基于Vue的组织架构树组件</h3>
      </div>
      <div class="row" style="display:none;">
        <div class="col-md-8 col-md-offset-2">
          <form class="form-horizontal row">
            <div class="col-md-3">
              <div class="checkbox">
                <label>
                  <input type="checkbox" v-model="horizontal" > horizontal
                </label>
              </div>
            </div>
            <div class="col-md-3">
              <div class="checkbox">
                <label>
                  <input type="checkbox" v-model="collapsable"> collapsable
                </label>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label class="control-label col-md-5">labelClassName:</label>
                <div class="col-md-7">
                  <select class="form-control" v-model="labelClassName">
                    <option value="bg-white">bg-white</option>
                    <option value="bg-orange">bg-orange</option>
                    <option value="bg-gold">bg-gold</option>
                    <option value="bg-gray">bg-gray</option>
                    <option value="bg-lightpink">bg-lightpink</option>
                    <option value="bg-chocolate">bg-chocolate</option>
                    <option value="bg-tomato">bg-tomato</option>
                  </select>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <p><br></p>
      <div class="text-center">
        <org-tree
          :data="data"
          :horizontal="horizontal"
          :collapsable="collapsable"
          :label-class-name="labelClassName"
          :render-content="renderContent"
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
          :style="'width:' + treeWidth"
        >
        </org-tree>
      </div>
    </div>
  </div>
</template>
<script>
import OrgTree from '../components/org-tree'
export default {
  name: 'app',
  components: {
    OrgTree
  },
  data () {
    return {
      data: {
        id: 0,
        label: 'XXX科技有限公司',
        children: [{
          id: 2,
          label: '产品研发部',
          children: [{
            id: 5,
            label: '研发-前端',
            children: [{
              id: 10,
              label: '初级前端',
              children: [{
                id: 12,
                label: '初级页面前端',
              },
              {
                id: 13,
                label: '初级逻辑前端',
                children: [{
                  id: 14,
                  label: '初级逻辑前端-1',
                },
                {
                  id: 15,
                  label: '初级逻辑前端-2',
                },
                {
                  id: 16,
                  label: '初级逻辑前端-3',
                }]
              }]
            },
            {
              id: 11,
              label: '初级UI'
            }]
          }, {
            id: 6,
            label: '研发-后端',
            children: [{
              id: 17,
              label: 'java-1'
            },
            {
              id: 18,
              label: 'java-2'
            },
            {
              id: 19,
              label: 'java-3'
            },
            {
              id: 20,
              label: 'java-4'
            }]
          }, {
            id: 9,
            label: 'UI设计',
            children: [{
              id: 21,
              label: 'UI-1'
            },{
              id: 22,
              label: 'UI-2'
            },{
              id: 23,
              label: 'UI-3'
            },{
              id: 24,
              label: 'UI-4'
            },{
              id: 25,
              label: 'UI-5'
            }]
          }, {
            id: 10,
            label: '产品经理'
          }]
        }, {
          id: 3,
          label: '销售部',
          children: [{
            id: 7,
            label: '销售一部'
          }, {
            id: 8,
            label: '销售二部'
          }]
        }, {
          id: 4,
          label: '财务部',
          children: [{
            id: 26,
            label: '财务部-1',
          },{
            id: 27,
            label: '财务部-2',
          },{
            id: 28,
            label: '财务部-3',
            children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 28,
                  label: '财务部-3',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 26,
                  label: '财务部-1',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                  children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
                }
              ]
          },{
            id: 29,
            label: '财务部-4',
            children: [{
            id: 26,
              label: '财务部-4-1',
            },{
              id: 27,
              label: '财务部-4-2',
            },{
              id: 28,
              label: '财务部-4-3',
              children: [
                {
                  id: 29,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                },{
                  id: 26,
                  label: '财务部-1',
                },{
                  id: 27,
                  label: '财务部-2',
                },{
                  id: 28,
                  label: '财务部-3',
                }
              ]
          }]
          }]
        }, {
          id: 9,
          label: 'HR人事'
        }]
      },
      horizontal: false,
      collapsable: true,
      labelClassName: 'bg-white',
      treeWidth: ""
    }
  },
  watch: {
    treeWidth (newValue, oldValue){
      this.treeWidth = newValue;
      // let orgTree = document.querySelector(".org-tree").offsetWidth + 100;
      console.log(newValue)
    }
  },
  methods: {
    renderContent (h, data) {
      return data.label
    },
    onExpand (data) {
      let that = this;
      if ('expand' in data) {
        data.expand = !data.expand;
        if (!data.expand && data.children) {
          this.collapse(data.children)
        }
      } else {
        this.$set(data, 'expand', true)
      }
      this.$nextTick(()=>{
        that.treeWidth = document.querySelector(".org-tree-node").offsetWidth + 'px';
      })
    },
    onNodeClick (e, data) {
      alert(data.label)
    },
    collapse (list) {
      list.forEach(child => {
        if (child.expand) {
          child.expand = false
        }else {
        this.$set(list, 'expand', true)
      }
        child.children && this.collapse(child.children)
      })
    }
  },
  mounted (){
    let that = this;
    this.$nextTick(function () {
      that.treeWidth = document.querySelector(".org-tree-node").offsetWidth + 'px';
    })
  }
}
</script>

<style>
.org-tree-container,.text-center,.col-md-10{
  /*min-width: 10000rem;*/
}
.bg-white {
  background-color: white;
}
.bg-orange {
  background-color: orange;
}
.bg-gold {
  background-color: gold;
}
.bg-gray {
  background-color: gray;
}
.bg-lightpink {
  background-color: lightpink;
}
.bg-chocolate {
  background-color: chocolate;
}
.bg-tomato {
  background-color: tomato;
}
</style>
