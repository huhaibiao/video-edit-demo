<!--
 * @Author: huhaibiao
 * @Date: 2023-04-26 15:22:22
-->
<script lang="ts" setup>
import { tickCounts } from '../store'

const props = defineProps(['title', 'contentComponent', 'data'])
</script>

<template>
  <div class="h-g-item">
    <div class="title">
      {{ props.title ?? '组件标题' }}
    </div>
    <div class="content">
      <div
        class="image tracks content-child"
        v-if="props.contentComponent === 'text'"
      >
        <slot v-if="props.data.length === 0"></slot>
        <el-tag
          v-for="(item, index) of props.data"
          :key="index"
          closable
          :disable-transitions="false"
          @close=""
          style="margin: 0 10px"
        >
          {{ item }}</el-tag
        >
      </div>

      <div
        v-if="props.contentComponent === 'image'"
        class="image content-child"
      >
        <slot v-if="props.data.length === 0"></slot>
        <img
          v-for="(item, index) of props.data || []"
          :src="item.url"
          :key="index"
          :style="{ width: `calc( 100% / ${tickCounts})` }"
        />
      </div>

      <div
        v-if="props.contentComponent === 'chartlet'"
        class="image content-child"
      >
        <slot v-if="props.data.length === 0"></slot>
        <div
          class="content-child chartlet"
          :style="{ width: `calc( 100% / ${tickCounts})`, height: '100%' }"
          v-for="(item, index) of props.data || []"
          :key="index"
        >
          <img :src="item.url" />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.h-g-item {
  display: flex;
  height: 100px;
  flex-direction: column;
}
.title {
  //   align-self: center;
  margin: 5px 0;
  padding: 0;
  font-size: 14px;
  color: #606266;
  word-break: break-all;
  max-height: 40px;
}
.content {
  flex: 1;
  width: 100%;
  overflow-x: auto;
}
.content-child {
  display: flex;
  align-items: center;
  > img {
    max-width: 100%;
    max-height: 100%;
  }
}
.image {
  background-color: #f2f3f5;
  height: 100%;
  width: auto;
  border-radius: 2px;
  overflow: hidden;
  overflow-x: auto;
}
.chartlet {
  display: flex;
  justify-content: center;
}
</style>
