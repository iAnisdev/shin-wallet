<template>
  <section class="loginPage">
    <navbar showBack="'true'" title="交易密码" />
    <div class="layer" v-if="userData.tpass == 0">
      <div class="form">
        <img src="@/assets/logo.png" class="logo" srcset />
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="number"
            placeholder="请输入6位数字的交易密码"
            v-model="newPassword"
            size="large"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="number"
            placeholder="请确认交易密码"
            v-model="cpassword"
            size="large"
          />
        </div>
        <Button long size="large" type="success" class="recoverBtn" @click="setPassword">确认</Button>
      </div>
    </div>
    <div class="layer" v-if="userData.tpass == 1">
      <div class="form">
        <div class="headerBox">
          <h3 class="tpasswordTitle">已设置交易密码</h3>
          <h4 class="tpasswordSign">* * * * * *</h4>
        </div>
        <div style="margin-top: 2vh">
          <Input prefix="ios-lock" type="number" placeholder="请输入原交易密码" v-model="old" size="large" />
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="number"
            placeholder="请输入新6位数字交易密码"
            v-model="newPassword"
            size="large"
          />
        </div>
        <div style="margin-top: 2vh">
          <Input
            prefix="ios-lock"
            type="number"
            placeholder="请确认新交易密码"
            v-model="cpassword"
            size="large"
          />
        </div>
        <Button long size="large" type="success" class="recoverBtn" @click="updatePassword">更改</Button>
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
      old: "",
      newPassword: "",
      cpassword: ""
    };
  },
  computed: {
    ...mapGetters({
      userData: "userData",
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken"
    })
  },
  methods: {
    ...mapActions({
      changeTPassword: "changeTPassword",
      toggelLoader: "toggelLoader"
    }),
    updatePassword() {
      let that = this;
      if (!that.isValid(that.old)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (!that.isValid(that.newPassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (!that.isValid(that.cpassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (that.newPassword !== that.cpassword) {
        this.$Message.error({
          background: true,
          content: "密码不匹配"
        });
      } else {
        let data = {
          token: that.userToken,
          old: that.old,
          new: that.newPassword
        };
        that.toggelLoader();
        that
          .changeTPassword(data)
          .then(res => {
            console.log(res);
            this.$Message.success({
              background: true,
              content: "更新密码"
            });
            that.$router.push("/me");
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
    setPassword() {
      let that = this;
      if (!that.isValid(that.newPassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (!that.isValid(that.cpassword)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else if (that.newPassword !== that.cpassword) {
        this.$Message.error({
          background: true,
          content: "密码不匹配"
        });
      } else {
        that.toggelLoader();
        let data = {
          token: that.userToken,
          new: that.newPassword
        };
        that
          .changeTPassword(data)
          .then(res => {
            console.log(res);
            this.$Message.success({
              background: true
            });
            that.$router.push("/me");
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
    }
  },
  watch: {
    newPassword(newVal) {
      let that = this;
      if (newVal) {
        let length = newVal.length;
        if (length <= 6) {
          return;
        } else {
          this.$Message.error({
            background: true,
            content: "请输入6位数字的交易密码"
          });
          that.newPassword = newVal.substring(0, 6);
          return (newVal = newVal.substring(0, 6));
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
  /* background-image: url("~@/assets/bg.jpeg"); */
  background-size: cover;
}
.layer {
  width: 100%;
  height: 80%;
  background: rgba(255, 255, 255, 1);
  /* opacity: 0.8; */
  padding: 5vh 1vw 2vh;
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
.recoverBtn {
  background: rgba(58, 51, 140, 1);
  font-size: 14px;
  font-family: PingFang SC;
  font-weight: 400;
  line-height: 36px;
  color: rgba(255, 255, 255, 1);
  opacity: 1;
  margin-top: 2vh;
}
.headerBox {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
  opacity: 1;
  border-radius: 12px;
  padding: 5vh 1vw 2vh;
  margin-bottom: 5vh;
}
.tpasswordTitle {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  line-height: 17px;
  color: rgba(0, 0, 0, 1);
  opacity: 0.8;
}
.tpasswordSign {
  font-size: 28px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 40px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
  margin-top: 2vh;
}
</style>