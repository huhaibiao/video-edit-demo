<!--
 * @Author: huhaibiao
 * @Date: 2023-05-11 15:30:10
-->
<script setup lang="ts">
import VideoAddImage from './VideoAddImage.vue'
import VideoAddSubtitle from './VideoAddSubtitle.vue'
import VideoAddText from './VideoAddText.vue'
import VideoAddFrame from './VideoAddFrame.vue'
import VideoLower from './VideoLower.vue'
import VideoSlice from './VideoSlice.vue'
const emit = defineEmits([
  'selectVideo',
  'upLoadFont',
  'upLoadImage',
  'upLoadSubTitle',
  'downloadVideo',
  'postVideo'
])
</script>

<template>
  <div class="control-btns">
    <el-button @click="emit('selectVideo')">
      {{ '上传视频' }}
    </el-button>
    <el-button @click="emit('upLoadFont')"> {{ '上传字体' }} </el-button>
    <el-button @click="emit('upLoadImage')"> {{ '上传贴图' }} </el-button>
    <el-button @click="emit('upLoadImage')"> {{ '上传字幕' }} </el-button>
    <VideoLower></VideoLower>
    <VideoSlice></VideoSlice>
    <VideoAddFrame></VideoAddFrame>
    <VideoAddText></VideoAddText>
    <VideoAddImage></VideoAddImage>
    <VideoAddSubtitle></VideoAddSubtitle>
    <el-button @click="emit('downloadVideo')" type="primary">
      {{ '下载视频' }}
    </el-button>
    <el-button @click="emit('postVideo')" type="primary">
      {{ '导出视频' }}
    </el-button>
  </div>
</template>

<style lang="less" scoped>
.control-btns {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  > button {
    margin: 1px 6px;
  }
}
</style>

<style>
@media (max-width: 600px) {
  .control-btns > button {
    padding: 6px 8px;
  }
}
</style>
