/*
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-21 23:55:53
 */
import { defineStore } from 'pinia'

// export const useCounterStore = defineStore('counter', {
//   state: () => {
//     return { count: 0 }
//   },
//   // 也可以这样定义
//   // state: () => ({ count: 0 })
//   actions: {
//     increment() {
//       this.count++
//     }
//   }
// })

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const increment = () => {
    count.value++
  }

  return {
    count,
    increment
  }
})
