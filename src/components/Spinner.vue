<template>
  <div class="d-flex justify-content-center mySpinner">
    <div class="spinner-border text-primary" role="status" style="width: 5em; height: 5em;">
      <span class="sr-only">Loading...</span>
    </div>
  </div>
</template>

<style scoped>
  .mySpinner {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>