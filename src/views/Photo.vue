<template>
  <div>
    <!-- 展示相关 -->
    <div class="container">
      <div class="photoHeader">
        <div class="imgContainer">
          <img class="photoName" src="public/img/1.jpg" />
        </div>
        <div class="btnContainer">
          <span class="photoTitle">相册名称</span>
          <button class="mybtn" @click="showUploadView = true">上传照片</button>
        </div>
      </div>

      <div class="photoContainer">
        <template v-for="item in photos">
          <div class="photoItem" :key="item.id">
            <img :src="item.imgUrl" />
            <span>
              {{ item.name }}
            </span>
          </div>
        </template>
      </div>
    </div>
    <!-- 上传相关 -->
    <UploadView
      :visible.sync="showUploadView"
      @upload-completed="handleUploadCompleted"
    ></UploadView>
  </div>
</template>

<script>
import { apiGetPhotos } from "../api";
import UploadView from "../components/UploadView";
export default {
  components: {
    UploadView,
  },
  data() {
    return {
      photos: [],
      showUploadView: false,
    };
  },
  methods: {
    handleUploadCompleted() {
      this.updatePhotos();
    },

    updatePhotos() {
      apiGetPhotos().then((res) => {
        this.photos = res.data.photos;
      });
    },
  },
  created() {
    this.updatePhotos();
  },
};
</script>

<style lang="scss" scoped></style>
