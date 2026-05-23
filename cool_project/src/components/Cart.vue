<script>
export default {
    data() {
        return {
            cart: []
        }
    },
    computed: {
        count() {
            let k = this.cart.length;
            return k
        }    
    },
    mounted() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
        this.cart = JSON.parse(savedCart)
        }
    },
    methods: {
        clearCart() {
            if (confirm('Точно очистить корзину?')) {
                this.cart = []
                localStorage.setItem('cart', JSON.stringify(this.cart))
            }
        },
        buyGame(index) {
            const game = this.cart[index];
            this.cart.splice(index, 1)
            this.saveCart()

            const savedGames = localStorage.getItem('games')
            if (savedGames) {
                let games = JSON.parse(savedGames)
                const foundGame = games.find(g => g.name === game.name)
                if (foundGame) {
                    foundGame.purchased = true  // Игра куплена!
                };
                localStorage.setItem('games', JSON.stringify(games));

            }
            alert(`🎉 Поздравляем! Вы купили "${game.name}"! Перейдите на главную страницу и начните играть`);
        },

        removeGame(index) {
            const game = this.cart[index]
            if (confirm(`Удалить "${game.name}" из корзины?`)) {
                this.cart.splice(index, 1)
                this.saveCart()
                alert(`❌ "${game.name}" удалена из корзины`)
            }
        },

        saveCart() {
            localStorage.setItem('cart', JSON.stringify(this.cart))
        }
    } 

}
</script>

<template>
    <div class="cart-page">
        <h1>Корзина</h1>

        <div v-if="count === 0">
            <p>Корзина пуста</p>
            <router-link to="/">← Вернуться в магазин</router-link>
        </div>

        <div v-else>
            <div v-for="(item, index) in cart" :key="index" class="cart-item">
                <span>{{ item.name }}</span>
                

                <div class="button">
                    <span class="money">{{ item.price }} ₽</span>
                    <button @click="buyGame(index)" type="button" class="btn btn-success">
                        Купить
                    </button>
                    <button @click="removeGame(index)" type="button" class="btn btn-danger">
                        ❌
                    </button>
                </div>
            </div>

            <button @click="clearCart" type="button" class="btn btn-secondary">
                🗑️ Очистить корзину
            </button>
        </div>
    
    </div>
</template>

<style>
.cart-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  margin-bottom: 10px;
}

.button {
  display: flex;
  gap: 10px;
}

.buy-cart-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  cursor: pointer;
}

.remove-btn {
  background: #ff4444;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 6px;
  cursor: pointer;
}

.money {
    font-size: 20px;
    color: green;
}
</style>
