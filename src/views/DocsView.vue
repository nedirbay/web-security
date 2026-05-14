<template>
    <main class="flex flex-col gap-8 py-8 px-4 sm:px-0">
        <!-- HeroSection -->
        <div class="@container">
            <div class="@[480px]:p-4">
                <div class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10"
                    data-alt="Abstract blue and dark geometric shapes representing cybersecurity"
                    style='background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(17, 23, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDP6asXHBmFOOpd3i4qVbudeI5dm3ipvEcVhBBK3AzUBhVIl3LjLojnnFYRizVr26E-N19MbNTdeO6dly_KJ0qMgUrKlR2F6bnouX6Glg5XmroqRFvEWNLVdsuCVe3XlvBnAgGQdBf5cyTrsfJDPDAu1wv34r2p0mD84dNpLvlWZioekAGEzzQbOKGosr-KVKKGrJiI0RPiL12zC1MXjVZJ6-WXZndMH-6zdwHUIWl6o1d7UfqCcBpSl3uNcoe1lWkqH4bvBL1c8UQ");'>
                    <div class="flex flex-col gap-2 text-left">
                        <h1
                            class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                            Dokumentasiýa we Resurslar
                        </h1>
                        <h2
                            class="text-slate-300 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                            Web programmalaryňyzy goramak üçin giňişleýin gollanmalar we resurslar.
                        </h2>
                    </div>
                </div>
            </div>
        </div>

        <!-- Documentation Sections -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <div
                class="dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div class="text-primary mb-4">
                    <span class="material-symbols-outlined text-4xl">description</span>
                </div>
                <h3 class="text-lg font-bold text-slate-800 text-white mb-2">Başlangyç</h3>
                <p class="text-slate-600 text-white mb-4">Web programmalarynyň howpsuzlygyndaky esaslaryny we platformamyzy nädip ulanmalydygyny öwreniň.</p>
                <router-link to="/docs/getting-started" class="text-primary font-medium hover:underline">Gollanmany oka
                    →</router-link>
            </div>

            <div
                class="dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div class="text-primary mb-4">
                    <span class="material-symbols-outlined text-4xl">security</span>
                </div>
                <h3 class="text-lg font-bold text-slate-800 text-white mb-2">OWASP Top 10</h3>
                <p class="text-slate-600 text-white mb-4">Iň esasy 10 web programma howpsuzlyk töwekgelçiligi barada jikme-jik maglumat.</p>
                <router-link to="/docs/owasp-top-10" class="text-primary font-medium hover:underline">Töwekgelçilikleri öwren
                    →</router-link>
            </div>

            <div
                class="dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div class="text-primary mb-4">
                    <span class="material-symbols-outlined text-4xl">code</span>
                </div>
                <h3 class="text-lg font-bold text-slate-800 text-white mb-2">Howpsuz kodlamak</h3>
                <p class="text-slate-600 text-white mb-4">Howpsuz programmalar ýazmak üçin iň gowy tejribeler we kod nusgalary.</p>
                <router-link to="/docs/secure-coding" class="text-primary font-medium hover:underline">Nusgalary gör
                    →</router-link>
            </div>

            <div
                class="dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div class="text-primary mb-4">
                    <span class="material-symbols-outlined text-4xl">api</span>
                </div>
                <h3 class="text-lg font-bold text-slate-800 text-white mb-2">API howpsuzlygy</h3>
                <p class="text-slate-600 text-white mb-4">API-leriňizi umumy gowşaklyklardan we hüjümlerden goraň.</p>
                <router-link to="/docs/api-security" class="text-primary font-medium hover:underline">Köpräk öwren
                    →</router-link>
            </div>

            <div
                class="dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div class="text-primary mb-4">
                    <span class="material-symbols-outlined text-4xl">shield</span>
                </div>
                <h3 class="text-lg font-bold text-slate-800 text-white mb-2">Tassyklama (Auth)</h3>
                <p class="text-slate-600 text-white mb-4">Howpsuz tassyklama we awtorizasiýa mehanizmlerini giriziň.</p>
                <router-link to="/docs/authentication" class="text-primary font-medium hover:underline">Gollanmany oka
                    →</router-link>
            </div>

            <div
                class="dark:bg-black border border-slate-200 dark:border-white/10 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
                <div class="text-primary mb-4">
                    <span class="material-symbols-outlined text-4xl">help</span>
                </div>
                <h3 class="text-lg font-bold text-slate-800 text-white mb-2">Köp soralýanlar we goldaw</h3>
                <p class="text-slate-600 text-white mb-4">Umumy soraglara jogaplar we goldaw resurslary.
                </p>
                <router-link to="/docs/faq" class="text-primary font-medium hover:underline">Goldaw al →</router-link>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>