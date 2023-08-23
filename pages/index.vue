<script setup lang="ts">
import {
  formatPastedContent,
  sortLanguages,
  addLanguageToList,
  getLanguageName,
} from '../helpers/translate.helper';
import {Language} from '../types/index';
import {getSupportedLanguages} from '../api/language';
import {translateGenerateResult} from '../api/translate';
import {EOPTIONSTRANSLATE, ETRANSLATE} from '../enums/translate';

const buttonLanguageOut = ref();
const contentInRef = ref();
const currentOption = ref<EOPTIONSTRANSLATE>(EOPTIONSTRANSLATE.TEXT);

const currentLanguageIn: Language = reactive({
  language: '',
});
const currentLanguageOut: Language = reactive({
  language: ETRANSLATE.LANGUAGE_OUT_DEFAULT,
});
const state = reactive<{
  languagesListOut: Language[];
  translationContent: any;
  translateLoading: boolean;
}>({
  languagesListOut: [
    {
      language: ETRANSLATE.LANGUAGE_OUT_DEFAULT,
    },
  ],
  translationContent: ETRANSLATE.PLACEHOLDER,
  translateLoading: false,
});

const {data: dataLanguages}: {data: Ref} = await useAsyncData('languages', () =>
  getSupportedLanguages(),
);

const languagesListOut = computed(() => {
  return sortLanguages(state.languagesListOut);
});

const handleTextAreaChange = async (value: string, isValid: boolean, textAreaRef?: any) => {
  if (value === '' || !isValid) {
    state.translationContent = ETRANSLATE.PLACEHOLDER;
    return;
  }
  // Get textareaRef from TextArea Component
  if (textAreaRef) {
    contentInRef.value = textAreaRef.value;
  }

  state.translateLoading = true;
  const payload = {
    text: formatPastedContent(value),
    source: '',
    target: currentLanguageOut.language,
  };

  const {data: dataTranslate}: {data: Ref} = await useAsyncData(
    'translate',
    () => translateGenerateResult(payload),
    {
      server: false,
    },
  );

  state.translateLoading = false;
  state.translationContent = dataTranslate.value?.data;

  if (currentLanguageIn.language !== dataTranslate.value?.source) {
    currentLanguageIn.name = getLanguageName(
      dataLanguages.value.data?.languages,
      dataTranslate.value?.source,
    );
    currentLanguageIn.language = dataTranslate.value?.source;
  }
};

const handleSelectedLanguageOut = async (language: Language, isSwitch?: boolean) => {
  if (!isSwitch) {
    // Close pannel
    buttonLanguageOut.value.$el.click();
  }

  if (language.language === currentLanguageIn.language) return;

  currentLanguageOut.name = language.name;
  currentLanguageOut.language = language.language;

  if (!isSwitch) {
    state.languagesListOut = addLanguageToList(state.languagesListOut, language.language);
  }

  if (state.translationContent === ETRANSLATE.PLACEHOLDER) return;

  state.translateLoading = true;

  const payload = {
    text: state.translationContent,
    source: '',
    target: currentLanguageOut.language,
  };

  const {data: dataTranslate}: {data: Ref} = await useAsyncData(
    'translate',
    () => translateGenerateResult(payload),
    {
      server: false,
    },
  );

  state.translateLoading = false;
  state.translationContent = dataTranslate.value?.data;
};

const handleSwapTranslate = () => {
  if (state.translationContent === ETRANSLATE.PLACEHOLDER) return;

  const temp = {
    content: state.translationContent,
    language: currentLanguageOut.language,
  };

  if (state.translationContent !== ETRANSLATE.PLACEHOLDER) {
    state.translationContent = contentInRef.value.innerHTML;
    contentInRef.value.innerHTML = temp.content;
  }

  state.languagesListOut = addLanguageToList(state.languagesListOut, currentLanguageIn.language);

  currentLanguageOut.language = currentLanguageIn.language;
  currentLanguageIn.language = temp.language;
};
</script>
<template>
  <UiWrapperContent>
    <div class="flex mb-8 space-x-3">
      <UiOptionCard
        title="Translate text"
        icon="streamline:interface-text-formatting-translate-options-text-translate"
        desc="136 languages"
        :active="currentOption === EOPTIONSTRANSLATE.TEXT ? true : false"
      />
      <UiOptionCard
        title="Translate file"
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
          <ul v-if="currentLanguageIn.language !== ''" class="flex space-x-3">
            <li>
              <UiTextTag :active="true">{{
                getLanguageName(dataLanguages.data.languages, currentLanguageIn.language)
              }}</UiTextTag>
            </li>
          </ul>
        </div>
        <UiTextArea :edited="true" :focus="true" @onChangeTextarea="handleTextAreaChange" />
      </div>
      <UiCirlceButton @click="handleSwapTranslate">
        <Icon name="mdi:swap-horizontal" size="1.5em" color="gray" />
      </UiCirlceButton>
      <div class="relative flex-1">
        <div class="flex px-5 mb-5 space-x-3">
          <ul v-if="currentLanguageOut.language !== ''" class="flex space-x-3">
            <li v-for="language in languagesListOut" :key="language.language">
              <UiTextTag
                :active="language.language === currentLanguageOut.language"
                @click="handleSelectedLanguageOut(language, true)"
              >
                {{ getLanguageName(dataLanguages.data.languages, language.language) }}</UiTextTag
              >
            </li>
          </ul>
          <HeadlessPopover>
            <HeadlessPopoverButton ref="buttonLanguageOut" class="outline-none">
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
                <UiSearchPannel
                  :language-list="dataLanguages"
                  :language-active="currentLanguageOut.language"
                  @selected-language="handleSelectedLanguageOut"
                />
              </HeadlessPopoverPanel>
            </HeadlessTransitionRoot>
          </HeadlessPopover>
        </div>
        <UiTextArea :loading="state.translateLoading">
          <span v-html="state.translationContent"></span>
        </UiTextArea>
      </div>
    </div>
  </UiWrapperContent>
</template>
