<template>
  <a-card hoverable class="tw-w-[360px] tw-h-fit">
    <template #cover>
      <img alt="example" src="@/assets/03-vuejs-login.png" />
    </template>
    <a-card-meta title="Register" class="tw-mb-2">
      <!-- <template #description>www.instagram.com</template> -->
    </a-card-meta>
    <a-form
      :model="formState"
      name="Register"
      :rules="rules"
      autocomplete="off"
      @finish="onFinish"
      @finishFailed="onFinishFailed"
    >
      <a-form-item name="username">
        <a-input v-model:value="formState.username" placeholder="Username">
          <template #prefix>
            <UserOutlined class="tw-placeholder-slate-800"></UserOutlined>
          </template>
        </a-input>
      </a-form-item>

      <a-form-item name="password">
        <a-input-password v-model:value="formState.password" placeholder="Password">
          <template #prefix>
            <LockOutlined class="tw-placeholder-slate-800"></LockOutlined>
          </template>
        </a-input-password>
      </a-form-item>

      <a-form-item>
        <a-space direction="vertical" size="small" class="tw-w-full">
          <a-button
            type="primary"
            html-type="submit"
            block
            :disabled="authStore.fetchingStatus === FetchingStatus.fetching"
            >Confirm</a-button
          >
          <a-button type="ghost" @click="$router.push('/login')" block>Cancel</a-button>
        </a-space>
      </a-form-item>
      <a-alert
        v-if="authStore.fetchingStatus === FetchingStatus.failed"
        message="Register Failed"
        description="Please try again."
        type="error"
        showIcon
      />
    </a-form>
  </a-card>
</template>
<script lang="ts" setup>
import type { User } from '@/models/user.model'
import { UserOutlined, LockOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/lib/form'
import { defineComponent, reactive } from 'vue'
import { useAuthStore } from '@/stores/useAuthStore'
import { FetchingStatus } from '@/models/fetchingStatus'
const formState = reactive<User>({
  username: 'admin',
  password: '1234'
})
const authStore = useAuthStore()

let validateUsername = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the username')
  }
  return Promise.resolve()
}
let validatePassword = async (_rule: Rule, value: string) => {
  if (value === '') {
    return Promise.reject('Please input the password')
  }
  return Promise.resolve()
}

const rules: Record<string, Rule[]> = {
  username: [{ required: true, validator: validateUsername, trigger: 'change' }],
  password: [{ required: true, validator: validatePassword, trigger: 'change' }]
}

const onFinish = async (values: any) => {
  await authStore.register(values)
}
const onFinishFailed = (errorInfo: any) => {
  console.log('Failed:', errorInfo)
}
</script>
