<!--
 * @Author: MaLelin
 * @LastEditors: MaLelin
 * @Description: 个人信息编辑
 * @Date: 2019-04-15 12:00:00
 * @LastEditTime: 2019-04-15 12:00:00
 -->
<template>
  <div class="self-manage">
    <!-- 头像编辑弹出框 -->
    <modal
      name="avatarSetting"
      class="c-modal"
      transition="fade"
      height="auto"
      @before-open="beforeModalOpen"
      @opened="onModalOpened"
      @closed="onModalClosed"
    >
      <div class="modal-header">
        <h2 class="modal-title">头像设置</h2>
        <svg-icon
          icon-class="close"
          @click.native="handleModalClose"
        ></svg-icon>
      </div>
      <div class="modal-body">
        <label
          class="click-upload"
          v-if="avatarSettingInfo.isUpload !== 2"
          for="uploads"
        >
          <img
            :src="avatarSettingInfo.accessAvatarUrl"
            width="128px"
            height="128px"
            style="border-radius: 6px;"
            v-if="avatarSettingInfo.accessAvatarUrl"
          />
          <span class="setting-modify" v-if="avatarSettingInfo.accessAvatarUrl"
            >修改头像</span
          >
          <i
            class="el-icon-plus avatar-uploader-icon"
            v-if="!avatarSettingInfo.accessAvatarUrl"
          ></i>
        </label>
        <input
          type="file"
          id="uploads"
          :value="avatarSettingInfo.avatarFile"
          style="position:absolute; left: 99999999px;clip:rect(0 0 0 0);"
          accept="image/png, image/jpeg, image/gif, image/jpg"
          @change="uploadAvatar($event)"
        />
        <div v-if="avatarSettingInfo.isUpload === 2" class="image-adjust">
          <div class="area-adjust">
            <div class="cropper-content">
              <div class="cropper">
                <vue-cropper
                  ref="cropper"
                  :img="avatarSettingInfo.option.img"
                  :outputSize="avatarSettingInfo.option.outputSize"
                  :outputType="avatarSettingInfo.option.outputType"
                  :info="true"
                  :full="avatarSettingInfo.option.full"
                  :autoCrop="avatarSettingInfo.option.autoCrop"
                  :autoCropWidth="avatarSettingInfo.option.autoCropWidth"
                  :autoCropHeight="avatarSettingInfo.option.autoCropHeight"
                  :fixedBox="true"
                  @realTime="realTime"
                ></vue-cropper>
              </div>
            </div>
            <div class="upload-button" @click="finishAndUploadAvatar()">
              上传头像
            </div>
          </div>
          <div class="area-preview">
            <div class="preview">
              <div :style="avatarSettingInfo.previews.div">
                <img
                  :src="avatarSettingInfo.previews.url"
                  :style="avatarSettingInfo.previews.img"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <el-button size="mini" @click.native="handleSave" type="primary"
          >保存</el-button
        >
        <el-button @click.native="handleCancel" size="mini">取消</el-button>
      </div>
    </modal>
    <div class="title-container">
      <span>个人信息</span>
    </div>
    <div class="content-container">
      <div class="self-items">
        <span class="label-key">用户账号：</span>
        <span style="margin-left: 10px;">{{ userInfo.account }}</span>
      </div>
      <div class="self-items">
        <span class="label-key">用户昵称：</span>
        <span style="margin-left: 10px;">
          <el-form
            :model="userInfo"
            :rules="userInfoRules"
            ref="userInfoForm"
            class="userInfo-Form"
          >
            <el-form-item prop="username">
              <el-input
                placeholder="昵称"
                type="text"
                v-model="userInfo.username"
              ></el-input>
            </el-form-item>
          </el-form>
        </span>
        <el-button
          @click="modifyUsername"
          size="mini"
          type="primary"
          style="margin-left: 50px;"
          >修改昵称</el-button
        >
        <el-button
          @click="cancelModifyUsername"
          size="mini"
          style="margin-left: 20px;"
          >还原</el-button
        >
      </div>
      <div class="self-items">
        <span class="label-key">用户角色：</span>
        <span style="margin-left: 10px;">{{ userInfo.role }}</span>
      </div>
      <div class="self-items">
        <span class="label-key" style="position: relative; top: -50px;"
          >用户头像：</span
        >
        <span class="pavatar" style="position: relative;">
          <img
            :src="userInfo.accessAvatarUrl"
            alt=""
            style="height: 128px; width: 128px;"
          />
          <span class="modify" @click="handleModifyAvatar">修改头像</span>
        </span>
      </div>
      <div class="self-items">
        <span class="label-key">创建时间：</span>
        <span style="margin-left: 10px;">{{ userInfo.createTime }}</span>
      </div>
      <div class="self-items">
        <span class="label-key">最后登录时间：</span>
        <span style="margin-left: 10px;">{{ userInfo.lastLoginTime }}</span>
      </div>
    </div>
    <div class="title-container">
      <span>密码修改</span>
    </div>
    <div class="content-container">
      <el-form
        :model="passwordInfo"
        :rules="passwordInfoRules"
        ref="passwordInfoForm"
        class="passwordInfo-Form"
      >
        <div class="self-items">
          <span class="label-key">旧密码：</span>
          <span style="margin-left: 10px;">
            <el-form-item prop="passwordOld">
              <el-input
                placeholder="请输入原始密码"
                v-model="passwordInfo.passwordOld"
                show-password
              ></el-input>
            </el-form-item>
          </span>
        </div>
        <div class="self-items">
          <span class="label-key">新密码：</span>
          <span style="margin-left: 10px;">
            <el-form-item prop="passwordNew">
              <el-input
                placeholder="请输入新密码"
                v-model="passwordInfo.passwordNew"
                show-password
              ></el-input>
            </el-form-item>
          </span>
        </div>
        <div class="self-items">
          <span class="label-key">密码确认：</span>
          <span style="margin-left: 10px;">
            <el-form-item prop="passwordNewVeri">
              <el-input
                placeholder="请再次输入新密码"
                v-model="passwordInfo.passwordNewVeri"
                show-password
              ></el-input>
            </el-form-item>
          </span>
        </div>
      </el-form>
      <span style="width: 320px; margin-left: 170px;">
        <el-button
          @click="modifyPassword"
          size="medium"
          type="primary"
          style="width: 100%;"
          >修改密码</el-button
        >
      </span>
      <el-button @click="clearPassword" size="medium" style="margin-left: 20px;"
        >清空</el-button
      >
    </div>
  </div>
