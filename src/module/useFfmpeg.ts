/*
 * @Author: huhaibiao
 * @Date: 2023-04-23 15:10:05
 */
import { fetchFile, createFFmpeg } from '@ffmpeg/ffmpeg'
import { processData, tickCounts } from '../store'
// @ts-ignore
// const { fetchFile, createFFmpeg } = FFmpeg

const ffmpeg = createFFmpeg({
  corePath: '/plugin/ffmpeg-core.js'
})
ffmpeg.load()
ffmpeg.setProgress(progress => {
  processData.value = progress.ratio
})

const videoInfo = {
  duration: '',
  bitRate: ''
}
ffmpeg.setLogger(logs => {
  if (logs.message.includes('Duration')) {
    videoInfo.duration = logs.message.slice(
      logs.message.indexOf('Duration:') + 'Duration: '.length,
      logs.message.indexOf(',')
    )
    videoInfo.bitRate = logs.message.slice(
      logs.message.indexOf('bitrate:') + 'bitrate: '.length
    )
    console.log(videoInfo)
  }
})

let videoName = 'initVideo'
/**ffmpeg导入视频 */
export const initVideo = async (video: Blob) => {
  ffmpeg.FS('writeFile', videoName, await fetchFile(video))
  await ffmpeg.run('-i', videoName)
}

let fontName = 'font1'
/** ffmpeg导入字体 */
export const writeFontFile = async (font: Blob) => {
  ffmpeg.FS('writeFile', fontName, await fetchFile(font))
}

let imageName = 'imageMark'
/**ffmpeg导入贴图 */
export const writeImage = async (image: Blob) => {
  ffmpeg.FS('writeFile', imageName, await fetchFile(image))
}

let subTitle = 'subtitle.srt'
/**ffmpeg导入字幕文件 */
export const writeSubTitle = async (subtitle: Blob) => {
  ffmpeg.FS('writeFile', subTitle, await fetchFile(subtitle))
}

/**通过url获取文件blob数据 */
export const urlGetData = async (fileUrl: string, type = 'video/mp4') => {
  const tmp = 'tmpFile'
  ffmpeg.FS('writeFile', tmp, await fetchFile(fileUrl))
  const outputData = ffmpeg.FS('readFile', tmp)
  return new Blob([outputData.buffer], { type })
}

/** 切分视频 */
export const ffmpegSliceVideo = async (
  fileUrl: string,
  fileName: string,
  middleTime: string
) => {
  ffmpeg.FS('writeFile', fileName, await fetchFile(fileUrl))
  // 将视频分割为两个部分
  const command = `-i ${fileName} -t ${middleTime} -c copy output1.mp4 -ss ${middleTime} -c copy output2.mp4`
  await ffmpeg.run(...command.split(' '))

  const video1 = ffmpeg.FS('readFile', 'output1.mp4')
  const video1Url = URL.createObjectURL(
    new Blob([video1.buffer], { type: 'video/mp4' })
  )
  const video2 = ffmpeg.FS('readFile', 'output2.mp4')
  const video2Url = URL.createObjectURL(
    new Blob([video2.buffer], { type: 'video/mp4' })
  )

  return [video1Url, video2Url]
}

/**给视频添加字幕 */
export const addSubTitle = async (fileUrl: string, fileName: string) => {
  ffmpeg.FS('writeFile', fileName, await fetchFile(fileUrl))
  const cmd = `-i ${fileName} -vf subtitles=${subTitle} output.mp4`

  await ffmpeg.run(...cmd.split(' '))

  const outputData = ffmpeg.FS('readFile', 'output.mp4')

  const outputBlob = new Blob([outputData.buffer], { type: 'video/mp4' })
  return URL.createObjectURL(outputBlob)
}

