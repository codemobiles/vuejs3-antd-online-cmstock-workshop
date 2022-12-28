import { FetchingStatus } from "@/models/fetchingStatus.enum";
import { Session } from "@/models/session.model";
import { User } from "@/models/user.model";
import api from "@/services/api";
import { defineStore } from "pinia";
import { ref, reactive } from "vue";

export const useAuthStore = defineStore("auth", () => {
  const profile = reactive<Session>({ isLoggedIn: false });
  const fetchingStatus = ref<FetchingStatus>(FetchingStatus.init);

  async function login(user: User) {
    try {
      fetchingStatus.value = FetchingStatus.fetching;
      let result = await api.login(user);
      if (result == true) {
        profile.username = user.username;
        profile.isLoggedIn = true;
        fetchingStatus.value = FetchingStatus.success;
      } else {
        profile.isLoggedIn = false;
        fetchingStatus.value = FetchingStatus.failed;
      }
    } catch (e) {
      profile.isLoggedIn = false;
      fetchingStatus.value = FetchingStatus.failed;
    }
  }
  async function register(user: User) {
    try {
      fetchingStatus.value = FetchingStatus.fetching;
      let result = await api.register(user);
      if (result == true) {
        fetchingStatus.value = FetchingStatus.success;
      } else {
        fetchingStatus.value = FetchingStatus.failed;
      }
    } catch (e) {
      fetchingStatus.value = FetchingStatus.failed;
    }
  }

  return { login, register, fetchingStatus, profile };
});
