<!--
 * @Author: huhaibiao
 * @Date: 2023-04-24 16:32:14
-->
<script lang="ts" setup>
import { addImage, getFirstFrame } from '../module/useFfmpeg'
import { imageList, store, videoList, videoSelected } from '../store'

const vAddImage = async (timeT: number[]) => {
  const fileName = `video${store.id++}`
  const selectItem = videoList[videoSelected.value]

  const videoUrl = await addImage(
    selectItem.videoUrl!,
    selectItem.fileName!,
    ...timeT
  )
  const { url: coverUrl, videoInfo } = await getFirstFrame(videoUrl, fileName)
  videoList.push({ videoUrl, coverUrl, fileName, videoInfo })
}

const dialogVisible = ref(false)
const value = ref([0, 100])
const marks = computed(() => {
  return {
    0: '0s',
    100: `${videoList[videoSelected.value]?.duration || 100}s`
  }
})

const btnClick = () => {
  dialogVisible.value = true
}

const formatTip = (value: any) => {
  return (value * videoList[videoSelected.value]?.duration!) / 100 + 's'
}

const confirm = () => {
  if (imageList.length === 0) {
    return alert('请先上传贴图')
  }
  dialogVisible.value = false
  const tmpA = value.value.map(
    (item: number) => (item * videoList[videoSelected.value]?.duration!) / 100
  )
  vAddImage(tmpA)
}
</script>

<template>
  <el-button @click="btnClick" type="primary" style="margin-right: 15px">
    {{ '添加贴图' }}
  </el-button>

  <el-dialog v-model="dialogVisible" title="设置贴图出现的时间段" width="50%">
    <el-slider
      v-model="value"
      range
      :marks="marks"
      :format-tooltip="formatTip"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
