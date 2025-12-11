<template>
    <header
        class="sticky top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-white/10 px-4 sm:px-10 py-3 bg-[rgb(12,24,36)] backdrop-blur-md">
        <div class="flex items-center gap-4 text-white">
            <div class="size-6 text-primary">
                <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w.org/2000/svg">
                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor">
                    </path>
                </svg>
            </div>
            <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                Web
                Security</h2>
        </div>
        <div class="hidden md:flex flex-1 justify-end gap-8">
            <div class="flex items-center gap-9">
                <router-link to="/"
                    class="text-white hover:text-primary text-sm font-medium leading-normal">Main</router-link>
                <a class="text-white hover:text-primary text-sm font-medium leading-normal" href="#">Blog</a>
                <router-link to="/docs"
                    class="text-white hover:text-primary text-sm font-medium leading-normal">Docs</router-link>
                <a class="text-white hover:text-primary text-sm font-medium leading-normal" href="#">Scans</a>
            </div>
            <router-link to="/login"
                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                <span class="truncate">Start Free Scan</span>
            </router-link>
        </div>
        <button class="md:hidden flex items-center justify-center p-2 rounded-lg text-white hover:bg-white/10">
            <span class="material-symbols-outlined">menu</span>
        </button>
    </header>
</template>

<script setup lang="ts">
</script>
