<template>
  <div class="cart__block">
    <BasePreloader class="cart__block" v-if="basketLoading" />
    <div class="cart__block" v-else-if="basketLoadingFailed">
      Ошибка при загрузке товаров
    </div>
    <div>
      <ul class="cart__orders">
        <OrderItem v-for="item in cartDetailProducts" :key="item.productId" :item="item" />
      </ul>

      <div class="cart__total">
        <p>Доставка: <b>0 ₽</b></p>
        <p>
          Итого: <b>{{cartProductCount}}</b> на сумму
          <b>{{cartTotalPrice | numberFormat}} ₽</b>
        </p>
      </div>
    </div>

    <button
      class="cart__button button button--primery"
      type="submit"
      :disabled="basketLoading || basketLoadingFailed"
      v-if="!infoMode"
    >
      Оформить заказ
    </button>
  </div>
</template>

<script>
import BasePreloader from '@/components/BasePreloader.vue';
import OrderItem from '@/components/OrderItem.vue';
import numberFormat from '@/helpers/numberFormat';

export default {
  components: { BasePreloader, OrderItem },
  props: [
    'basketLoading',
    'basketLoadingFailed',
    'cartDetailProducts',
    'cartProductCount',
    'cartTotalPrice',
    'infoMode',
  ],
  filters: { numberFormat },
};
</script>
