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
          <van-divider>查看更多</van-divider>
        </van-col>
      </van-row>
    </div>
    <div class="footer-out">
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
            <van-col span="4" offset="8" class="m-hide" v-if="selfInfo.memberId!=-1">
              <span class="answer-button" @click.stop="answerOne(index,item.id,item.userId,item.name)">回复</span>
            </van-col>
          </van-row>
          <div class="answer-list">
            <div class="answer-item" v-for="subItem in item.answerList" :key="subItem.id">
              <van-row>
                <van-col span="19" offset="5" class="answer-item-content"  @click.stop="answerOne(index,item.id,subItem.answerUserId,subItem.answerUserName)">
                  <span class="user-name">{{subItem.answerUserName}}</span>
                  回复
                  <span class="user-name">{{subItem.receiveUserName}}</span>
                  <span class="msg">:{{subItem.msg}}</span>
                  <span class="sub-info">{{subItem.publishTime}}</span>
                </van-col>
              </van-row>
            </div>

            <van-row >
              <van-col span="19" offset="5" class="answer-item-content">
                <van-col span="9" offset="15" v-if="!loadMore.finished">
                  <span class="answer-button" @click.stop="getMoreAnswerList">查看更多</span>
                </van-col>
              </van-col>
            </van-row>


          </div>
        </van-panel>
      </div>
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
    Field, CellGroup, Toast
  } from 'vant';

  Vue.use(Row).use(Col).use(Divider).use(Icon).use(Image).use(Dialog)
    .use(Button).use(ImagePreview).use(Panel).use(Field).use(CellGroup);

  import {utf16toEntities, stopKeyBoard, addList } from '@/assets/js/utils'

  export default {
    name: '',
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
        selfInfo: {
          id: 1,
          headImg: './static/images/dog.jpg',
          name: '你是sb吗',
          province: '北京',
          city: '北京',
        },
        commentList: [
          {
            id: 1,
            headImg: './static/images/cat.jpg',
            userId: 12,
            name: '老地方',
            province: '内明光',
            city: '呼和浩特',
            comment: 'lsjdfoixvoxicvjxocivhnxcoivjhx0塑料袋看风景啥都现场来看是继续凑夏洛克vpvx',
            publishTime: '1小时前',
            rank: '1',
            answerNum: 2, //有多少条回复
            answerList: [ //最多取3条
              {
                id: 1,
                answerUserId: 1,
                answerUserName: '搜房的',
                msg: '立刻就是大佛斯蒂芬',
                publishTime: '1个月前',
                receiveUserId: 2,
                receiveUserName: 'ddvccv'
              },
              {
                id: 2,
                answerUserId: 2,
                answerUserName: 'ddvccv',
                msg: '立刻就是大佛斯蒂芬',
                publishTime: '1个月前',
                receiveUserId: 1,
                receiveUserName: '搜房的'
              },
            ]
          },
        ],
        comment: '',  //说点什么吧
        loadMore: {
          loading: false,
          finished: false,
          currentPage: 1
        }
      };
    },
    created() {
      //获得selfInfo
      this.$getData('getMemberInfo').then(res => {
        this.selfInfo = res.data;
        this.selfInfo.name = res.data.nickname;
        this.answerOneObj.answerUserId = this.selfInfo.memberId;
        this.answerOneObj.answerUserName = this.selfInfo.name;
      });

      this.commentList = [];
      this.$getData("getMoreAnswerList", {commentId: this.$route.query.commentId,currentPage:this.loadMore.currentPage}).then(res => {
        let data = res.data.commentInfo;
        this.commentList.push(data);
        this.commentList[0].rank = this.$route.query.rank;
        this.loadMore.currentPage++;
        if(data.answerList && data.answerList.length < 10) {
          this.loadMore.finished = true;
        }
        else  this.loadMore.finished = false;
        this.answerOne(0,this.commentList[0].id,this.commentList[0].userId,this.commentList[0].name);
      });
    },
    mounted(){
      let item = window.document.getElementsByClassName('van-field__control')[0];
      item.style.backgroundColor = '#00000021';
      item.style.height = '30px';
      stopKeyBoard(item);
    },
    methods: {
      exit(){
        window.opener=null;window.close()
      },
      getMoreAnswerList(){
        this.$getData("getMoreAnswerList", {commentId: this.$route.query.commentId,currentPage:this.loadMore.currentPage}).then(res => {
          let data = res.data.commentInfo.answerList;
          if(data.length>0){
            addList(this.commentList[0].answerList, data);
            //this.commentList[0].answerList.push(data);
            this.loadMore.currentPage++;
          }
          if(data.length < 10) this.loadMore.finished = true;
          else  this.loadMore.finished = false;
          //console.log(data);
        })
      },
      blurInput() {
        //console.log('blur')
        let item = window.document.getElementsByTagName('input')[0];
        this.answerType = -1;
        this.comment = '';
        this.answerOne(0,this.commentList[0].id,this.commentList[0].userId,this.commentList[0].name);
        stopKeyBoard(item);
      },
      answerOne(index, id, userId, userName) { //index为当前评论列表的数组位置 , id为在数据库中这条评论的id
        let input = window.document.getElementsByTagName('input')[0];
        input.placeholder = '回复:' + userName;
        input.focus();
        this.answerType = index;
        this.answerOneObj.receiveUserId = userId;
        this.answerOneObj.receiveUserName = userName;
        this.answerOneObj.commentId = id;
        //console.log( this.answerType,this.answerOneObj)
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
            if(this.loadMore.finished) {
              item.push(o);
            }
            window.document.getElementsByTagName('input')[0].placeholder = '说点什么吧```';

            //以下后台发送````
            this.$getData('addReply', {
              commentId: o.commentId,
              receiveUserId: o.receiveUserId,
              comment: this.comment,
              postId: this.commentList[0].id
            }).then(res => {
              if(res.data == 0) Notify({ type: 'danger', message: '系统跑丢了' });
            })
          }
          this.blurInput();
          //this.answerOne(0,this.commentList[0].id,this.commentList[0].userId,this.commentList[0].name);
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
