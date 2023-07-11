<template>
  <div>
    <a-card
      hoverable
      style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px 0px"
      class="tw-max-w-[500px] tw-h-full"
    >
      <template #cover>
        <img alt="example" src="@/assets/03-vuejs-login.png" />
      </template>

      <h1 className="text-2xl font-bold pb-3">Login</h1>

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
              :disabled="authStore.fetchingStatus === FetchingStatus.fetching"
              block
              type="primary"
              html-type="submit"
              >Log in</a-button
            >
            <a-button
              block
              type="default"
              html-type="button"
              @click="$router.push('/register')"
            >
              Register
            </a-button>

            <a-button block type="text" html-type="button" @click="handleReset">
              Reset
            </a-button>
          </a-space>
        </a-form-item>
      </a-form>
    </a-card>
    <a-alert
      v-if="authStore.fetchingStatus === FetchingStatus.failed"
      message="Login failed"
      type="error"
    />
  </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { reactive, onMounted } from "vue";
import type { User } from "@/models/user.model";
import { Rule } from "ant-design-vue/lib/form";
import { useAuthStore } from "@/stores/useAuthStore";
import { FetchingStatus } from "@/models/fetchingStatus.enum";

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  name: "Login",
  setup() {
    const authStore = useAuthStore();

    const formState = reactive<User>({
      username: "admin",
      password: "1234",
    });

    const handleFinish = async (values: any) => {
      authStore.login(values);
    };

    const handleFinishFailed = (error: any) => {
      // alert(JSON.stringify(error));
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
      } else if (value.length <= 1) {
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

function useCounterStore() { throw new Error('Function not implemented.'); }
