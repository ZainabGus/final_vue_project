<script>
  import GameCard from './cardGame.vue'

  export default{
    components: {
      GameCard
    },
    data() {
      return {
        games: [
          { id: 1, name: "Змейка", price: 1999, img: "", purchased: false, inCart: false },
          { id: 2, name: "The Witcher 3", price: 1299, img: "", purchased: false, inCart: false },
          { id: 3, name: "Hollow Knight", price: 399, img: "", purchased: false, inCart: false },
          { id: 4, name: "Cyberpunk 2077", price: 2499, img: "", purchased: false, inCart: false },
          { id: 5, name: "Minecraft", price: 999, img: "", purchased: false, inCart: false },
          { id: 6, name: "Stardew Valley", price: 499, img: "", purchased: false, inCart: false }
        ],
        cart: [],
        search: '',
        showPurchasedOnly: false
      }
    },
    computed: {
      cartCount() {
        return this.cart.length
      },
      filterGames() {
        let result = this.games
  
        if (this.search) {
          result = result.filter(game => 
            game.name.toLowerCase().includes(this.search.toLowerCase())
          )
        }
    
        if (this.showPurchasedOnly) {
          result = result.filter(game => game.purchased === true)
        }
    
        return result
      }
    },
    methods: {
      addToCart(game) {
    // Находим игру и меняем статус
        const foundGame = this.games.find(g => g.name === game.name)
        if (foundGame && !foundGame.purchased && !foundGame.inCart) {
          foundGame.inCart = true
          this.cart.push({ name: game.name, price: game.price })
      
          localStorage.setItem('games', JSON.stringify(this.games))
          localStorage.setItem('cart', JSON.stringify(this.cart))
      
          }
        },
  
        removeFromCart(game) {
    // Находим игру и меняем статус
          const foundGame = this.games.find(g => g.name === game.name)
          if (foundGame) {
            foundGame.inCart = false
            const index = this.cart.findIndex(item => item.name === game.name)
            if (index !== -1) {
              this.cart.splice(index, 1)
            }
      
            localStorage.setItem('games', JSON.stringify(this.games))
            localStorage.setItem('cart', JSON.stringify(this.cart))
      
          }
        },

        playGame(game) {
          if (game.name === "Змейка") {
            // Открываем игру в новой вкладке
            window.open('/games/snake/index.html', '_blank')
          } else {
            alert(`🎮 Игра "${game.name}" скоро появится!`)
          }
        },

        resetGame(game) {
          const foundGame = this.games.find(g => g.id === game.id)
          if (foundGame) {
          // Сбрасываем статусы
            foundGame.purchased = false
            foundGame.inCart = false
      
          // Удаляем из корзины, если там была
            const cartIndex = this.cart.findIndex(item => item.name === game.name)
            if (cartIndex !== -1) {
              this.cart.splice(cartIndex, 1)
            }
      
      // Сохраняем
            localStorage.setItem('games', JSON.stringify(this.games))
            localStorage.setItem('cart', JSON.stringify(this.cart))
          }
        }
    },

    watch: {
      cart: {
        deep: true,
        handler(newCart) {
      // Сбрасываем inCart для всех некупленных игр
          this.games.forEach(game => {
            if (!game.purchased) {
              game.inCart = false
            }
          })
      
      // Устанавливаем inCart для игр, которые в корзине
          newCart.forEach(cartItem => {
            const game = this.games.find(g => g.name === cartItem.name)
            if (game && !game.purchased) {
              game.inCart = true
            }
          })
      
      // Сохраняем изменения
          localStorage.setItem('games', JSON.stringify(this.games))
        }
      }
    },

    mounted() {
      const savedGames = localStorage.getItem('games')
      if (savedGames) {
        this.games = JSON.parse(savedGames)
      }
    
    // Загружаем корзину
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.cart = JSON.parse(savedCart)
      }
      // 🆕 Восстанавливаем inCart из корзины
      this.cart.forEach(cartItem => {
        const game = this.games.find(g => g.name === cartItem.name)
        if (game) {
          game.inCart = true
        }
      })
    }
  }
</script>


<template>
  <div class="app">  
    <header>
      <h1>🎮 Магазин игр</h1>
      <div class="mb-3">
        <label for="search" class="form-label"></label>
        <input 
        type="text" 
        class="form-control" 
        id="search" 
        placeholder="search"
        v-model="search"
        >
      </div>
      <div class="form-check mb-3">
        <input 
          type="checkbox" 
          class="form-check-input" 
          id="purchasedOnly" 
          v-model="showPurchasedOnly"
        >
        <label class="form-check-label" for="purchasedOnly">
          🎮 Показать только купленные игры
        </label>
      </div>
      <router-link to="/cart" class="cart-link">
        Корзина<span class="cart-count">{{ cartCount }}</span>
      </router-link>
    </header>
    
    <div class="games">
      <template v-if="filterGames.length > 0">
      <game-card 
        v-for="game in filterGames" 
        :key="game.id"
        :game-id="game.id"
        :game="game.name"
        :price="game.price"
        :img="game.img"
        :is-purchased="game.purchased"
        :is-in-cart="game.inCart"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @play-game="playGame"
        @reset-game="resetGame" 
      />
      </template>
      <div v-else class="no-results">
        😕 Игр по запросу "{{ search }}" не найдено
      </div>
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
  grid-template-columns: repeat(3, 300px);  
  justify-content: center;
  gap: 25px;
}

.cart-link {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #4CAF50;
  color: white;
  font-size: 24px;
  padding: 12px 18px;
  border-radius: 50px;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.2);
  z-index: 1000;
}

.cart-count {
  background: red;
  color: white;
  font-size: 14px;
  padding: 2px 8px;
  border-radius: 20px;
}

.no-results {
  text-align: center;
  padding: 50px;
  font-size: 18px;
  color: #666;
  grid-column: 1 / -1;
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
