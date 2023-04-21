<!--
 * @Author: huhaibiao huhaibiao@do-global.com
 * @Date: 2023-04-21 22:11:20
-->
<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useCounterStore } from './store'

const msg = ref('hello')
const msgs = reactive({ msg1: 'good' })
const store = useCounterStore()
const { increment } = store
const { count } = storeToRefs(store)
setInterval(() => {
  increment()
}, 1000)
</script>
<template>
  <div class="content">
    <span>
      {{ msg }}
      {{ msgs }}
      <i-ep-edit />
      <el-icon color="#409EFC" class="no-inherit">
        <i-ep-Share />
      </el-icon>

      {{ count }}
    </span>
  </div>
</template>

<style lang="less" scoped>
.content {
  span {
    color: #39c2bb;
  }
}
</style>
