<template>
  <div class="app-list">
    <div class="app-list-header">
      <select
        v-if="!!sortContent"
        v-model="sort"
      >
        <option value="null" disabled>По умолчанию</option>
        <option value="min_price">Цена по возрастанию</option>
        <option value="max_price">Цена по убыванию</option>
        <option value="name">По наименованию</option>
      </select>
    </div>
    <transition-group
      name="card"
      tag="div"
      class="app-list-columns"
      mode="out-in"
    >
      <article
        v-for="v in list"
        :key="v.id"
      >
        <div class="app-list-card">
          <div class="card-image">
            <img :src="v.image" :alt="v.title">
          </div>
          <div class="card-content">
            <h2>{{ v.title }}</h2>
            <p>{{ v.description }}</p>
            <b class="amount">{{ v.amount | amount }} руб.</b>
          </div>
          <button
            v-if="!!deleteContent"
            @click="onDeleteContent(v.id)"
            class="action"
          >
            <img src="/trash.svg" alt="">
          </button>
        </div>
      </article>
    </transition-group>
  </div>
</template>

<script>
  export default {
    name: "productList",
    data(){
      return {
        sort: null
      }
    },
    props: {
      list: {
        type: Array,
        default: () => []
      },
      getContents: {
        type: Function,
        required: true
      },
      sortContent: Function,
      deleteContent: Function,
    },
    watch: {
      sort(val){
        if (!!val) {
          this.sortContent(val)
        }
      }
    },
    methods: {
      updateContents(){
        this.getContents()
      },
      onDeleteContent(id){
        if (confirm('Вы действительно хотите удалить?')) {
          this.deleteContent(id)
            .then(() => {
              this.updateContents()
            })
        }
      }
    },
    mounted() {
      this.updateContents()
    }
  }
</script>

<style lang="stylus" src="@/assets/app-list.styl"></style>
