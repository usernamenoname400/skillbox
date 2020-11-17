<template>
  <BaseFormField :title="title" :error="error">
    <input
      class="form__input"
      :type="type"
      :placeholder="placeholder"
      v-model="dataValue"
    >
  </BaseFormField>
</template>

<script>
import formFieldMixIn from '@/mixins/formFieldMixIn';

export default {
  props: {
    type: {
      default: 'text',
    },
  },
  mixins: [formFieldMixIn],
};
</script>
