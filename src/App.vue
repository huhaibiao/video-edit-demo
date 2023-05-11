<!--
 * @Author: huhaibiao 
 * @Date: 2023-04-21 22:11:20
-->
<script setup lang="ts">
import TimeTrack from './components/bottom-tracks/TimeTrack.vue'
import BottomItem from './components/BottomItem.vue'
import ControlComponent from './components/ControlComponent.vue'
import VideoComponent from './components/VideoComponent.vue'
import {
  ffmpegCoreLoaded,
  imageList,
  processData,
  subtitleList,
  videoList,
  videoSelected
} from './store'
const videoInfo = computed(() => {
  return videoList[videoSelected.value]
})
const frameList = computed(() => {
  return videoList[videoSelected.value]?.frameList || []
})
</script>
<template>
  <div class="app-title">
    <span>视频编辑器</span>
    <div class="progressContain">
      <div class="progress" :style="{ width: processData * 100 + '%' }"></div>
    </div>
  </div>
  <div class="video-edit" v-loading="!ffmpegCoreLoaded">
    <div class="top">
      <!-- //上左-视频区域 -->
      <div class="top-left video">
        <VideoComponent></VideoComponent>
      </div>

      <!-- //上右-功能区域 -->
      <div class="top-right control">
        <ControlComponent></ControlComponent>
      </div>
    </div>

    <!-- //下-轨道区域 -->
    <div class="bottom tracks">
      <TimeTrack
        v-if="videoList[videoSelected]"
        :duration="videoInfo.duration"
      ></TimeTrack>

      <div class="bottom-content">
        <BottomItem
          title="视频帧"
          content-component="image"
          :data="frameList"
          style="margin: 0 8px; margin-top: 8px"
        >
          <span style="margin: auto">请点击「视频取帧」按钮, 进行视频解帧</span>
        </BottomItem>

        <BottomItem
          title="贴图"
          content-component="chartlet"
          :data="imageList"
          style="margin: 0 8px; margin-top: 8px"
          ><span style="margin: auto">请点击「上传贴图」按钮</span></BottomItem
        >

        <BottomItem
          title="字幕"
          content-component="text"
          :data="subtitleList"
          style="margin: 0 8px; margin-top: 8px; height: 70px"
        >
          <span style="margin: auto">请点击「上传字幕」按钮</span>
        </BottomItem>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.video-edit {
  padding: 0 10px;
  height: calc(100% - 30px);
  display: flex;
  flex-direction: column;
  .top {
    display: flex;
    border: 0;
    margin: 0;
    padding: 0;
    height: 320px;
    > div {
      display: block;
      border: 1px solid #e8e1e1;
      margin: 10px;
      border-radius: 6px;
    }
  }
  .top-left,
  .top-right {
    flex: 1;
    min-width: 40vw;
    height: 300px;
    background-color: #fff;
    position: relative;
  }
  .bottom {
    flex: 1;
    flex-grow: 1;
    min-width: 80vw;
    border: 1px solid #e8e1e1;
    border-radius: 6px;
    margin: 10px;
    margin-bottom: 20px;
    margin-top: 0;
    position: relative;
    padding: 10px 0;
    background-color: #fff;
  }
  .bottom-content {
    height: 100%;
    overflow-y: auto;
    overflow: hidden;
  }
}

.app-title {
  padding: 0 20px;
  margin-top: 6px;
  min-height: 30px;
  overflow: auto;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  span {
    background-size: auto 30px;
    text-align: left;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    display: block;
    font-size: 22px;
    font-weight: 500;
    color: #333;
  }
  .progressContain {
    width: 500px;
    height: 6px;
    border-radius: 4px;
    border: 0.5px rgba(37, 122, 219, 0.621) solid;
    background-color: white;
    overflow: hidden;
    .progress {
      height: 100%;
      width: 0;
      background-color: rgb(37, 121, 219);
    }
  }
}
</style>
