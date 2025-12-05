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
                        class="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Username</label>
                    <input type="text" id="username" v-model="username"
                        class="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-[#324467] bg-white dark:bg-[#111722] text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
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

                <button type="submit"
                    class="w-full flex justify-center py-3 px-4 border border-white-1 rounded-lg shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
                    Sign In
                </button>
            </form>

            <div class="mt-6">
                <div class="relative">
                    <div class="absolute inset-0 flex items-center">
                        <div class="w-full border-t border-slate-300 dark:border-[#324467]"></div>
                    </div>
                    <div class="relative flex justify-center text-sm">
                        <span class="px-2 bg-white dark:bg-[#192233] text-slate-500 dark:text-slate-400">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div class="mt-6 grid grid-cols-2 gap-3">
                    <button
                        class="w-full inline-flex justify-center py-2 px-4 border border-slate-300 dark:border-[#324467] rounded-lg shadow-sm bg-white dark:bg-[#111722] text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#232f48]">
                        <svg class="h-5 w-5 text-[#4285F4]" fill="currentColor" viewbox="0 0 24 24">
                            <path
                                d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z" />
                        </svg>
                    </button>
                    <button
                        class="w-full inline-flex justify-center py-2 px-4 border border-slate-300 dark:border-[#324467] rounded-lg shadow-sm bg-white dark:bg-[#111722] text-sm font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-[#232f48]">
                        <svg class="h-5 w-5 text-[#1877F2]" fill="currentColor" viewbox="0 0 24 24">
                            <path
                                d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                        </svg>
                    </button>
                </div>
            </div>

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

const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = () => {
    if (username.value === 'admin' && password.value === 'admin') {
        router.push('/dashboard');
    } else {
        alert('Invalid credentials');
    }
};
</script>