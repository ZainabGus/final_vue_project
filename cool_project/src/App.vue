<script>
  import GameCard from './components/cardGame.vue'

  export default{
    components: {
      GameCard
    }
  }
</script>


<template>
  <div>
    <h1>🎮 Магазин игр</h1>
      <game-card game="Cyberpunk 2077" :price="1999" />
      <game-card game="The Witcher 3" :price="1299" />
      <game-card game="Hollow Knight" :price="399" />
  </div>
</template>

<style>
body {
  font-family: Arial, sans-serif;
  padding: 20px;
}
</style>
