<template>
  <router-link
    class="header__cart"
    :to="{name: 'cart'}"
    aria-label="Корзина с товарами">
    <svg width="30" height="21" fill="currentColor">
      <use xlink:href="#icon-cart"></use>
    </svg>
    <span
      class="header__count head_count_load"
      v-if="basketLoading">
      ...
    </span>
    <span
      class="header__count head_count_fail"
      v-else-if="basketLoadingFailed">
      ??
    </span>
    <span
      class="header__count head_count_norm"
      aria-label="Количество товаров"
      v-else
    >
      {{$store.state.cartProductCount}}
    </span>
  </router-link>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      basketLoading: true,
      basketLoadingFailed: false,
    };
  },
  methods: {
    ...mapActions(['loadCartCount']),
  },
  mounted() {
    setTimeout(() => {
      if (!this.$store.cartProductCount) {
        this.basketLoading = true;
        this.loadCartCount()
          .then(() => { this.basketLoading = false; })
          .catch(() => {
            this.basketLoading = false;
            this.basketLoadingFailed = true;
          });
      } else {
        this.basketLoading = false;
      }
    },
    0);
  },
};
</script>
