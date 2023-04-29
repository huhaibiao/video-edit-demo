/*
 * @Author: huhaibiao
 * @Date: 2023-04-21 23:55:53
 */

export let store = {
  id: 0
}

export const processData = ref(0)

export type vT = {
  duration?: number
  currentSecond?: number
  tickCounts?: number
  playStatus?: Boolean
  id?: number
  fileName?: string
  videoInfo?: string
  url?: string
  videoUrl?: string
  coverUrl?: string
  frameList?: any[] //视频帧
}
/**视频列表 */
export const videoList = reactive<[vT]>([
  {
    videoUrl: '',
    coverUrl: ''
  }
])
videoList.pop()
/**当前选中的视频下标 */
export const videoSelected = ref(0)

/**字体列表 */
export const fontList = reactive<any[]>([])

/** 贴图列表  {url}*/
export const imageList = reactive<any[]>([])

/** 字幕文件列表 */
export const subtitleList = reactive<any[]>([])

/**多少个刻度 */
export const tickCounts = computed(() => {
  const videoInfo = videoList[videoSelected.value] || {}
  return videoInfo.duration! >= 20 ? 20 : Math.floor(videoInfo.duration!)
})
