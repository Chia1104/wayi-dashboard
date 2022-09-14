<script setup lang="ts">
import { LoginIcon } from "@wanin/components/Icons";
import { ref, reactive, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Spinner from "@wanin/components/Spinner";
import { useMessage } from "naive-ui";
import { EmailSchema } from "@wanin/shared/schemas/email";
import { PasswordSchema } from "@wanin/shared/schemas/password";
import { type RootState } from "@wanin/store";

const store = useStore<RootState>();
const router = useRouter();
const message = useMessage();

const emailModel = ref("");
const passwordModel = ref("");
const auth = computed(() => store.state.auth);
const localState = reactive({
  emailIsValid: false,
  passwordIsValid: false,
  disabled: true,
});

const validate = () => {
  localState.emailIsValid = EmailSchema.safeParse(emailModel.value).success;
  localState.passwordIsValid = PasswordSchema.safeParse(
    passwordModel.value
  ).success;
  localState.disabled =
    !EmailSchema.safeParse(emailModel.value).success ||
    !PasswordSchema.safeParse(passwordModel.value).success;
};

const handleLogin = () => {
  store
    .dispatch("loginAction", {
      email: emailModel.value,
      password: passwordModel.value,
    })
    .then(() => {
      if (auth.value.isAuthenticated) {
        message.success("Login success");
        router.push("/");
      } else message.error(auth.value.error);
    });
};
</script>

<template>
  <div class="w-container">
    <main class="w-main w-full text-center">
      <h1 class="text-4xl font-bold mb-14 flex">
        <span class="mr-5">
          <LoginIcon />
        </span>
        登入
      </h1>
      <form
        id="login-form"
        class="w-full w-bg-primary mx-auto max-w-lg px-10 flex flex-col items-center justify-center rounded-2xl py-14 shadow-2xl overflow-hidden"
        @submit.prevent="handleLogin"
        @change="validate">
        <Spinner v-if="auth.isLoading" />
        <label class="text-lg font-bold self-start" for="login-email"
          >Email</label
        >
        <input
          id="login-email"
          v-model="emailModel"
          placeholder="Your email"
          type="email"
          name="email"
          class="w-full p-3 border border-gray-300 rounded-lg my-5 focus:outline-none"
          :class="!localState.emailIsValid && 'border-red-500'"
          required
          autocomplete="on" />
        <label class="text-lg font-bold self-start" for="login-password"
          >Password</label
        >
        <input
          id="login-password"
          v-model="passwordModel"
          placeholder="Your password"
          type="password"
          name="password"
          class="w-full p-3 border border-gray-300 rounded-lg my-5 focus:outline-none"
          :class="!localState.passwordIsValid && 'border-red-500'"
          required
          autocomplete="on" />
        <button
          type="submit"
          class="group relative inline-flex transition ease-in-out rounded mt-7 self-center"
          :class="
            localState.disabled
              ? 'cursor-not-allowed'
              : 'hover:bg-secondary hover:dark:bg-primary'
          "
          :disabled="localState.disabled">
          <span
            class="w-button-secondary transform text-base"
            :class="
              !localState.disabled
                ? 'group-hover:-translate-x-1 group-hover:-translate-y-1'
                : 'text-gray-300'
            ">
            登入
          </span>
        </button>
      </form>
    </main>
  </div>
</template>
