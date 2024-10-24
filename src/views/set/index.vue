<template>
  <breadCrumb ref="bread_crumb" :item="item"></breadCrumb>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import breadCrumb from '@/components/bread_crumb.vue'

const bread_crumb = ref()
const item = ref({
  first: "系统设置",
})

</script>

<style scoped lang="scss">

</style>
