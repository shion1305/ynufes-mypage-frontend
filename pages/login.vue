<script lang="ts" setup>
useHead({ title: 'login' })
const config = useRuntimeConfig()
definePageMeta({
  layout: false
})
const goAuthURL = async () => {
  const { data, error } = await useFetch(
    config.public.baseURL + '/api/v1/auth/line/state',
    {
      method: 'GET'
    }
  )
  if (error.value) {
    console.log('STATE値の取得に失敗しました。CORSを無効化してください')
    console.log(error.value)
    return
  }
  if (data.value === '') console.log('stateの取得失敗')
  window.location.href = `https://access.line.me/oauth2/v2.1/authorize?response_type=code&client_id=${config.public.lineClientID}&redirect_uri=${config.public.callbackURL}&state=${data.value}&scope=openid%20profile%20email`
}
</script>
<template>
  <div class="page-login">
    <div class="images">
      <img src="~/assets/MyPageLogoBig.svg" class="mypage-logo" />
      <img src="~/assets/LoginImage.svg" class="login-image" />
      <div class="login-button d-flex">
        <img src="~/assets/LINE-login-button.svg" @click="goAuthURL()" />
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
.page-login {
  width: 100vw;
  height: 100vh;
  background-color: #f5f6f4;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.images {
  width: 70vw;
  height: 60svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
}
.mypage-logo {
  aspect-ratio: 4;
  width: 60%;
  min-width: 150px;
  max-width: 256px;
}
.login-image {
  aspect-ratio: 1;
  width: 100%;
  min-width: 150px;
  max-width: 500px;
}
.login-button {
  width: 100%;
  > img {
    aspect-ratio: 3;
    width: 70%;
    max-width: 280px;
    margin: 0 auto;
    display: block;
  }
}
@media screen and (min-width: 1080px) {
  .images {
    height: 90vh;
  }
}
// page transitionのアニメーション
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
