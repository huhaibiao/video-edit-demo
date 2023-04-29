<!--
 * @Author: huhaibiao 
 * @Date: 2023-04-23 22:11:58
-->
<script setup lang="ts">
import { vT } from '../store'

type T = { coverUrl: string; videoUrl: string } | vT
const { list, selected } = defineProps<{
  list: T[]
  selected: any
}>()

const emit = defineEmits(['switch', 'remove'])
const switchClick = (url: any) => {
  emit('switch', url)
}
</script>

<template>
  <div class="min-video">
    <div
      class="image-item"
      v-for="(item, index) in list"
      :key="index"
      @click="switchClick(index)"
      :class="{ selected: selected === index }"
    >
      <el-popover
        placement="top"
        title="确定移除该视频吗？"
        :width="200"
        :show-after="400"
        trigger="hover"
        content=""
      >
        <template #reference>
          <el-icon class="el-icon-close"><IEpClose /></el-icon>
        </template>
        <el-button type="primary" size="small" @click="emit('remove', index)"
          >确定</el-button
        >
      </el-popover>

      <el-image
        v-show="item.coverUrl"
        :src="item.coverUrl"
        fit="fill"
        style="height: 100%; min-width: 120px; border-radius: 2px"
      />
    </div>
  </div>
</template>

<style lang="less" scoped>
.min-video {
  position: relative;
  height: 100%;
  background-color: #f2f3f5;
  border-radius: 4px;
  padding: 10px 4px;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  overflow-x: auto;
}
.el-icon-close {
  position: absolute;
  bottom: 2px;
  right: 2px;
  border-radius: 2px;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.49);
  color: #fff;
  cursor: pointer;
}
.image-item {
  height: 100%;
  min-width: 124px;
  box-size: border-box;
  margin: 0 5px;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  padding: 2px;
}
.selected {
  background-color: #67c23a;
}
</style>
