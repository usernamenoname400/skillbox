<template>
  <div class="form__counter">
    <button type="button" aria-label="Убрать один товар" @click="decrementAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-minus"></use>
      </svg>
    </button>

    <input type="text" v-model="amount">

    <button type="button" aria-label="Добавить один товар" @click="incrementAmount">
      <svg width="12" height="12" fill="currentColor">
        <use xlink:href="#icon-plus"></use>
      </svg>
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      amount: this.value,
    };
  },
  props: ['value'],
  methods: {
    incrementAmount() {
      this.amount += 1;
      this.$emit('input', this.amount);
    },
    decrementAmount() {
      if (this.amount > 1) {
        this.amount -= 1;
      }

      this.$emit('input', this.amount);
    },
  },
  watch: {
    amount(value) {
      this.$emit('input', value);
    },
  },
};
</script>
