<template>
    <main class="flex-1 p-8">
        <div class="w-full max-w-4xl mx-auto">
            <div class="mb-8">
                <h1 class="text-3xl font-bold text-white">Settings</h1>
                <p class="text-slate-400 mt-2">Manage your account settings and preferences.</p>
            </div>

            <div class="flex flex-col gap-8">
                <!-- Profile Section -->
                <section class="rounded-xl border border-white/5 bg-[#1e2329] p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h2 class="text-xl font-semibold text-white">Profile Information</h2>
                            <p class="text-sm text-slate-400">Update your photo and personal details.</p>
                        </div>
                        <button
                            class="px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                            Save Changes
                        </button>
                    </div>

                    <div class="flex flex-col md:flex-row gap-8 items-start">
                        <div class="flex flex-col items-center gap-4">
                            <div class="w-24 h-24 rounded-full bg-slate-700 overflow-hidden ring-4 ring-white/5">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlEIBRGvOVFC229Ev4kVgJFhEhw_qPJJUYa8Qy8WAzhn5xuBeVvgjglU9uJv4Erm7qEaQeqHEiG4BrmIzJVLqmlcg6Z1vzKv-uMl0vVABHoBM9OiyoRSQ2Wto92itE_qrmEFWeabIl2h6GWBJ3EWYY4kJJIAgz0XE0BB4M8A69qiReFK3nNiocnXTF9bEyDL35Zrn54cZgnKwUNoVEQu8n_HpY10U3LWd4XSwATls2LRAIN8ZA3jszJ485cXJ98vlNomoDLEpRUus"
                                    alt="Profile" class="w-full h-full object-cover">
                            </div>
                            <button class="text-sm text-primary font-medium hover:underline">Change Photo</button>
                        </div>

                        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-slate-300">First Name</label>
                                <input type="text" value="Alex"
                                    class="w-full rounded-lg border-white/10 bg-[#0f1216] text-white focus:ring-primary focus:border-primary transition-all">
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-slate-300">Last Name</label>
                                <input type="text" value="Hudson"
                                    class="w-full rounded-lg border-white/10 bg-[#0f1216] text-white focus:ring-primary focus:border-primary transition-all">
                            </div>
                            <div class="flex flex-col gap-2 md:col-span-2">
                                <label class="text-sm font-medium text-slate-300">Email Address</label>
                                <input type="email" value="alex.hudson@example.com"
                                    class="w-full rounded-lg border-white/10 bg-[#0f1216] text-white focus:ring-primary focus:border-primary transition-all">
                            </div>
                            <div class="flex flex-col gap-2 md:col-span-2">
                                <label class="text-sm font-medium text-slate-300">Bio</label>
                                <textarea rows="3"
                                    class="w-full rounded-lg border-white/10 bg-[#0f1216] text-white focus:ring-primary focus:border-primary transition-all">Security Administrator with 5+ years of experience in web application security.</textarea>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Preferences Section -->
                <section class="rounded-xl border border-white/5 bg-[#1e2329] p-6 shadow-sm">
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold text-white">Preferences</h2>
                        <p class="text-sm text-slate-400">Customize your dashboard experience.</p>
                    </div>

                    <div class="space-y-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-base font-medium text-white">Dark Mode</h3>
                                <p class="text-sm text-slate-400">Use dark theme for the dashboard interface.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked class="sr-only peer">
                                <div
                                    class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-primary">
                                </div>
                            </label>
                        </div>
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-base font-medium text-white">Email Notifications</h3>
                                <p class="text-sm text-slate-400">Receive daily summaries of security alerts.</p>
                            </div>
                            <label class="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" checked class="sr-only peer">
                                <div
                                    class="w-11 h-6 bg-slate-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/30 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all border-gray-600 peer-checked:bg-primary">
                                </div>
                            </label>
                        </div>
                    </div>
                </section>

                <!-- Security Section -->
                <section class="rounded-xl border border-white/5 bg-[#1e2329] p-6 shadow-sm">
                    <div class="mb-6">
                        <h2 class="text-xl font-semibold text-white">Security</h2>
                        <p class="text-sm text-slate-400">Manage your password and authentication methods.</p>
                    </div>

                    <div class="space-y-6">
                        <div
                            class="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-[#0f1216]">
                            <div class="flex items-center gap-4">
                                <div class="p-2 rounded-full bg-slate-800">
                                    <span class="material-symbols-outlined text-slate-400">key</span>
                                </div>
                                <div>
                                    <h3 class="text-base font-medium text-white">Password</h3>
                                    <p class="text-sm text-slate-400">Last changed 3 months ago</p>
                                </div>
                            </div>
                            <button class="text-sm font-medium text-primary hover:underline">Update</button>
                        </div>

                        <div
                            class="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-[#0f1216]">
                            <div class="flex items-center gap-4">
                                <div class="p-2 rounded-full bg-slate-800">
                                    <span class="material-symbols-outlined text-slate-400">smartphone</span>
                                </div>
                                <div>
                                    <h3 class="text-base font-medium text-white">Two-Factor Authentication</h3>
                                    <p class="text-sm text-slate-400">Enabled via Authenticator App</p>
                                </div>
                            </div>
                            <button class="text-sm font-medium text-critical hover:underline">Disable</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>
