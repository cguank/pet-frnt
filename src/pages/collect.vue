<template>
  <div>
    <van-nav-bar
      title="我的收藏"
      left-text=""
      left-arrow
      @click-left="onClickLeft"
    />

    <van-cell-group>
      <van-field v-model="find_collect" placeholder="请输入关键字"
                 right-icon="search" @click-right-icon="findCollect"/>
    </van-cell-group>
    <div style="height: 5px; background: #eeeeee; "></div>

    <van-list
      v-model="loadMore.loading"
      :finished="loadMore.finished"
      :offset="5"
      finished-text="没有更多了"
      @load="getcollectList"
    >
      <div v-for="item in collect" :key="item.id" @click="$router.push({path:'/postdetail',query: {id:item.postId}});">
        <div style="height: 10px;"></div>
        <van-row>
          <van-col span="1"></van-col>
          <van-col span="22" style="margin-left: 5px;">
            <van-image
              round
              width="2rem"
              height="2rem"
              fit="cover"
              :src="item.headImg"
            />
            <div style="margin-top: -32px; margin-left: 40px;">
              <div>
                <span class="collect_name">{{item.title}}</span>
              </div>
              <div>
                <div class="collect_info">{{item.comment}}</div>

                <span style="margin-top: 45px; float: right; margin-right: 10px; font-size: 12px; color: #dddddd">{{item.createTime}}</span>
              </div>
            </div>
          </van-col>
          <van-col span="1"></van-col>
        </van-row>
        <div style="height: 1px; background: #eeeeee; margin-top: 5px;"></div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import Vue from 'vue';
  import { NavBar,Toast,Progress,Row, Col,Image,Icon,List,Field } from 'vant';
  import { addList } from "@/assets/js/utils";

  Vue.use(NavBar).use(Toast).use(Progress).use(Row).use(Col).use(Image).use(Icon).use(List).use(Field);
  export default {
    name: "collect",
    data() {
      return {
        collect:[],
        find_collect:'',
        loadMore: {
          loading: false,
          finished: false,
        },
        currentPage:1
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1);
      },
      findCollect() {
        this.collect=[];
        this.currentPage=1;
        this.getcollectList();
      },
      getcollectList(){
        this.loadMore.loading = true;//开始加载更多
        setTimeout(() => {
        this.$getData('getCollectPostList', {
          'key': this.find_collect,
          'currentPage': this.currentPage
        }).then(res => {
          this.currentPage++;
          var data = res.data.collectList;
          if(data) {
            addList(this.collect,data);
          }
          if (data == null || data.length < 10) {
            //加载完了
            this.loadMore.loading = false;
            this.loadMore.finished = true;
          } else this.loadMore.loading = false;
        });
        }, 100);
      }
    },
    created() {
      this.getcollectList();
    }
  }
</script>

<style scoped>

  .collect_name {
    font-size: 16px;
    color: #555555;
  }

  .collect_info {
    width:60%;
    font-size: 14px;
    color: #aaaaaa;
    margin-top: 5px;
    margin-left: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
