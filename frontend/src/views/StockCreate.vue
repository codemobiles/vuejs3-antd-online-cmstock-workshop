<template>
  <a-row align="center" justify="center" class="tw-w-full">
    <a-card
      class="ant-card-body"
      style="box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 5px 0px; width: 700px"
    >
      <template #title>
        <a-tag color="success" class="tw-px-4 tw-py-2">
          <a-row align="center" class="tw-h-full tw-items-center">
            <PlusCircleFilled class="tw-text-[1rem] tw-pr-2" />
            <span class="tw-font-bold tw-text-[1.5rem]">Create Product</span>
          </a-row>
        </a-tag>
      </template>

      <!-- card body -->
      <a-form
        @finish="onSubmit"
        :model="formState"
        :label-col="{ span: 3 }"
        :rules="rules"
      >
        <a-form-item labelAlign="right" label="Name" name="name" has-feedback>
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item labelAlign="right" label="Price" name="price" has-feedback>
          <a-input-number style="width: 100%" v-model:value="formState.price" />
        </a-form-item>
        <a-form-item labelAlign="right" label="Stock" name="stock" has-feedback>
          <a-input-number
            style="width: 100%"
            type="number"
            v-model:value="formState.stock"
          />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <input type="file" @change="onFileSelected" />
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
          <a-row align="center" justify="center" class="tw-w-full">
            <a-card
              v-if="formState.imageURL"
              class="tw-rounded-md tw-drop-shadow-sm tw-w-full"
              hoverable
              @click="() => (previewVisible = true)"
            >
              <img
                :src="formState.imageURL!"
                class="tw-w-full tw-h-[300px] tw-object-contain"
              />
            </a-card>

            <a-modal
              :visible="previewVisible"
              :title="previewTitle"
              :footer="null"
              @cancel="handleCancel"
            >
              <img
                alt="preview image"
                class="tw-w-full tw-h-[300px]"
                :src="formState.imageURL!"
              />
            </a-modal>
          </a-row>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 24 }">
          <a-row align="center" justify="end" :gutter="[10, 10]">
            <a-button type="primary" html-type="submit">Create</a-button>
            <a-button style="margin-left: 10px" @click="$router.push('/stock')"
              >Cancel</a-button
            >
          </a-row>
        </a-form-item>
      </a-form>
    </a-card>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from "vue";
import { Form } from "ant-design-vue";
import api from "@/services/api";
import router from "@/router";
import type { Rule } from "ant-design-vue/lib/form";
import { PlusCircleFilled } from "@ant-design/icons-vue";
import { useStockStore } from "@/stores/useStockStore";

export default defineComponent({
  components: {
    PlusCircleFilled,
  },
  setup() {
    const stockStore = useStockStore();
    const previewVisible = ref(false);
    const previewTitle = ref("");
    const formState = reactive({
      name: "",
      price: 0,
      stock: 0,
      image: null,
      imageURL: null,
    });

    const onSubmit = async () => {
      await stockStore.createProduct(formState);
      router.back();
    };

    const onFileSelected = (event: any) => {
      debugger;
      // for preview
      const reader = new FileReader();
      reader.onload = (event: any) => {
        formState.imageURL = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);

      // // for upload
      formState.image = event.target.files[0];
    };

    const handleCancel = () => {
      previewVisible.value = false;
      previewTitle.value = "";
    };

    const validateText = (rule: Rule, value: string) => {
      if (value === "" || value.length < 5) {
        return Promise.reject("Name is not valid");
      }
      return Promise.resolve();
    };

    const validatePrice = (rule: Rule, value: string) => {
      if (Number(value) < 100) {
        return Promise.reject("price must be a least at 100");
      }
      return Promise.resolve();
    };

    const validateStock = (rule: Rule, value: string) => {
      if (Number(value) < 10) {
        return Promise.reject("stock must be a least at 10");
      }
      return Promise.resolve();
    };

    const rules = {
      name: [{ required: true, validator: validateText, trigger: "change" }],
      price: [{ validator: validatePrice, trigger: "change" }],
      stock: [{ validator: validateStock, trigger: "change" }],
    };

    return {
      rules,
      formState,
      onSubmit,
      onFileSelected,
      handleCancel,
      previewTitle,
      previewVisible,
    };
  },
});
</script>
