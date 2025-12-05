<template>
    <div class="flex h-screen overflow-hidden bg-[#0f1216] font-display text-slate-200">
        <!-- SideNavBar -->
        <aside class="flex w-64 flex-col bg-[#1e2329] p-4 border-r border-white/5 shadow-xl z-20">
            <div class="flex flex-col gap-8">
                <div class="flex items-center gap-3 px-2">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white/10"
                        data-alt="ZAP Platform logo with abstract shapes"
                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAR3pef8hYIn-EvWUZsd5MyUQRmSAbpdtvpO3EC-DBpovwI5eaNIF9dgC7hFPKDnMklVhNaK7V7lmOlON28C1qr5uadq2TqqEssie2HNZWZ4x7bu3L2MpO97WFqrmARPyhJHVQID4UgTWLxzm2pgRNTPHe6hcZMA6dooYqv1Rf9-teXYlwjsGEIcLpMc3JsYu2j-UXkFwk5eimyOnxdDvfNCmZuuxbkypCDGBmOYVRCrpNZ0OwocD6TP2P1USfn4ueoJs7gcjWoXuU");'>
                    </div>
                    <div class="flex flex-col">
                        <h1 class="text-white text-base font-bold leading-normal tracking-wide">ZAP Platform</h1>
                        <p class="text-slate-400 text-xs font-medium leading-normal">Security Dashboard</p>
                    </div>
                </div>
                <nav class="flex flex-col gap-2">
                    <router-link to="/dashboard"
                        class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-300 transition-all duration-200"
                        active-class="bg-primary/10 text-primary shadow-[inset_3px_0_0_0_rgba(0,123,255,1)]">
                        <span class="material-symbols-outlined">dashboard</span>
                        <p class="text-sm font-medium leading-normal">Dashboard</p>
                    </router-link>
                    <router-link to="/dashboard/scan"
                        class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-300 transition-all duration-200"
                        active-class="bg-primary/10 text-primary shadow-[inset_3px_0_0_0_rgba(0,123,255,1)]">
                        <span class="material-symbols-outlined">biotech</span>
                        <p class="text-sm font-medium leading-normal">Scan</p>
                    </router-link>
                    <router-link to="/dashboard/history"
                        class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-300 transition-all duration-200"
                        active-class="bg-primary/10 text-primary shadow-[inset_3px_0_0_0_rgba(0,123,255,1)]">
                        <span class="material-symbols-outlined">summarize</span>
                        <p class="text-sm font-medium leading-normal">History</p>
                    </router-link>
                    <router-link to="/dashboard/settings"
                        class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-300 transition-all duration-200"
                        active-class="bg-primary/10 text-primary shadow-[inset_3px_0_0_0_rgba(0,123,255,1)]">
                        <span class="material-symbols-outlined">settings</span>
                        <p class="text-sm font-medium leading-normal">Settings</p>
                    </router-link>
                </nav>
            </div>
            <div class="mt-auto">
                <router-link to="/login"
                    class="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-white/5 text-slate-300 hover:text-white transition-colors">
                    <span class="material-symbols-outlined">logout</span>
                    <p class="text-sm font-medium leading-normal">Logout</p>
                </router-link>
            </div>
        </aside>
        <!-- Main Content -->
        <div class="flex flex-1 flex-col h-full overflow-hidden relative">
            <!-- TopNavBar -->
            <header
                class="flex items-center justify-between whitespace-nowrap border-b border-white/5 bg-[#1e2329]/95 backdrop-blur-sm px-8 py-4 sticky top-0 z-10 shadow-sm">
                <h2 class="text-white text-xl font-bold leading-tight tracking-tight">Dashboard</h2>
                <div class="flex flex-1 justify-end items-center gap-4">
                    <label class="relative flex-col min-w-40 !h-10 max-w-sm hidden md:flex group">
                        <span
                            class="material-symbols-outlined text-slate-500 group-focus-within:text-primary absolute left-3 top-1/2 -translate-y-1/2 text-xl transition-colors">search</span>
                        <input
                            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/10 bg-[#0f1216] h-full placeholder:text-slate-500 pl-10 pr-4 text-sm font-normal leading-normal transition-all"
                            placeholder="Search scans, targets..." value="" />
                    </label>
                    <div class="flex items-center gap-2">
                        <button
                            class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
                            <span class="material-symbols-outlined text-2xl">notifications</span>
                        </button>
                        <button
                            class="flex size-10 cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-transparent text-slate-400 hover:bg-white/5 hover:text-white transition-colors">
                            <span class="material-symbols-outlined text-2xl">help_outline</span>
                        </button>
                    </div>
                    <div class="flex items-center gap-3 pl-4 border-l border-white/10">
                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 ring-2 ring-white/10"
                            data-alt="User avatar with a gradient background"
                            style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAlEIBRGvOVFC229Ev4kVgJFhEhw_qPJJUYa8Qy8WAzhn5xuBeVvgjglU9uJv4Erm7qEaQeqHEiG4BrmIzJVLqmlcg6Z1vzKv-uMl0vVABHoBM9OiyoRSQ2Wto92itE_qrmEFWeabIl2h6GWBJ3EWYY4kJJIAgz0XE0BB4M8A69qiReFK3nNiocnXTF9bEyDL35Zrn54cZgnKwUNoVEQu8n_HpY10U3LWd4XSwATls2LRAIN8ZA3jszJ485cXJ98vlNomoDLEpRUus");'>
                        </div>
                        <div class="hidden lg:flex flex-col text-right">
                            <p class="text-sm font-semibold text-white">Alex Hudson</p>
                            <p class="text-xs text-slate-400">Administrator</p>
                        </div>
                    </div>
                </div>
            </header>
            <!-- Page Content -->
            <div class="flex-1 overflow-y-auto bg-[#0f1216]">
                <router-view />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
</script>
