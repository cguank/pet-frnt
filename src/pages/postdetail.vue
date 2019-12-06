<template>
  <div>
    <div class="top">
      <van-row>
        <van-col span="6" offset="1" @click="$router.go(-1)">
          <a href="#" class="top-left">
            <img src="@/assets/icon/arrow-left1.svg"/>
            返回
          </a>
        </van-col>
        <van-col span="6" offset="2">
          <van-divider>详情</van-divider>
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{ color: 'black', borderColor: '#7d7e80', padding: '0 16px' }"/>
    <div class="content">
      <div class="user-info">
        <van-row>
          <van-col span="3" offset="1">
            <van-image
              width="35"
              height="35"
              round
              :src="postInfo.headImg"
            />
          </van-col>
          <van-col span="12">
            {{postInfo.name}}
            <span class="sub-info">{{postInfo.province}} {{postInfo.city}}</span>
            <br/>
            <span class="sub-info">{{postInfo.createTime}}</span>
          </van-col>
          <van-col span="5" offset="1" v-if="selfInfo.memberId!=postInfo.memberId && selfInfo.memberId!=-1" >
            <van-button class="m-hide" type="danger" round size="small" plain hairline @click="payAttention" v-if="!postInfo.isAttention">+关注</van-button>
            <van-button class="m-hide" type="danger" round size="small" plain hairline color="grey" @click="payAttention" v-else>已关注</van-button>
          </van-col>
        </van-row>
      </div>
      <div class="post-info">
        <div class="character">
          <p>{{postInfo.comment}}</p>
        </div>
        <div class="img-list">
          <div class="img-item" v-for="item in postInfo.postImgList">
            <van-image @click="imgPreview(item)"
                       :src="item"
            />
          </div>
        </div>
        <div class="footer">
          <van-col span="8" offset="16">
            <van-icon name="star-o" @click.stop="collect(postInfo.id)" v-if="!postInfo.isCollect"/>
            <van-icon name="star" color="red" @click.stop="collect(postInfo.id)" v-else/>
            <span>{{postInfo.collectNum}}</span>
            <van-icon name="chat-o"/>
            <span>{{postInfo.commentNum}}</span>
          </van-col>
        </div>
      </div>
    </div>
    <van-divider :style="{ color: '#1989fa', borderColor: '#1989fa', padding: '0 16px' }">
      评论
    </van-divider>
    <div class="footer-out">
      <van-list
        v-model="loadMore.loading"
        :finished="loadMore.finished"
        :offset="5"
        finished-text="没有更多了"
        @load="getPostCommentList"
      >
        <div class="list-item" v-for="(item,index) in commentList" :key="item.id">
          <van-panel @click="blurInput"
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
              <van-col span="12">
                <span class="user-name">{{item.name}}</span>
                <br/>
                <span class="sub-info">{{item.province}} {{item.city}}</span>
              </van-col>
              <van-col span="4" offset="4">
                <span class="sub-info">{{item.rank}}楼</span>
              </van-col>
            </van-row>
            <van-row>
              <van-col span="20" offset="4">
                {{item.comment}}
              </van-col>
            </van-row>
            <van-row>
              <van-col span="8" offset="4">
                <span class="sub-info"> {{item.publishTime}}</span>
              </van-col>
              <van-col span="4" offset="8" v-if="selfInfo.memberId!=-1">
                <span class="answer-button " @click.stop="answerOne(index,item.id,item.userId,item.name)">回复</span>
              </van-col>
            </van-row>
            <div class="answer-list">
              <div class="answer-item" v-for="subItem in item.answerList" :key="subItem.id">
                <van-row>
                  <van-col span="19" offset="5" class="answer-item-content" @click.stop="answerOne(index,item.id,subItem.answerUserId,subItem.answerUserName)">
                    <span class="user-name">{{subItem.answerUserName}}</span>
                    回复
                    <span class="user-name">{{subItem.receiveUserName}}</span>
                    <span class="msg" >:{{subItem.msg}}</span>
                    <span class="sub-info">{{subItem.publishTime}}</span>
                  </van-col>
                </van-row>
              </div>

              <van-row >
                <!--<van-row v-if="item.answerNum>3">-->
                <van-col span="19" offset="5" class="answer-item-content">
                  <van-col span="9" offset="15">
                    <span class="answer-button" @click="$router.push({'path':'/watchmoreanswer',query:{'commentId':item.id,'rank':item.rank}})">查看更多({{item.answerNum}})</span>
                    <!--<span class="answer-button" @click="openNewPage(item.id,item.rank)">查看更多({{item.answerNum}})</span>-->
                  </van-col>
                </van-col>
              </van-row>


            </div>
          </van-panel>
        </div>

      </van-list>

    </div>
    <div class="fixed m-hide" v-if="selfInfo.memberId!=-1">
      <van-cell-group>
        <van-field
          v-model="comment"
          center
          clearable
          placeholder="说点什么吧```"
        >
          <van-button slot="button" size="small" color="grey" @click="send()">发送</van-button>
        </van-field>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
  import Vue from 'vue';
  import {
    Row, Col, Divider, Icon, Image, Dialog, Button, ImagePreview, Panel,
    Field, CellGroup, Toast, List, Notify
  } from 'vant';

  Vue.use(Row).use(Col).use(Divider).use(Icon).use(Image).use(Dialog).use(List)
    .use(Button).use(ImagePreview).use(Panel).use(Field).use(CellGroup);

  import {utf16toEntities, stopKeyBoard, addList} from '@/assets/js/utils'
  import bus from '@/assets/js/bus'

  export default {
    name: 'postdetail',
    data: function () {
      return {
        answerType: -1, //-1发送评论;1以上发送回复,且是评论列表的数组位置
        answerOneObj: {
//          id: 1, 前端插入不需要id,插入数据库自动生成
          commentId: 1, //这个是commentlist中的id,即评论列表中每条评论的id,是数据库中实际的id,插入后端的时候要用到
          receiveUserId: 1,
          receiveUserName: '剑荡四方',
          publishTime: '刚刚',
          answerUserId: '2',  //当前登录用户的id
          answerUserName: '我自己',
          msg: ''
        },
        comment: '',  //说点什么吧
        postInfo: {
//          headImg: './static/images/cat.jpg',
//          name: '我是的CVC',
//          province: '济南',
//          city: 'xx市',
//          createTime: '10分钟前',
//          comment: '鲁大师积分继续哦一立刻就考虑继续从v拉客 ,酸辣粉酒叟ID房价低哦 老开' +
//          '心快乐从v继续开车距实力覅圣诞节否是.凉快圣诞节覅偶见谁都烦星空露可乐鸡翅相聚离开现场将v',
//          postImgList: [
//            './static/images/cat.jpg',
//            './static/images/dog.jpg',
//          ],
//          isAttention: false,
//          isCollect: false,
//          collectNum: 12,
//          commentNum: 110,
        },
        commentList: [
          {
//            id: 1,
//            headImg: './static/images/cat.jpg',
//            userId:12,
//            name: '老地方',
//            province: '内明光',
//            city: '呼和浩特',
//            comment: 'lsjdfoixvoxicvjxocivhnxcoivjhx0塑料袋看风景啥都现场来看是继续凑夏洛克vpvx',
//            publishTime: '1小时前',
//            rank: '1',
//            answerNum: 2, //有多少条回复
//            answerList: [ //最多取3条
//              {
//                id: 1,
//                answerUserId: 1,
//                answerUserName: '搜房的',
//                msg: '立刻就是大佛斯蒂芬',
//                publishTime: '1个月前',
//                receiveUserId: 2,
//                receiveUserName: 'ddvccv'
//              },
//              {
//                id: 2,
//                answerUserId: 2,
//                answerUserName: 'ddvccv',
//                msg: '立刻就是大佛斯蒂芬',
//                publishTime: '1个月前',
//                receiveUserId: 1,
//                receiveUserName: '搜房的'
//              },
//            ]
          },

        ],
        selfInfo: {
          id: 1,
          headImg: './static/images/dog.jpg',
          name: '你是sb吗',
          province: '北京',
          city: '北京',
        },
        loadMore: {
          loading: false,
          finished: false,
          currentPage: 1
        }
      };
    },
    beforeRouteEnter(to,from,next) {
      bus.$emit('change','postdetail',0);
      next();
    },
    beforeRouteLeave(to,from,next){
      console.log('routerliaeve')
      if(to.path == '/watchmoreanswer'){
        this.$route.meta.keepAlive = true;
        bus.$emit('change','postdetail',0);
//        bus.keepAliveList = [];
//        bus.$emit('change');

      }else  {
//        bus.keepAliveList[0] = 'postdetail';
        bus.$emit('change','postdetail',1);
        console.log('ready fror destroyed')
        this.$route.meta.keepAlive = false;
       // this.$destroy();

      }

      next();
    },
    destroyed(){
      console.log('destroyed')
    },
    activated(){
      console.log('activated');
    },
    created() {
      //获得selfInfo
      this.$getData('getMemberInfo').then(res => {
        //console.log(res)
        this.selfInfo = res.data;
        this.selfInfo.name = res.data.nickname;
        this.answerOneObj.answerUserId = this.selfInfo.memberId;
        this.answerOneObj.answerUserName = this.selfInfo.name;
      }).catch(e => {
        console.log(e)
      });

      //获得postinfo
      this.$getData('getPostInfo', {postId: this.$route.query.id}).then(res => {
        this.postInfo = res.data.postInfos;
        this.postInfo.postImgList = res.data.postAttachment;
        //console.log(res.data)
      });

      //获得评论
      this.commentList = [];
      this.getPostCommentList();

      window.scrollTo(0,0);
    },
    mounted() {
      let item  = window.document.getElementsByClassName('van-field__control')[0];
      item.style.backgroundColor = '#00000021';
      item.style.height = '30px';
      stopKeyBoard(item);

      //window.document.getElementsByTagName('input')[0].focus();
    },
    methods: {
      openNewPage(id,rank){
        //$router.push({'path':'/watchmoreanswer',query:{'commentId':item.id,'rank':item.rank}})
        window.open(`./#/watchmoreanswer?commentId=${id}&rank=${rank}`);
      },
      getPostCommentList(){
        this.loadMore.loading = true;
        this.$getData('getPostCommentList', {postId: this.$route.query.id, currentPage: this.loadMore.currentPage}).then(res => {
          let data = res.data.commentList;
          //console.log(res.data);
          addList(this.commentList,data);
          this.loadMore.currentPage++;
          if(data == null || data.length<10){
            this.loadMore.finished = true;
          }
          this.loadMore.loading = false;
        })
      },
      blurInput() {
        //console.log('blur');
        let item = window.document.getElementsByTagName('input')[0];
        this.answerType = -1;
        this.comment = '';
        item.placeholder = '说点什么吧```';
        stopKeyBoard(item);
      },
      payAttention(){
        if(this.postInfo.isAttention){
          console.log(this.postInfo)
          this.$getData('removeMemberFans', {targetId: this.postInfo.memberId}).then(res => {
            let data = res.data;
            if(!data){
              this.postInfo.isAttention = true;
              Toast('取消关注成功');
              this.postInfo.isAttention = false;
            }else Notify({ type: 'danger', message: '系统跑丢了' });
          });
        }else {
          this.$getData('addMemberFans', {targetId: this.postInfo.memberId}).then(res => {
            let data = res.data;
            if(!data){
              this.postInfo.isAttention = true;
              Toast('关注成功');
            }else Notify({ type: 'danger', message: '系统跑丢了' });
          })

        }
      },
      imgPreview(src) {
        ImagePreview({
          images: [src],
          showIndex: false
        });
      },
      answerOne(index, id,userId,userName){ //index为当前评论列表的数组位置 , id为在数据库中这条评论的id
        let input = window.document.getElementsByTagName('input')[0];
        input.placeholder = '回复:' + userName;
        input.focus();
        this.answerType = index;
        this.answerOneObj.receiveUserId = userId;
        console.log('in answerone',userId);
        this.answerOneObj.receiveUserName = userName;
        this.answerOneObj.commentId = id;
        console.log('in answerone',this.answerOneObj);

      },
      collect(id, index) {
        if (this.postInfo.isCollect) {
          this.postInfo.collectNum--;
          this.postInfo.isCollect = 0;
          this.$postData('cancelCollect',{
            'postId': this.postInfo.id
          }).then(res => {  // ------------------------------------------------------
            if(res.data == 0)  Toast('取消收藏成功');
            else Notify({ type: 'danger', message: '系统跑丢了' });
          })
        } else {
          this.postInfo.collectNum++;
          this.postInfo.isCollect = 1;
          this.$postData('addCollect',{
            'postId': this.postInfo.id,
            'acceptId': this.postInfo.memberId
          }).then(res => {  // ------------------------------------------------------
            if(res.data == 0)  Toast('收藏成功');
            else Notify({ type: 'danger', message: '系统跑丢了' });
          })
        }
      },
      send(){
        if(this.comment.length == 0)Toast('发送内容不能为空');
        else {
          this.answerOneObj.msg = this.comment;
          console.log(this.answerOneObj)
          if(this.answerType != -1){
            let item = this.commentList[this.answerType].answerList;

            //需要创建一个新的对象,不然之前push的值也会一直变
            let o = Object.assign({}, this.answerOneObj);
            item.push(o);
            //item.push(this.answerOneObj)
            window.document.getElementsByTagName('input')[0].placeholder = '说点什么吧```';

            //以下后台发送````
            this.$getData('addReply', {
              commentId: o.commentId,
              receiveUserId: o.receiveUserId,
              comment: this.comment,
              postId: this.$route.query.id
            }).then(res => {
              if(res.data == 0) Notify({ type: 'danger', message: '系统跑丢了' });

              //console.log(res.data);
            })
            //item.splice(item.length,0,this.answerOneObj)
          }else {
            let comment = this.comment;


            //以下后台发送````
            this.$getData('addReply', {
              commentId: 0,
              receiveUserId: this.postInfo.memberId,
              comment: this.comment,
              postId: this.$route.query.id
            }).then(res => {
              if(res.data == 0) Notify({ type: 'danger', message: '系统跑丢了' });
              else {
                if(this.loadMore.finished) {
                  let obj = {
                    id: res.data,
                    headImg: this.selfInfo.headImg,
                    userId: this.selfInfo.memberId,
                    name: this.selfInfo.name,
                    province: this.selfInfo.province,
                    city: this.selfInfo.city,
                    comment: comment,
                    publishTime: '刚刚',
                    rank: this.commentList.length+1,
                    answerNum: 0, //有多少条回复,
                    answerList: []
                  };
                  this.commentList.push(obj);
                }
              }
              this.postInfo.commentNum++;
              console.log(res.data);
            })
          }
          this.answerType = -1;
          this.comment = '';
          Toast('发送成功');
        }

      }
    }
  }
</script>
<style lang="less" scoped>
  .top {
    margin: 10px;

  .van-info--dot {
    top: -14px;
  }

  img {
    height: 15px;
  }

  .van-divider {
    margin: 2px 0;
  }

  .top-right {
    color: #DDBE8E;
  }

  .top-left {
    color: #DDBE8E;
  }

  }

  .content {

  .user-info {

  .van-button--small {
    font-size: 13px;
  }

  }

  .post-info {
    padding: 0 15px;

  .footer {
    margin-top: 20px;
  }

  }
  }
  .sub-info {
    font-size: 14px;
    color: #7d7e80;
  }

  .footer-out {
    padding-bottom: 80px;

  .answer-button {
    color: #3a8ee6;
  }

  .user-name {
    color: #3aa6e6;
  }

  .answer-list {
    padding-right: 10px;
    font-size: 15px;

  .answer-item-content {
    padding-left: 5px;
    background-color: #7d7e8047;
  }

  }
  }

  .fixed {
    position: fixed;
    bottom: 0;
    width: 100%;

  }
</style>
