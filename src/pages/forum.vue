<template>
  <div>
    <div class="tabs">
      <van-tabs type="card" v-model="activeTop" @click="changeTabsTop">
        <van-tab title="技术交流">
          <div class="top">
            <van-row>
              <van-col span="12" class="top-left" @click="$router.push('/selfservice')">
                自助诊断
              </van-col>
              <van-col span="12" class="top-right" @click="$router.push({path:'/publishpost',query:{need_title: true}})">
                发布帖子
              </van-col>
            </van-row>
          </div>
          <div class="middle">
            <van-search
              v-model="search"
              placeholder="请输入搜索关键词"
              show-action
              shape="round"

            >
              <div slot="action" @click="searchPost">搜索</div>
            </van-search>
          </div>
          <div class="content">
            <van-tabs v-model="activeContent" color="#0076FF" @click="onClickTabs">
              <van-tab title="精华"></van-tab>
              <van-tab title="最新"></van-tab>
              <van-tab title="我的帖子"></van-tab>
              <!--都是取同一个list只是状态不同-->
              <van-list
                v-model="loadMorePost.loading"
                :finished="loadMorePost.finished"
                :offset="5"
                finished-text="没有更多了"
                @load="getPostList"
              >
                <div class="list-item" v-for="(item,index) in postList" :key="item.id">
                  <van-panel
                    :title="item.title"
                    :status="item.isCream==2&&activeContent==0?'置顶':''"
                    @click="$router.push({'path':'/postdetail','query':{'id':item.id}})"
                  >
                    <van-row>
                      <van-col span="3" offset="1">
                        <van-image
                          width="35"
                          height="35"
                          round
                          :src="item.headImg"
                        />
                      </van-col>
                      <van-col span="4">
                        {{item.nickname}}
                      </van-col>
                      <van-col span="8" class="text-wrap">
                        <span >{{item.comment}}</span>
                      </van-col>
                      <van-col span="2">
                        <span v-if="activeContent==2" @click.stop="deletePost(item.id,index)">删除</span>
                      </van-col>
                      <van-col span="5" offset="1">
                        <van-icon name="star-o"/>
                        <span>{{item.collectNum}}</span>
                        <van-icon name="chat-o"/>
                        <span>{{item.commentNum}}</span>
                      </van-col>
                    </van-row>
                  </van-panel>
                </div>
              </van-list>

            </van-tabs>
          </div>
        </van-tab>
        <van-tab title="娱乐休闲">
          <div class="top">
            <van-row>
              <van-col span="24" class="top-left" @click="$router.push('/publishmoment')">
                <!--发布动态-->
                <van-icon name="photograph" size="20px"/>
              </van-col>
            </van-row>
          </div>
          <div class="content">
            <van-list
              v-model="loadMoreMoment.loading"
              :finished="loadMoreMoment.finished"
              :offset="5"
              finished-text="没有更多了"
              @load="getMomentList"
            >
              <div class="list-item" v-for="(item,index) in momentList" :key="item.id"
                   @click="$router.push({'path':'/momentdetail',query:{'id':item.id}})"> <!-- 详情页面待添加 -->
                <div class="user-info">
                  <van-row>
                    <van-col span="3" offset="1">
                      <van-image
                        width="35"
                        height="35"
                        round
                        :src="item.headImg"
                      />
                    </van-col>
                    <van-col span="12">
                      <span class="user-name"> {{item.name}}</span>
                      <br/>
                      <span class="sub-info">{{item.publishTime}}</span>
                    </van-col>
                    <van-col span="5" offset="1">
                      <van-button type="danger" round size="small" plain hairline @click.stop="payAttention(item.memberId,index)"
                                  v-if="!item.isAttention && !item.isMe">+关注
                      </van-button>
                      <van-button type="danger" round size="small" plain hairline color="grey"
                                  @click.stop="payAttention(item.memberId,index)" v-if="item.isAttention && !item.isMe">已关注
                      </van-button>
                    </van-col>
                  </van-row>
                </div>
                <div class="moment-content">
                  <div class="character">
                    <span class="text">
                      {{item.msg}}
                    </span>
                  </div>
                  <div class="images">
                    <span class="image-item" v-for="img in item.postImgList" :key="img.id">
                      <van-image
                        width="100"
                        height="100"
                        :src="img.attachment"
                        @click.stop="imgPreview(img.attachment)"
                      />
                    </span>
                  </div>
                  <div class="footer">
                    <van-row>
                      <van-col span="8" offset="16">
                        <van-icon name="like-o" @click.stop="praise(item.id,index)" v-if="!item.isPraise"/>
                        <van-icon name="like" color="red" @click.stop="praise(item.id,index)" v-else/>
                        <span>{{item.praiseNum}}</span>
                      <van-icon name="chat-o"/>
                        <span>{{item.commentNum}}</span>
                      </van-col>
                    </van-row>

                  </div>
                </div>
                <van-divider  :style="{ color: '#1989fa', borderColor: '#969799d6', padding: '0 16px' }"/>
              </div>
            </van-list>
          </div>
        </van-tab>
        <van-tab title="赛事发布">
          <van-list
            v-model="loadMoreNotify.loading"
            :finished="loadMoreNotify.finished"
            :offset="5"
            finished-text="没有更多了"
            @load="getNotifyList"
          >
            <div class="notice-item" v-for="item in noticeList" :key="item.id">
              <van-notice-bar mode="link" @click="$router.push({'path':'notifydetail', query:{'id':item.id}})">
                {{item.title}}  <span v-if="item.isFinished" style="color: #ee0a0a">已截止</span>
              </van-notice-bar>
            </div>
          </van-list>

        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Row, Col, Tab, Tabs, Search, Icon, Panel, Image, Dialog
    , ImagePreview, Divider, Toast, NoticeBar, List
  } from 'vant';

  Vue.use(Row).use(Col).use(Tab).use(Tabs).use(Search).use(Icon).use(Panel).use(Image).use(Dialog)
    .use(ImagePreview).use(Divider).use(NoticeBar).use(List);

  import { addList } from '@/assets/js/utils'
  export default {
    name: 'forum',
    data: function () {
      return {
        search: '',
        activeTop: this.$route.query.activeTop? this.$route.query.activeTop:0,
        activeContent: this.$route.query.activeContent? this.$route.query.activeContent : 0,
        postList: [
          {
            id: 1,
            title: '如何更快得到回复',
            headImg: './static/images/cat.jpg',
            userName: '我是你爸爸',
            isTop: 1, //1是2不是
            commentNum: 400
          },
          {
            id: 2,
            title: '如何更快得dsfsfd到回复',
            headImg: './static/images/dog.jpg',
            userName: 'nishisbma',
            isTop: 0, //1是2不是
            commentNum: 4001
          },
        ],
        //以下为娱乐休闲
        momentList: [
          {
            id: 1, //这个动态的id
            headImg: './static/images/cat.jpg',
            name: '我是的CVC',
            publishTime: '10分钟前',
            msg: '鲁大师积分继续哦一立刻就考虑继续从v拉客 ,酸辣粉酒叟ID房价低哦 老开' +
            '心快乐从v继续开车距实力覅圣诞节否是.凉快圣诞节覅偶见谁都烦星空露可乐鸡翅相聚离开现场将v',
            postImgList: [
              './static/images/cat.jpg',
              './static/images/dog.jpg',
            ],
            isAttention: false,
            isPraise: false,
            praiseNum: 12,
            commentNum: 110,
          },
          {
            id: 2, //这个动态的id
            headImg: './static/images/dog.jpg',
            name: 'dddd',
            publishTime: '10分钟前',
            msg: '鲁大师积分继续哦一立刻就考虑继续从v拉客 ,酸辣粉酒叟ID房价低哦 老开',
            postImgList: [
              './static/images/cat.jpg',
              './static/images/dog.jpg', './static/images/cat.jpg',
              './static/images/dog.jpg', './static/images/cat.jpg',
              './static/images/dog.jpg',
            ],
            isAttention: false,
            isPraise: true,
            praiseNum: 12,
            commentNum: 110,
          },
          {
            id: 3, //这个动态的id
            headImg: './static/images/dog.jpg',
            name: 'dddd',
            publishTime: '10分钟前',
            msg: '鲁大师积分继续哦一立刻就考虑继续从v拉客 ,酸辣粉酒叟ID房价低哦 老开',
            postImgList: [],
            isAttention: false,
            isPraise: true,
            praiseNum: 12,
            commentNum: 110,
          },
        ],
        loadMorePost: {
          loading: false,
          finished: false,
          currentPage: 1
        },
        //以下为通知
        noticeList: [
          {
            id: 1,
            title: 'lksdjfoisdhfoisdnfoidsnvoidchvosiaddfhasoifhsaopifhasdoif'
          },
          {
            id: 2,
            title: '你要干什么'
          },
        ],
        loadMoreNotify: {
          loading: false,
          finished: false,
          currentPage: 1
        },
        loadMoreMoment: {
          loading: false,
          finished: false,
          currentPage: 1
        },
      };
    },
    beforeRouteLeave(to,from,next){
      if(to.path !== '/notifydetail'){
        this.$route.meta.keepAlive = false;
      }else  this.$route.meta.keepAlive = true;
      next();
    },
    created() {
      this.postList = [];
    },
    mounted() {
      window.document.getElementsByClassName('van-tabs__nav--card')[0].style.margin = "0";  //tabs没有margin

      this.getMomentList();

    },
    methods: {
      searchPost(){
        this.postList = [];
        this.loadMorePost.loading = false;
        this.loadMorePost.finished = false;
        this.loadMorePost.currentPage = 1;
        this.getPostList(this.search);
      },
      getPostList(search=''){
        let isCream = 1;
        if(this.activeContent==0) isCream = 1;
        else if(this.activeContent==1) isCream = 0;
        else isCream = 2;
        this.loadMorePost.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$postData('getPostList',{
            isCream: isCream,
            currentPage: this.loadMorePost.currentPage,
            search: search
          }).then(res => {
            let data= res.data.postList;
            addList(this.postList, data);
            console.log(data);
            this.loadMorePost.currentPage++;
            if(data == null || data.length<10){
              this.loadMorePost.finished = true;
            }
            this.loadMorePost.loading = false;
          });
        }, 500);

      },
      deletePost(id, index) {
        Dialog.confirm({
          title: '确认删除该帖子吗',
        }).then(() => {
          this.$postData('deletePost',{'id': id}).then(res => {
            console.log(id, index);
            this.postList.splice(index, 1);
            Toast("删除成功");
          });
        }).catch(() => {
          // on cancel
        });
      },
      payAttention(memberId, index) {
        if(this.momentList[index].isAttention){
          this.$getData('removeMemberFans', {targetId: memberId}).then(res => {
            console.log(res.data);
            let i=0;
            for(i=0;i<this.momentList.length;i++){
              if(this.momentList[i].memberId == memberId) // 将页面上所有该用户显示改为 未关注
                this.momentList[i].isAttention = false;
            }
            Toast('取消关注');
          });
        }else {
          this.$getData('addMemberFans', {targetId: memberId}).then(res => {
            console.log(res.data);
            let i=0;
            for(i=0;i<this.momentList.length;i++){
              if(this.momentList[i].memberId == memberId) // 将页面上所有该用户显示改为 已关注
                this.momentList[i].isAttention = true;
            }
            Toast('关注成功');
          });
        }
      },
      praise(id, index) {
        if(this.momentList[index].isPraise){
          this.$getData('cancelPraise', {momentId: id}).then(res => {
            console.log(res.data);
            this.momentList[index].praiseNum--;
            this.momentList[index].isPraise = false;
            Toast('取消赞');
          });
        }else {
          this.$getData('addPraise', {momentId: id}).then(res => {
            console.log(res.data);
            this.momentList[index].praiseNum++;
            this.momentList[index].isPraise = true;
            Toast('点赞');
          });
        }
      },
      imgPreview(src) {
        ImagePreview({
          images: [src],
          showIndex: false
        });
      },
      onClickTabs(name, title) {
        this.search = ''; //每次点击tabs让搜索栏为空
        this.postList = [];
        if(title == '精华') this.activeContent = 0;
        else if(title=='最新') this.activeContent = 1;
        else this.activeContent = 2;
        this.loadMorePost.loading = false;
        this.loadMorePost.finished = false;
        this.loadMorePost.currentPage = 1;
        this.getPostList();
      },
      getMomentList(){
        this.loadMoreMoment.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getMomentList', {currentPage: this.loadMoreMoment.currentPage}).then(res => {
            //let data = res.data.momentList;
            //console.log(data);
            //addList(this.momentList,data);
            let my_jsonObj = res.data.momentList;
            let i=0;
            if(this.loadMoreMoment.currentPage == 1) this.momentList = [];  // 清空
            for( i = 0; i < my_jsonObj.length; i++) {
              this.momentList.push({  // 置顶
                id: my_jsonObj[i].info.id,  // 休闲动态id
                msg: my_jsonObj[i].info.comment,
                memberId: my_jsonObj[i].info.memberId,
                headImg: my_jsonObj[i].info.headImg,
                name: my_jsonObj[i].info.nickname,
                publishTime: my_jsonObj[i].info.createTime,
                commentNum: my_jsonObj[i].info.commentNum,   // 回复总数
                praiseNum: my_jsonObj[i].info.praiseNum,   // 赞总数
                isPraise: my_jsonObj[i].info.isPraise>0? true:false,  // 是否已赞
                isAttention: my_jsonObj[i].info.isAttention>0? true:false,  // 是否已关注
                postImgList:my_jsonObj[i].attachment,
                isMe: my_jsonObj[i].info.isMe,
              });
            }
            // console.log('this.momentList = ');
            // console.log(this.momentList);
            this.loadMoreMoment.currentPage++;
            if(my_jsonObj == null || my_jsonObj.length<10){
              this.loadMoreMoment.finished = true;
            }
            this.loadMoreMoment.loading = false;
          })
        }, 500);

      },
      getNotifyList(){
        this.loadMoreNotify.loading = true;
        // 异步更新数据
        setTimeout(() => {
          this.$getData('getNotify', {currentPage: this.loadMoreNotify.currentPage}).then(res => {
            let data = res.data.getNotify;
            console.log(data);
            addList(this.noticeList,data);
            this.loadMoreNotify.currentPage++;
            if(data == null || data.length<10){
              this.loadMoreNotify.finished = true;
            }
            this.loadMoreNotify.loading = false;
          })
        }, 500);

      },
      changeTabsTop(){
        console.log('更改最上层tab',this.activeTop);
        if(this.activeTop==2){
          this.noticeList = [];
          this.getNotifyList();
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .tabs {

  .top {
    height: 40px;
    text-align: center;

  .top-left {
    height: 40px;
    padding: 10px 0;
    border-right: 1px solid #DDBE8E;
  }

  .top-right {
    height: 40px;
    padding: 10px 0;
    border-left: 1px solid #DDBE8E;
  }

  }

  .middle {

  .van-search--show-action {
    background: #C9C9CE !important;
    height: 60px;
  }

  }
  }

  .content {

  .list-item {
    margin-bottom: 5px;
  }

  .van-cell {
    background-color: beige;
    font-size: 16px;
  }

  .van-panel__content {
    background-color: beige;
    font-size: 14px;
    color: #969799;
  }

  .user-info {

  .van-button--small {
    font-size: 13px;
  }

  }

  .moment-content {
    padding: 0 20px;

  .character {
    padding: 10px 0;

  /*max-width: 400px;*/

  .text {
    word-break: break-all;
    max-height: 60px;
    line-height: 20px;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  }
  }
  }

  .sub-info {
    font-size: 14px;
    color: #7d7e80;
  }

  .user-name {
    color: #3aa6e6;
  }

  .notice-item {
    margin: 5px 0;
  }

  .text-wrap {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
</style>
