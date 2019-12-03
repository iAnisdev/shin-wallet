<template>
  <section class="loginPage">
    <div class="layer" v-if="!countryShow">
      <div v-if="showLogo">
        <img src="@/assets/logo.png" class="logo" srcset />
        <h2 class="singupTitle">欢迎注册SHIN</h2>
      </div>
      <div class="form">
        <Input
          prefix="ios-contact"
          placeholder="请输入用户名"
          v-model="userName"
          size="large"
          @on-focus="hideTopLogo"
          @on-blur="showTopLogo"
        />
        <div style="margin-top: 2vh" v-if="!selectedCountry">
          <Select
            v-model="country"
            prefix="md-globe"
            placeholder="国家代码"
            size="large"
            @on-change="selectCountry"
          >
            <Option
              v-for="item in basicCountryList"
              :value="item.value"
              :key="item.value"
            >{{ item.name }}</Option>
          </Select>
        </div>
        <div style="margin-top: 2vh" v-if="selectedCountry">
          <div class="cellGroup">
            <div class="cellWithArrow" @click="toggleCountryView">
              <div class="rowFS">
                <img :src="counrtyFlag" alt class="cellImg" />
                <h4 class="cellTitle">{{country}}</h4>
              </div>
              <div class="rowFS">
                <h5 class="cellExtra">{{countryCode}}</h5>
                <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
              </div>
            </div>
          </div>
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-phone-portrait"
            type="number"
            placeholder="请输入手机号"
            v-model="phone"
            size="large"
            @on-focus="hideTopLogo"
            @on-blur="showTopLogo"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-key-outline"
            placeholder="请输入验证码"
            v-model="smsCode"
            size="large"
            @on-focus="hideTopLogo"
            @on-blur="showTopLogo"
          >
            <span slot="prepend">
              <Icon type="ios-key-outline" />
            </span>
            <span slot="append" class="sendSMSBtn">
              <Button @click="sendCode">获取验证码</Button>
            </span>
          </Input>
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            :type="inputType"
            on-click="togglepassword"
            placeholder="请输入密码"
            @on-focus="hideTopLogo"
            @on-blur="showTopLogo"
            v-model="password"
            size="large"
          >
            <span slot="prepend">
              <Icon type="ios-lock" />
            </span>
            <span slot="append" @click="togglepassword">
              <Icon :type="eyeIcon" />
            </span>
          </Input>
          <div class="Errmsg">{{ passErrMessage }}</div>
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="password"
            @on-focus="hideTopLogo"
            @on-blur="showTopLogo"
            placeholder="确认新密码"
            v-model="cpassword"
            size="large"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-keypad"
            placeholder="请输入推荐码"
            @on-focus="hideTopLogo"
            @on-blur="showTopLogo"
            v-model="refer"
            size="large"
          />
        </div>
        <div style="margin-top: 3vh;">
          <Button long size="large" class="signUpbtn" @click="registerUser">注册</Button>
        </div>
      </div>
    </div>
    <div class="line" v-if="!countryShow"></div>
    <div class="footerRow" v-if="!countryShow">
      <h5 class="alreadyRegistered">已有账号，</h5>
      <router-link to="/auth/login">
        <h4 class="login">立即登录</h4>
      </router-link>
    </div>
    <div v-if="countryShow">
      <section class="navbar">
        <div class="backButton">
          <Icon type="md-arrow-round-back" class="backIcon" size="24" @click="toggleCountryView" />
        </div>
        <h3 class="pageTitle">选择国家</h3>
      </section>
      <div class="cellGroup" v-for="(country , i) in countryList" :key="i">
        <div class="cellWithArrow" @click="updateCountry(country)">
          <div class="rowFS">
            <img :src="country.flag" alt class="cellImg" />
            <h4 class="cellTitle">{{country.name}}</h4>
          </div>
          <div class="rowFS">
            <h5 class="cellExtra">{{country.callingCodes[0]}}</h5>
            <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
          </div>
        </div>
        <div class="cellLine"></div>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Cookies from "@/plugins/cookies";
