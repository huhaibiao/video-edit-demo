<!--
 * @Author: huhaibiao
 * @Date: 2023-04-24 16:32:14
-->
<script lang="ts" setup>
import { getFirstFrame, ffmpegSliceVideo } from '../module/useFfmpeg'
import { store, videoList, videoSelected } from '../store'
import { formatTime } from '../utils/string'

const sliceClick = async () => {
  const selectItem = videoList[videoSelected.value]

  const resArr = await ffmpegSliceVideo(
    selectItem.videoUrl!,
    selectItem.fileName!,
    formatTime(selectItem.duration! / 2, true)
  )

  for (let index = 0; index < resArr.length; index++) {
    const item = resArr[index]
    const fileName = `video${store.id++}`
    const { url: coverUrl, videoInfo } = await getFirstFrame(item, fileName)
    videoList.push({
      videoUrl: item,
      coverUrl,
      fileName,
      videoInfo
    })
  }
}
</script>

<template>
  <el-button @click="sliceClick" type="primary">
    {{ '视频剪切' }}
  </el-button>
</template>
