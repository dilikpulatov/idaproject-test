import Vue from 'vue'

export default async () => {
  await Vue.mixin({
    computed: {
      formRules(){
        return {
          required: value => !!value ? true : 'Поле является обязательным'
        }
      },
      formOptions(){
        return {
          amountInput: {
            valueAsInteger: true,
            allowNegative: true,
            currency: null,
            locale: undefined, // 'en',
            precision: 0,
          },
        }
      }
    },
    methods: {
      hasFields(field, ...items){
        if (typeof field === 'undefined' || field === null) {
          return false;
        }
        let args = items;
        for (let i in args) {
          let item = args[i]
          if (typeof field[item] !== 'undefined') {
            field = field[item]
          }else{
            return false;
          }
        }
        return true;
      },
      getField(content, item, default_value = null){
        return this.hasFields(content, item) ? content[item] : default_value
      },
      isEmptyValue(variable){
        return typeof variable === 'undefined' ||
          variable === '' ||
          variable === null ||
          !variable;

      },
      isRegExp(value, pattern, error_text, callback){
        let reg = new RegExp(pattern);
        return !!value && !reg.test(value) ? callback(this.$t(error_text)) : callback()
      },
    }
  })
}
