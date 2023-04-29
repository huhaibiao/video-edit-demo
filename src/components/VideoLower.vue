<!--
 * @Author: huhaibiao
 * @Date: 2023-04-24 16:32:14
-->
<script lang="ts" setup>
import { videoLower, getFirstFrame } from '../module/useFfmpeg'
import { store, videoList, videoSelected } from '../store'

const addTextClick = async () => {
  const fileName = `video${store.id++}`
  const selectItem = videoList[videoSelected.value]

  const videoUrl = await videoLower(selectItem.videoUrl!, selectItem.fileName!)
  const { url: coverUrl, videoInfo } = await getFirstFrame(videoUrl, fileName)
  videoList.push({
    videoUrl,
    coverUrl,
    fileName,
    videoInfo
  })
}
</script>

<template>
  <el-button @click="addTextClick" type="primary">
    {{ '➖视频质量' }}
  </el-button>
</template>
