<template>
    <footer
        class="bg-slate-100 dark:bg-[#0f1216] border-t border-slate-200 dark:border-white/5 py-12 px-4 sm:px-10 mt-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
                <h3 class="text-lg font-bold text-slate-800 dark:text-white">Howpsuzlyk baradaky täzelikleri e-poçtaňyza alyň.</h3>
                <p class="text-slate-600 dark:text-slate-400">Web programmalarynyň howpsuzlygyndaky iň soňky tendensiýalar,
                    howplar we
                    goranyş usullary bilen tanyş boluň.</p>
                <div class="flex flex-col sm:flex-row gap-2 mt-2">
                    <input
                        class="form-input flex-grow rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-primary"
                        placeholder="E-poçtaňyzy giriziň" type="email" />
                    <button
                        class="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90">Abuna bol</button>
                </div>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                    <h4 class="font-bold text-slate-800 dark:text-white mb-3">Kompaniýa</h4>
                    <ul class="space-y-2">
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Biz barada</a></li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Habarlaşmak</a></li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Vakansiýalar</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-800 dark:text-white mb-3">Resurslar</h4>
                    <ul class="space-y-2">
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Dokumentasiýa</a>
                        </li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Goldaw</a></li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">API ýagdaýy</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-800 dark:text-white mb-3">Hukuk</h4>
                    <ul class="space-y-2">
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Hyzmat şertleri</a>
                        </li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Gizlinlik syýasaty</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            class="mt-12 border-t border-slate-200 dark:border-b-[#232f48] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-slate-500 dark:text-slate-400">© 2024 ZAP Security. Ähli hukuklar goralan.</p>
            <div class="flex gap-4">
                <a class="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">Twitter</a>
                <a class="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">LinkedIn</a>
                <a class="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">GitHub</a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
</script>
