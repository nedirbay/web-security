<template>
    <header
        class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-white/5 px-4 sm:px-10 py-3 bg-white/80 dark:bg-[#0f1216]/80 backdrop-blur-md">
        <div class="flex items-center gap-4 text-slate-800 dark:text-white">
            <div class="size-6 text-primary">
                <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w.org/2000/svg">
                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor">
                    </path>
                </svg>
            </div>
            <h2 class="text-slate-800 dark:text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                Web
                Security</h2>
        </div>
        <div class="hidden md:flex flex-1 justify-end gap-8">
            <div class="flex items-center gap-9">
                <router-link to="/"
                    class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal">Main</router-link>
                <a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
                    href="#">Blog</a>
                <router-link to="/docs"
                    class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal">Docs</router-link>
                <a class="text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal"
                    href="#">Scans</a>
            </div>
            <router-link to="/login"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                <span class="truncate">Start Free Scan</span>
            </router-link>
        </div>
        <button
            class="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
            <span class="material-symbols-outlined">menu</span>
        </button>
    </header>
</template>

<script setup lang="ts">
</script>
