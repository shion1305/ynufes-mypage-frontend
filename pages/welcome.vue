<script lang="ts" setup>
import { useLogin } from '~/composables/useLogin'
import { useUserInfo } from '~/composables/useUserInfo'
useHead({ title: 'welcome' })
definePageMeta({
  layout: false
})
const firstName = ref<string>('')
const lastName = ref<string>('')
const firstNameKana = ref<string>('')
const lastNameKana = ref<string>('')
const email = ref<string>('')
const gender = ref<number>()
const studentID = ref<string>()
const checked = ref<boolean>()

const submit = async () => {
  if (!checked.value) {
    return
  }
  const userInfo: UserInfo = {
    name_first: firstName.value,
    name_first_kana: firstNameKana.value,
    name_last: lastName.value,
    name_last_kana: lastNameKana.value,
    email: email.value,
    gender: Number(gender.value),
    student_id: studentID.value as string
  }
  await useUserInfo()
    .updateUserInfo(userInfo)
    .then(() => {
      console.log('success')
      navigateTo('/')
    })
    .catch((e) => {
      console.log(e)
      navigateTo('/welcome')
    })

  console.log(userInfo)
}

const user = await useLogin().getCurrentUser()
</script>
<template>
  <main class="surface-ground w-screen min-h-screen p-2">
    <PageTitle
      pageTitle="初期情報登録画面"
      style="max-width: 756px"
      class="mx-auto my-4"
    />
    <Card
      class="bg-white shadow-none w-99 m-auto mt-2 p-0 border-round-lg"
      style="max-width: 756px"
    >
      <template #content>
        <div class="flex justify-content-center mb-1">
          <Avatar :image="user?.profile_icon_url" size="large" shape="circle" />
        </div>
        <p class="text-base font-bold mb-2">お名前</p>
        <InputGroup class="flex gap-3">
          <InputText
            v-model="lastName"
            placeholder="姓"
            type="text"
            class="border-round-lg h-2rem util-color-placeholder"
          />
          <InputText
            v-model="firstName"
            placeholder="名"
            type="text"
            class="border-round-lg h-2rem util-color-placeholder"
          />
        </InputGroup>
        <p class="text-base font-bold mb-2 mt-4">お名前(カタカナ)</p>
        <InputGroup class="flex gap-3">
          <InputText
            v-model="lastNameKana"
            placeholder="セイ"
            type="text"
            class="border-round-lg h-2rem util-color-placeholder"
          />
          <InputText
            v-model="firstNameKana"
            placeholder="メイ"
            type="text"
            class="border-round-lg h-2rem util-color-placeholder"
          />
        </InputGroup>
        <p class="text-base font-bold mb-2 mt-4">メールアドレス</p>
        <div class="">
          <InputText
            v-model="email"
            placeholder="example@example.com"
            type="email"
            class="border-round-lg w-full h-2rem util-color-placeholder"
          />
        </div>
        <p class="text-base font-bold mb-2 mt-4">性別</p>
        <InputGroup class="">
          <div>
            <RadioButton
              v-model="gender"
              inputId="gender1"
              name="gender"
              value="0"
            />
            <label for="gender1" class="p-2">男性</label>
          </div>
          <div>
            <RadioButton
              v-model="gender"
              inputId="gender2"
              name="gender"
              value="1"
            />
            <label for="gender2" class="p-2">女性</label>
          </div>
        </InputGroup>

        <p class="text-base font-bold mb-2 mt-4">学籍番号</p>
        <div class="">
          <InputText
            v-model="studentID"
            placeholder="0000000"
            inputId="student-id"
            :useGrouping="false"
            type="number"
            class="border-round-lg w-full h-2rem util-color-placeholder"
          />
        </div>
      </template>
    </Card>
    <div
      class="util-color-bg-main shadow-none w-100 m-auto mt-1 border-round-lg"
      style="max-width: 756px"
    >
      <p class="mt-2 text-sm">
        ※個人情報の取扱いに関しましては、<a
          href="https://ynu-fes.notion.site/7ea030037f6e4226b0f3ca7476e98453?pvs=4"
          class="inline-block"
          target="_blank"
          noreferrer
          noopener
          >こちら</a
        >のリンクからご確認ください。
      </p>
      <div class="flex align-items-center mx-auto w-fit mt-2">
        <Checkbox v-model="checked" class="" binary />
        <label
          class="ml-2 text-sm util-color-text-danger underline -translate-y-50"
        >
          上記の個人情報の取扱いについて同意します。
        </label>
      </div>
    </div>

    <div class="flex justify-center">
      <Button
        label="登録"
        class="px-6 m-auto mt-4 border-round-lg"
        @click="submit"
      />
    </div>
  </main>
</template>
<style scoped lang="scss">
// page transition のアニメーション
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
</style>
