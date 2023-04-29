<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-22 22:21:54
-->
<script setup lang="ts">
import { videoList, videoSelected } from '../store'

const videoDom = ref<HTMLVideoElement | null>(null)

onMounted(() => {
  videoDom.value!.addEventListener('loadeddata', () => {
    videoList[videoSelected.value].duration = videoDom.value!.duration
  })
  videoDom.value!.addEventListener('pause', () => {
    videoList[videoSelected.value].playStatus = false
  })
})
watch(
  () => videoList.length,
  newV => {
    videoSelected.value = newV - 1
  }
)

watch(
  () => videoList[videoSelected.value]?.playStatus,
  newV => {
    if (newV) {
      videoDom.value!.play()
    } else {
      videoDom.value!.pause()
    }
  }
)
</script>

<template>
  <div
    v-if="!videoList[videoSelected]"
    style="
      position: absolute;
      right: 0;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
    "
  >
    视频显示区, 待上传视频
  </div>

  <video
    id="video"
    ref="videoDom"
    crossOrigin="anonymous"
    :src="videoList[videoSelected]?.videoUrl"
    style="padding: 3px; width: 100%; height: 100%"
  ></video>
</template>
