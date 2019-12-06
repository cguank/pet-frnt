<template>
  <div>
    <div class="select">
      <select v-model="value" class="input-inner" @click="rotateFun">
        <option value="0">不行</option>
        <option value="1">订单</option>
      </select>
      <span class="input-inner-suffix">
        <van-icon name="arrow-up" class="input-inner-suffix-icon"/>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: '',
    data: function () {
      return {
        value: 0,
      };
    },
    created() {
    },
    methods: {
      rotateFun(){
        //this.rotate = !this.rotate;
        let item =  window.document.getElementsByClassName('input-inner-suffix-icon')[0];
        item.style.transition = "transform .3s";
        if(item.style.transform == 'rotate(0deg)') {
          item.style.transform = "rotate(180deg)"
        }else  item.style.transform = "rotate(0deg)";
      }
    }
  }
</script>
<style lang="less" scoped>
  .select {
    width: 70%;
    display: inline-block;
    position: relative;

  .input-inner {
    padding-right: 30px;
    cursor: pointer;
    -webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 40px;
    line-height: 1;
    outline: none;
    padding: 0 15px;
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
  }

  .input-inner-suffix {
    position: absolute;
    height: 100%;
    right: 5px;
    top: 10px;
    text-align: center;
    color: #c0c4cc;
    transition: all .3s;
    pointer-events: none;
  }

  .input-inner-suffix-icon {
    color: #c0c4cc;
    font-size: 14px;
    transition: transform .3s;
    transform: rotate(180deg);
    line-height: 16px;
    cursor: pointer;
  }

  }
</style>
