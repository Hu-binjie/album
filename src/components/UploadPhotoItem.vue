<template>
  <div class="uploadPhotoItem">
    <span class="myProgress" v-show="showProgress">
      <span class="plan" :style="{ width: percent + '%' }"></span>
      {{ percent }}%
    </span>
    <img :src="imgSrc" />
    <span class="pictureName">
      {{ file.name }}
    </span>
  </div>
</template>

<script>
import { apiUpload } from "../api";
export default {
  props: ["file"],
  data() {
    return {
      imgSrc: "",
      percent: 0,
    };
  },
  computed: {
    showProgress() {
      return this.percent > 0 && this.percent < 100;
    },
  },
  created() {
    const render = new FileReader();
    render.onload = () => {
      // base64
      this.imgSrc = render.result;
    };

    render.readAsDataURL(this.file);

    // base64 -> img src
  },
  methods: {
    async upload() {
      // 利用刚刚写好的 api
      const self = this;
      return apiUpload(this.file, {
        onUploadProgress(e) {
          // 当前已经上传的值  总值
          self.percent = Math.floor((e.loaded / e.total) * 100);
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
