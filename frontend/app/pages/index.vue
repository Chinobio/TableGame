<!-- pages/index.vue -->
<template>
  <div class="space-y-14">
    <!-- Hero -->
    <section class="text-center space-y-4">
      <h1
        class="text-4xl sm:text-5xl font-extrabold tracking-tight
                 bg-gradient-to-r from-indigo-500 to-purple-600
                 bg-clip-text text-transparent"
      >
        線上桌遊大廳
      </h1>
      <p class="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
        與朋友即時遊玩阿瓦隆、狼人殺，沉浸式互動體驗
      </p>
    </section>

    <!-- Game Cards -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <!-- Avalon -->
      <NuxtLink
        to="/avalon"
        class="group relative rounded-3xl p-[1px]
                 bg-gradient-to-br from-indigo-500 to-purple-600
                 hover:shadow-[0_20px_50px_rgba(99,102,241,0.4)]
                 transition-all duration-500"
      >
        <div
          class="h-full rounded-3xl p-6
                   bg-white/80 dark:bg-gray-800/90
                   backdrop-blur-xl
                   transform group-hover:-translate-y-2 transition-all"
        >
          <div class="flex items-start space-x-4">
            <div
              class="text-3xl p-3 rounded-xl
                       bg-indigo-500/20 text-indigo-600
                       group-hover:rotate-12 transition-transform"
            >
              ⚔️
            </div>
            <div>
              <h3 class="text-xl font-bold">阿瓦隆</h3>
              <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">
                5–10 人｜陣營推理
              </p>
            </div>
          </div>

          <div class="mt-6 inline-flex items-center text-indigo-600 dark:text-indigo-400 font-medium">
            開始遊戲 →
          </div>
        </div>
      </NuxtLink>

      <!-- Werewolf -->
      <NuxtLink
        to="/werewolf"
        class="group relative rounded-3xl p-[1px]
                 bg-gradient-to-br from-red-500 to-orange-500
                 hover:shadow-[0_20px_50px_rgba(239,68,68,0.4)]
                 transition-all duration-500"
      >
        <div
          class="h-full rounded-3xl p-6
                   bg-white/80 dark:bg-gray-800/90
                   backdrop-blur-xl
                   transform group-hover:-translate-y-2 transition-all"
        >
          <div class="flex items-start space-x-4">
            <div
              class="text-3xl p-3 rounded-xl
                       bg-red-500/20 text-red-600
                       group-hover:rotate-12 transition-transform"
            >
              🐺
            </div>
            <div>
              <h3 class="text-xl font-bold">狼人殺</h3>
              <p class="text-sm text-gray-500 dark:text-gray-300 mt-1">
                6–18 人｜心理博弈
              </p>
            </div>
          </div>

          <div class="mt-6 inline-flex items-center text-red-600 dark:text-red-400 font-medium">
            開始遊戲 →
          </div>
        </div>
      </NuxtLink>
    </section>
  </div>
</template>