<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-22 22:21:54
-->
<script setup lang="ts">
import {
  initVideo,
  writeFontFile,
  writeImage,
  getFirstFrame,
  writeSubTitle,
  urlGetData
} from '../module/useFfmpeg'
import {
  fontList,
  videoList,
  videoSelected,
  imageList,
  store,
  subtitleList
} from '../store'
import VideoAddImage from './VideoAddImage.vue'
import VideoAddSubtitle from './VideoAddSubtitle.vue'
import VideoAddText from './VideoAddText.vue'
import VideoListComponent from './VideoListComponent.vue'
import VideoAddFrame from './VideoAddFrame.vue'
import { formatTime } from '../utils/string'
import VideoLower from './VideoLower.vue'
import VideoSlice from './VideoSlice.vue'
import PostDialog from './PostDialog.vue'

const accept = ref('.mp4')
const videoInput = ref<HTMLInputElement | null>(null)

//点击上传视频
const selectVideo = () => {
  accept.value = '*'
  setTimeout(() => {
    videoInput.value!.click()
  }, 200)
}

//点击上传字体
const upLoadFont = () => {
  accept.value = '*, .ttf'
  setTimeout(() => {
    videoInput.value!.click()
  }, 200)
}

//上传贴图
const upLoadImage = () => {
  accept.value = '*, image/*'
  setTimeout(() => {
    videoInput.value!.click()
  }, 200)
}

//上传字幕
const upLoadSubTitle = () => {
  accept.value = '*, .srt, .ass'
  setTimeout(() => {
    videoInput.value!.click()
  }, 200)
}

//点击下载视频
const downloadVideo = () => {
  const link = document.createElement('a')
  link.href = videoList[videoSelected.value].videoUrl!
  link.download = new Date().toLocaleString() + '.mp4'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

//input上传时处理
const uploadVideo = async (event: any) => {
  const file = event.target.files[0]
  console.log('🚀 ~ file: ControlComponent.vue:98 ~ uploadVideo ~ file:', file)

  //字体文件
  if (accept.value.includes('.ttf')) {
    await writeFontFile(file)
    fontList.push(file.name)
    return
  }

  //字幕文件
  if (accept.value.includes('.ass')) {
    await writeSubTitle(file)
    subtitleList.push(file.name)
    return
  }

  const url = window.webkitURL.createObjectURL(file)

  if (accept.value.includes('image')) {
    await writeImage(file)
    imageList.push({
      url
    })
    return
  }
  //视频
  videoList.push({ videoUrl: '', coverUrl: '' })
  videoInput.value!.value = ''

  //ffmpeg加载视频
  await initVideo(file)
  const fileName = `video${store.id++}`
  const { url: coverUrl, videoInfo } = await getFirstFrame(url, fileName)
  videoList[videoList.length - 1] = {
    videoUrl: url,
    coverUrl,
    fileName,
    videoInfo
  }
}
let video: HTMLVideoElement
onMounted(() => {
  videoInput.value!.addEventListener('change', uploadVideo)
  video = document.getElementById('video') as HTMLVideoElement
})
onBeforeUnmount(() => {
  videoInput.value!.removeEventListener('change', uploadVideo)
})

const playOrPause = () => {
  videoList[videoSelected.value].playStatus =
    !videoList[videoSelected.value].playStatus
}

const fullScreen = () => {
  if (video.requestFullscreen) {
    video.requestFullscreen()
  }
}

const handleClose = (index: number) => {
  fontList.splice(index, 1)
}

const changeVideo = (index: number) => {
  videoList[videoSelected.value].playStatus = false
  videoSelected.value = index
}

const info = computed(() => {
  return JSON.parse(videoList[videoSelected.value]?.videoInfo || 'null')
})

const postDialog = reactive({
  show: false,
  data: {}
})

const postVideo = async () => {
  const blob = await urlGetData(videoList[videoSelected.value].videoUrl!)
  postDialog.data = blob
  postDialog.show = true
}
</script>

<template>
  <div class="control">
    <div class="video-play">
      <div>
        <el-icon :size="20" @click="playOrPause" style="cursor: pointer"
          ><IEpVideoPlay
            v-if="!videoList[videoSelected]?.playStatus" /><IEpVideoPause
            v-else
        /></el-icon>
        <el-icon
          :size="20"
          style="cursor: pointer; margin: 0 10px"
          @click="fullScreen"
          ><IEpFullScreen
        /></el-icon>
      </div>
      {{ info && '时长:' + info?.duration + ' 比特率:' + info?.bitRate }}
      <el-text class="mx-1" style="user-select: none"
        >{{ formatTime(videoList[videoSelected]?.currentSecond || 0) }} /
        {{ formatTime(videoList[videoSelected]?.duration || 0) }}</el-text
      >
    </div>
    <el-divider style="margin: 5px 0" />
    <el-button @click="selectVideo" style="margin: 3px 0 3px 12px">
      {{ '上传视频' }}
    </el-button>
    <el-button @click="upLoadFont"> {{ '上传字体' }} </el-button>
    <el-button @click="upLoadImage"> {{ '上传贴图' }} </el-button>
    <el-button @click="upLoadSubTitle"> {{ '上传字幕' }} </el-button>
    <VideoLower></VideoLower>
    <VideoSlice></VideoSlice>
    <VideoAddFrame></VideoAddFrame>
    <VideoAddText></VideoAddText>
    <VideoAddImage></VideoAddImage>
    <VideoAddSubtitle
      style="margin-bottom: 3px; margin-top: 3px"
    ></VideoAddSubtitle>

    <el-button @click="downloadVideo" type="primary">
      {{ '下载视频' }}
    </el-button>
    <el-button @click="postVideo" type="primary">
      {{ '导出视频' }}
    </el-button>

    <PostDialog
      v-if="postDialog.show"
      :data="postDialog.data"
      @close="postDialog.show = false"
    ></PostDialog>

    <input type="file" v-show="false" ref="videoInput" :accept="accept" />

    <el-divider style="margin: 5px 0" />

    <div class="h-c-list">
      视频：<VideoListComponent
        :list="videoList"
        :selected="videoSelected"
        @switch="changeVideo"
        style="height: 90px; flex: 1"
      ></VideoListComponent>
    </div>
    <div class="h-c-list">
      字体：
      <div class="font-list h-list">
        <el-tag
          v-for="(item, index) of fontList"
          :key="index"
          closable
          :disable-transitions="false"
          @close="handleClose(index)"
        >
          {{ item }}</el-tag
        >
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.control {
  height: 100%;
  padding: 10px;
  overflow-y: auto;
}
.video-play {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 10px;
}
.font-list {
  height: 40px;
  flex: 1;
  display: flex;
  align-items: center;
}

.h-c-list {
  display: flex;
  margin: 10px 0;
  align-items: center;
}
</style>
