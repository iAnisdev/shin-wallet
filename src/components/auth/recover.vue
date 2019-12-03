<template>
  <section class="loginPage">
    <div class="layer" v-if="!countryShow">
      <img src="@/assets/logo.png" class="logo" srcset />
      <div class="form">
        <div v-if="!codeSent">
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
          <Input
            style="margin-top: 2vh"
            prefix="ios-phone-portrait"
            placeholder="请输入手机号"
            type="number"
            v-model="phone"
            size="large"
          />
          <div style="margin-top: 3vh;">
            <Button long size="large" class="smsBtn" @click="sendCode">获取验证码</Button>
          </div>
        </div>
        <div v-if="codeSent">
          <Input prefix="ios-key-outline" placeholder="请输入验证码" v-model="smsCode" size="large" />
          <div style="margin-top: 2vh">
            <Input
              prefix="ios-lock"
              type="password"
              placeholder="输入新密码"
              v-model="password"
              size="large"
            />
          <div class="Errmsg">{{ passErrMessage }}</div>
          </div>
          <div style="margin-top: 2vh">
            <Input
              prefix="ios-lock"
              type="password"
              placeholder="确认新密码"
              v-model="cpassword"
              size="large"
            />
          </div>
          <div style="margin-top: 3vh;" v-if="!codeSent">
            <Button long size="large" class="smsBtn">获取验证码</Button>
          </div>
          <div style="margin-top: 3vh;" v-if="codeSent">
            <Button long size="large" type="success" class="recoverBtn" @click="recover">恢复帐户</Button>
          </div>
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
export default {
  data() {
    return {
      codeSent: false,
      phone: "",
      smsverify: "",
      smsCode: "",
      password: "",
      cpassword: "",
      country: "China",
      countryCode: "86",
      counrtyFlag: "",
      passErrMessage: "",
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
      userLogin: "userLogin",
      changePassword: "changePassword",
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
          that.codeSent = true;
        });
      } else {
        this.$Message.error({
          background: true,
          content: "无效电话号码"
        });
      }
    },
    recover() {
      let that = this;
      if (!that.isValid(that.smsCode)) {
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
      }  else if (!that.isValid(that.cpassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (that.password !== that.cpassword) {
        this.$Message.error({
          background: true,
          content: "密码不匹配"
        });
      } else {
        that.toggelLoader();
        let data = {
          country: that.countryCode,
          phone: that.phone,
          smscode: that.smsCode,
          smsverify: that.smsverify,
          new: that.password
        };
        that
          .changePassword(data)
          .then(res => {
            return that.userLogin({
              country: that.countryCode,
              phone: data.phone,
              password: data.new
            });
          })
          .then(res => {
            that.toggelLoader();
            this.$Message.success({
              background: true,
              content: "更新密码"
            });
          })
          .catch(err => {
            that.toggelLoader();
            this.$Message.error({
              background: true,
              content: err.message
            });
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
    }
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
  },
  mounted() {
    this.getALLCountryList();
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
.logo {
  width: 120px;
  height: 150px;
}
.form {
  background: rgba(255, 255, 255, 1);
  padding: 8% 10%;
  opacity: 1;
}
.smsBtn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
}
.recoverBtn {
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
}
.cell {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 3% 6%;
  width: 100%;
  border: 1px solid lightgray;
  border-radius: 5px;
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