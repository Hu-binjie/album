<template>
  <div class="masking" v-show="visible">
    <div class="addPhotoContainer"></div>
    <div class="addController">
      <h3 class="addTitle">
        上传照片-普通上传(H5)<span class="close" @click="closeView">╳</span>
      </h3>
      <div class="photoTitles">
        <span class="uploadTo">上传到</span>
        <div class="photoSelect">
          <img class="showPhoto" src="public/img/1.jpg" />
          相册名称
        </div>
      </div>

      <!-- 上传按钮 -->
      <div class="showContainer" v-show="showUploadContainer">
        <div class="uploadContainer">
          <span class="fileinput-button">
            <span>上传图片</span>
            <input
              class="imgFile"
              type="file"
              name=""
              multiple="multiple"
              @input="uploadPhoto"
            />
          </span>
          <span class="hint">
            按住Ctrl可多选
          </span>
        </div>
      </div>

      <!-- 显示待上传图片  -->
      <div class="loadContainer" v-show="showWantUploadContainer">
        <div class="wantUpload">
          <template v-for="(item, index) in wantUploadPhotos">
            <UploadPhotoItem
              ref="uploadPhotoItems"
              :key="index"
              :file="item"
            ></UploadPhotoItem>
          </template>
        </div>
        <div class="addStyle">
          <!-- <span class="fileinput-add">
            <span></span>
            <input class="imgFile-add" type="file" multiple="multiple" />
          </span> -->
        </div>
        <!-- 开始上传按钮 -->
        <div class="bottomStyle">
          <span class="uploadBtn" @click="fetchUpload">开始上传</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UploadPhotoItem from "../components/UploadPhotoItem";
export default {
  props: ["visible"],
  components: {
    UploadPhotoItem,
  },
  data() {
    return {
      wantUploadPhotos: [],
    };
  },
  computed: {
    showUploadContainer() {
      return this.wantUploadPhotos.length === 0;
    },
    showWantUploadContainer() {
      return this.wantUploadPhotos.length > 0;
    },
  },
  methods: {
    async fetchUpload() {
      // 依次上传所有的图片
      console.log(this.$refs.uploadPhotoItems);

      for (const item of this.$refs.uploadPhotoItems) {
        await item.upload();
      }

      // 写上传完成的逻辑
      this.reset();
      // 通知 photo 页面 告诉他我上传完成了
      // 如何写好代码- 》
      // 中层次的代码
      this.uploadCompleted();
    },
    uploadCompleted() {
        // 低层次的代码
      this.$emit("upload-completed");
    },

    reset() {
      this.wantUploadPhotos = [];
    },
    closeView() {
      this.$emit("update:visible", false);
    },
    uploadPhoto(e) {
      this.wantUploadPhotos = Array.from(e.target.files);
    },
  },
};
</script>

<style lang="scss" scoped></style>