export default {
  data() {
    return {
      userName: "",
      phone: "",
      smsCode: "",
      smsverify: "",
      password: "",
      cpassword: "",
      refer: "",
      showLogo: true,
      passErrMessage: "",
      //show and hide password
      inputType: "password",
      eyeIcon: "md-eye",
      country: "China",
      countryCode: "86",
      counrtyFlag: "",
      selectedCountry: false,
      countryShow: false, //picker toggle
      basicCountryList: [
        {
          name: "China",
          value: "86"
        },
        {
          name: "Singapore",
          value: "65"
        },
        {
          name: "Taiwan",
          value: "886"
        },
        {
          name: "Hong Kong",
          value: "852"
        },
        {
          name: "Macao",
          value: "853"
        },
        {
          name: "Others",
          value: "other"
        }
      ],
      allCountryList: []
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      countryList: "getCountryList"
    })
  },
  methods: {
    ...mapActions({
      sendSMSCode: "sendSMSCode",
      userRegister: "userRegister",
      toggelLoader: "toggelLoader",
      getALLCountryList: "getALLCountryList"
    }),
    sendCode() {
      let that = this;
      if (that.isValid(that.phone)) {
        that.toggelLoader();
        let data = {
          country: that.countryCode,
          phone: that.phone
        };
        that.sendSMSCode(data).then(res => {
          that.smsverify = res.result.smsverify;
          that.toggelLoader();
        });
      } else {
        this.$Message.error({
          background: true,
          content: "无效电话号码"
        });
      }
    },
    registerUser() {
      let that = this;
      if (!that.isValid(that.userName)) {
        this.$Message.error({
          background: true,
          content: "无效用户名"
        });
      } else if (!that.isValid(that.phone)) {
        this.$Message.error({
          background: true,
          content: "无效电话号码"
        });
      } else if (!that.isValid(that.smsCode)) {
        this.$Message.error({
          background: true,
          content: "无效SMS 代码"
        });
      } else if (!that.isValid(that.smsverify)) {
        this.$Message.error({
          background: true,
          content: "无效验证码"
        });
      } else if (!that.isValid(that.password)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (!that.passErrMessage == "") {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (!that.isValid(that.cpassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (that.password !== that.cpassword) {
        this.$Message.error({
          background: true,
          content: "密码不匹配"
        });
      } else if (!that.isValid(that.refer)) {
        this.$Message.error({
          background: true,
          content: "无效复用代码"
        });
      } else {
        let data = {
          username: that.userName,
          country: that.countryCode,
          phone: that.phone,
          smscode: that.smsCode,
          smsverify: that.smsverify,
          refer: that.refer,
          password: that.password
        };
        that.toggelLoader();
        that
          .userRegister(data)
          .then(res => {
            that.toggelLoader();
          })
          .catch(err => {
            this.$Message.error({
              background: true,
              content: err.message
            });
            that.toggelLoader();
          });
      }
    },
    isValid(value) {
      if (
        value === undefined ||
        value === null ||
        (typeof value === "object" && Object.keys(value).length === 0) ||
        (typeof value === "string" && value.trim().length === 0)
      ) {
        return false;
      } else {
        return true;
      }
    },
    selectCountry(item) {
      let that = this;
      if (item == "other") {
        that.countryShow = true;
      } else {
        that.countryCode = item;
        that.selectedCountry = false;
      }
    },
    updateCountry(country) {
      let that = this;
      that.country = country.name;
      that.countryCode = country.callingCodes[0];
      that.counrtyFlag = country.flag;
      that.countryShow = false;
      that.selectedCountry = true;
    },
    toggleCountryView() {
      let that = this;
      that.countryShow = !that.countryShow;
    },
    togglepassword() {
      let that = this;
      if (that.inputType == "password") {
        that.inputType = "text";
        that.eyeIcon = "md-eye-off";
      } else {
        that.inputType = "password";
        that.eyeIcon = "md-eye";
      }
    },
    showTopLogo() {
      let that = this;
      that.showLogo = true;
    },
    hideTopLogo() {
      let that = this;
      that.showLogo = false;
    }
  },
  mounted() {
    let that = this;
    var url_string = window.location.href;
    var url = new URL(url_string);
    var referCode = url.searchParams.get("refer");
    if (referCode) {
      Cookies.setCookie("referCode", referCode, 24);
      that.refer = referCode;
    } else {
      let referCode = Cookies.getCookies("referCode");
      if (referCode) {
        that.refer = referCode;
      } else {
      }
    }
    that.getALLCountryList();
  },
  watch: {
    password(newVal) {
      let that = this;
      if (newVal) {
        if (newVal.length < 8) {
          that.passErrMessage = "* 密码不少于8个字符";
        } else {
          that.passErrMessage = "";
        }
      }
    }
  }
};
</script>

<style scoped>
.loginPage {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.layer {
  width: 100%;
  height: 92%;
  background: rgba(255, 255, 255, 1);
  padding: 4vh 1vw 2vh;
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
.logo {
  width: 60px;
  height: 75px;
}

/* Cell Style */

.rowSB {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.rowFS {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
}

.cellGroup {
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 2% 0%;
}
.cellWithArrow {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3% 2% 3% 6%;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 5px;
}
.cell {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3% 6%;
  width: 100%;
}
.cellImg {
  width: 20px;
  height: 20px;
  align-self: center;
  margin-right: 15px;
}
.cellArrow {
  width: 20px;
  height: 20px;
  align-self: center;
  margin-left: 5px;
}
.cellTitle {
  font-size: 13px;
  font-family: PingFang SC;
  align-self: center;
  font-weight: 500;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.cellExtra {
  font-size: 13px;
  font-family: PingFang SC;
  align-self: center;
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.32;
}
.cellImg {
  width: 20px;
  height: 20px;
  align-self: center;
  margin-right: 15px;
}
.cellLine {
  border: 0.8px solid rgba(0, 0, 0, 1);
  opacity: 0.08;
}

/* toggle country list CSS */

.navbar {
  height: 8vh;
  width: 100%;
  padding: 2% 4%;
  background-color: #fff;
  display: flex;
  flex-direction: row;
  border-bottom: 2px solid lightgray;
}
.backButton {
  align-self: center;
}
.backIcon {
  align-self: center;
}
.pageTitle {
  width: 80%;
  font-size: 17px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 24px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
  align-self: center;
  text-align: center;
}
.Errmsg {
  text-align: left;
  margin-top: 1vh;
  color: red;
}
</style>