</template>

<script>
import { getUserInfo, updateUserInfo } from "@/api/user";
import { uploadImg } from "@/api/file";
import { VueCropper } from "vue-cropper";
export default {
  name: "SelfInfoModify",
  components: { VueCropper },
  props: {},
  data() {
    /**
     * @description 昵称校验器
     */
    var validateUsername = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("昵称不能为空"));
      } else {
        if (value.replace(/[\u0391-\uFFE5]/g, "aa").length > 18) {
          callback(new Error("昵称长度不超过9位"));
        } else {
          callback();
        }
      }
    };
    /**
     * @description 密码校验器
     */
    var validatePassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
      if (value.length < 6 || value.length > 18) {
        callback(new Error("密码6~18位"));
      }
      callback();
    };
    /**
     * @description 确认密码校验器
     */
    var validatePasswordVeri = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      }
      if (value !== this.passwordInfo.passwordNew) {
        callback(new Error("两次输入密码不一致!"));
      }
      callback();
    };
    return {
      //用户基本信息
      userInfo: {
        uid: "",
        username: "",
        account: "",
        role: "",
        accessAvatarUrl: "",
        saveAvatarUrl: "",
        uploadId: "",
        createTime: "",
        lastLoginTime: ""
      },
      //用户密码信息
      passwordInfo: {
        passwordOld: "",
        passwordNew: "",
        passwordNewVeri: ""
      },
      //用户信息校验规则
      userInfoRules: {
        username: [{ validator: validateUsername, trigger: "change" }]
      },
      //密码信息校验规则
      passwordInfoRules: {
        passwordOld: [{ validator: validatePassword, trigger: "blur" }],
        passwordNew: [{ validator: validatePassword, trigger: "blur" }],
        passwordNewVeri: [
          { validator: validatePasswordVeri, trigger: "change" }
        ]
      },
      //头像设置信息
      avatarSettingInfo: {
        uploadId: "",
        accessAvatarUrl: "",
        saveAvatarUrl: "",
        isUpload: 1, //1未上传  2正在上传  3已上传
        avatarFile: "",
        avatarName: "",
        previews: {},
        option: {
          img: "",
          outputSize: 1,
          full: true,
          outputType: "png",
          canMove: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 128,
          autoCropHeight: 128
        }
      }
    };
  },
  computed: {},
  watch: {},
  methods: {
    /**
     * @description 清空密码
     */
    clearPassword() {
      this.passwordInfo.passwordOld = "";
      this.passwordInfo.passwordNew = "";
      this.passwordInfo.passwordNewVeri = "";
      this.$refs.passwordInfoForm.resetFields();
    },
    /**
     * @description 修改密码
     */
    modifyPassword() {
      let isSuccessPromise = this.$refs.passwordInfoForm.validate();
      isSuccessPromise.then(() => {
        let data = {
          oldPassword: this.passwordInfo.passwordOld,
          newPassword: this.passwordInfo.passwordNew
        };
        updateUserInfo(data)
          .then(res => {
            if (res.status === 200) {
              this.$refs.passwordInfoForm.resetFields();
              this.$message({
                type: "success",
                message: "修改成功"
              });
              getUserInfo()
                .then(res => {
                  if (res.status === 200) {
                    this.userInfo.uid = res.data.uid;
                    this.userInfo.username = res.data.username;
                    this.userInfo.account = res.data.account;
                    if (this.userInfo.role === 1) {
                      this.userInfo.role = "管理员";
                    } else {
                      this.userInfo.role = "普通用户";
                    }
                    this.userInfo.createTime = res.data.applyTime;
                    this.userInfo.lastLoginTime = res.data.lastTime;
                    this.userInfo.accessAvatarUrl = res.data.avatar;
                  } else {
                    this.$message({
                      type: "warning",
                      message: res.msg
                    });
                  }
                })
                .catch(err => console.log(err));
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
            }
          })
          .catch(err => console.log(err));
      });
    },
    /**
     * @description 修改昵称
     */
    modifyUsername() {
      let isSuccessPromise = this.$refs.userInfoForm.validate();
      isSuccessPromise.then(() => {
        let data = {
          username: this.userInfo.username
        };
        updateUserInfo(data)
          .then(res => {
            if (res.status === 200) {
              this.$refs.userInfoForm.resetFields();
              this.$message({
                type: "success",
                message: "修改成功"
              });
              getUserInfo()
                .then(res => {
                  if (res.status === 200) {
                    this.userInfo.uid = res.data.uid;
                    this.userInfo.username = res.data.username;
                    this.userInfo.account = res.data.account;
                    if (this.userInfo.role === 1) {
                      this.userInfo.role = "管理员";
                    } else {
                      this.userInfo.role = "普通用户";
                    }
                    this.userInfo.createTime = res.data.applyTime;
                    this.userInfo.lastLoginTime = res.data.lastTime;
                    this.userInfo.accessAvatarUrl = res.data.avatar;
                  } else {
                    this.$message({
                      type: "warning",
                      message: res.msg
                    });
                  }
                })
                .catch(err => console.log(err));
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
            }
          })
          .catch(err => console.log(err));
      });
    },
    /**
     * @description 取消修改昵称
     */
    cancelModifyUsername() {
      this.$refs.userInfoForm.resetFields();
      getUserInfo()
        .then(res => {
          if (res.status === 200) {
            this.userInfo.uid = res.data.uid;
            this.userInfo.username = res.data.username;
            this.userInfo.account = res.data.account;
            if (this.userInfo.role === 1) {
              this.userInfo.role = "管理员";
            } else {
              this.userInfo.role = "普通用户";
            }
            this.userInfo.createTime = res.data.applyTime;
            this.userInfo.lastLoginTime = res.data.lastTime;
            this.userInfo.accessAvatarUrl = res.data.avatar;
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        })
        .catch(err => console.log(err));
    },
    /**
     * @description modal打开之前,获取数据
     */
    beforeModalOpen() {},
    /**
     * @description modal打开之后
     */
    onModalOpened() {},
    /**
     * @description modal关闭之前
     */
    onModalClosed() {
      this.avatarSettingInfo = {
        uploadId: "",
        accessAvatarUrl: "",
        saveAvatarUrl: "",
        isUpload: 1, //1未上传  2正在上传  3已上传
        avatarFile: "",
        avatarName: "",
        previews: {},
        option: {
          img: "",
          outputSize: 1,
          full: true,
          outputType: "png",
          canMove: true,
          original: false,
          canMoveBox: true,
          autoCrop: true,
          autoCropWidth: 128,
          autoCropHeight: 128
        }
      };
      getUserInfo()
        .then(res => {
          if (res.status === 200) {
            this.userInfo.uid = res.data.uid;
            this.userInfo.username = res.data.username;
            this.userInfo.account = res.data.account;
            if (this.userInfo.role === 1) {
              this.userInfo.role = "管理员";
            } else {
              this.userInfo.role = "普通用户";
            }
            this.userInfo.createTime = res.data.applyTime;
            this.userInfo.lastLoginTime = res.data.lastTime;
            this.userInfo.accessAvatarUrl = res.data.avatar;
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        })
        .catch(err => console.log(err));
    },
    /**
     * @description 关闭modal
     */
    handleModalClose() {
      this.$modal.hide("avatarSetting");
    },
    /**
     * @description 设置弹窗确认保存按钮
     */
    handleSave() {
      if (!this.avatarSettingInfo.saveAvatarUrl) {
        this.$message({
          type: "warning",
          message: "请选择图片"
        });
        return;
      }
      let data = {
        avatarUrl: this.avatarSettingInfo.saveAvatarUrl,
        uploadId: this.avatarSettingInfo.uploadId
      };
      updateUserInfo(data)
        .then(res => {
          if (res.status === 200) {
            this.$modal.hide("avatarSetting");
            this.$message({
              type: "success",
              message: "修改成功"
            });
          } else {
            this.$message({
              type: "warning",
              message: res.msg
            });
          }
        })
        .catch(err => console.log(err));
    },
    /**
     * @description 设置弹窗取消按钮
     */
    handleCancel() {
      this.$modal.hide("avatarSetting");
    },
    /**
     * @description 设置头像
     */
    handleModifyAvatar() {
      this.$modal.show("avatarSetting");
    },
    /**
     * @description 上传图片到缓冲区
     */
    uploadAvatar(e) {
      console.log("ok");
      let file = e.target.files[0];
      this.avatarSettingInfo.avatarName = file.name;
      if (!/\.(jpg|jpeg|png|bmp|JPG|PNG)$/.test(e.target.value)) {
        alert("图片类型必须是jpeg,jpg,png,bmp中的一种");
        return false;
      }
      let reader = new FileReader();
      reader.onload = e => {
        if (typeof e.target.result === "object") {
          this.avatarSettingInfo.option.img = window.URL.createObjectURL(
            new Blob([e.target.result])
          );
        } else {
          this.avatarSettingInfo.option.img = e.target.result;
        }
      };
      reader.readAsArrayBuffer(file);
      this.avatarSettingInfo.isUpload = 2;
    },
    /**
     * @description 预览图片
     */
    realTime(data) {
      this.avatarSettingInfo.previews = data;
    },
    /**
     * @description 完成裁剪并上传图片
     */
    finishAndUploadAvatar() {
      let formData = new FormData();
      this.$refs.cropper.getCropBlob(data => {
        formData.append("avatar", data, this.avatarSettingInfo.avatarName);
        uploadImg(formData)
          .then(res => {
            if (res.status === 200) {
              this.avatarSettingInfo.uploadId = res.data.uploadId;
              this.avatarSettingInfo.accessAvatarUrl = res.data.accessUrl;
              this.avatarSettingInfo.saveAvatarUrl = res.data.saveUrl;
            } else {
              this.$message({
                type: "warning",
                message: res.msg
              });
            }
          })
          .catch(err => console.log(err));
      });
      this.avatarSettingInfo.isUpload = 3;
    }
  },
  created() {
    getUserInfo()
      .then(res => {
        if (res.status === 200) {
          this.userInfo.uid = res.data.uid;
          this.userInfo.username = res.data.username;
          this.userInfo.account = res.data.account;
          if (res.data.role === 1) {
            this.userInfo.role = "管理员";
          } else {
            this.userInfo.role = "普通用户";
          }
          this.userInfo.createTime = res.data.applyTime;
          this.userInfo.lastLoginTime = res.data.lastTime;
          this.userInfo.accessAvatarUrl = res.data.avatar;
        } else {
          this.$message({
            type: "warning",
            message: res.msg
          });
        }
      })
      .catch(err => console.log(err));
  },
  mounted() {}
};
</script>

<style lang="stylus" scoped>
.self-manage {
  display: flex;
  flex-direction: column;
  padding: 15px 15px 0;
  background-color: #fff;
  line-height: 1;

  .c-modal {
    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 10px;
      padding: 0 20px;
      border: 1px solid #ccc;
      line-height: 40px;
    }

    .modal-body {
      width: 700px;
      overflow: hidden;

      .click-upload {
        margin-left: 40px;
        margin-bottom: 10px;
        display: block;
        cursor: pointer;
        width: 128px;
        height: 128px;
        position: relative;

        &:hover {
          .avatar-uploader-icon {
            border-color: #409EFF;
          }

          .setting-modify {
            display: block;
          }
        }

        .setting-modify {
          cursor: pointer;
          position: absolute;
          display: none;
          height: 100%;
          width: 100%;
          text-align: center;
          line-height: 128px;
          background-color: rgba(0, 0, 0, 0.5);
          color: #fff;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
        }

        .avatar-uploader-icon {
          font-size: 28px;
          color: #8c939d;
          border: 1px dashed #d9d9d9;
          border-radius: 6px;
          width: 128px;
          height: 128px;
          line-height: 128px;
          text-align: center;
        }
      }

      .image-adjust {
        display: block;
        margin-left: 40px;
        width: 500px;
        height: 256px;

        .area-adjust {
          float: left;
          width: 220px;
          height: 230px;

          .cropper-content {
            display: flex;
            display: -webkit-flex;
            justify-content: flex-end;
            -webkit-justify-content: flex-end;

            .cropper {
              width: 220px;
              height: 200px;
            }
          }

          .upload-button {
            margin: 0 10px;
            height: 25px;
            line-height: 25px;
            text-align: center;
            background-color: #f1847a;
            border-radius: 5px;
            margin-top: 10px;
            color: #ffffff;
            cursor: pointer;
          }
        }

        .area-preview {
          float: left;
          width: 220px;
          height: 230px;
          background-color: #ffffff;
          box-shadow: 1px 1px 1px 1px #cacaca;
          margin-left: 30px;
          margin-top: 3px;

          .preview {
            width: 128px;
            height: 128px;
            margin-top: 46px;
            margin-left: 46px;
            border-radius: 4px;
            overflow: hidden;

            .preview-src {
              width: 84px;
              height: 84px;
            }
          }
        }
      }
    }

    .modal-footer {
      display: flex;
      justify-content: flex-end;
      padding: 20px 20px 20px 0;
    }

    .svg-icon {
      &:hover {
        color: #409EFF;
        cursor: pointer;
      }
    }
  }

  .title-container {
    border-bottom: 1px solid #cccccc;
    padding-bottom: 5px;

    span {
      font-size: 24px;
    }
  }

  .content-container {
    padding-top: 30px;
    padding-bottom: 50px;

    .self-items {
      padding-left: 100px;
      margin-top: 15px;

      span {
        font-size: 16px;
      }

      .label-key {
        width: 150px;
        text-align: right;
      }
    }
  }
}

.pavatar {
  .modify {
    cursor: pointer;
    position: absolute;
    display: none;
    height: 100%;
    width: 100%;
    text-align: center;
    line-height: 128px;
    background-color: rgba(0, 0, 0, 0.5);
    color: #fff;
    top: 0;
  }

  &:hover {
    .modify {
      display: block;
    }
  }
}
</style>
