<template>
	<header>
		<UiWrapperContent>
			<div class="flex justify-between py-2.5">
				<NuxtLink to="/">
					<div class="text-3xl font-medium text-blue-500 logo">Translate</div>
				</NuxtLink>
				<div class="flex space-x-3 header-actions">
					<NuxtLink to="/login">
						<UiPrimaryButton>
							<template #text> Login </template>
						</UiPrimaryButton>
					</NuxtLink>
				</div>
			</div>
		</UiWrapperContent>
	</header>
</template>
