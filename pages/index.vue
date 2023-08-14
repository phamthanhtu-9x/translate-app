<script setup lang="ts">
enum EOPTIONSTRANSLATE {
  TEXT = 'text',
  FILE = 'file',
}
const currentOption = ref<EOPTIONSTRANSLATE>(EOPTIONSTRANSLATE.TEXT);
</script>
<template>
  <UiWrapperContent>
    <div class="flex mb-8 space-x-3">
      <UiOptionCard
        title="Translate text"
        icon="streamline:interface-text-formatting-translate-options-text-translate"
        desc="31 languages"
        :active="currentOption === EOPTIONSTRANSLATE.TEXT ? true : false"
      />
      <UiOptionCard
        title="Translate files"
        desc=".pdf, .docx"
        icon="streamline:interface-file-clipboard-text-edition-form-task-checklist-edit-clipboard"
        :disabled="true"
        :active="currentOption === EOPTIONSTRANSLATE.FILE ? true : false"
      />
    </div>
    <div class="flex">
      <div class="flex-1">
        <div class="flex items-center px-5 mb-5 space-x-3">
          <div><UiTextNormal>Phát hiện ngôn ngữ</UiTextNormal></div>
          <ul class="flex space-x-3">
            <li><UiTextTag :active="true">Anh</UiTextTag></li>
            <li><UiTextTag>Việt</UiTextTag></li>
            <li><UiTextTag>Hàn</UiTextTag></li>
          </ul>
          <UiCirlceButton>
            <Icon name="mdi:chevron-down" size="1.5em" color="gray" />
          </UiCirlceButton>
        </div>
        <UiTextArea />
      </div>
      <UiCirlceButton>
        <Icon name="mdi:swap-horizontal" size="1.5em" color="gray" />
      </UiCirlceButton>
      <div class="flex-1">
        <div class="flex px-5 mb-5">
          <ul class="flex space-x-3">
            <li><UiTextTag :active="true">Việt</UiTextTag></li>
            <li><UiTextTag>Anh</UiTextTag></li>
            <li><UiTextTag>Hàn</UiTextTag></li>
          </ul>
        </div>
        <UiTextArea />
      </div>
    </div>
  </UiWrapperContent>
</template>
