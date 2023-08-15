<script setup lang="ts">
interface OptionCardProps {
	title: string;
	desc: string;
	icon: string;
	active?: boolean;
	disabled?: boolean;
}
const {title, desc} = defineProps<OptionCardProps>();
</script>
<template>
	<div
		class="inline-block p-3 transition ease-in-out rounded-md cursor-pointer hover:bg-blue-100 min-w-[200px] shadow-md"
		:class="{
			'border border-gray-100': !active,
			'border-2 border-blue-500 pointer-events-none': active,
			'opacity-80 pointer-events-none cursor-not-allowed': disabled,
		}"
	>
		<div class="flex items-center space-x-3">
			<Icon :name="icon" size="1.5em" color="gray" />
			<div>
				<div class="mb-0.5 text-md font-medium">{{ title }}</div>
				<div class="text-sm text-gray-500">{{ desc }}</div>
			</div>
		</div>
	</div>
</template>
