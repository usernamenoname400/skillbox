<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link" href="index.html">
            Каталог
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Корзина
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Корзина
      </h1>
      <span class="content__info">
        {{cartProductCount}}
      </span>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <ul class="cart__list">
            <CartItem v-for="item in cartDetailProducts" :key="item.productId" :item="item" />
          </ul>
        </div>

        <div class="cart__block">
          <p class="cart__desc">
            Мы&nbsp;посчитаем стоимость доставки на&nbsp;следующем этапе
          </p>
          <p class="cart__price">
            Итого: <span>{{cartTotalPrice | numberFormat}} ₽</span>
          </p>

          <button class="cart__button button button--primery" type="submit">
            Оформить заказ
          </button>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import CartItem from '@/components/CartItem.vue';
import numberFormat from '@/helpers/numberFormat';
import { mapGetters } from 'vuex';
import numberOfProducts from '@/helpers/numberOfProducts';

export default {
  components: { CartItem },
  filters: { numberFormat },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice']),
    cartProductCount() {
      return numberOfProducts(this.$store.state.cartProducts.length);
    },
  },
  methods: {
    numberOfProducts,
  },
};
</script>
