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
          <van-divider>通知详情</van-divider>
        </van-col>
      </van-row>
    </div>
    <van-divider :style="{ color: 'black', borderColor: '#7d7e80', padding: '0 16px' }"/>

    <div class="content">
      <div class="title">
        <h3>{{detail.title}}</h3>
      </div>
      <div class="editor">
        <span>开始时间:{{detail.startTime}}</span>
      </div>
      <div class="abstract">
        结束时间:{{detail.endTime}}
      </div>
      <span class="ql-editor" v-html="detail.text"/>
    </div>
  </div>

</template>

<script>
  import Vue from 'vue';
  import {Icon, Button, Image, Row, Col, Divider, Card, List, Toast} from 'vant';

  Vue.use(Icon).use(Button).use(Row).use(Col).use(Divider).use(Card).use(List).use(Toast);
  export default {
    name: 'petinfodetail',
    data: function () {
      return {
        detail: {
          id: 1,
          title: '狗狗聪明粘人,也会得抑郁症',
          text: '<p>大象不仅在现实中被受关注，在动漫和电影中也时常有它的身影，那肥硕的耳朵和长长的鼻子，无不透露着可爱，而它拥有的不仅仅是可爱哦。</p><p><span>2年孕期</span></p><p>人类是十月怀胎，而大象从怀孕到当妈则需要历时2年之久，是所有哺乳动物孕期最长的。在怀孕16周左右，才能扫描到象宝宝的大概模样，难道孕期的长短还和体型有关系？</p><div><img src="http://p9.pstatp.com/large/pgc-image/27b00c15cb8c4647980c41e6bc7d3bee" img_width="570" img_height="409" alt="你知道地球上怀孕周期最长的动物是谁吗？" inline="0" style="-webkit-tap-highlight-color: transparent; box-sizing: border-box; border-style: none; max-width: 100%; display: block; margin: 10px auto;"/><p><br/></p></div><p><span>有理解人类手势的天性</span></p><p>尽管它从未被训练，但是它们仍然可以理解人类的手势，甚至可以通过鼻子与人类进行沟通，它比我们想象中更像人类。当然了，灵长类的黑猩猩在经过训练后也可以理解。</p><p><span>超大的脑容量</span></p><p>地球上所有动物中，除鲸鱼外大象的大脑是最大的，可达到5公斤，可见它在动物界拥有超高的智商，比如它们可以在镜中认出自己，懂得对其他动物给予帮助等。</p><div><img src="http://p1.pstatp.com/large/pgc-image/4c5fb09fe7e7409294a3988802cd3c30" img_width="570" img_height="530" alt="你知道地球上怀孕周期最长的动物是谁吗？" inline="0" style="-webkit-tap-highlight-color: transparent; box-sizing: border-box; border-style: none; max-width: 100%; display: block; margin: 10px auto;"/><p><br/></p></div><p><span>“较轻”的体重</span></p><p>绝大多数大象的体重还抵不过蓝鲸的一条舌头，你是在逗我吗？当然不是。蓝鲸作为地球上最重的动物，单是一条舌头就相当于一头大象的重量，不愧是地球上最大的动物啊。</p><p><span>丁丁是它的第五条“腿”</span></p><p>大象的丁丁长达一米，重量有30公斤，所以雄性大象经常会将自己的丁丁当做第五条腿来支撑身体，这还不算完，它还可以当肚子部位的痒痒挠，还真是一“丁”多用啊！</p><div><img src="http://p3.pstatp.com/large/pgc-image/aa7e713768ab43ad97460b782a28a97c" img_width="570" img_height="375" alt="你知道地球上怀孕周期最长的动物是谁吗？" inline="0" style="-webkit-tap-highlight-color: transparent; box-sizing: border-box; border-style: none; max-width: 100%; display: block; margin: 10px auto;"/><p><br/></p></div><p><span>惊人的记忆力</span></p><p>大象有着惊人的记忆力，甚至比人类还好，而这也正是它在野外生存的必要条件。例如非洲大象被非洲蜜蜂蛰过，它们甚至可以记住蜜蜂振翅发出的声音，着实令人惊叹。</p><p><span>也受紫外线侵扰</span></p><p>大象虽然有厚厚的皮肤，但仍然会被紫外线晒伤，它们不像河马自带“防晒乳”，所以只能在自己的身体上扔沙土，以达到防晒的目的。</p><div><img src="http://p1.pstatp.com/large/pgc-image/92dbfe61cf4a4da78977b869f293d1a8" img_width="570" img_height="353" alt="你知道地球上怀孕周期最长的动物是谁吗？" inline="0" style="-webkit-tap-highlight-color: transparent; box-sizing: border-box; border-style: none; max-width: 100%; display: block; margin: 10px auto;"/><p><br/></p></div><p><span>画画天赋</span></p><p>大象拥有超高智商，所以它们经过一些训练后，可以将自己脑海中的画面留在纸上，对于不会画画的小编来说，佩服佩服。</p><p><br/></p><div><img src="http://p1.pstatp.com/large/pgc-image/8742b2a8e7c643cda26e152b52a4f36b" img_width="570" img_height="354" alt="你知道地球上怀孕周期最长的动物是谁吗？" inline="0" style="-webkit-tap-highlight-color: transparent; box-sizing: border-box; border-style: none; max-width: 100%; display: block; margin: 10px auto;"/><p><br/></p></div><p>拥有重量级身材的大象同时也拥有一个颗善良的心，懂得照顾家族中的弱者，也懂得给予受伤人类帮助，希望人类可以停止一切伤害大象的行为，还它们一个宁静的生活。</p><div><img src="http://p3.pstatp.com/large/pgc-image/c3d02273cf304fce931a1f7d608bbbd7" img_width="720" img_height="173" alt="你知道地球上怀孕周期最长的动物是谁吗？" inline="0" style="-webkit-tap-highlight-color: transparent; box-sizing: border-box; border-style: none; max-width: 100%; display: block; margin: 10px auto;"/></div><p><br/></p>',
          startTime: '2019-11-10 8:00',
          endTime: '2019-11-20 21:00',
        }
      };
    },
    created() {
      window.scrollTo(0,0);
      this.getNotify();
    },
    methods: {
      getNotify() {
        this.$getData('getNotify', {'currentPage': 1, id: this.$route.query.id}).then(res => {
          let data = res.data.getNotify[0];
          this.detail = data;
          console.log(data)
        })
      },
    }
  }
</script>
<style lang="less" >
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

  img {
    background: none !important;
    width: 99% !important;
    height: auto !important;

  }
  padding: 0 10px;

  .title {
    text-align: center;
  }

  .abstract, .editor, .key-words {
    font-size: 15px;
    color: #7d7e80;
    margin: 1px 0;
  }

  }

</style>
