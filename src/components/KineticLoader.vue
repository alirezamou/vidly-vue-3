<template>
  <div class="loading"></div>
</template>
<script>
export default {
    
}
</script>

<style scoped>
.loading {
  position: relative;
}

.loading::before,
.loading::after {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  content: "";
  border: 30px solid transparent;
  border-bottom-color: rgba(150, 150, 200, 0.8);
}

.loading::before {
  transform: rotate(90deg);

  animation-name: rotateOne;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  animation-delay: 0.5s;
}

.loading::after {
  animation-name: rotateTwo;
  animation-duration: 2s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes rotateOne {
  0%,
  25% {
    transform: rotate(0);
  }
  50%,
  75% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes rotateTwo {
  0%,
  25% {
    transform: rotate(90deg);
  }
  50%,
  75% {
    transform: rotate(270deg);
  }
  100% {
    transform: rotate(450deg);
  }
}
</style>