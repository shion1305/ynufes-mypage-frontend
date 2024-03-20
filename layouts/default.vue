<script setup lang="ts">
import AppSidebar from '~/layouts/AppSidebar.vue'

useHead({
  title: 'Top',
  titleTemplate: (title) => `${title} | YNU-fes`
})
const user = await useLogin().getCurrentUser()
</script>
<template>
  <div id="dashboard-root-frame">
    <AppSidebar />
    <div id="dashboard-root-content">
      <slot />
    </div>
  </div>
</template>
<style lang="scss" scoped>
#dashboard-root-frame {
  display: flex;
  flex-direction: row;
  width: 100vw;
  height: 100svh;
}

#dashboard-root-content {
  margin-left: 180px;
  width: calc(100vw - 180px);
  height: 100%;
}

@media (max-aspect-ratio: 3/4) and (max-width: 1024px) {
  #dashboard-root-content {
    margin-left: 0;
    width: 100vw;
  }
}
@media (min-aspect-ratio: 3/4) and (max-width: 1024px) {
  #dashboard-root-content {
    margin-left: 80px;
    width: 100vw;
  }
}
@media (max-height: 576px) {
  #dashboard-root-content {
    margin-left: 0;
    width: 100vw;
  }
}
</style>
