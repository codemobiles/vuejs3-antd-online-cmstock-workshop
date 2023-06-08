<template>
  <a-row align="center" justify="center" class="tw-w-full tw-h-full">
    <a-card hoverable class="tw-w-full tw-h-fit">
      <a-row justify="center" align="center" class="tw-w-full">
        <a-form
          class="tw-w-full"
          :model="formState"
          name="validate_other"
          v-bind="formItemLayout"
          @finishFailed="onFinishFailed"
          @finish="onFinish"
        >
          <a-form-item name="name" class="tw-flex tw-justify-center">
            <a-input v-model:value="formState.name" placeholder="Name">
              <template #prefix></template>
            </a-input>
          </a-form-item>
          <a-form-item name="price" class="tw-flex tw-justify-center">
            <a-input v-model:value="formState.price" placeholder="Price">
              <template #prefix></template>
            </a-input>
          </a-form-item>
          <a-form-item name="stock" class="tw-flex tw-justify-center">
            <a-input v-model:value="formState.stock" placeholder="Stock">
              <template #prefix></template>
            </a-input>
          </a-form-item>

          <a-form-item
            name="upload"
            extra="Upload product image..."
            class="tw-flex tw-justify-center"
          >
            <a-upload
              v-model:fileList="formState.upload"
              name="logo"
              action="/upload.do"
              list-type="picture"
            >
              <a-button>
                <template #icon><UploadOutlined /></template>
                Click to upload
              </a-button>
            </a-upload>
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
import { defineComponent, reactive } from 'vue'
import { UploadOutlined, InboxOutlined } from '@ant-design/icons-vue'

export default defineComponent({
  components: {
    UploadOutlined,
    InboxOutlined
  },
  mounted() {},
  setup() {
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 }
    }

    const formState = reactive<Record<string, any>>({
      name: '',
      price: '',
      stock: ''
    })
    const onFinish = (values: any) => {
      console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    return {
      formState,
      onFinish,
      onFinishFailed,
      formItemLayout
    }
  }
})
</script>
