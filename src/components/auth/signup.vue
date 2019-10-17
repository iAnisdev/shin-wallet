<template>
  <section class="loginPage">
    <div class="layer">
      <h2 class="singupTitle">欢迎注册SHIN</h2>
      <div class="form">
        <Input prefix="ios-contact" placeholder="请输入用户名" v-model="userName" size="large" />
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-phone-portrait"
            type="number"
            placeholder="请输入手机号"
            v-model="phone"
            size="large"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input prefix="ios-key-outline" placeholder="请输入验证码" v-model="smsCode" size="large">
            <span slot="prepend">
              <Icon type="ios-key-outline" />
            </span>
            <span slot="append" class="sendSMSBtn">
              <Button>获取验证码</Button>
            </span>
          </Input>
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="password"
            placeholder="请输入密码"
            v-model="password"
            size="large"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input prefix="ios-keypad" placeholder="请输入推荐码" v-model="referCode" size="large" />
        </div>
        <div style="margin-top: 3vh;">
          <Button long size="large" class="signUpbtn">注册</Button>
        </div>
      </div>
    </div>
    <div class="line"></div>
    <div class="footerRow">
      <h5 class="alreadyRegistered">已有账号，</h5>
      <router-link to="/auth/login">
        <h4 class="login">立即登录</h4>
      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      userName: "",
      phone: "",
      smsCode: "",
      password: "",
      referCode: ""
    };
  }
};
</script>

<style scoped>
.loginPage {
  width: 100%;
  height: 100%;
  /* background-image: url("~@/assets/bg.jpeg"); */
  background-size: cover;
}
.layer {
  width: 100%;
  height: 92%;
  background: rgba(255, 255, 255, 1);
  /* opacity: 0.8; */
  padding: 12vh 1vw 2vh;
}
.singupTitle {
  font-size: 30px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 45px;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
.form {
  background: rgba(255, 255, 255, 1);
  padding: 6vh 10%;
  opacity: 1;
}
.sendSMSBtn {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 18px;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
.signUpbtn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.line {
  border: 1px solid rgba(0, 0, 0, 1);
  opacity: 0.24;
}
.footerRow {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 2vh 5vw;
}
.alreadyRegistered {
  font-size: 13px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 18px;
  color: rgba(93, 93, 93, 1);
  opacity: 1;
}
.login {
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 18px;
  color: rgba(58, 51, 140, 1);
  opacity: 1;
}
</style>