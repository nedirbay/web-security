<template>
    <main class="flex-1 justify-center py-5 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col w-full max-w-7xl mx-auto">
            <section class="w-full py-8 md:py-12">
                <div class="flex flex-wrap justify-between gap-3 p-4">
                    <div class="flex min-w-72 flex-col gap-3">
                        <p class="text-white text-4xl font-black leading-tight tracking-[-0.033em]">
                            Start a New Security Scan</p>
                        <p class="text-slate-400 text-base font-normal leading-normal">Enter a
                            website URL to identify potential vulnerabilities.</p>
                    </div>
                </div>
                <div class="flex flex-col md:flex-row items-end gap-4 px-4 py-3">
                    <label class="flex flex-col min-w-40 flex-1">
                        <p class="text-white text-base font-medium leading-normal pb-2">Enter
                            Website URL</p>
                        <input
                            class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-white/10 bg-[#1e2329] focus:border-primary h-14 placeholder:text-slate-500 p-[15px] text-base font-normal leading-normal transition-all shadow-sm"
                            placeholder="https://example.com" value="" />
                    </label>
                    <button
                        class="flex min-w-[84px] w-full border border-white/10 md:w-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                        <span class="truncate">Scan Now</span>
                    </button>
                </div>
                <p
                    class="text-slate-400 text-sm font-normal leading-normal pb-3 pt-1 px-4 underline cursor-pointer hover:text-primary transition-colors">
                    Advanced Options</p>
            </section>
            <section class="w-full py-8 md:py-12 border-t border-white/5">
                <h3 class="text-2xl font-bold text-white px-4 mb-2">Scan Results for example.com
                </h3>
                <p class="text-slate-400 px-4 mb-6">Last scanned: 2 minutes ago</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    <div
                        class="p-6 rounded-xl bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="font-semibold text-red-500">Critical Risks</h4>
                        <p class="text-5xl font-black text-white mt-2">2</p>
                    </div>
                    <div
                        class="p-6 rounded-xl bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="font-semibold text-orange-500">High Risks</h4>
                        <p class="text-5xl font-black text-white mt-2">5</p>
                    </div>
                    <div
                        class="p-6 rounded-xl bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="font-semibold text-yellow-400">Medium Risks</h4>
                        <p class="text-5xl font-black text-white mt-2">12</p>
                    </div>
                    <div
                        class="p-6 rounded-xl bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="font-semibold text-blue-500">Low Risks</h4>
                        <p class="text-5xl font-black text-white mt-2">8</p>
                    </div>
                </div>
                <div class="p-4 mt-8">
                    <h3 class="text-2xl font-bold text-white mb-6">Identified Vulnerabilities
                    </h3>
                    <div class="overflow-x-auto bg-[#1e2329] rounded-xl border border-white/5 shadow-sm">
                        <table class="w-full text-left text-sm">
                            <thead class="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/5">
                                <tr>
                                    <th class="px-6 py-4" scope="col">Severity</th>
                                    <th class="px-6 py-4" scope="col">Vulnerability Name</th>
                                    <th class="px-6 py-4" scope="col">URL Affected</th>
                                    <th class="px-6 py-4" scope="col">Confidence</th>
                                    <th class="px-6 py-4" scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr class="hover:bg-white/5 transition-colors">
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex items-center rounded-full bg-red-900/30 px-2.5 py-0.5 text-xs font-semibold text-red-400 border border-red-500/20">Critical</span>
                                    </td>
                                    <td class="px-6 py-4 font-medium text-white">SQL Injection
                                    </td>
                                    <td class="px-6 py-4 text-slate-300">/login.php</td>
                                    <td class="px-6 py-4 font-medium text-green-500">High</td>
                                    <td class="px-6 py-4"><a class="font-medium text-primary hover:underline"
                                            href="#">View Details</a></td>
                                </tr>
                                <tr class="hover:bg-white/5 transition-colors">
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex items-center rounded-full bg-orange-900/30 px-2.5 py-0.5 text-xs font-semibold text-orange-400 border border-orange-500/20">High</span>
                                    </td>
                                    <td class="px-6 py-4 font-medium text-white">Cross-Site
                                        Scripting (XSS)</td>
                                    <td class="px-6 py-4 text-slate-300">/search?q=...</td>
                                    <td class="px-6 py-4 font-medium text-green-500">High</td>
                                    <td class="px-6 py-4"><a class="font-medium text-primary hover:underline"
                                            href="#">View Details</a></td>
                                </tr>
                                <tr class="hover:bg-white/5 transition-colors">
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex items-center rounded-full bg-yellow-900/30 px-2.5 py-0.5 text-xs font-semibold text-yellow-400 border border-yellow-500/20">Medium</span>
                                    </td>
                                    <td class="px-6 py-4 font-medium text-white">Security
                                        Misconfiguration</td>
                                    <td class="px-6 py-4 text-slate-300">/admin</td>
                                    <td class="px-6 py-4 font-medium text-green-500">High</td>
                                    <td class="px-6 py-4"><a class="font-medium text-primary hover:underline"
                                            href="#">View Details</a></td>
                                </tr>
                                <tr class="hover:bg-white/5 transition-colors">
                                    <td class="px-6 py-4">
                                        <span
                                            class="inline-flex items-center rounded-full bg-blue-900/30 px-2.5 py-0.5 text-xs font-semibold text-blue-400 border border-blue-500/20">Low</span>
                                    </td>
                                    <td class="px-6 py-4 font-medium text-white">Directory
                                        Browsing</td>
                                    <td class="px-6 py-4 text-slate-300">/assets/</td>
                                    <td class="px-6 py-4 font-medium text-yellow-500">Medium</td>
                                    <td class="px-6 py-4"><a class="font-medium text-primary hover:underline"
                                            href="#">View Details</a></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>