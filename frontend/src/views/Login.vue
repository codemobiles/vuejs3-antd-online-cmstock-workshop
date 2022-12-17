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

      <h1 className="text-2xl font-bold pb-3">Login</h1>

      <a-form
        name="basic"
        :model="formState"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 16 }"
        @finish="handleFinish"
        autocomplete="off"
      >
        <a-form-item
          label="Username"
          name="username"
          :rules="[{ required: true, message: 'Please input your username!' }]"
        >
          <a-input v-model:value="formState.username" />
        </a-form-item>

        <a-form-item
          label="Password"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>

        <a-form-item name="remember" :wrapper-col="{ offset: 8, span: 16 }">
          <a-checkbox>Remember me</a-checkbox>
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">Submit</a-button>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="ghost" html-type="button" @click="handleReset"
            >Reset</a-button
          >
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
import { UserOutlined, LockOutlined } from "@ant-design/icons-vue";
import { defineComponent, reactive, computed } from "vue";
import type { UnwrapRef } from "vue";
import type { FormProps } from "ant-design-vue";
import type { User } from "@/models/user.model";

export default {
  components: {
    UserOutlined,
    LockOutlined,
  },
  name: "Login",
  setup() {
    const formState = reactive<User>({
      username: "admin",
      password: "1234",
    });

    const handleFinish = (values: any) => {
      alert(JSON.stringify(values));
    };

    const handleReset = () => {
      formState.username = "";
      formState.password = "";
    };

    return { formState, handleFinish, handleReset };
  },
};
</script>

<style></style>
