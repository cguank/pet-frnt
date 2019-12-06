<template>
  <div>
    <van-nav-bar
      title="问诊须知"
      left-text="返回"
      left-arrow
      @click-left="goBack"
    />
    <div style="width:88%; margin: 0 auto; font-size: 14px;">
      <p style="color: steelblue; font-weight: bold;">温馨提示：专家工作繁忙，在空闲时间为您解答，
        请耐心等待哦。如您不能接受，建议您去医院就诊。</p>
      <p>1、本次服务提供24小时内的10个回合咨询，10个回合
        结束或24小时到期咨询则结束。</p>
      <p style="margin-top: -10px;">2、您病情描述地越详细越有助于专家为您解答。</p>
      <p style="margin-top: -10px;">3、网上问诊不能代替面诊，专家答复仅供参考，
        不可作为处方使用，不具有法律效力。</p>
      <p style="margin-top: -10px;">4、急重症患宠不适合网上诊疗/咨询，请即刻前往当地
        医院就诊。</p>

      <p style="font-weight: bold;">责任声明：</p>
      <p style="margin-top: -10px;">1、若您问诊咨询的内容涉及违反平台规范或相关法律
        法规，将作下线处理。</p>
      <p style="margin-top: -10px;">2、本平台开通问诊服务的专家是具备执业兽医师资格
        或相关资质的合法医师。</p>
      <p style="margin-top: -10px;">3、再次郑重提示，本平台不进行任何疾病诊断，开具
        处方以及给出明确治疗方案等医疗行为。问诊专家给出的
        处方、诊断建议等不可作为处方使用，不具备法律效力。</p>
      <p style="margin-top: -10px;">4、本平台对您在本平台之外与特定或不特定问诊所
        进行的任何接洽行为之后果，亦不承担责任。</p>

      <p style="color: darkred; font-weight: bold;">以上，烦请您在使用问诊咨询前仔细阅读并确认完全
        理解以上声明的全部内容，请知悉！谢谢。</p>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { NavBar } from 'vant';
Vue.use(NavBar);

export default {
  name: "consultationinstructions",
  methods: {
    // 返回上一页
    goBack() {
      this.$router.go(-1);
    },
  }
}
</script>

<style scoped>

</style>
