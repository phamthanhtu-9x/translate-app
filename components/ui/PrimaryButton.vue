<template>
  <div
    class="flex px-3 py-2 font-medium align-middle transition ease-in-out rounded-lg text-gray login-button hover:text-blue-500"
  >
    <span>
      <slot name="icon" />
    </span>
    <span>
      <slot name="text" />
    </span>
  </div>
</template>
