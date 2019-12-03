<template>
  <section class="phonePage">
    <div class="content" v-if="!countryShow">
      <navbar showBack="'true'" title="更改手机号" />
      <div class="topSection">
        <div class="topBox">
          <h4 class="topBoxTitle">号码：</h4>
          <div class="phoneBox">
            <h2>+{{userPhone.country}}-{{userPhone.phone}}</h2>
          </div>
        </div>
      </div>
      <div class="form">
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
            prefix="md-phone-portrait"
            type="number"
            placeholder="请输入手机号"
            v-model="phone"
            size="large"
          />
          <div class="buttonView" v-if="!codeSent">
            <Button class="btn" size="large" long @click="sendCode">获取验证码</Button>
          </div>
          <div style="margin-top: 2vh" v-if="codeSent">
            <Input
              prefix="ios-key-outline"
              type="text"
              placeholder="请输入验证码"
              v-model="smsCode"
              size="large"
            />
            <div class="buttonView">
              <Button class="btn" size="large" long @click="changeNumber">更改</Button>
            </div>
          </div>
        </div>
      </div>
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
import navbar from "@/components/shared/navbar";
export default {
  components: {
    navbar: navbar
  },
  data() {
    return {
      phone: "",
      smsCode: "",
      codeSent: false,
      country: "China",
      countryCode: "86",
      counrtyFlag: "",
      smsverify: "",
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
      userToken: "getUserToken",
      userData: "userData",
      userPhone: "getUserPhone",
      countryList: "getCountryList"
    })
  },
  methods: {
    ...mapActions({
      sendSMSCode: "sendSMSCode",
      toggelLoader: "toggelLoader",
      getUserData: "getUserData",
      getALLCountryList: "getALLCountryList",
      changePhoneNumber: "changePhoneNumber"
    }),
    sendCode() {
      let that = this;
      if (that.isValid(that.phone)) {
        that.toggelLoader();
        let data = {
          phone: that.phone,
          country: that.countryCode
        };
        that
          .sendSMSCode(data)
          .then(res => {
            that.smsverify = res.result.smsverify;
            that.codeSent = true;
            that.toggelLoader();
          })
          .catch(err => {
            that.toggelLoader();
            console.log("err ", err);
          });
      } else {
        this.$Message.error({
          background: true,
          content: "无效电话号码"
        });
      }
    },
    changeNumber() {
      let that = this;
      if (!that.isValid(that.phone)) {
        this.$Message.error({
          background: true,
          content: "无效电话号码"
        });
      } else if (!that.isValid(that.smsCode)) {
        this.$Message.error({
          background: true,
          content: "无效SMS 代码"
        });
      } else {
        that.toggelLoader();
        let data = {
          token: that.userToken,
          phone: that.phone,
          country: that.countryCode,
          smscode: that.smsCode,
          smsverify: that.smsverify
        };
        that
          .changePhoneNumber(data)
          .then(res => {
            that.toggelLoader();
            this.$Message.success({
              background: true,
              content: "电话号码已更改"
            });
            this.$router.go(-1);
          })
          .catch(err => {
            that.toggelLoader();
            this.$Message.error({
              background: true,
              content: err.message
            });
            console.log("err ", err);
          });
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
  mounted() {
    let that = this;
    let data = {
      token: that.userToken
    };
    that.toggelLoader();
    this.getUserData(data);
    this.getALLCountryList()
      .then(res => {})
      .catch(err => {
        console.log("err ", err);
      })
      .finally(final => {
        that.toggelLoader();
      });
  }
};
</script>

<style scoped>
.phonePage {
  width: 100%;
  height: 100%;
  text-align: left;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: rgba(255, 255, 255, 1);
}
.content {
  background: #eee;
  height: 100%;
}
.topSection {
  width: 100%;
  padding: 2vh 10%;
  background: rgba(247, 247, 247, 1);
  opacity: 1;
}
.topBox {
  width: 100%;
  padding: 4vh 5%;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
  opacity: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: left;
  border-radius: 12px;
}
.topBoxTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.phoneBox {
  padding: 1vh 5%;
  text-align: center;
}

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

.form {
  padding: 4vh 12%;
  opacity: 1;
}
.buttonView {
  padding: 2vh 1%;
}
.btn {
  background: rgba(58, 89, 190, 1);
  opacity: 1;
  border-radius: 8px;
  font-size: 15px;
  font-family: PingFang SC;
  font-weight: 400;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
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
</style>