<template>
  <div>
    <h1>Avalon 列表</h1>
    <ul>
      <li v-for="item in items" :key="item.id">
        <NuxtLink :to="`/avalon/${item.id}`">
          {{ item.title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>
<script setup>

const items = [
  { id: 1, title: 'Avalon 遊戲一' },
  { id: 2, title: 'Avalon 遊戲二' },
  { id: 3, title: 'Avalon 遊戲三' },
]
</script>