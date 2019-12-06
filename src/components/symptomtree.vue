<template>
  <div>
    <van-tree-select
      :items="items"
      :active-id.sync="activeId"
      :main-active-index.sync="activeIndex"
      @click-item="clickItem"
      @click-nav="clickNav"
    />
    <div class="event-button">
      <van-row>
        <van-col span="8" offset="4">
          <van-button round type="info" color="#969799" @click="reset">重&nbsp;&nbsp;&nbsp;置</van-button>
        </van-col>
        <van-col span="8" offset="2">
          <van-button round type="info" color="#409eff" @click="confirm">确&nbsp;&nbsp;&nbsp;定</van-button>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {TreeSelect, Button, Row, Col,Toast} from 'vant';

  Vue.use(TreeSelect).use(Button).use(Row).use(Col).use(Toast);
  export default {
    name: '',
    props: {
      firstChoice: {
        default: 0
      },
      type:''
    },
    data: function () {
      return {
        items: [
          {text: '全身', children: []},
          {text: '乳房', children: []},
          {text: '口腔', children: []},
          {text: '四肢', children: []},
          {text: '泌尿部', children: []},
          {text: '皮肤', children: []},
          {text: '眼睛', children: []},
          {text: '耳朵', children: []},
          {text: '肛门', children: []},
          {text: '肺部', children: []},
          {text: '腹部', children: []},
          {text: '鼻子', children: []},
        ],
        activeId: [],
        activeIndex: 0,
        selected: []
      };
    },
    created() {
    },
    methods: {
      clickItem(data) {
        let index = this.activeId.indexOf(data.id);
        if(index == -1) {
          this.selected.push(data);
        }else this.selected.splice(index,1);

      },
      clickNav(index) {
        this.$getData("getSecondarySymptoms", {
          type: this.type,
          position:index+1
        }).then(res => {
          var systomList=res.data.SymptomsList;
          var list=[];
          if (systomList) {
            systomList.map(item => {
              list.push({id:item.petSymptomId,text:item.symptom})
            });
          }
          this.items[index].children=list;
        }).catch(res => {
          Toast("服务器繁忙");
        })
      },
      reset() {
        this.activeIndex = 0;
        this.activeId = [];
        this.selected = [];
      },
      confirm() {
        this.$emit('getTreeInfo',this.selected);
        //this.reset();
      }
    }
  }
</script>
<style lang="less" scoped>
  .event-button {
    margin: 10px 0;
  }
</style>
