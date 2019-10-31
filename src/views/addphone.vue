<template>
  <section class="phonePage">
    <navbar showBack="'true'" title="添加手机号" />
    <div class="content">
      <Card :bordered="false">
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
              <Button @click="sendCode">添加手机号</Button>
            </span>
          </Input>
        </div>
        <div style="margin-top: 3vh">
          <Button
            long
            size="large"
            type="success"
            class="recoverBtn"
            @click="addPhoneNumber"
          >增加电话号码</Button>
        </div>
      </Card>
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
      smsverify: ""
    };
  },
  computed: {
    ...mapGetters({
      isLoggedIn: "getLoginStatus",
      userToken: "getUserToken",
      userData: "userData"
    })
  },
  methods: {
    ...mapActions({
      sendSMSCode: "sendSMSCode",
      toggelLoader: "toggelLoader",
      addNewPhoneNumber: "addNewPhoneNumber"
    }),
    sendCode() {
      let that = this;
      if (that.isValid(that.phone)) {
        that.toggelLoader();
        let data = {
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
    addPhoneNumber() {
      let that = this;
      if (!that.isValid(that.phone)) {
        this.$Message.error({
          background: true,
          content: "无效电话号码"
        });
      } else if (!that.isValid(that.smsCode)) {
        this.$Message.error({
          background: true,
          content: "无效验证码"
        });
      } else {
          that.toggelLoader()
        let data = {
          token: that.userToken,
          phone: that.phone,
          smscode: that.smsCode,
          smsverify: that.smsverify
        };
        that.addNewPhoneNumber(data).then((res) => {
            this.$router.push('/phone')
          that.toggelLoader()
        }).catch((err) => {
          that.toggelLoader()
          this.$Message.error({
          background: true,
          content: err.message
        });
            console.log('err ' , err)
        })
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
  background: rgba(247, 247, 247, 1);
}
.content {
  background: #eee;
  padding: 10px;
  height: 100%;
}
.rowSB {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.rowCenter {
  display: flex;
  flex-direction: row;
  justify-content: center;
  border: 1px solid lightblue;
}
</style>