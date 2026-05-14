<template>
    <main class="flex-1 p-8">
        <div class="w-full max-w-4xl mx-auto">
            <div class="mb-8">
                <h2 class="text-white text-3xl font-bold leading-tight tracking-tight">Sazlamalar</h2>
                <p class="text-slate-400 text-sm mt-2">Hasabyňyzyň maglumatlaryny we e-poçta salgysyny täzeläň.</p>
            </div>

            <div class="flex flex-col gap-8">
                <!-- Profile Section -->
                <section class="rounded-xl border border-white/5 bg-[#1e2329] p-6 shadow-sm">
                    <div class="flex items-center justify-between mb-6">
                        <div>
                            <h3 class="text-white text-lg font-bold">Profil maglumatlary</h3>
                            <p class="text-sm text-slate-400">Şahsy maglumatlaryňyzy täzeläň.</p>
                        </div>
                        <button class="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-primary/90 transition-colors">Üýtgeşmeleri sakla</button>
                    </div>

                    <div class="flex flex-col md:flex-row gap-8 items-start">
                        <div class="flex flex-col items-center gap-4">
                            <div class="w-24 h-24 rounded-full bg-slate-700 overflow-hidden ring-4 ring-white/5">
                                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAlEIBRGvOVFC229Ev4kVgJFhEhw_qPJJUYa8Qy8WAzhn5xuBeVvgjglU9uJv4Erm7qEaQeqHEiG4BrmIzJVLqmlcg6Z1vzKv-uMl0vVABHoBM9OiyoRSQ2Wto92itE_qrmEFWeabIl2h6GWBJ3EWYY4kJJIAgz0XE0BB4M8A69qiReFK3nNiocnXTF9bEyDL35Zrn54cZgnKwUNoVEQu8n_HpY10U3LWd4XSwATls2LRAIN8ZA3jszJ485cXJ98vlNomoDLEpRUus"
                                    alt="Profile" class="w-full h-full object-cover">
                            </div>
                            <button class="border border-white/10 text-white px-4 py-2 rounded-lg text-sm font-bold hover:bg-white/5 transition-colors">Suraty üýtget</button>
                        </div>

                        <div class="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <div class="flex flex-col gap-2">
                                <label class="block text-sm font-medium text-slate-300 mb-1">Doly ady</label>
                                <input type="text" value="Alex"
                                    class="w-full rounded-lg border-white/10 bg-[#0f1216] text-white focus:ring-primary focus:border-primary transition-all">
                            </div>
                            <div class="flex flex-col gap-2">
                                <label class="text-sm font-medium text-slate-300">Familiýa</label>
                                <input type="text" value="Hudson"
                                    class="w-full rounded-lg border-white/10 bg-[#0f1216] text-white focus:ring-primary focus:border-primary transition-all">
                            </div>
                            <div class="flex flex-col gap-2 md:col-span-2">
                                <label class="block text-sm font-medium text-slate-300 mb-1">E-poçta salgysy</label>
                                <input type="email" value="alex.hudson@example.com"
                                    class="w-full rounded-lg border-white/10 bg-[#0f1216] text-white focus:ring-primary focus:border-primary transition-all">
                            </div>
                            <div class="flex flex-col gap-2 md:col-span-2">
                                <label class="text-sm font-medium text-slate-300">Bio</label>
                                <textarea rows="3"
                                    class="w-full rounded-lg border-white/10 bg-[#0f1216] text-white focus:ring-primary focus:border-primary transition-all">Howpsuzlyk administratory, web goşundylaryny goramakda 5 ýyldan gowrak tejribesi bar.</textarea>
                            </div>
                        </div>
                    </div>
                </section>

                <!-- Preferences Section -->
                <section class="rounded-xl border border-white/5 bg-[#1e2329] p-6 shadow-sm">
                    <div class="mb-6">
                        <h3 class="text-white text-lg font-bold">Ileri tutmalar</h3>
                        <p class="text-sm text-slate-400">Panel interfeýsiňizi sazlaň.</p>
                    </div>

                    <div class="space-y-6">
                        <div class="flex items-center justify-between">
                            <div>
                                <h3 class="text-base font-medium text-white">Gara tema</h3>
                                <p class="text-sm text-slate-400">Panel üçin gara temany ulanyň.</p>
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
                                <p class="text-white text-sm font-medium">E-poçta habarnamalary</p>
                                <p class="text-slate-400 text-xs">Barlag tamamlananda hasabatlary e-poçta arkaly al.</p>
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
                        <h3 class="text-white text-lg font-bold">Howpsuzlyk</h3>
                        <p class="text-slate-400 text-sm">Parolyňyzy we howpsuzlyk sazlamalaryňyzy dolandyryň.</p>
                    </div>

                    <div class="space-y-6">
                        <div
                            class="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-[#0f1216]">
                            <div class="flex items-center gap-4">
                                <div class="p-2 rounded-full bg-slate-800">
                                    <span class="material-symbols-outlined text-slate-400">key</span>
                                </div>
                                <div>
                                    <h3 class="text-base font-medium text-white">Parol</h3>
                                    <p class="text-slate-400 text-xs">Täze nyşanalar goşulanda awtomatik barlagy başlat.</p>
                                </div>
                            </div>
                            <button class="text-sm font-medium text-primary hover:underline">Täzele</button>
                        </div>

                        <div
                            class="flex items-center justify-between p-4 rounded-lg border border-white/10 bg-[#0f1216]">
                            <div class="flex items-center gap-4">
                                <div class="p-2 rounded-full bg-slate-800">
                                    <span class="material-symbols-outlined text-slate-400">smartphone</span>
                                </div>
                                <div>
                                    <h3 class="text-base font-medium text-white">Iki basgançakly tassyklama</h3>
                                    <p class="text-sm text-slate-400">Authenticator goşundysy arkaly işjeňleşdirildi</p>
                                </div>
                            </div>
                            <button class="text-red-500 px-4 py-2 text-sm font-bold hover:underline">Hasaby öçür</button>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>