/** 获取视频的每一秒帧 */
export const gVideoFrame = async (
  fileUrl: string,
  timeArr: number[],
  videoName: string = 'initVideo'
) => {
  const frameDir = videoName
  ffmpeg.FS('writeFile', videoName, await fetchFile(fileUrl))
  ffmpeg.FS('mkdir', frameDir + 'Frame')

  const second = tickCounts.value / timeArr[timeArr.length - 1]
  let cmd = `-i ${videoName} -vf fps=${second} -q:v 5 -s 320x240 -an -preset fast /${frameDir}Frame/%3d.jpeg -hide_banner`
  let args = cmd.split(' ')
  await ffmpeg.run(...args)
  const fileList = ffmpeg.FS('readdir', '/' + frameDir + 'Frame')
  let urls: { url: string }[] = []
  fileList.forEach(v => {
    if (v !== '.' && v !== '..') {
      const path = frameDir + 'Frame' + '/' + v
      const img = ffmpeg.FS('readFile', path)
      let url = URL.createObjectURL(
        new Blob([img.buffer], { type: 'image/jpeg' })
      )
      urls.push({
        url
      })
    }
  })
  return urls
}

/** 给视频添加文字 */
export const addText = async (
  fileUrl: string,
  videoName: string = 'initVideo',
  text: string = 'hello',
  startT: number = 5,
  endT: number = 7
) => {
  ffmpeg.FS('writeFile', videoName, await fetchFile(fileUrl))
  const cmd = `-re -i ${videoName} -vf`
  const textT =
    `drawtext=fontfile=font1:text=${text}` +
    `:fontcolor=white:fontsize=80:x=100:y=10:box=1:boxcolor=#0000007d:enable='between(t,${startT},${endT})'`
  let args = cmd.split(' ')
  await ffmpeg.run(...args, textT, 'outfile.mp4')
  const data = ffmpeg.FS('readFile', 'outfile.mp4')
  return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
}

/** 给视频添加贴图 */
export const addImage = async (
  fileUrl: string,
  videoName: string = 'initVideo',
  startT: number = 5,
  endT: number = 7
) => {
  ffmpeg.FS('writeFile', videoName, await fetchFile(fileUrl))
  const cmd = `-i ${videoName} -i ${imageName} -filter_complex overlay=(main_w-overlay_w)/2:(main_h-overlay_h)/2:enable='between(t,${startT},${endT})' outfile.mp4`
  let args = cmd.split(' ')
  await ffmpeg.run(...args, '-hide_banner')
  const data = ffmpeg.FS('readFile', 'outfile.mp4')
  return URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }))
}

/** 获取视频的第一帧图片 */
export const getFirstFrame = async (
  fileUrl: string,
  fileName: string,
  initTime = '00:00:00.001'
) => {
  ffmpeg.FS('writeFile', fileName, await fetchFile(fileUrl))
  console.log('视频的第一帧图片')
  await ffmpeg.run(
    '-hwaccel',
    'auto',
    '-i',
    fileName,
    '-ss',
    initTime,
    '-vframes',
    '1',
    '-s',
    '640x480',
    '-an',
    '-threads',
    '4',
    '-preset',
    'fast',
    'output.jpg'
  )
  const data = ffmpeg.FS('readFile', 'output.jpg')
  const url = URL.createObjectURL(
    new Blob([data.buffer], { type: 'image/jpeg' })
  )
  return {
    url,
    videoInfo: JSON.stringify(videoInfo)
  }
}

/**导出视频，降帧 */
export const videoLower = async (fileUrl: string, fileName: string) => {
  ffmpeg.FS('writeFile', fileName, await fetchFile(fileUrl))
  const cmd = `-i ${fileName} -b:v 2000k -q:v 2 -r 24 -s 1240x960 output.mp4`
  let args = cmd.split(' ')
  await ffmpeg.run(...args)
  const data = ffmpeg.FS('readFile', 'output.mp4')
  const url = URL.createObjectURL(
    new Blob([data.buffer], { type: 'video/mp4' })
  )
  return url
}
