<template>
    <svg
      class="loading-overlay"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
</template>

<style scoped>
.loading-overlay {
  width: 20px;
  height: 20px;
  color: rgb(200, 200, 250);
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

.loading-overlay circle {
  opacity: 25%;
}

.loading-overlay path {
  opacity: 100%;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>