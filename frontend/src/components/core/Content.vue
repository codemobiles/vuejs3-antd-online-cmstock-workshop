<template>
  <a-layout-content
    :style="{ margin: '24px 16px', padding: '24px', background: '#fff', minHeight: '280px' }"
  >
    <a-row
      align="center"
      justify="center"
      class="tw-h-full tw-w-full tw-items-center"
      v-if="['/login', '/register'].includes($route.path)"
    >
      <RouterView></RouterView>
    </a-row>
    <RouterView v-else></RouterView>
  </a-layout-content>
</template>
