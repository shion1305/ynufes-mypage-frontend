<script lang="ts" setup>
import { useOrg, type AccessibleOrg } from '~/composables/useOrg'
useHead({ title: 'top' })

const accessibleOrgs: AccessibleOrg[] | null =
  await useOrg().getAccessibleOrgs()
const orgInfo: OrgInfo | null =
  accessibleOrgs != null
    ? await useOrg().getOrgInfo(accessibleOrgs[0].id)
    : null
</script>
<template>
  <main class="main-content-wrapper">
    <div v-if="!accessibleOrgs">
      <p class="mx-auto w-fit mt-4 xl:ml-8">
        アクセスできる企画団体が存在しません
      </p>
    </div>
    <div v-else>
      <pre class="util-color-bg-main w-fit p-5 mx-auto mt-4">{{
        'アクセスできる企画団体一覧: ' +
        JSON.stringify(accessibleOrgs, null, '\t')
      }}</pre>
      <pre class="util-color-bg-main w-fit p-5 mx-auto mt-4">{{
        'デフォルトの企画団体情報: ' + JSON.stringify(orgInfo, null, '\t')
      }}</pre>
    </div>
  </main>
</template>
<style></style>
