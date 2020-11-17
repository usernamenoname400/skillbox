<template>
  <main class="content container" v-if="basketLoading">
    Загрузка корзины....
  </main>
  <main class="content container" v-else-if="basketLoadingFailed">
    Ошибка при загрузке корзины
  </main>
  <main class="content container" v-else>
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
          <router-link
            tag="button"
            :to="{ name: 'order' }"
            class="cart__button button button--primery"
            type="submit"
            :disabled="!cartProductQuantity"
          >
            Оформить заказ
          </router-link>
        </div>
      </form>
    </section>
  </main>
</template>

<script>
import cartDataMixIn from '@/mixins/cartDataMixIn';
import CartItem from '@/components/CartItem.vue';

export default {
  mixins: [cartDataMixIn],
  components: { CartItem },
};
</script>
