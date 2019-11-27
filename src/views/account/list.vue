<template>
  <section class="accountPage">
    <navbar showBack="'true'" title="切换账号" />
    <div class="topSection">
      <div class="topBox">
        <h4 class="topBoxTitle">号码：</h4>
        <div class="phoneBox">
          <h2>{{userPhone}}</h2>
        </div>
      </div>
    </div>
    <div class="cellGroup" v-for="(uname , i) in userName" :key="i">
      <div class="cellWithArrow" @click="loginAccount(uname)">
        <div class="rowFS">
          <h4 class="cellTitle">用户名:</h4>
          <h2 class="accountName">{{uname}}</h2>
        </div>
        <div class="rowFS">
          <img src="@/assets/me/arrowLeft.png" alt class="cellArrow" />
        </div>
      </div>
      <div class="cellLine"></div>
    </div>
    <div class="buttonView">
      <Button class="btn" size="large" to="/account/add" long>添加账号</Button>
    </div>
    <Modal v-model="loginModel" footer-hide>
      <div style="margin-top: 5vh">
        <Input prefix="ios-contact" readonly v-model="currentUserName" size="large" />
      </div>
      <div style="margin-top: 1vh">
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
      </div>
      <div class="btnRow">
        <Button size="large" type="default" long class="cancelBtn" @click="loginModel = false">取消</Button>
        <Button size="large" type="primary" long class="btn btn1" @click="login">登录</Button>
      </div>
    </Modal>
  </section>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import navbar from "@/components/shared/navbar";
export default {
  name: "AccountsList",
  components: {
    navbar: navbar
  },
  data() {
    return {
      loginModel: false,
      currentUserName: "",
      password: "",
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
      userPhone: "getUserPhone",
      userName: "getUsernameList"
    })
  },
  methods: {
    ...mapActions({
      userNamesList: "userNamesList",
      userLogin: "userLogin",
      toggelLoader: "toggelLoader"
    }),
    loginAccount(acc) {
      let that = this;
      that.currentUserName = acc;
      that.loginModel = true;
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
    },
    login() {
      let that = this;
      if (!that.isValid(that.currentUserName)) {
        this.$Message.error({
          background: true,
          content: "无效用户名"
        });
      } else if (!that.isValid(that.password)) {
        this.$Message.error({
          background: true,
          content: "无效密码"
        });
      } else {
        that.toggelLoader();
        that.loginModel = false;
        let data = {
          password: that.password,
          username: that.currentUserName
        };
        that
          .userLogin(data)
          .then(res => {
            that.toggelLoader();
          })
          .catch(err => {
            that.toggelLoader();
            that.loginModel = true;
            this.$Message.error({
              background: true,
              content: err.message
            });
          });
      }
    }
  },
  mounted() {
    let data = {
      token: this.userToken
    };
    this.userNamesList(data);
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
  background: rgba(247, 247, 247, 1);
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
.cellLine {
  border: 0.8px solid rgba(0, 0, 0, 1);
  opacity: 0.08;
}
.accountName {
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 600;
  line-height: 22px;
  color: rgba(0, 0, 0, 1);
  opacity: 1;
  margin-left: 4px;
}
.buttonView {
  padding: 4vh 10%;
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
.btnRow {
  padding: 2vh 4%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.cancelBtn {
  width: 48%;
}
.btn1 {
  width: 48%;
}
</style>