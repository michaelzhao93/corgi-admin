<template>
  <div class="login-container">
    <el-form ref="matchdata" :model="matchdata" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h5 class="title">计算公式</h5>
      </div>

        <h4 class="title">角色</h4>

      <el-form-item prop="role_factor">
        <el-input
          ref="role_factor"
          v-model="matchdata.role_factor"
          name="role_factor"
          type="number"
          tabindex="1"
          auto-complete="off"
        />
        %
      </el-form-item>
        <h6 class="title">身材【当前用户】*身材【目标用户】</h6>

      <el-form-item prop="prefer_factor">
        <el-input
          ref="prefer_factor"
          v-model="matchdata.prefer_factor"
          name="prefer_factor"
          type="number"
          tabindex="1"
          auto-complete="off"
        />
                %

      </el-form-item>
              <h4 class="title">星座</h4>

      <el-form-item prop="con_factor">
        <el-input
          ref="con_factor"
          v-model="matchdata.con_factor"
          name="con_factor"
          type="number"
          tabindex="1"
          auto-complete="off"
        />
                %

      </el-form-item>
              <h4 class="title">基型【性格因子】</h4>

      <el-form-item prop="chara_factor">
        <el-input
          ref="chara_factor"
          v-model="matchdata.chara_factor"
          name="chara_factor"
          type="number"
          tabindex="1"
          auto-complete="off"
        />
                %

      </el-form-item>
              <h4 class="title">基型【兴趣因子】</h4>

      <el-form-item prop="int_factor">
        <el-input
          ref="int_factor"
          v-model="matchdata.int_factor"
          name="int_factor"
          type="number"
          tabindex="1"
          auto-complete="off"
        />
                %

      </el-form-item> 
      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">保存</el-button>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { get_match_factor } from '@/api/matchMgr'
import { get_match_ratio } from '@/api/matchMgr'
import { set_match_ratio } from '@/api/matchMgr'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      // if (!validUsername(value)) {
      //   callback(new Error('请输入有效用户名'))
      // } else {
      //   callback()
      // }
      if (!value) {
        callback(new Error('请输入比例'))
      }
      callback()
    }
    return {
      matchdata: {
        role_factor: 0,
        prefer_factor: 0,
        con_factor: 0,
        chara_factor: 0,
        int_factor: 0
      },
      loginRules: {
        role_factor: [{ required: true, trigger: 'blur', validator: validateUsername }],
        con_factor: [{ required: true, trigger: 'blur', validator: validateUsername }],
        prefer_factor: [{ required: true, trigger: 'blur', validator: validateUsername }],
        int_factor: [{ required: true, trigger: 'blur', validator: validateUsername }],
        chara_factor: [{ required: true, trigger: 'blur', validator: validateUsername }]
      },
      loading: false,
      redirect: undefined
    }
  },
  watch: {
    $route: { 
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },

    created() {
    this.get_match_ratio()
  },
  methods: {
        async get_match_ratio() {
      try {
        const data = await get_match_ratio()
        this.matchdata.role_factor = data.data.role_factor
        this.matchdata.prefer_factor = data.data.prefer_factor
        this.matchdata.con_factor = data.data.con_factor
        this.matchdata.chara_factor = data.data.chara_factor
        this.matchdata.int_factor = data.data.int_factor
      } catch (err) {
        console.log(err)
      }
    },
        async set_match_ratio() {
      try {
        const data = await set_match_ratio({ ...this.matchdata })
      } catch (err) {
        console.log(err)
      }
    },
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.matchdata.validate(valid => {
        if (valid) {

          if((Number(this.matchdata.role_factor)+
        Number(this.matchdata.prefer_factor)+
        Number(this.matchdata.con_factor) +
        Number(this.matchdata.chara_factor)+
        Number(this.matchdata.int_factor))!=100)
        {
                    this.$message({ type: 'warning', message: '总和不为100' })
          return false

        }
          this.loading = true
          this.set_match_ratio()
          this.loading = false
          this.$message({ type: 'success', message: '修改成功' })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#283443;
$cursor: #283443;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #283443;
  }
}
</style>

<style lang="scss" scoped>
$bg:rgba(255, 255, 255,1);
$dark_gray:#889aa4;
$light_gray:#454545;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 280px;
    max-width: 100%;
    padding: 40px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $light_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $light_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
