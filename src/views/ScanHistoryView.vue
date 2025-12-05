<template>
    <main class="flex-1 p-8">
        <div class="w-full max-w-7xl mx-auto">
            <!-- PageHeading -->
            <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex min-w-72 flex-col gap-2">
                    <p class="text-white text-3xl font-bold tracking-tight">Scan History</p>
                    <p class="text-slate-400 text-base font-normal leading-normal">View a
                        chronological log of all security scans.</p>
                </div>
            </div>
            <!-- Filters -->
            <div class="mt-6 flex flex-col gap-4 md:flex-row md:items-center">
                <div class="relative w-full md:max-w-xs">
                    <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <span class="material-symbols-outlined text-slate-400">search</span>
                    </div>
                    <input
                        class="w-full rounded-lg border-white/10 bg-[#1e2329] py-2 pl-10 pr-4 text-sm text-white focus:border-primary focus:ring-primary placeholder-slate-400 shadow-sm"
                        placeholder="Search by target URL..." type="text" />
                </div>
                <div class="flex flex-wrap gap-2">
                    <button
                        class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-white/10 bg-[#1e2329] px-3 text-white hover:bg-white/5 transition-colors shadow-sm">
                        <p class="text-sm font-medium leading-normal">Status: All</p>
                        <span class="material-symbols-outlined text-base">expand_more</span>
                    </button>
                    <button
                        class="flex h-9 shrink-0 items-center justify-center gap-x-2 rounded-lg border border-white/10 bg-[#1e2329] px-3 text-white hover:bg-white/5 transition-colors shadow-sm">
                        <span class="material-symbols-outlined text-base">calendar_today</span>
                        <p class="text-sm font-medium leading-normal">Date Range</p>
                    </button>
                </div>
            </div>
            <!-- Table -->
            <div class="mt-6 flow-root">
                <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                        <div class="overflow-hidden rounded-xl border border-white/5 shadow-sm">
                            <table class="min-w-full divide-y divide-white/5">
                                <thead class="bg-[#1e2329]">
                                    <tr>
                                        <th class="px-4 py-3.5 text-left text-sm font-semibold text-white" scope="col">
                                            Scan Date</th>
                                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-white" scope="col">
                                            Target URL</th>
                                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-white" scope="col">
                                            Status</th>
                                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-white" scope="col">
                                            Vulnerabilities</th>
                                        <th class="px-3 py-3.5 text-left text-sm font-semibold text-white" scope="col">
                                            Duration</th>
                                        <th class="relative py-3.5 pl-3 pr-4 sm:pr-6" scope="col"><span
                                                class="sr-only">Actions</span></th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-white/5 bg-[#1e2329]">
                                    <tr class="hover:bg-white/5 transition-colors">
                                        <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                                            2023-10-26 14:30</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-white">
                                            https://example-app.com</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <span
                                                class="inline-flex items-center gap-x-1.5 rounded-full bg-success/20 px-2 py-1 text-xs font-medium text-success border border-success/20">
                                                <div class="size-1.5 rounded-full bg-success"></div>Completed
                                            </span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            <span class="font-semibold text-red-400">Critical: 2</span>, High: 5
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            45 min</td>
                                        <td
                                            class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a class="text-primary hover:text-primary/80 transition-colors"
                                                href="#">View Report<span class="sr-only">, for
                                                    https://example-app.com</span></a>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-white/5 transition-colors">
                                        <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                                            2023-10-25 11:00</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-white">
                                            https://webapp-staging.io</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <span
                                                class="inline-flex items-center gap-x-1.5 rounded-full bg-info/20 px-2 py-1 text-xs font-medium text-info border border-info/20">
                                                <div class="size-1.5 rounded-full bg-info"></div>In Progress
                                            </span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            Running...</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            15 min</td>
                                        <td
                                            class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a class="text-primary hover:text-primary/80 transition-colors"
                                                href="#">View Report<span class="sr-only">, for
                                                    https://webapp-staging.io</span></a>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-white/5 transition-colors">
                                        <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                                            2023-10-24 09:15</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-white">
                                            https://legacy-system.net</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <span
                                                class="inline-flex items-center gap-x-1.5 rounded-full bg-critical/20 px-2 py-1 text-xs font-medium text-critical border border-critical/20">
                                                <div class="size-1.5 rounded-full bg-critical"></div>Failed
                                            </span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            Scan timed out</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            2 hours</td>
                                        <td
                                            class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a class="text-primary hover:text-primary/80 transition-colors"
                                                href="#">View Report<span class="sr-only">, for
                                                    https://legacy-system.net</span></a>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-white/5 transition-colors">
                                        <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                                            2023-10-23 18:00</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-white">
                                            https://api.service.dev</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <span
                                                class="inline-flex items-center gap-x-1.5 rounded-full bg-success/20 px-2 py-1 text-xs font-medium text-success border border-success/20">
                                                <div class="size-1.5 rounded-full bg-success"></div>Completed
                                            </span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            <span class="font-semibold text-yellow-400">High: 1</span>, Medium: 8
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            22 min</td>
                                        <td
                                            class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a class="text-primary hover:text-primary/80 transition-colors"
                                                href="#">View Report<span class="sr-only">, for
                                                    https://api.service.dev</span></a>
                                        </td>
                                    </tr>
                                    <tr class="hover:bg-white/5 transition-colors">
                                        <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                                            2023-10-22 12:45</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-white">
                                            https://user-portal.com</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <span
                                                class="inline-flex items-center gap-x-1.5 rounded-full bg-success/20 px-2 py-1 text-xs font-medium text-success border border-success/20">
                                                <div class="size-1.5 rounded-full bg-success"></div>Completed
                                            </span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            No vulnerabilities found</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            31 min</td>
                                        <td
                                            class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <a class="text-primary hover:text-primary/80 transition-colors"
                                                href="#">View Report<span class="sr-only">, for
                                                    https://user-portal.com</span></a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Pagination -->
            <nav aria-label="Pagination"
                class="mt-6 flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
                <div class="hidden sm:block">
                    <p class="text-sm text-slate-400">
                        Showing <span class="font-medium text-white">1</span> to <span
                            class="font-medium text-white">5</span> of <span class="font-medium text-white">20</span>
                        results
                    </p>
                </div>
                <div class="flex flex-1 justify-between sm:justify-end">
                    <a class="relative inline-flex items-center rounded-md border border-white/10 bg-[#1e2329] px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                        href="#">Previous</a>
                    <a class="relative ml-3 inline-flex items-center rounded-md border border-white/10 bg-[#1e2329] px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors"
                        href="#">Next</a>
                </div>
            </nav>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>