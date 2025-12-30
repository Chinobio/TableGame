<!-- components/PlayerCard.vue -->
<script setup lang="ts">
const props = defineProps<{
  player: {
    id: number
    name: string
    roleGuess: 'good' | 'evil' | 'unknown'
  }
  isLeader: boolean
  isMe: boolean
}>()

const emit = defineEmits<{
  (e: 'guess-role', playerId: number): void
}>()

const roleColor = (guess: string) => {
  return {
    good: 'bg-blue-500 text-white',
    evil: 'bg-red-500 text-white',
    unknown: 'bg-gray-400 text-white',
  }[guess]
}

const roleText = (guess: string) => {
  return guess === 'good' ? '好人' : guess === 'evil' ? '壞人' : '未知'
}
</script>

<template>
  <div class="p-5 rounded-2xl bg-white/80 dark:bg-gray-800/90 shadow-lg flex flex-col items-center transition-all hover:scale-105">
    <div class="w-16 h-16 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center text-3xl mb-3">
      👤
    </div>
    <div class="text-center">
      <p class="font-bold text-lg">
        {{ player.name }}
        <span v-if="isMe" class="text-indigo-600 dark:text-indigo-400">(你)</span>
        <span v-if="isLeader" class="text-purple-600 dark:text-purple-400">(領袖)</span>
      </p>
      <div
        @click="emit('guess-role', player.id)"
        class="mt-3 px-4 py-2 rounded-full cursor-pointer font-medium text-sm transition-all hover:opacity-80"
        :class="roleColor(player.roleGuess)"
      >
        {{ roleText(player.roleGuess) }}
      </div>
    </div>
  </div>
</template>