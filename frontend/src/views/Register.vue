<template>
  <div>
    <a-card
      hoverable
      style="
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px 0px;
        width: 300px;
        height: 500px;
      "
    >
      <template #cover>
        <img alt="example" src="@/assets/03-vuejs-login.png" />
      </template>

      <h1 className="text-2xl font-bold pb-3">Register</h1>

      <a-form
        layout="vertical"
        :model="formState"
        :rules="rules"
        @finish="handleFinish"
        @finishFailed="handleFinishFailed"
      >
        <a-form-item name="username">
          <a-input placeholder="Username" v-model:value="formState.username">
            <template #prefix
              ><UserOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input>
        </a-form-item>

        <a-form-item name="password" type="password" placeholder="Password">
          <a-input-password v-model:value="formState.password">
            <template #prefix
              ><LockOutlined style="color: rgba(0, 0, 0, 0.25)"
            /></template>
          </a-input-password>
        </a-form-item>

        <a-form-item>
          <a-space direction="vertical" style="width: 100%" size="small">
            <a-button
              block
              type="primary"
              html-type="submit"
              :disabled="authStore.fetchingStatus === FetchingStatus.fetching"
              >Confirm</a-button
            >
            <a-button
              block
              type="default"
              html-type="button"
              @click="$router.push('/login')"
            >
              Cancel
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
    <a-alert
      v-if="authStore.fetchingStatus === FetchingStatus.failed"
      message="Register failed - duplicated username"
      type="error"
    />
  </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, computed } from "vue";
import type { UnwrapRef } from "vue";
import type { FormProps } from "ant-design-vue";
import type { User } from "@/models/user.model";
import { Rule } from "ant-design-vue/lib/form";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/store/useAuthStore";
import { FetchingStatus } from "@/models/fetchingStatus.enum";

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  name: "Register",
  setup() {
    const authStore = useAuthStore();

    const formState = reactive<User>({
      username: "",
      password: "",
    });

    const handleFinish = (values: any) => {
      authStore.register(values);
    };

    const handleFinishFailed = (error: any) => {
      alert(JSON.stringify(error));
    };

    const handleReset = () => {
      formState.username = "";
      formState.password = "";
    };

    let validateUsername = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the username");
      } else if (value.length <= 4) {
        return Promise.reject("username must greater than 4 letters");
      } else {
        return Promise.resolve();
      }
    };

    let validatePassword = async (_rule: Rule, value: string) => {
      if (value === "") {
        return Promise.reject("Please input the username");
      } else if (value.length <= 10) {
        return Promise.reject("Passwowrd must greater than 10 letters");
      } else {
        return Promise.resolve();
      }
    };

    const rules: Record<string, Rule[]> = {
      username: [
        { required: true, validator: validateUsername, trigger: "change" },
      ],
      password: [
        { required: true, validator: validatePassword, trigger: "change" },
      ],
    };

    return {
      formState,
      handleFinish,
      handleReset,
      handleFinishFailed,
      rules,
      authStore,
      FetchingStatus,
    };
  },
};
</script>

<style></style>
