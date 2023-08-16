<script setup lang="ts">
enum EOPTIONSTRANSLATE {
  TEXT = 'text',
  FILE = 'file',
}
const currentOption = ref<EOPTIONSTRANSLATE>(EOPTIONSTRANSLATE.TEXT);

const handleTextAreaChange = (value: string) => {
  console.log('in data', value);
}

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
      <div class="relative flex-1">
        <div class="flex items-center px-5 mb-5 space-x-3">
          <div>
            <UiTextNormal>Detect language</UiTextNormal>
          </div>
          <ul class="flex space-x-3">
            <li>
              <UiTextTag :active="true">English</UiTextTag>
            </li>
            <li>
              <UiTextTag>Vietnamese</UiTextTag>
            </li>
          </ul>
          <HeadlessPopover>
            <HeadlessPopoverButton class="outline-none">
              <UiCirlceButton>
                <Icon name="mdi:chevron-down" size="1.5em" color="gray" />
              </UiCirlceButton>
            </HeadlessPopoverButton>
            <HeadlessTransitionRoot
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessPopoverPanel class="absolute left-0 z-10 top-[54px] w-full">
                <UiSearchPannel />
              </HeadlessPopoverPanel>
            </HeadlessTransitionRoot>
          </HeadlessPopover>
        </div>
        <UiTextArea :edited="true" :focus="true" @onChangeTextarea="handleTextAreaChange"/>
      </div>
      <UiCirlceButton>
        <Icon name="mdi:swap-horizontal" size="1.5em" color="gray" />
      </UiCirlceButton>
      <div class="relative flex-1">
        <div class="flex px-5 mb-5 space-x-3">
          <ul class="flex space-x-3">
            <li>
              <UiTextTag :active="true">Vietnamese</UiTextTag>
            </li>
            <li>
              <UiTextTag>English</UiTextTag>
            </li>
          </ul>
          <HeadlessPopover>
            <HeadlessPopoverButton class="outline-none">
              <UiCirlceButton>
                <Icon name="mdi:chevron-down" size="1.5em" color="gray" />
              </UiCirlceButton>
            </HeadlessPopoverButton>
            <HeadlessTransitionRoot
              enter="transition ease-out duration-200"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <HeadlessPopoverPanel class="absolute left-0 z-10 top-[54px] w-full">
                <UiSearchPannel />
              </HeadlessPopoverPanel>
            </HeadlessTransitionRoot>
          </HeadlessPopover>
        </div>
        <UiTextArea :loading="false">Translation</UiTextArea>
      </div>
    </div>
  </UiWrapperContent>
</template>
