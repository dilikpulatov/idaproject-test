export const state = () => ({
  productList: []
})

export const mutations = {
  setProductList(state, data){
    state.productList = data
  },
  sortContent(state, type){
    switch (type) {
      case 'min_price':
        state.productList = state.productList.sort((a, b) => {
          return a.amount - b.amount
        })
        break;
      case 'max_price':
        state.productList = state.productList.sort((a, b) => {
          return b.amount - a.amount
        })
        break;
      case 'name':
        state.productList = state.productList.sort((a, b) => {
          return a.title.localeCompare(b.title)
        })
        break;
    }
  }
}

export const actions = {
  async getProducts({commit}) {
    await this.$axios.$get('/products')
      .then((response) => {
        commit('setProductList',response)
      });
  },
  setProduct({state, commit}, params) {
    return new Promise((resolve, reject) => {
      this.$axios.$post('/products', params)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
  deleteProduct({state, commit}, id) {
    return new Promise((resolve, reject) => {
      this.$axios.$delete(`/products/${id}`)
        .then(res => resolve(res))
        .catch(err => reject(err))
    })
  },
}

export const getters = {
}
