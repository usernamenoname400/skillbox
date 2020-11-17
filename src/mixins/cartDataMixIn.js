import { mapGetters, mapActions } from 'vuex';
import numberFormat from '@/helpers/numberFormat';
import numberOfProducts from '@/helpers/numberOfProducts';

export default {
  data() {
    return {
      basketLoading: true,
      basketLoadingFailed: false,
    };
  },
  filters: { numberFormat },
  computed: {
    ...mapGetters(['cartDetailProducts', 'cartTotalPrice', 'cartProductQuantity']),
    cartProductCount() {
      return numberOfProducts(this.cartProductQuantity);
    },
  },
  methods: {
    ...mapActions(['loadCart']),
  },
  mounted() {
    this.basketLoading = true;
    setTimeout(() => {
      this.loadCart()
        .then(() => { this.basketLoading = false; })
        .catch(() => {
          this.basketLoading = false;
          this.basketLoadingFailed = false;
        });
    },
    1000);
  },
};
