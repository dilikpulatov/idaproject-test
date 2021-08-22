<template>
  <div class="app">
    <div class="container">
      <app-form ref="appForm" v-bind="formParams"/>
      <app-list ref="appList" v-bind="listParams"/>
    </div>
  </div>
</template>

<script>
  import { mapActions, mapState, mapMutations } from 'vuex'
  export default {
    computed: {
      ...mapState(['productList']),
      formParams(){
        return {
          debug: false,
          formFields: {
            title: null,
            description: null,
            image: null,
            amount: null
          },
          formColumns: {
            title: {
              type: 'text',
              label: 'Наименование товара',
              placeholder: 'Введите наименование товара',
              required: true,
            },
            description: {
              type: 'textarea',
              label: 'Описание товара',
              placeholder: 'Введите описание товара',
              attributes: {
                rows: 4
              }
            },
            image: {
              type: 'text',
              label: 'Ссылка на изображение товара',
              placeholder: 'Введите ссылку',
              required: true
            },
            amount: {
              type: 'amount',
              label: 'Цена товара',
              placeholder: 'Введите цену',
              required: true
            }
          },
          formFieldRules: {
            title: [this.formRules.required],
            image: [this.formRules.required],
            amount: [this.formRules.required]
          },
          setContent: this.setContent
        }
      },
      listParams(){
        return {
          list: this.productList,
          ...mapActions({
            getContents: 'getProducts',
            deleteContent: 'deleteProduct'
          }),
          ...mapMutations(['sortContent'])
        }
      }
    },
    components: {
      appForm: () => import('~/components/appForm'),
      appList: () => import('~/components/appList'),
    },
    methods: {
      ...mapActions(['setProduct']),
      setContent(params){
        return new Promise((resolve, reject) => {
          this.setProduct(params)
            .then(res => {
              resolve(res)
              this.$refs.appList.updateContents()
            })
            .catch(err => {
              reject(err)
            })
        })
      }
    }
  }
</script>

<style lang="stylus" src="@/assets/app.styl"></style>
