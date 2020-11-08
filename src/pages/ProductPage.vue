<template>
  <main class="content container">
    <div class="content__top">
      <ul class="breadcrumbs">
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            Каталог
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <router-link class="breadcrumbs__link" :to="{name: 'main'}">
            {{category.title}}
          </router-link>
        </li>
        <li class="breadcrumbs__item">
          <a class="breadcrumbs__link">
            {{product.title}}
          </a>
        </li>
      </ul>
    </div>

    <section class="item">
      <div class="item__pics pics">
        <div class="pics__wrapper">
          <img
            width="570"
            height="570"
            :src="product.image"
            :alt="product.title">
        </div>
      </div>

      <div class="item__info">
        <span class="item__code">Артикул: {{product.id}}</span>
        <h2 class="item__title">
          {{product.title}}
        </h2>
        <div class="item__form">
          <form class="form" action="#" method="POST" @submit.prevent="addToCart">
            <b class="item__price">
              {{product.price | numberFormat}} ₽
            </b>

            <fieldset class="form__block">
              <legend class="form__legend">Цвет:</legend>
              <ul class="colors">
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item"
                    value="blue" checked="">
                    <span class="colors__value" style="background-color: #73B6EA;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item"
                    value="yellow">
                    <span class="colors__value" style="background-color: #FFBE15;">
                    </span>
                  </label>
                </li>
                <li class="colors__item">
                  <label class="colors__label">
                    <input class="colors__radio sr-only" type="radio" name="color-item"
                    value="gray">
                    <span class="colors__value" style="background-color: #939393;">
                  </span></label>
                </li>
              </ul>
            </fieldset>

            <fieldset class="form__block">
              <legend class="form__legend">Объемб в ГБ:</legend>

              <ul class="sizes sizes--primery">
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item"
                    value="32">
                    <span class="sizes__value">
                      32gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item"
                    value="64">
                    <span class="sizes__value">
                      64gb
                    </span>
                  </label>
                </li>
                <li class="sizes__item">
                  <label class="sizes__label">
                    <input class="sizes__radio sr-only" type="radio" name="sizes-item"
                    value="128" checked="">
                    <span class="sizes__value">
                      128gb
                    </span>
                  </label>
                </li>
              </ul>
            </fieldset>

            <div class="item__row">
              <AmountSpinner v-model="productAmount"/>

              <button class="button button--primery" type="submit">
                В корзину
              </button>
            </div>
          </form>
        </div>
      </div>

      <div class="item__desc">
        <ul class="tabs">
          <li class="tabs__item">
            <a class="tabs__link tabs__link--current">
              Описание
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Характеристики
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Гарантия
            </a>
          </li>
          <li class="tabs__item">
            <a class="tabs__link" href="#">
              Оплата и доставка
            </a>
          </li>
        </ul>

        <div class="item__content">
          <p>
            Навигация GPS, ГЛОНАСС, BEIDOU Galileo и QZSS<br/>
            Синхронизация со смартфоном<br/>
            Связь по Bluetooth Smart, ANT+ и Wi-Fi<br/>
            Поддержка сторонних приложений<br/>
          </p>

          <a href="#">
            Все характеристики
          </a>

          <h3>Что это?</h3>

          <p>
          </p>

          <h3>Дизайн</h3>

          <p>
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<script>
import products from '@/data/products';
import categories from '@/data/categories';
import gotoPage from '@/helpers/gotoPage';
import numberFormat from '@/helpers/numberFormat';
import AmountSpinner from '@/components/AmountSpinner.vue';

export default {
  data() {
    return {
      productAmount: 1,
    };
  },
  components: {
    AmountSpinner,
  },
  filters: {
    numberFormat,
  },
  computed: {
    product() {
      return products.find((product) => product.id === +this.$route.params.id);
    },
    category() {
      return categories.find((category) => category.id === this.product.categoryId);
    },
  },
  methods: {
    gotoPage,
    addToCart() {
      this.$store.commit(
        'addProductToCart',
        { productId: this.product.id, amount: this.productAmount },
      );
    },
  },
  /* Если не поставить данный хук, то при первом входе на страницу товара,
     проверка идентификатора товара не производится. Watch срабатывает только
     при переходе с товара на товар */
  beforeRouteEnter(to, from, next) {
    if (products.find((product) => product.id === +to.params.id)) {
      next();
    } else {
      next({ name: 'notfound', params: { 0: to.path } });
    }
  },
  watch: {
    /* Без этой директивы, eslint-у не нравятся имена методов в кавычках */
    // eslint-disable-next-line
    '$route.params.id'() {
      if (!this.product) {
        this.$router.replace({ name: 'notfound', params: { 0: this.$route.path } });
      }
    },
  },
};
</script>
