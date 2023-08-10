<template>
  <div
    class="flex px-3 py-2 space-x-2 text-white align-middle bg-blue-500 rounded-lg login-button hover:opacity-80"
  >
    <span>
      <slot name="icon" />
    </span>
    <span>
      <slot name="text" />
    </span>
  </div>
</template>
