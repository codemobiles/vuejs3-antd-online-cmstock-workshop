<template>
  <a-row align="center" justify="center" class="tw-w-full tw-h-full">
    <a-card hoverable class="tw-w-[800px] tw-h-fit">
      <a-row justify="center" class="tw-w-full">
        <a-form
          :rules="rules"
          class="tw-w-full"
          :model="formState"
          name="validate_other"
          v-bind="formItemLayout"
          @finishFailed="handleFinishFailed"
          @finish="handleFinish"
        >
          <a-form-item name="name" class="tw-flex tw-justify-center">
            <a-input v-model:value="formState.name" placeholder="Name">
              <template #prefix></template>
            </a-input>
          </a-form-item>
          <a-form-item name="price" class="tw-flex tw-justify-center">
            <a-input v-model:value="formState.price" placeholder="Price" type="number">
              <template #prefix></template>
            </a-input>
          </a-form-item>
          <a-form-item name="stock" class="tw-flex tw-justify-center">
            <a-input v-model:value="formState.stock" placeholder="Stock" type="number">
              <template #prefix></template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="upload"
            extra="Upload product image here"
            class="tw-flex tw-justify-center"
          >
            <a-upload
              v-model:fileList="formState.upload"
              name="upload"
              list-type="picture"
              :before-upload="handleBeforeUpload"
              :customRequest="handleCustomRequest"
              :showUploadList="false"
              @preview="handlePreview"
            >
              <a-button>
                <template #icon><UploadOutlined /></template>
                Click to upload
              </a-button>
            </a-upload>
            <div class="tw-my-2">
              <a-alert type="warning" message="Uploading..." banner v-if="isUploading"></a-alert>
              <a-alert
                type="success"
                message="Image ready to upload!"
                banner
                v-else-if="uploadSuccess"
              />
            </div>
            <a-card v-if="previewImage">
              <a-skeleton-image v-if="isUploading" />
              <img
                v-else
                class="tw-h-[200px]"
                :src="previewImage"
                alt="Uploaded Image"
                @click="
                  () => {
                    previewVisible = true
                  }
                "
              />
            </a-card>
            <a-modal
              :visible="previewVisible"
              :title="previewTitle"
              :footer="null"
              @cancel="handleCancel"
            >
              <img alt="example" style="width: 100%" :src="previewImage" />
            </a-modal>
          </a-form-item>

          <a-form-item class="tw-flex tw-justify-center">
            <a-row align="center" justify="end">
              <a-button type="ghosted" @click="$router.push('/stock')" class="tw-mr-2"
                >Cancel</a-button
              >
              <a-button type="primary" html-type="submit">Confirm</a-button>
            </a-row>
          </a-form-item>
        </a-form>
      </a-row>
    </a-card>
  </a-row>
</template>
<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons-vue'
import type { Rule } from 'ant-design-vue/lib/form'
import type { UploadProps } from 'ant-design-vue'
import api from '@/services/api'
import { useRouter } from 'vue-router'

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

export default defineComponent({
  components: {
    UploadOutlined,
    InboxOutlined
  },

  setup() {
    const router = useRouter()
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    const formState = reactive<Record<string, any>>({
      name: '',
      price: '',
      stock: '',
      upload: []
    })
    const previewVisible = ref(false)
    const previewImage = ref('')
    const previewTitle = ref('')
    const isUploading = ref(false)
    const uploadSuccess = ref(false)

    let validateName = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the name')
      }
      return Promise.resolve()
    }
    let validatePrice = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the price')
      }
      return Promise.resolve()
    }
    let validateStock = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the stock')
      }
      return Promise.resolve()
    }
    let validateUploadFile = async (_rule: Rule, value: string) => {
      if (value === '') {
        return Promise.reject('Please input the uploadFile')
      }
      return Promise.resolve()
    }

    const rules: Record<string, Rule[]> = {
      name: [{ required: true, validator: validateName, trigger: 'change' }],
      price: [{ required: true, validator: validatePrice, trigger: 'change' }],
      stock: [{ required: true, validator: validateStock, trigger: 'change' }],
      upload: [{ required: true, validator: validateUploadFile, trigger: 'change' }]
    }

    const handleFinish = async (values: any) => {
      try {
        let formData = new FormData()
        const { name, price, stock } = values
        formData.append('name', name)
        formData.append('stock', stock)
        formData.append('price', price)
        formData.append('image', formState.upload[0])
        console.log(formData)
        await api.addProduct(formData)
        router.back()
      } catch (error) {
        console.log(error)
      }
    }
    const handleFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    const handleBeforeUpload = (event: any) => {
      return true
    }
    const handleCustomRequest = (options: any) => {
      isUploading.value = true
      uploadSuccess.value = false

      // Simulate the upload process
      setTimeout(() => {
        const { file } = options
        previewImage.value = URL.createObjectURL(file)
        isUploading.value = false
        uploadSuccess.value = true
      }, 1000)
    }
    const handleCancel = () => {
      previewVisible.value = false
      previewTitle.value = ''
    }

    const handlePreview = async (file: any) => {
      if (!file.url && !file.preview) {
        file.preview = (await getBase64(file.originFileObj)) as string
      }
      previewImage.value = file.url || file.preview
      previewVisible.value = true
      previewTitle.value = file.name || file.url.substring(file.url.lastIndexOf('/') + 1)
    }
    return {
      formState,
      handleFinish,
      handleFinishFailed,
      formItemLayout,
      rules,
      handleBeforeUpload,
      handleCustomRequest,
      handlePreview,
      handleCancel,
      previewImage,
      previewTitle,
      previewVisible,
      isUploading,
      uploadSuccess
    }
  }
})
</script>
