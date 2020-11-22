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
          <a class="breadcrumbs__link" href="cart.html">
            Корзина
          </a>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            Оформление заказа
          </a>
        </li>
      </ul>

      <h1 class="content__title">
        Заказ оформлен <span>№ {{orderInfoMain.id}}</span>
      </h1>
    </div>

    <section class="cart">
      <form class="cart__form form" action="#" method="POST">
        <div class="cart__field">
          <p class="cart__message">
            Благодарим за&nbsp;выбор нашего магазина. На&nbsp;Вашу почту придет
            письмо с&nbsp;деталями заказа. Наши менеджеры свяжутся с&nbsp;Вами
            в&nbsp;течение часа для уточнения деталей доставки.
          </p>

          <ul class="dictionary">
            <li class="dictionary__item">
              <span class="dictionary__key">
                Получатель
              </span>
              <span class="dictionary__value">
                {{orderInfoMain.name}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Адрес доставки
              </span>
              <span class="dictionary__value">
                {{orderInfoMain.address}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Телефон
              </span>
              <span class="dictionary__value">
                {{orderInfoMain.phone}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Email
              </span>
              <span class="dictionary__value">
                {{orderInfoMain.email}}
              </span>
            </li>
            <li class="dictionary__item">
              <span class="dictionary__key">
                Способ оплаты
              </span>
              <span class="dictionary__value">
                картой при получении
              </span>
            </li>
          </ul>
        </div>

        <OrderProducts
          :basket-loading="false"
          :basket-loading-failed="false"
          :cart-detail-products="orderProducts"
          :cart-product-count="orderProductCount"
          :cart-total-price="orderTotalPrice"
          :info-mode="true"
        />
      </form>
    </section>
  </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import numberOfProducts from '@/helpers/numberOfProducts';
import OrderProducts from '@/components/OrderProducts.vue';

export default {
  components: { OrderProducts },
  methods: {
    ...mapActions(['loadOrderInfo']),
  },
  computed: {
    ...mapGetters(['orderProductQuantity', 'orderTotalPrice', 'orderProducts', 'orderInfoMain']),
    orderProductCount() {
      return numberOfProducts(this.orderProductQuantity);
    },
  },
  watch: {
    // eslint-disable-next-line
    '$route.params.id': {
      handler() {
        if (
          this.$store.state.orderInfo
           && this.$store.state.orderInfo.id === this.$route.params.id
        ) {
          return;
        }
        this.loadOrderInfo(this.$route.params.id)
          .catch(() => {
            this.$router.replace({ name: 'notfound', params: { 0: this.$route.path } });
          });
      },
      immediate: true,
    },
  },
};
</script>
