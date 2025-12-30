<template>
  <div class="max-w-7xl mx-auto space-y-8">
    <!-- 頁面標題與操作區 -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
      <div>
        <h1
          class="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          阿瓦隆 房間大廳
        </h1>
        <p class="text-gray-600 dark:text-gray-300 mt-2">
          歡迎，<span class="font-semibold text-indigo-600 dark:text-indigo-400">{{ username }}</span>！
        </p>
      </div>

      <button @click="openCreateRoomModal" class="px-6 py-3 rounded-xl font-medium text-white
                 bg-gradient-to-r from-indigo-500 to-purple-600
                 hover:from-indigo-600 hover:to-purple-700
                 shadow-lg hover:shadow-xl transform hover:-translate-y-1
                 transition-all duration-300">
        + 創建房間
      </button>
    </div>

    <!-- 房間列表 -->
    <div v-if="rooms.length === 0" class="text-center py-12">
      <p class="text-gray-500 dark:text-gray-400 text-lg">目前還沒有房間，快來創建第一間吧！</p>
    </div>

    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <NuxtLink v-for="room in rooms" :key="room.id" :to="`/avalon/${room.id}`" class="group relative rounded-2xl p-[1px]
                 bg-gradient-to-br from-indigo-500 to-purple-600
                 hover:shadow-[0_20px_50px_rgba(99,102,241,0.3)]
                 transition-all duration-500">
        <div class="h-full rounded-2xl p-6 bg-white/80 dark:bg-gray-800/90 backdrop-blur-xl
                   transform group-hover:-translate-y-2 transition-all duration-300">
          <!-- 房間ID與密碼標示 -->
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold">房間 {{ room.id }}</h3>
            <span v-if="room.hasPassword" class="text-2xl" title="需要密碼">🔒</span>
            <span v-else class="text-2xl text-gray-400">🔓</span>
          </div>

          <!-- 人數 -->
          <div class="flex items-center space-x-3 mb-3">
            <span class="text-gray-600 dark:text-gray-400">人數</span>
            <span class="font-semibold text-lg">{{ room.players }} / 10</span>
          </div>

          <!-- 創建時間 -->
          <div class="text-sm text-gray-500 dark:text-gray-300">
            創建於 {{ formatTime(room.createdAt) }}
          </div>

          <!-- 進入提示 -->
          <div
            class="mt-5 text-indigo-600 dark:text-indigo-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
            點擊進入 →
          </div>
        </div>
      </NuxtLink>
    </div>

    <!-- 創建房間 Modal（簡單版，之後可擴充密碼設定） -->
    <Teleport to="body">
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- 背景遮罩 -->
        <div @click="showCreateModal = false" class="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        <!-- Modal 內容 -->
        <div class="relative w-full max-w-md rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-2xl">
          <h2 class="text-2xl font-bold mb-6 text-center">創建新房間</h2>

          <form @submit.prevent="createRoom">
            <div class="space-y-5">
              <div>
                <label class="block text-sm font-medium mb-2">是否設定密碼（選填）</label>
                <input v-model="newRoomPassword" type="password" placeholder="留空表示公開房間" class="w-full px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600
                         bg-gray-50 dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
              </div>

              <div class="flex gap-4 pt-4">
                <button type="button" @click="showCreateModal = false"
                  class="flex-1 py-3 rounded-xl font-medium bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
                  取消
                </button>
                <button type="submit" class="flex-1 py-3 rounded-xl font-medium text-white
                           bg-gradient-to-r from-indigo-500 to-purple-600
                           hover:from-indigo-600 hover:to-purple-700 transition">
                  創建房間
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
// 假資料（之後可以換成從 API 拿）
const username = ref('玩家小明') // 可以之後用登入系統替換

const rooms = ref([
  { id: 1001, players: 7, createdAt: new Date(Date.now() - 1000 * 60 * 15), hasPassword: true },
  { id: 1002, players: 3, createdAt: new Date(Date.now() - 1000 * 60 * 30), hasPassword: false },
  { id: 1003, players: 10, createdAt: new Date(Date.now() - 1000 * 60 * 45), hasPassword: false },
  { id: 1004, players: 5, createdAt: new Date(Date.now() - 1000 * 60 * 60), hasPassword: true },
  { id: 1001, players: 7, createdAt: new Date(Date.now() - 1000 * 60 * 15), hasPassword: true },
  { id: 1002, players: 3, createdAt: new Date(Date.now() - 1000 * 60 * 30), hasPassword: false },
  { id: 1003, players: 10, createdAt: new Date(Date.now() - 1000 * 60 * 45), hasPassword: false },
  { id: 1004, players: 5, createdAt: new Date(Date.now() - 1000 * 60 * 60), hasPassword: true }, { id: 1001, players: 7, createdAt: new Date(Date.now() - 1000 * 60 * 15), hasPassword: true },
  { id: 1002, players: 3, createdAt: new Date(Date.now() - 1000 * 60 * 30), hasPassword: false },
  { id: 1003, players: 10, createdAt: new Date(Date.now() - 1000 * 60 * 45), hasPassword: false },
  { id: 1004, players: 5, createdAt: new Date(Date.now() - 1000 * 60 * 60), hasPassword: true },
])

// Modal 控制
const showCreateModal = ref(false)
const newRoomPassword = ref('')

const openCreateRoomModal = () => {
  showCreateModal.value = true
  newRoomPassword.value = ''
}

// 創建房間（目前是模擬，之後串 API）
const createRoom = () => {
  const newId = Math.max(...rooms.value.map(r => r.id)) + 1
  const newRoom = {
    id: newId,
    players: 1, // 創建者自己
    createdAt: new Date(),
    hasPassword: !!newRoomPassword.value,
  }
  rooms.value.unshift(newRoom)
  showCreateModal.value = false

  // 自動跳進新房間
  navigateTo(`/avalon/${newId}`)
}

// 時間格式化
const formatTime = (date: Date) => {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 1000 / 60)

  if (minutes < 60) return `${minutes} 分鐘前`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} 小時前`
  return `${Math.floor(hours / 24)} 天前`
}
</script>