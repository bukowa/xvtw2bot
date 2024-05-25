<template>
  <div class="tab">
    <div class="tab-inner">
      <div>
        <a :href="url" class="btn-icon btn-orange">{{ name }}</a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabItem',
  props: {
    name: String,
    url: String
  },
}
</script>