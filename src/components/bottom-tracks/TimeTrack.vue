<!--
 * @Author: huhaibiao 
 * @Date: 2023-04-23 14:13:18
-->
<script setup lang="ts">
import { videoList, videoSelected } from '../../store'
import { formatTime, interval } from './../../utils/string.js'
let video: any
let timeline: HTMLElement

onMounted(() => {
  timeline = document.getElementById('timeline')!
  video = document.getElementById('video')

  video.addEventListener('timeupdate', updateScrubber)
  timeline.addEventListener('click', updateVideoTime)
})

const scrubberLeft = ref('0')
// 根据视频时间更新滑块位置
function updateScrubber() {
  const time = video.currentTime
  videoList[videoSelected.value].currentSecond = Math.floor(video.currentTime)
  const duration = video.duration
  let position = (time / duration) * timeline.offsetWidth
  if (time === 0) {
    position = 0
  }
  scrubberLeft.value = `${position}px`
}

// Update video time based on scrubber position
function updateVideoTime(event: MouseEvent) {
  const position = event.clientX - timeline.offsetLeft
  const duration = video.duration
  const time = (position / timeline.offsetWidth) * duration
  video.currentTime = time
  videoList[videoSelected.value].currentSecond = Math.floor(video.currentTime)
  video.pause()
}

const props = defineProps(['duration'])
const ticks = ref<any[]>([])
watch(
  () => props.duration,
  (newDuration: number) => {
    let hasHours = false
    if (Math.floor(newDuration / 3600) > 0) {
      hasHours = true
    }
    const tmp = interval(newDuration)
    ticks.value = tmp.map((item, index) => {
      const y = (index / tmp.length) * 100
      return {
        left: `${y.toFixed(0)}%`,
        tickTime: formatTime(item, hasHours)
      }
    })
  }
)
</script>

<template>
  <div id="timeline">
    <div class="scrubber" :style="{ left: scrubberLeft }"></div>
    <div
      class="tick"
      v-for="(item, index) of ticks"
      :key="index"
      :style="{ left: item.left }"
    >
      {{ item.tickTime }}
    </div>
  </div>
</template>

<style lang="less" scoped>
#timeline {
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  height: 100%;
  margin: 0 10px;
  cursor: pointer;
  overflow: hidden;
}
#timeline .scrubber {
  position: absolute;
  top: 0;
  left: 0;
  width: 2px;
  height: 100%;
  background-color: #409eff;
}
#timeline .tick {
  position: absolute;
  top: 6px;
  width: auto;
  height: 15px;
  font-size: 12px;
}
#timeline .tick::after {
  content: '|';
  position: relative;
  top: -10px;
  left: -100%;
  width: 1px;
  height: 4px;
  font-size: 12px;
}
</style>
