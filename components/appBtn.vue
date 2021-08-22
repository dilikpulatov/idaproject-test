<template>
  <button
    :class="btnClass"
    @click="handleClick"
    :disabled="disabled"
    type="button"
  ><slot></slot></button>
</template>

<script>
  export default {
    name: "appBtn",
    props: {
      type: {
        type: String,
        default: 'default'
      },
      disabled: Boolean,
      block: Boolean,
    },
    computed: {
      btnClass(){
        return {
          [`app-btn ${this.type}`]: true,
          'disabled': this.disabled,
          'block': this.block
        }
      }
    },
    methods: {
      handleClick(evt) {
        this.$emit('click', evt);
      }
    }
  }
</script>
