<!--
 * @Author: huhaibiao
 * @Date: 2023-04-24 16:32:14
-->
<script lang="ts" setup>
import { addText, getFirstFrame } from '../module/useFfmpeg'
import { store, videoList, videoSelected, fontList } from '../store'
import { btnsStatus } from '../store/ui-status'

const addTextClick = async (textV: string, timeT: number[]) => {
  let fileName, selectItem, videoUrl, coverUrl, videoInfo
  try {
    fileName = `video${store.id++}`
    selectItem = videoList[videoSelected.value]
    videoUrl = await addText(
      selectItem.videoUrl!,
      selectItem.fileName!,
      textV,
      ...timeT
    )
    const tmp = await getFirstFrame(videoUrl, fileName)
    videoInfo = tmp.videoInfo
    coverUrl = tmp.url
  } catch (error) {
    return
  }
  videoList.push({ videoUrl, coverUrl, fileName, videoInfo })
}

// const emit = defineEmits(['close'])
const value = ref([0, 100])
const marks = computed(() => {
  return {
    0: '0s',
    100: `${videoList[videoSelected.value]?.duration || 100}s`
  }
})

const textValue = ref('hello world!')

const formatTip = (value: any) => {
  return (value * videoList[videoSelected.value]?.duration!) / 100 + 's'
}

const confirm = () => {
  if (fontList.length === 0) return alert('请先上传字体文件')
  // emit('close')
  btnsStatus.addText = false
  const tmpA = value.value.map(
    (item: number) => (item * videoList[videoSelected.value]?.duration!) / 100
  )
  addTextClick(textValue.value, tmpA)
}
</script>

<template>
  <el-dialog v-model="btnsStatus.addText" title="设置文字" width="50%">
    视频文字：<el-input v-model="textValue" placeholder="请输入视频文字" />
    文字时间：<el-slider
      v-model="value"
      range
      :marks="marks"
      :format-tooltip="formatTip"
    />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="btnsStatus.addText = false">取消</el-button>
        <el-button type="primary" @click="confirm"> 确认 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
