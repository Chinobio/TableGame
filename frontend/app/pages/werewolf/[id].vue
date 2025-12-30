<script setup>
// 取得路由參數
const route = useRoute()
const id = route.params.id  // 或者 computed(() => route.params.id)

// 如果需要根據 id 去 fetch 資料
const { data: avalonData } = await useFetch(`/api/avalon/${id}`)
// 或者用任何你自己的邏輯
</script>

<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-4xl font-bold mb-4">Avalon 項目：{{ id }}</h1>
    
    <!-- 這裡顯示你的內容 -->
    <p>目前顯示的是 ID 為 {{ id }} 的頁面</p>
    
    <!-- 如果有資料 -->
    <pre v-if="avalonData">{{ avalonData }}</pre>
    
    <!-- 回上層或首頁 -->
    <NuxtLink to="/avalon" class="text-blue-500 underline">
      ← 回到 Avalon 列表
    </NuxtLink>
  </div>
</template>