<!-- pages/avalon/[id].vue -->
<template>
  <div class="max-w-7xl mx-auto py-10 px-6 space-y-10">
    <!-- 標題與狀態 -->
    <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
      <div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">
          阿瓦隆房間 {{ roomId }} - 第 {{ gameState.round }} 回合
        </h1>
        <p class="mt-2 text-lg text-gray-600 dark:text-gray-300">
          目前階段：<span class="font-bold text-indigo-600">{{ phaseText }}</span>
        </p>
        <p class="text-gray-600 dark:text-gray-300">
          你的角色：<span class="font-bold" :class="myRole === 'good' ? 'text-blue-500' : 'text-red-500'">{{ myRoleText }}</span>
        </p>
      </div>

      <button
        v-if="!gameStarted && isRoomOwner"
        @click="startGame"
        class="px-8 py-4 rounded-xl text-white font-bold text-lg
                 bg-gradient-to-r from-indigo-600 to-purple-700 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition"
      >
        開始遊戲
      </button>
    </div>

    <!-- 任務計分板 -->
    <div class="flex justify-center items-center gap-6 flex-wrap">
      <div v-for="(result, index) in quests" :key="index"
           class="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg"
           :class="{
             'bg-blue-500 text-white': result === 'success',
             'bg-red-500 text-white': result === 'fail',
             'bg-gray-300 text-gray-600': result === null
           }">
        {{ result === 'success' ? '✓' : result === 'fail' ? '✗' : index + 1 }}
      </div>
      <div class="text-xl font-bold text-gray-700 dark:text-gray-300">
        投票失敗次數：{{ chaosCount }} / 5
      </div>
    </div>

    <!-- 玩家圓桌布局 -->
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
      <PlayerCard
        v-for="player in players"
        :key="player.id"
        :player="player"
        :is-leader="player.id === currentLeader"
        :is-me="player.id === myId"
        @guess-role="toggleGuess"
      />
    </div>

    <!-- 操作區：階段性顯示 -->
    <div class="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 shadow-2xl max-w-3xl mx-auto">

      <!-- 提議階段（只有領袖） -->
      <div v-if="gameState.phase === 'propose' && currentLeader === myId">
        <h2 class="text-2xl font-bold mb-6 text-center">你是本回合領袖！請選擇 {{ requiredMembers }} 名出任務成員</h2>
        <div class="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <button
            v-for="p in players"
            :key="p.id"
            @click="toggleProposal(p.id)"
            :class="proposedTeam.includes(p.id) ? 'ring-4 ring-indigo-500 bg-indigo-100 dark:bg-indigo-900' : ''"
            class="p-4 rounded-xl border-2 border-dashed border-gray-400 hover:border-indigo-500 transition"
          >
            {{ p.name }}
          </button>
        </div>
        <button
          @click="submitProposal"
          :disabled="proposedTeam.length !== requiredMembers"
          class="w-full py-4 rounded-xl text-white font-bold text-xl disabled:opacity-50"
          :class="proposedTeam.length === requiredMembers ? 'bg-gradient-to-r from-indigo-600 to-purple-700' : 'bg-gray-400'"
        >
          提交提議（{{ proposedTeam.length }} / {{ requiredMembers }}）
        </button>
      </div>

      <!-- 投票階段（所有人） -->
      <div v-else-if="gameState.phase === 'vote'">
        <h2 class="text-2xl font-bold mb-6 text-center">請投票：贊成或反對本次提議團隊？</h2>
        <div class="flex justify-center gap-8">
          <button @click="vote(true)" class="px-12 py-6 rounded-2xl text-3xl font-bold text-white bg-green-500 hover:bg-green-600 shadow-xl">
            贊成
          </button>
          <button @click="vote(false)" class="px-12 py-6 rounded-2xl text-3xl font-bold text-white bg-red-500 hover:bg-red-600 shadow-xl">
            反對
          </button>
        </div>
      </div>

      <!-- 任務階段（只有團隊成員） -->
      <div v-else-if="gameState.phase === 'quest' && proposedTeam.includes(myId)">
        <h2 class="text-2xl font-bold mb-6 text-center">你是任務成員！請選擇：</h2>
        <div class="flex justify-center gap-8">
          <button @click="questVote(true)" class="px-12 py-6 rounded-2xl text-3xl font-bold text-white bg-blue-500 shadow-xl">
            任務成功
          </button>
          <button
            v-if="myRole === 'evil'"
            @click="questVote(false)"
            class="px-12 py-6 rounded-2xl text-3xl font-bold text-white bg-red-600 shadow-xl"
          >
            任務失敗
          </button>
          <p v-else class="text-gray-500 text-xl self-center">好人只能投成功</p>
        </div>
      </div>

      <!-- 等待其他玩家 -->
      <div v-else class="text-center py-12">
        <p class="text-2xl text-gray-500">等待其他玩家操作...</p>
      </div>
    </div>

    <!-- 遊戲記錄 -->
    <div class="bg-white/90 dark:bg-gray-800/90 rounded-3xl p-8 shadow-2xl">
      <h2 class="text-2xl font-bold mb-6">遊戲記錄</h2>
      <div class="space-y-3 text-lg">
        <p v-for="(log, i) in gameLogs" :key="i" class="text-gray-700 dark:text-gray-300">
          {{ log }}
        </p>
      </div>
    </div>

    <!-- 遊戲結束 -->
    <div v-if="gameEnded" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-3xl p-12 text-center shadow-2xl max-w-lg">
        <h1 class="text-5xl font-bold mb-6" :class="winner === 'good' ? 'text-blue-500' : 'text-red-500'">
          {{ winner === 'good' ? '好人勝利！' : '壞人勝利！' }}
        </h1>
        <p class="text-2xl mb-8">感謝遊玩</p>
        <button @click="resetGame" class="px-8 py-4 rounded-xl bg-indigo-600 text-white text-xl font-bold">
          重新開始
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerCard from '~/components/PlayerCard.vue'

