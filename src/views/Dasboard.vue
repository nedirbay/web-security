<template>
    <main class="flex-1 overflow-y-auto p-8">
        <div class="grid grid-cols-1 gap-8">
            <!-- Stats Section -->
            <section class="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
                <div
                    class="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                    <p class="text-slate-400 text-sm font-medium leading-normal">Total Open Alerts</p>
                    <p class="text-white tracking-light text-3xl font-bold leading-tight">1,204</p>
                    <p class="text-success text-sm font-medium leading-normal flex items-center"><span
                            class="material-symbols-outlined text-base mr-1">arrow_upward</span>5.2%</p>
                </div>
                <div
                    class="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                    <p class="text-slate-400 text-sm font-medium leading-normal">Apps Scanned</p>
                    <p class="text-white tracking-light text-3xl font-bold leading-tight">86</p>
                    <p class="text-critical text-sm font-medium leading-normal flex items-center"><span
                            class="material-symbols-outlined text-base mr-1">arrow_downward</span>1.0%</p>
                </div>
                <div
                    class="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                    <p class="text-slate-400 text-sm font-medium leading-normal">High-Severity Findings</p>
                    <p class="text-white tracking-light text-3xl font-bold leading-tight">79</p>
                    <p class="text-success text-sm font-medium leading-normal flex items-center"><span
                            class="material-symbols-outlined text-base mr-1">arrow_upward</span>12%</p>
                </div>
                <div
                    class="flex flex-1 flex-col gap-2 rounded-xl p-6 bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                    <p class="text-slate-400 text-sm font-medium leading-normal">Scans in Last 7 Days</p>
                    <p class="text-white tracking-light text-3xl font-bold leading-tight">215</p>
                    <p class="text-success text-sm font-medium leading-normal flex items-center"><span
                            class="material-symbols-outlined text-base mr-1">arrow_upward</span>8.5%</p>
                </div>
            </section>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <!-- Chart and Quick Actions -->
                <div class="lg:col-span-2 flex flex-col gap-8">
                    <!-- Chart -->
                    <section
                        class="flex min-w-72 flex-1 flex-col gap-4 rounded-xl border border-white/5 p-6 bg-[#1e2329] shadow-sm">
                        <p class="text-white text-base font-semibold leading-normal">Vulnerabilities by Severity
                        </p>
                        <div class="flex gap-1">
                            <p class="text-slate-400 text-sm font-normal leading-normal">Last 30 Days</p>
                            <p class="text-success text-sm font-medium leading-normal">+15.3%</p>
                        </div>
                        <div class="flex flex-col md:flex-row items-center gap-6">
                            <div class="relative size-48">
                                <svg class="size-full" viewbox="0 0 36 36">
                                    <path
                                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                                        fill="none" stroke="#3a414c" stroke-width="3"></path>
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#17A2B8"
                                        stroke-dasharray="80, 100" stroke-width="3"></path>
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#FFC107"
                                        stroke-dasharray="55, 100" stroke-width="3"></path>
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#FF8C00"
                                        stroke-dasharray="30, 100" stroke-width="3"></path>
                                    <path d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831" fill="none" stroke="#DC3545"
                                        stroke-dasharray="10, 100" stroke-width="3"></path>
                                </svg>
                                <div class="absolute inset-0 flex flex-col items-center justify-center">
                                    <span class="text-3xl font-bold text-white">1,204</span>
                                    <span class="text-sm text-slate-400">Total</span>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 md:grid-cols-1 gap-x-6 gap-y-4">
                                <div class="flex items-center gap-2">
                                    <div class="size-3 rounded-full bg-critical"></div><span
                                        class="text-sm text-slate-300">Critical</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="size-3 rounded-full bg-high"></div><span
                                        class="text-sm text-slate-300">High</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="size-3 rounded-full bg-medium"></div><span
                                        class="text-sm text-slate-300">Medium</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="size-3 rounded-full bg-low"></div><span
                                        class="text-sm text-slate-300">Low</span>
                                </div>
                                <div class="flex items-center gap-2">
                                    <div class="size-3 rounded-full bg-info"></div><span
                                        class="text-sm text-slate-300">Informational</span>
                                </div>
                            </div>
                        </div>
                    </section>
                    <!-- Recent Scans -->
                    <section>
                        <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-4">Recent
                            Scan Activity</h2>
                        <div class="overflow-x-auto rounded-xl border border-white/5 bg-[#1e2329] shadow-sm">
                            <table class="w-full text-left text-sm">
                                <thead class="border-b border-white/5 text-xs uppercase text-slate-400 bg-white/5">
                                    <tr>
                                        <th class="px-6 py-3" scope="col">Target Name</th>
                                        <th class="px-6 py-3" scope="col">Status</th>
                                        <th class="px-6 py-3" scope="col">Date</th>
                                        <th class="px-6 py-3" scope="col">Findings</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-white/5">
                                    <tr class="hover:bg-white/5 cursor-pointer transition-colors">
                                        <td class="px-6 py-4 font-medium text-white">WebApp-Production</td>
                                        <td class="px-6 py-4"><span
                                                class="inline-flex items-center rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-medium text-success border border-success/20">
                                                <div class="size-2 rounded-full bg-success mr-2"></div>Completed
                                            </span></td>
                                        <td class="px-6 py-4 text-slate-400">2 hours ago</td>
                                        <td class="px-6 py-4 text-slate-300">5 High, 12 Medium</td>
                                    </tr>
                                    <tr class="hover:bg-white/5 cursor-pointer transition-colors">
                                        <td class="px-6 py-4 font-medium text-white">Internal-API</td>
                                        <td class="px-6 py-4"><span
                                                class="inline-flex items-center rounded-full bg-primary/20 px-2.5 py-0.5 text-xs font-medium text-primary border border-primary/20">
                                                <div class="size-2 rounded-full bg-primary mr-2 animate-pulse">
                                                </div>In Progress
                                            </span></td>
                                        <td class="px-6 py-4 text-slate-400">1 day ago</td>
                                        <td class="px-6 py-4 text-slate-300">--</td>
                                    </tr>
                                    <tr class="hover:bg-white/5 cursor-pointer transition-colors">
                                        <td class="px-6 py-4 font-medium text-white">Staging-Frontend</td>
                                        <td class="px-6 py-4"><span
                                                class="inline-flex items-center rounded-full bg-critical/20 px-2.5 py-0.5 text-xs font-medium text-critical border border-critical/20">
                                                <div class="size-2 rounded-full bg-critical mr-2"></div>Failed
                                            </span></td>
                                        <td class="px-6 py-4 text-slate-400">3 days ago</td>
                                        <td class="px-6 py-4 text-slate-300">N/A</td>
                                    </tr>
                                    <tr class="hover:bg-white/5 cursor-pointer transition-colors">
                                        <td class="px-6 py-4 font-medium text-white">Auth-Service</td>
                                        <td class="px-6 py-4"><span
                                                class="inline-flex items-center rounded-full bg-success/20 px-2.5 py-0.5 text-xs font-medium text-success border border-success/20">
                                                <div class="size-2 rounded-full bg-success mr-2"></div>Completed
                                            </span></td>
                                        <td class="px-6 py-4 text-slate-400">5 days ago</td>
                                        <td class="px-6 py-4 text-slate-300">1 Critical, 8 Medium</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </section>
                </div>
                <!-- Quick Actions -->
                <div class="lg:col-span-1">
                    <section class="rounded-xl border border-white/5 p-6 bg-[#1e2329] shadow-sm">
                        <h2 class="text-white text-base font-semibold leading-tight pb-4">Quick Actions</h2>
                        <div class="flex flex-col gap-4">
                            <button
                                class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-primary text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
                                <span class="material-symbols-outlined text-xl">add</span>
                                <span>Start New Scan</span>
                            </button>
                            <button
                                class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-white/5 text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/10 transition-all border border-white/10">
                                <span class="material-symbols-outlined text-xl">add_circle</span>
                                <span>Add New Target</span>
                            </button>
                            <button
                                class="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 bg-white/5 text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-white/10 transition-all border border-white/10">
                                <span class="material-symbols-outlined text-xl">assessment</span>
                                <span>Generate Report</span>
                            </button>
                        </div>
                    </section>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>