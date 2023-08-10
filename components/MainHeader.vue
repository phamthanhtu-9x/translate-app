<template>
  <header>
    <UiWrapperContent>
      <div class="flex justify-between">
        <div class="text-3xl font-semibold text-blue-500 logo">Translate</div>
        <div class="flex space-x-3 header-actions">
          <NuxtLink to="/login">
            <UiPrimaryButton>
              <template #icon>
                <Icon name="teenyicons:user-circle-outline" color="white" size="1.5em" />
              </template>
              <template #text> Login </template>
            </UiPrimaryButton>
          </NuxtLink>
        </div>
      </div>
    </UiWrapperContent>
  </header>
</template>