const route = useRoute()
const roomId = route.params.id as string

// 假資料
const myId = ref(1)
const myRole = ref<'good' | 'evil'>('good') // 改成 'evil' 可以測試壞人視角
const isRoomOwner = ref(true)
const gameStarted = ref(false)
const gameEnded = ref(false)
const winner = ref<'good' | 'evil'>('good')
const chaosCount = ref(0)
type RoleGuess = 'good' | 'evil' | 'unknown'
const players = ref([
  { id: 1, name: '你自己', roleGuess: 'unknown' as RoleGuess },
  { id: 2, name: '小明', roleGuess: 'unknown' as RoleGuess },
  { id: 3, name: '小花', roleGuess: 'good' as RoleGuess },
  { id: 4, name: '阿強', roleGuess: 'unknown' as RoleGuess },
  { id: 5, name: '小美', roleGuess: 'evil' as RoleGuess },
  { id: 6, name: '大雄', roleGuess: 'unknown' as RoleGuess },
])

const gameState = ref({
  phase: 'propose' as 'propose' | 'vote' | 'quest' | 'discuss',
  round: 1,
})

const currentLeader = ref(1)
const proposedTeam = ref<number[]>([])
const quests = ref<(null | 'success' | 'fail')[]>([null, null, null, null, null])
const gameLogs = ref<string[]>(['遊戲準備中...'])

const phaseText = computed(() => {
  return {
    propose: '提議團隊',
    vote: '團隊投票',
    quest: '執行任務',
    discuss: '討論階段',
  }[gameState.value.phase]
})

const myRoleText = computed(() => myRole.value === 'good' ? '好人陣營' : '壞人陣營')

const requiredMembers = computed(() => {
  // 簡化：固定每回合要 3 人（實際應依人數表）
  return 3
})

// 操作函數（全用假邏輯模擬）
const startGame = () => {
  gameStarted.value = true
  gameLogs.value.push('遊戲開始！角色已分配（假資料）')
  gameState.value.phase = 'propose'
}

const toggleProposal = (id: number) => {
  if (proposedTeam.value.includes(id)) {
    proposedTeam.value = proposedTeam.value.filter(p => p !== id)
  } else if (proposedTeam.value.length < requiredMembers.value) {
    proposedTeam.value.push(id)
  }
}

const submitProposal = () => {
  gameLogs.value.push(`領袖提議團隊：${proposedTeam.value.map(id => players.value.find(p => p.id === id)?.name).join('、')}`)
  gameState.value.phase = 'vote'
}

const vote = (approve: boolean) => {
  // 假模擬：隨機結果
  const approveCount = Math.floor(Math.random() * players.value.length * 0.7) + 1
  const rejectCount = players.value.length - approveCount

  gameLogs.value.push(`投票結果：贊成 ${approveCount} 票，反對 ${rejectCount} 票（匿名）`)

  if (approveCount > rejectCount) {
    gameLogs.value.push('提議通過！進入任務階段')
    gameState.value.phase = 'quest'
  } else {
    chaosCount.value++
    gameLogs.value.push(`提議被否決！投票失敗次數 ${chaosCount.value}/5`)
    if (chaosCount.value >= 5) {
      endGame('evil')
      return
    }
    nextRound()
  }
}

const questVote = (success: boolean) => {
  // 假模擬：根據壞人數決定失敗票
  const failVotes = myRole.value === 'evil' && !success ? 1 : Math.floor(Math.random() * 2)
  const result = failVotes >= 1 ? 'fail' : 'success'

  quests.value[gameState.value.round - 1] = result
  gameLogs.value.push(`第 ${gameState.value.round} 回合任務${result === 'success' ? '成功 ✓' : '失敗 ✗'}`)

  // 檢查勝負
  const successCount = quests.value.filter(q => q === 'success').length
  const failCount = quests.value.filter(q => q === 'fail').length

  if (successCount >= 3) endGame('good')
  else if (failCount >= 3) endGame('evil')
  else nextRound()
}

const nextRound = () => {
  gameState.value.round++
  currentLeader.value = currentLeader.value % players.value.length + 1
  proposedTeam.value = []
  gameState.value.phase = 'propose'
  gameLogs.value.push(`進入第 ${gameState.value.round} 回合，領袖輪到 ${players.value.find(p => p.id === currentLeader.value)?.name}`)
}

const endGame = (win: 'good' | 'evil') => {
  winner.value = win
  gameEnded.value = true
  gameLogs.value.push(win === 'good' ? '好人陣營獲得最終勝利！' : '壞人陣營獲得最終勝利！')
}

const resetGame = () => {
  gameEnded.value = false
  chaosCount.value = 0
  quests.value = [null, null, null, null, null]
  gameState.value = { phase: 'propose', round: 1 }
  currentLeader.value = 1
  proposedTeam.value = []
  gameLogs.value = ['遊戲已重置']
}

const toggleGuess = (playerId: number) => {
  const player = players.value.find(p => p.id === playerId)
  if (player) {
    if (player.roleGuess === 'unknown') player.roleGuess = 'good'
    else if (player.roleGuess === 'good') player.roleGuess = 'evil'
    else player.roleGuess = 'unknown'
  }
}
</script>