<script setup lang="ts">
interface SearchPannelProps {
	languageList: any,
	languageActive: any,
}
const {languageActive} = defineProps<SearchPannelProps>()
</script>
<template>
  <div class="min-h-[500px] border border-gray-100 bg-white shadow-md rounded-lg w-full p-4">
    <div
      class="flex items-center p-1.5 border rounded-md search-input border-gray focus:border-blue-100 mb-3"
    >
      <div class="flex items-center justify-center flex-shrink-0 mr-2 w-7 h-7">
        <Icon name="mdi:magnify" size="1.5em" color="gray"></Icon>
      </div>
      <input type="text" placeholder="Language Search" class="w-full outline-none" />
    </div>
    <ul class="grid grid-cols-3 grid-rows-3 gap-4">
      <li>
				<div
					class="flex items-center justify-between p-2 rounded-md cursor-pointer hover:bg-gray-100"
					:class="{
						'text-blue-500 bg-blue-200': languageActive
					}"
				>
					Vietnamese
					<Icon v-if="languageActive" name="mdi:check" size="1.5em" color="#3b82f6"></Icon>
				</div>
			</li>
    </ul>
  </div>
</template>
