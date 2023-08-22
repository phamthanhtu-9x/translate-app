<template>
  <div class="default">
   <client-only>
      <MainHeader />
      <MainContent>
        <slot />
      </MainContent>
      <MainFooter />
  </client-only>
  </div>
</template>
