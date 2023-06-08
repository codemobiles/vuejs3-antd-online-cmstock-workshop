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
            <span class="tw-font-bold tw-text-[1.5rem]">Create product</span>
          </a-row>
        </a-tag>
      </template>
      <a-form
        :label-col="{ span: 3 }"
        :rules="rules"
        :model="formState"
        autocomplete="off"
        @finish="onSubmit"
      >
        <a-form-item labelAlign="right" label="Name" name="name" has-feedback>
          <a-input v-model:value="formState.name" />
        </a-form-item>
        <a-form-item labelAlign="right" label="Price" name="price" has-feedback>
          <a-input-number style="width: 100%" v-model:value="formState.price" />
        </a-form-item>
        <a-form-item labelAlign="right" label="Stock" name="stock" has-feedback>
          <a-input-number style="width: 100%" type="number" v-model:value="formState.stock" />
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
              <img :src="formState.imageURL!" class="tw-w-full tw-h-[300px] tw-object-contain" />
            </a-card>
            <a-modal
              :visible="previewVisible"
              :title="previewTitle"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="preview image" class="tw-w-full tw-h-[300px]" :src="formState.imageURL!" />
            </a-modal>
          </a-row>
        </a-form-item>

        <a-form-item :wrapper-col="{ span: 24 }">
          <a-row align="center" justify="end" :gutter="[10, 10]">
            <a-button type="primary" html-type="submit">Create</a-button>
            <a-button style="margin-left: 10px" @click="$router.push('/stock')">Cancel</a-button>
          </a-row>
        </a-form-item>
      </a-form>
    </a-card>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, toRaw } from 'vue'
import { Form } from 'ant-design-vue'
import api from '@/services/api'
import router from '@/router'
import type { Rule } from 'ant-design-vue/lib/form'
import { PlusCircleFilled } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    PlusCircleFilled
  },
  setup() {
    const previewVisible = ref(false)
    const previewTitle = ref('')
    const formState = reactive({
      name: '',
      price: 0,
      stock: 0,
      image: null,
      imageURL: null
    })

    const onSubmit = async () => {
      let formData = new FormData()
      const { name, price, stock } = formState
      formData.append('name', name)
      formData.append('stock', stock.toString())
      formData.append('price', price.toString())
      if (formState.image) {
        formData.append('image', formState.image!)
      }
      await api.addProduct(formData)
      router.back()
    }

    const onFileSelected = (event: any) => {
      // for preview
      const reader = new FileReader()
      reader.onload = (event: any) => {
        formState.imageURL = event.target.result
      }

      // for upload
      reader.readAsDataURL(event.target.files[0])
      formState.image = event.target.files[0]
    }

    const handleCancel = () => {
      previewVisible.value = false
      previewTitle.value = ''
    }

    let validateText = (rule: Rule, value: string) => {
      if (formState.name === '') {
        return Promise.reject('Please input the name')
      }
      return Promise.resolve()
    }

    let validatePrice = (rule: Rule, value: string) => {
      if (formState.price < 10) {
        return Promise.reject('price must be a least at 100')
      }
      return Promise.resolve()
    }

    let validateStock = (rule: Rule, value: string) => {
      if (formState.stock < 10) {
        return Promise.reject('stock must be a least at 100')
      }
      return Promise.resolve()
    }

    const rules = {
      name: [{ required: true, validator: validateText, trigger: 'change' }],
      price: [{ validator: validatePrice, trigger: 'change' }],
      stock: [{ validator: validateStock, trigger: 'change' }]
    }

    return {
      rules,
      formState,
      onSubmit,
      onFileSelected,
      handleCancel,
      previewTitle,
      previewVisible
    }
  }
})
</script>
