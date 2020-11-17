<template>
  <BaseFormField :title="title" :error="error">
    <textarea
      class="form__input form__input--area"
      :placeholder="placeholder"
      v-model="dataValue"
    />
  </BaseFormField>
</template>

<script>
import formFieldMixIn from '@/mixins/formFieldMixIn';

export default {
  mixins: [formFieldMixIn],
};
</script>
