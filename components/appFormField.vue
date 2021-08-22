<template>
  <div class="form-field">
    <label :for="`field-${field}`">{{ label }} <span v-if="required">*</span></label>
    <input
      v-if="type === 'text'"
      v-model="form[field]"
      type="text"
      :id="`field-${field}`"
      :placeholder="placeholder"
      :required="required"
      @change="onChange($event, field)"
      @blur="onChange($event, field)"
    >
    <textarea
      v-else-if="type === 'textarea'"
      v-model="form[field]"
      :id="`field-${field}`"
      :placeholder="placeholder"
      :required="required"
      v-bind="attributes"
      @change="onChange($event, field)"
      @blur="onChange($event, field)"
    ></textarea>
    <input
      v-else-if="type === 'amount'"
      v-model="form[field]"
      v-amount="formOptions.amountInput"
      type="text"
      :id="`field-${field}`"
      :placeholder="placeholder"
      :required="required"
      @change="onChange($event, field)"
      @blur="onChange($event, field)"
    >
    <span v-if="!!errorText" class="form-hint">{{ errorText }}</span>
  </div>
</template>

<script>
  import { CurrencyDirective } from 'vue-currency-input'
  export default {
    name: "appFormField",
    props: {
      type: {
        type: String,
        default: 'text'
      },
      form: {
        type: Object,
        required: true
      },
      field: {
        type: String,
        required: true
      },
      attributes: {
        type: Object,
        default: () => {}
      },
      errorText: String,
      label: String,
      placeholder: String,
      disabled: {
        type: Boolean,
        default: false
      },
      required: {
        type: Boolean,
        default: false
      },
      onChange: Function
    },
    directives: {
      'amount': CurrencyDirective
    }
  }
</script>
