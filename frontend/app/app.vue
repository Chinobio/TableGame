<!-- app.vue -->
<template>
  <div
    :class="[
      'min-h-screen transition-colors duration-500',
      isDark
        ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-black text-white'
        : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900',
    ]"
  >
    <!-- Header（固定在頂部，全站共用） -->
    <header
      class="fixed top-0 inset-x-0 z-50 backdrop-blur-md border-b
               bg-white/70 dark:bg-gray-900/70
               border-gray-200/40 dark:border-gray-700/40"
    >
      <div class="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex items-center space-x-3">
          <div
            class="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600
                     flex items-center justify-center font-bold text-white shadow-lg"
          >
            A
          </div>
          <span class="font-semibold text-lg tracking-wide hidden sm:block">
            Board Game Hub
          </span>
        </div>

        <!-- Theme Toggle -->
        <button
          @click="toggleTheme"
          class="p-2 rounded-xl transition-all duration-300
                   bg-gray-100 hover:bg-gray-200
                   dark:bg-gray-800 dark:hover:bg-gray-700
                   hover:scale-105"
        >
          <span v-if="!isDark">🌞</span>
          <span v-else>🌙</span>
        </button>
      </div>
    </header>

    <!-- 主要內容區域：根據路由顯示不同頁面 -->
    <main class="pt-28 pb-16 px-6">
      <div class="max-w-7xl mx-auto">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
}
</script>