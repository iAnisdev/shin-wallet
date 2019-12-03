<template>
  <section class="accountPage">
    <navbar showBack="'true'" title="切换账号" />
    <div class="topSection">
      <div class="topBox">
        <h4 class="topBoxTitle">号码：</h4>
        <div class="phoneBox">
          <h2>+{{userPhone.country}} - {{userPhone.phone}}</h2>
        </div>
      </div>
    </div>
    <div class="form">
      <div style="margin-top: 2vh">
        <Input prefix="ios-contact" placeholder="请输入用户名" v-model="userName" size="large" />
      </div>
      <div style="margin-top: 2vh">
        <Input
          prefix="ios-lock"
          :type="inputType"
          on-click="togglepassword"
          placeholder="请输入8-16位密码"
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
          placeholder="请确认登录密码"
          v-model="cpassword"
          size="large"
        />
      </div>
      <div style="margin-top: 2vh">
        <Input prefix="ios-keypad" placeholder="请输入推荐码" v-model="refer" size="large" />
      </div>
      <div class="buttonView">
        <Button class="btn" size="large" long @click="addAccount">注册</Button>
      </div>
    </div>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navbar from "@/components/shared/navbar";
export default {
  name: "AddAccount",
  components: {
    navbar: navbar
  },
  data() {
    return {
      userName: "",
      password: "",
      cpassword: "",
      refer: "",
      passErrMessage: "",
      //show and hide password
      inputType: "password",
      eyeIcon: "md-eye"
    };
  },
  computed: {
    ...mapGetters({
      userData: "userData",
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userUID: "getUserUID",
      userPhone: "getUserPhone"
    })
  },
  methods: {
    ...mapActions({
      addAdditionalAccount: "addAdditionalAccount",
      toggelLoader: "toggelLoader"
    }),
    addAccount() {
      let that = this;
      if (!that.isValid(that.userName)) {
        this.$Message.error({
          background: true,
          content: "无效用户名"
        });
      } else if (!that.isValid(that.password)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      }  else if (!that.passErrMessage == "") {
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
          token: that.userToken,
          username: that.userName,
          password: that.password,
          refer: that.refer
        };
        that
          .addAdditionalAccount(data)
          .then(res => {
            that.toggelLoader();
            this.$Message.success({
              background: true,
              content: ""
            });
            setTimeout(function() {
              that.$router.go(-1);
            }, 500);
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
    togglepassword() {
      let that = this;
      if (that.inputType == "password") {
        that.inputType = "text";
        that.eyeIcon = "md-eye-off";
      } else {
        that.inputType = "password";
        that.eyeIcon = "md-eye";
      }
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
  }
};
</script>

<style scoped>
.accountPage {
  width: 100%;
  height: 100%;
  background-size: cover;
}
.topSection {
  width: 100%;
  padding: 2vh 10%;
  opacity: 1;
}
.topBox {
  width: 100%;
  padding: 2vh 5%;
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
.form {
  background: rgba(255, 255, 255, 1);
  padding: 2% 10%;
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
.Errmsg {
  text-align: left;
  margin-top: 1vh;
  color: red;
}
</style>