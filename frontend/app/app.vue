<template>
  <div
    :class="['min-h-screen transition-colors duration-300', isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900']">
    <!-- 固定頂部導航 -->
    <header
      class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md dark:bg-gray-900/80 border-b border-gray-200/50 dark:border-gray-700/50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex items-center justify-between h-16">
          <!-- 玩家名字 -->
          <div class="flex items-center space-x-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
              A
            </div>
            <span class="font-semibold text-lg hidden sm:inline">玩家名稱</span>
          </div>

          <!-- 黑白切換按鈕 -->
          <button @click="toggleTheme"
            class="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 transition-all duration-200 shadow-sm hover:shadow-md"
            :aria-label="isDark ? '切換淺色模式' : '切換深色模式'">
            <svg v-if="!isDark" class="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                fill-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
        </div>
      </div>
    </header>

    <!-- 主要內容 -->
    <main class="pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-7xl mx-auto">
        <!-- 桌遊卡片網格 -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          <!-- 阿瓦隆卡片（修正版） -->
          <NuxtLink to="/avalon"
            class="group block p-6 bg-white/70 backdrop-blur-sm dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-transparent hover:bg-white/90 dark:hover:bg-gray-700/90">
            <div class="flex items-start space-x-4">
              <div
                class="p-3 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <span class="text-2xl">⚔️</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  <span
                    class="bg-gradient-to-r from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                    阿瓦隆
                  </span>
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">5-10人</p>
                <div
                  class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:translate-x-1 transition-all duration-200">
                  開始遊戲 →
                </div>
              </div>
            </div>
          </NuxtLink>

          <!-- 狼人殺卡片（修正版） -->
          <NuxtLink to="/werewolf"
            class="group block p-6 bg-white/70 backdrop-blur-sm dark:bg-gray-800/90 border border-gray-200/50 dark:border-gray-700/50 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:border-transparent hover:bg-white/90 dark:hover:bg-gray-700/90">
            <div class="flex items-start space-x-4">
              <div
                class="p-3 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                <span class="text-2xl">🐺</span>
              </div>
              <div class="flex-1 min-w-0">
                <h3 class="text-xl font-bold mb-2 group-hover:translate-x-1 transition-transform">
                  <span
                    class="bg-gradient-to-r from-red-500 to-orange-500 dark:from-red-400 dark:to-orange-400 bg-clip-text text-transparent">
                    狼人殺
                  </span>
                </h3>
                <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">6-18人</p>
                <div
                  class="flex items-center text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group-hover:translate-x-1 transition-all duration-200">
                  開始遊戲 →
                </div>
              </div>
            </div>
          </NuxtLink>

        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
// 深色模式狀態
const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
}
</script>
