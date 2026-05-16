<script>
  import GameCard from './components/cardGame.vue'

  export default{
    components: {
      GameCard
    }
  }
</script>


<template>
  <div class="app">  
    <header>
      <h1>🎮 Магазин игр</h1>
    </header>
    
    <div class="games">
      <game-card game="Змейка" :price="1999" img="src/assets/snake.png"/>
      <game-card game="The Witcher 3" :price="1299" />
      <game-card game="Hollow Knight" :price="399" />
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

/* Главный контейнер с центрированием */
.app {
  max-width: 1500px;     /* Ограничиваем ширину */
  margin: 0 auto;        /* Центрируем */
  padding: 20px;
}

header {
  text-align: center;
  margin-bottom: 40px;
}

header h1 {
  color: #333;
  font-size: 2.5em;
}

/* Сетка карточек */
.games {
  display: grid;
  grid-template-columns: repeat(2, 1fr);  
  gap: 25px;
}

/* На планшетах - 2 колонки */
@media (max-width: 900px) {
  .games {
    grid-template-columns: repeat(2, 1fr);
  }
}


@media (max-width: 600px) {
  .games {
    grid-template-columns: 1fr;
  }
  
  .app {
    padding: 20px;
  }
}
</style>
