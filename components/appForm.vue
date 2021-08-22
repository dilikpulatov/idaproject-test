<template>
  <div class="app-form">
    <h1>Добавление товара</h1>
    <form
      class="form"
      @submit="onSubmitForm"
    >
      <template v-for="(params, index) in formColumns">
        <app-form-field v-bind="{...params, form, field: index, disabled: formDisabled, errorText: getField(formErrors, index), onChange: onFormFieldChanged}"/>
      </template>
      <app-btn
        type="primary"
        block
        :disabled="!formValidate"
        @click="onSubmitForm"
      >Добавить товар</app-btn>
      <template v-if="debug">
        <pre>{{ form }}</pre>
      </template>
    </form>
  </div>
</template>

<script>
  import { parse as amountParse } from 'vue-currency-input'
  export default {
    name: "appForm",
    data(){
      return {
        form: {...this.formFields},
        formDisabled: false,
        formValidate: false,
        formErrors: {}
      }
    },
    props: {
      debug: {
        type: Boolean,
        default: false
      },
      formFields: {
        type: Object,
        default: () => {}
      },
      formFieldRules: {
        type: Object,
        default: () => {}
      },
      formColumns: {
        type: Object,
        default: () => {}
      },
      setContent: Function
    },
    components: {
      appFormField: () => import('~/components/appFormField'),
      appBtn: () => import('~/components/appBtn'),
    },
    methods: {
      onSubmitForm(){
        this.formValidate = false
        for (let field in this.form) {
          this.onValidateField(field)
        }
        this.formValidate = Object.keys(this.formValidate).length === 0
        if (this.formValidate) {
          this.formDisabled = true
          let data = this.generateFormFields({...this.form})
          this.setContent(data)
            .then(res => {
              console.log(res)
              this.clearForm()
              this.formDisabled = false
            })
            .catch(err => {
              console.log(err)
              this.formDisabled = false
            })
        }
      },
      onFormFieldChanged(value, field){
        this.onValidateField(field)
      },
      onValidateField(field = null) {
        let errors = 0
        for (let field_key in this.form) {
          for (let method in this.formFieldRules[field_key]) {
            let validate = this.formFieldRules[field_key][method](this.form[field_key])
            if (typeof validate === "boolean") {
              this.$set(this.formErrors, field_key, null)
            } else {
              if (!!field) {
                if (field_key === field) {
                  this.$set(this.formErrors, field_key, validate)
                }
                errors++
              } else {
                this.$set(this.formErrors, field_key, validate)
              }
              break
            }
          }
        }
        this.formValidate = errors === 0
      },
      generateFormFields(form){
        if (this.hasFields(form, 'amount')) {
          form.amount = amountParse(form.amount, this.formOptions.amountInput)
        }
        return form
      },
      clearForm(){
        for (let i in this.form) {
          this.$set(this.form, i, null)
        }
      }
    }
  }
</script>

<style lang="stylus" src="@/assets/app-form.styl"></style>
