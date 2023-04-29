<!--
 * @Author: huhaibiao
 * @Date: 2023-04-29 16:31:36
-->
<script lang="ts" setup>
import { ref } from 'vue'
import axios from 'axios'

const dialogVisible = ref(true)
const props = defineProps(['data'])
const emit = defineEmits(['close'])
const form = reactive({})

const postData = () => {
  const data = new FormData()
  data.set('file', props.data)
  axios.post('/api/video/upload', data).finally(() => {
    emit('close')
  })
}
</script>

<template>
  <el-dialog v-model="dialogVisible" title="视频提交" width="60%">
    <el-form label-width="100px" :model="form" style="max-width: 460px">
      <el-form-item label="file:"> {{ props.data }}</el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('close')">取消</el-button>
        <el-button type="primary" @click="postData"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
