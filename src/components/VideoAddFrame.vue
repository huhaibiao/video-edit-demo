<!--
 * @Author: huhaibiao
 * @Date: 2023-04-24 16:32:14
-->
<script lang="ts" setup>
import { gVideoFrame } from '../module/useFfmpeg'
import { videoList, videoSelected } from '../store'
import { interval } from '../utils/string'

const btnClick = async () => {
  const selectedVideo = videoList[videoSelected.value]
  let tmp
  // selectedVideo.frameList = []
  try {
    tmp = await gVideoFrame(
      selectedVideo.videoUrl!,
      interval(selectedVideo.duration),
      selectedVideo.fileName
    )
  } catch (error) {
    return
  }

  selectedVideo.frameList = tmp
}
</script>

<template>
  <el-button @click="btnClick" type="primary"> {{ '视频取帧' }} </el-button>
</template>
