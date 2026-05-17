<script>
export default {
    data() {
        return {
            cart: []
        }
    },
    computed: {
        count() {
            let k = this.cart.length
            return k
        }    
    },
    mounted() {
        const savedCart = localStorage.getItem('cart')
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
                <span>{{ item.price }} ₽</span>
            </div>
        </div>
    <button @click="clearCart" class="clear-btn">
      🗑️ Очистить корзину
    </button>
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
  padding: 10px;
  border-bottom: 1px solid #ddd;
}
</style>
