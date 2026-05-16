<script>
    export default {
        props: {
            game: String, //название игры
            price: Number, //цена
            img: String //картинка
        },

        data() {
            return {
                button: "Добавить в корзину",
                isClicked: false
            }
        },

        methods: {
            toggle() {
                this.isClicked = !this.isClicked;
                if(this.isClicked) {
                    this.button = "Удалить из корзины"
                }else{
                    this.button = "Добавить в корзину"
                }
            }
        },
    };

</script> 

<template>
    <div class="game-card">
        <h3 class="card-text">{{game}}</h3>
        <img class="card-image" :src="img">
        <p class="price">{{price}}₽</p>
        <button :class="{'active': isClicked, 'buy-btn': !isClicked }" @click="toggle">{{button}}</button>
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

.active {
  width: 100%;
  padding: 14px;  
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 18px;  
  cursor: pointer;
  transition: background 0.3s ease;
  margin-top: 15px;
  background: #eb4f46;
}
</style>
