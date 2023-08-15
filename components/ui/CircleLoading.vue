<script setup lang="ts">
interface CircleLoadingProps {
  size?: string;
  color?: string;
}
const {size, color} = withDefaults(defineProps<CircleLoadingProps>(), {
  size: '1.5em',
  color: 'gray',
});
</script>
<template>
  <Icon name="svg-spinners:tadpole" :size="size" :color="color" />
</template>
