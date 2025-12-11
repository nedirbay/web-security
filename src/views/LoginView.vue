<template>
    <main class="flex flex-col items-center justify-center py-12 px-4">
        <div class="w-full max-w-md bg-white dark:bg-[#192233] rounded-xl shadow-lg p-8">
            <div class="text-center mb-8">
                <h1 class="text-2xl font-bold text-slate-800 dark:text-white">Welcome Back</h1>
                <p class="text-slate-600 dark:text-slate-300 mt-2">Sign in to your account to continue</p>
            </div>

            <form class="space-y-6" @submit.prevent="handleLogin">
                <div>
                    <label for="username"
                        class="block text-sm font-medium text-slate-700 text-slate-300 mb-1">Username</label>
                    <input type="text" id="username" v-model="username"
                        class="w-full px-4 py-3 rounded-lg border border-slate-300 border-[#324467] bg-white dark:bg-[#111722] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="Enter your username">
                </div>

                <div>
                    <div class="flex items-center justify-between mb-1">
                        <label for="password"
                            class="block text-sm font-medium text-slate-700  dark:text-slate-300">Password</label>
                    </div>
                    <input type="password" id="password" v-model="password"
                        class="w-full px-4 py-3 rounded-lg border border-white-300 border-[#324467] bg-white dark:bg-[#111722] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                        placeholder="••••••••">
                </div>

                <div class="flex items-center">
                    <input id="remember-me" type="checkbox"
                        class="h-4 w-4 text-primary focus:ring-primary border-slate-300 rounded">
                    <label for="remember-me" class="ml-2 block text-sm text-slate-700 dark:text-slate-300">
                        Remember me
                    </label>
                </div>

                <button type="submit" style="color: black;"
                    class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Sign In
                </button>
            </form>

            <p class="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
                Don't have an account?
                <a href="#" class="font-medium text-primary hover:underline">Sign up</a>
            </p>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { adminLogin } from '../api/api_endpoints';
const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = () => {
    adminLogin({ username: username.value, password: password.value }).then((res) => {
        console.log(res.data);
        if (res.data?.message === 'Login successful') {
            router.push('/dashboard');
        } else {
            alert('Invalid credentials');
        }
    });
};
</script>