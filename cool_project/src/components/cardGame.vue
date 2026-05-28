<script>
    export default {
        props: {
            gameId: Number,
            game: String, //название игры
            price: Number, //цена
            img: String, //картинка
            isPurchased: {  //получаем статус от родителя
              type: Boolean,
              default: false
            },
            isInCart: {          
              type: Boolean,
              default: false
            }
            
        },

        methods: {
          addToCart() {
            this.$emit('add-to-cart', { 
              id: this.gameId,
              name: this.game, 
              price: this.price 
            })
          },
    
          removeFromCart() {
            this.$emit('remove-from-cart', { 
              id: this.gameId,
              name: this.game, 
              price: this.price 
            })
          },
    
          playGame() {
            this.$emit('play-game', { 
              name: this.game 
            })
          },

          resetGame() {
            if (confirm(`Сбросить прогресс игры "${this.game}"? Она снова станет доступна для покупки.`)) {
              this.$emit('reset-game', { 
                id: this.gameId,
                name: this.game 
              })
            }
          }
        }
    };

</script> 

<template>
    <div class="game-card">
        <h3 class="card-text">{{game}}</h3>
        <img class="card-image" :src="img">
        <p v-if="!isPurchased" class="price">{{price}}₽</p>

        <div v-if="isPurchased" class="buttons">
        <button @click="resetGame" type="button" class="btn btn-danger">
          ✕ Удалить
        </button>
        <button  
          @click="playGame" 
          type="button" class="btn btn-success"
        >
          Играть 🎮 
        </button>
        </div>

        <button 
          v-if="!isInCart && !isPurchased" 
          @click="addToCart" 
          type="button" class="btn btn-primary"
        >
          Добавить в корзину
        </button>
    
    <!-- Кнопка 2: игра В корзине, но НЕ куплена -->
        <button 
          v-else-if="isInCart && !isPurchased" 
          @click="removeFromCart" 
          type="button" class="btn btn-danger"
        >
          Удалить из корзины
        </button>
    
   
        
    </div>

</template>

<style>
.game-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0,0,0,0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  cursor: pointer;
  padding: 15px
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0,0,0,0.4);
}

.card-image {
  width: 100%; 
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: 20px
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.card-text {
  padding: 20px;
}

.game-card h3 {
  font-size: 24px; 
  margin: 0 0 15px 0;
  color: #1a1a2e;
}

.price-container {
  margin-bottom: 20px;
}

.price {
  font-size: 20px;  
  font-weight: bold;
  color: #4CAF50;
}

.buy-btn {
  width: 100%;
  padding: 14px;  
  background: #44b0eb;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;  
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 15px
}

.buy-btn:hover {
  background: #2a92c9;
}

.remove-btn {
  width: 100%;
  padding: 14px;
  background: #ff4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 15px;
}

.remove-btn:hover {
  background: #cc0000;
}

.play-btn {
  width: 100%;
  padding: 14px;
  background: #2196F3;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 15px;
}

.play-btn:hover {
  background: #0b7dda;
}

.buttons {
  display: flex;
  flex-direction: column;  /* ← вертикальное расположение */
  gap: 10px;               /* ← расстояние между кнопками */
  margin-top: 15px;
}
</style>
