<template>
  <section class="recordPage">
    <navbar showBack="'true'" title="充值详情" />
    <CellGroup>
                <Cell title="代币类型" extra="SHIN" /> 
                <div class="line"></div>
                <Cell title="代币数量" extra="+100" /> 
                <div class="line"></div>
                <Cell title="时间" extra="2019-10-10 20:00:00" /> 
                <div class="line"></div>
                <Cell title="时间" extra="交易成功" /> 
                <div class="line"></div>
                <Cell title="提币地址" extra="1234567891234567899451813548181531" /> 
            </CellGroup>
  </section>
</template>

<script>
import navbar from "@/components/shared/navbar";
export default {
  components: {
    navbar
  }
};
</script>


<style scoped>
.recordPage{
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.line{
  width: 100%;
height:1px;
background:rgba(0,0,0,1);
opacity:0.08;
}
</style>