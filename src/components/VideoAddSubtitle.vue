<!--
 * @Author: huhaibiao
 * @Date: 2023-04-24 16:32:14
-->
<script lang="ts" setup>
import { addSubTitle, getFirstFrame } from '../module/useFfmpeg'
import { store, subtitleList, videoList, videoSelected } from '../store'

const addSubtitleClick = async () => {
  if (subtitleList.length === 0) return alert('请先上传字幕文件')
  const fileName = `video${store.id++}`
  const selectItem = videoList[videoSelected.value]

  const videoUrl = await addSubTitle(selectItem.videoUrl!, selectItem.fileName!)
  const { url: coverUrl, videoInfo } = await getFirstFrame(videoUrl, fileName)
  videoList.push({
    videoUrl,
    coverUrl,
    fileName,
    videoInfo
  })

  // changeVideoListUrl(videoUrl)
}
</script>

<template>
  <el-button @click="addSubtitleClick" type="primary">
    {{ '添加字幕' }}
  </el-button>
</template>
