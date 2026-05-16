<script>
    export default {
        props: {
            game: String, //название игры
            price: Number, //цена
            img: String //картинка
        },
    

        methods: {
            buyGame() {
                alert(`Оплата совершена. Получена игра ${this.game} за ${this.price}₽`)
            }
        },
    };

</script> 

<template>
    <div class="card">
        <h3>{{game}}</h3>
        <img :src="img">
        <p>{{price}}₽</p>
        <button @click="buyGame">Купить</button>
    </div>

</template>

<style scoped>
.card {
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
}
</style>
