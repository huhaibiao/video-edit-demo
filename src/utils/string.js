/*
 * @Author: huhaibiao
 * @Date: 2023-04-24 11:47:51
 */
export function clearEmpty(val) {
  val = val.replace(' ', '')
  if (val.indexOf(' ') !== -1) {
    return clearEmpty(val)
  } else {
    return val
  }
}

export function formatTime(seconds, hasHours = false) {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds - hours * 3600) / 60)
  let remainingSeconds = seconds - hours * 3600 - minutes * 60
  remainingSeconds = Math.floor(remainingSeconds)

  if (remainingSeconds < 10) {
    remainingSeconds = '0' + remainingSeconds
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }

  if (!hasHours) {
    return minutes + ':' + remainingSeconds
  }

  if (hours < 10) {
    hours = '0' + hours
  }

  return hours + ':' + minutes + ':' + remainingSeconds
}

let maxTick = 20
export const interval = (duration, tickCount = maxTick) => {
  let res = []
  if (duration <= maxTick) {
    for (let i = 0; i <= Math.floor(duration); i++) {
      res.push(i)
    }
    return res
  } else {
    for (let i = 0; i <= tickCount; i++) {
      const tickSecond = (i / tickCount) * duration
      res.push(tickSecond)
    }
    return res
  }
}

export const screenFullOrExit = (dom1, target1, dom2, target2) => {
  if (dom1)
    dom1.addEventListener('click', function () {
      if (target1.requestFullscreen) {
        target1.requestFullscreen()
      } else if (target1.webkitRequestFullscreen) {
        target1.webkitRequestFullscreen()
      } else if (target1.msRequestFullscreen) {
        target1.msRequestFullscreen()
      }
    })

  if (dom2)
    dom2.addEventListener('click', function () {
      if (target2.exitFullscreen) {
        target2.exitFullscreen()
      } else if (target2.webkitExitFullscreen) {
        target2.webkitExitFullscreen()
      } else if (target2.msExitFullscreen) {
        target2.msExitFullscreen()
      }
    })
}
