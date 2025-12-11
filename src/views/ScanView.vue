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
                            placeholder="https://example.com" v-model="scanUrl" :disabled="isScanning" />
                    </label>
                    <button @click="startScan()" :disabled="isScanning"
                        class="flex min-w-[84px] w-full border border-white/10 md:w-auto max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-14 px-8 bg-primary text-white text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed">
                        <span class="truncate">{{ isScanning ? 'Scanning...' : 'Scan Now' }}</span>
                    </button>
                </div>

                <!-- Progress Bar -->
                <div v-if="isScanning" class="w-full px-4 pt-4">
                    <div class="mb-1 flex justify-between">
                        <span class="text-sm font-medium text-white">Scanning in progress...</span>
                        <span class="text-sm font-medium text-white">{{ progress }}%</span>
                    </div>
                    <div class="h-2.5 w-full rounded-full bg-[#1e2329] border border-white/10">
                        <div class="h-2.5 rounded-full bg-primary transition-all duration-300 ease-out"
                            :style="{ width: progress + '%' }"></div>
                    </div>
                    <p class="mt-2 text-xs text-slate-400">Please wait, this may take a few minutes depending on the
                        target website side.</p>
                </div>

                <!-- Advanced Options Toggle -->
                <p @click="showAdvancedOptions = !showAdvancedOptions"
                    class="text-slate-400 text-sm font-normal leading-normal pb-3 pt-1 px-4 underline cursor-pointer hover:text-primary transition-colors select-none w-fit">
                    Advanced Options
                    <span class="ml-1 text-xs">{{ showAdvancedOptions ? '▲' : '▼' }}</span>
                </p>

                <!-- Advanced Options Panel -->
                <transition enter-active-class="transition duration-200 ease-out"
                    enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
                    leave-active-class="transition duration-75 ease-in"
                    leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                    <div v-if="showAdvancedOptions"
                        class="px-4 py-4 mt-2 mx-4 bg-[#1e2329] rounded-xl border border-white/5 space-y-4">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <!-- Scan Depth -->
                            <label class="flex flex-col">
                                <span class="text-white text-sm font-medium mb-2">Scan Depth</span>
                                <select
                                    class="form-select w-full rounded-lg bg-[#2d333b] border border-white/10 text-white p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none">
                                    <option value="quick">Quick Scan</option>
                                    <option value="standard">Standard Scan</option>
                                    <option value="deep">Deep Scan</option>
                                </select>
                            </label>

                            <!-- User Agent -->
                            <label class="flex flex-col">
                                <span class="text-white text-sm font-medium mb-2">User Agent</span>
                                <input type="text"
                                    class="form-input w-full rounded-lg bg-[#2d333b] border border-white/10 text-white p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none placeholder:text-slate-500"
                                    placeholder="Mozilla/5.0..." />
                            </label>

                            <!-- Concurrent Threads -->
                            <label class="flex flex-col">
                                <span class="text-white text-sm font-medium mb-2">Concurrent Threads</span>
                                <input type="number" min="1" max="100" value="10"
                                    class="form-input w-full rounded-lg bg-[#2d333b] border border-white/10 text-white p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                            </label>

                            <!-- Request Timeout -->
                            <label class="flex flex-col">
                                <span class="text-white text-sm font-medium mb-2">Request Timeout (ms)</span>
                                <input type="number" min="1000" step="500" value="5000"
                                    class="form-input w-full rounded-lg bg-[#2d333b] border border-white/10 text-white p-2.5 focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                            </label>
                        </div>

                        <!-- Checkboxes for specific options -->
                        <div class="flex flex-col space-y-3 pt-2">
                            <span class="text-white text-sm font-medium">Additional Flags</span>
                            <div class="flex flex-wrap gap-4">
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox"
                                        class="form-checkbox text-primary rounded bg-[#2d333b] border-white/10" />
                                    <span class="ml-2 text-slate-300 text-sm">Follow Redirects</span>
                                </label>
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox"
                                        class="form-checkbox text-primary rounded bg-[#2d333b] border-white/10" />
                                    <span class="ml-2 text-slate-300 text-sm">Ignore SSL Errors</span>
                                </label>
                                <label class="inline-flex items-center cursor-pointer">
                                    <input type="checkbox"
                                        class="form-checkbox text-primary rounded bg-[#2d333b] border-white/10" />
                                    <span class="ml-2 text-slate-300 text-sm">Scan Subdomains</span>
                                </label>
                            </div>
                        </div>
                    </div>
                </transition>

            </section>
            <section v-if="scanResults" class="w-full py-8 md:py-12 border-t border-white/5">
                <h3 class="text-2xl font-bold text-white px-4 mb-2">Scan Results for {{ scanResults.target }}
                </h3>
                <p class="text-slate-400 px-4 mb-6">Total Alerts Found: {{ scanResults.total_alerts }}</p>
                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
                    <div
                        class="p-6 rounded-xl bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="font-semibold text-red-500">Critical Risks</h4>
                        <p class="text-5xl font-black text-white mt-2">{{ countRisks('Critical') }}</p>
                    </div>
                    <div
                        class="p-6 rounded-xl bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="font-semibold text-orange-500">High Risks</h4>
                        <p class="text-5xl font-black text-white mt-2">{{ countRisks('High') }}</p>
                    </div>
                    <div
                        class="p-6 rounded-xl bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="font-semibold text-yellow-400">Medium Risks</h4>
                        <p class="text-5xl font-black text-white mt-2">{{ countRisks('Medium') }}</p>
                    </div>
                    <div
                        class="p-6 rounded-xl bg-[#1e2329] border border-white/5 shadow-sm hover:shadow-md transition-shadow">
                        <h4 class="font-semibold text-blue-500">Low Risks</h4>
                        <p class="text-5xl font-black text-white mt-2">{{ countRisks('Low') }}</p>
                    </div>
                </div>
                <div class="p-4 mt-8">
                    <h3 class="text-2xl font-bold text-white mb-6">Identified Vulnerabilities
                    </h3>
                    <div class="overflow-x-auto bg-[#1e2329] rounded-xl border border-white/5 shadow-sm">
                        <table class="w-full text-left text-sm">
                            <thead class="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/5">
                                <tr>
                                    <th class="px-6 py-4" scope="col">Risk</th>
                                    <th class="px-6 py-4" scope="col">Alert</th>
                                    <th class="px-6 py-4" scope="col">URL</th>
                                    <th class="px-6 py-4" scope="col">Confidence</th>
                                    <th class="px-6 py-4" scope="col">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr v-for="(alert, index) in paginatedAlerts" :key="index"
                                    class="hover:bg-white/5 transition-colors">
                                    <td class="px-6 py-4">
                                        <span :class="getRiskBadgeClass(alert.risk)"
                                            class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border">
                                            {{ alert.risk }}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 font-medium text-white">{{ alert.alert }}</td>
                                    <td class="px-6 py-4 text-slate-300 break-all">{{ alert.url }}</td>
                                    <td class="px-6 py-4 font-medium" :class="getConfidenceClass(alert.confidence)">{{
                                        alert.confidence }}</td>
                                    <td class="px-6 py-4">
                                        <button @click="openDetails(alert)"
                                            class="font-medium text-primary hover:underline">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                                <tr v-if="paginatedAlerts.length === 0">
                                    <td colspan="5" class="px-6 py-8 text-center text-slate-400">
                                        No vulnerabilities found or passive scan returned no alerts.
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <!-- Pagination -->
                    <div class="flex items-center justify-center p-4" v-if="totalPages > 1">
                        <button
                            class="flex size-10 items-center justify-center text-white dark:text-white hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="currentPage === 1" @click="changePage(currentPage - 1)">
                            <span class="material-symbols-outlined">chevron_left</span>
                        </button>

                        <div class="flex items-center gap-2 px-4">
                            <span class="text-sm text-slate-400">Page {{ currentPage }} of {{ totalPages }}</span>
                        </div>

                        <button
                            class="flex size-10 items-center justify-center text-white dark:text-white hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                            :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">
                            <span class="material-symbols-outlined">chevron_right</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>

        <!-- Details Modal -->
        <transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="selectedAlert" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title"
                role="dialog" aria-modal="true">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"
                        @click="selectedAlert = null"></div>

                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div
                        class="inline-block align-bottom bg-[#1e2329] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl sm:w-full border border-white/10">
                        <div class="bg-[#1e2329] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <h3 class="text-lg leading-6 font-medium text-white" id="modal-title">
                                        {{ selectedAlert.alert }}
                                    </h3>
                                    <div class="mt-4 space-y-4">
                                        <div>
                                            <h4 class="text-sm font-bold text-slate-300">Description</h4>
                                            <p class="text-sm text-slate-400 mt-1 whitespace-pre-wrap">{{
                                                selectedAlert.description }}</p>
                                        </div>
                                        <div>
                                            <h4 class="text-sm font-bold text-slate-300">Solution</h4>
                                            <p class="text-sm text-slate-400 mt-1 whitespace-pre-wrap">{{
                                                selectedAlert.solution }}</p>
                                        </div>
                                        <div>
                                            <h4 class="text-sm font-bold text-slate-300">Detailed Risk Info</h4>
                                            <div class="grid grid-cols-2 gap-2 mt-2 text-sm">
                                                <p class="text-slate-400">Risk: <span class="text-white">{{
                                                        selectedAlert.risk }}</span></p>
                                                <p class="text-slate-400">Confidence: <span class="text-white">{{
                                                        selectedAlert.confidence }}</span></p>
                                                <p class="col-span-2 text-slate-400">URL: <span
                                                        class="text-white break-all">{{ selectedAlert.url }}</span></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="bg-[#191d23] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                                @click="selectedAlert = null">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </main>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { scan } from '@/api/api_endpoints';

const scanUrl = ref('');
const isScanning = ref(false);
const progress = ref(0);
const scanResults = ref<any>(null);

const showAdvancedOptions = ref(false);

const currentPage = ref(1);
const itemsPerPage = 5;
const selectedAlert = ref<any>(null);

const paginatedAlerts = computed(() => {
    if (!scanResults.value || !scanResults.value.alerts) return [];

    // Sort alerts: High -> Medium -> Low
    const sortedAlerts = [...scanResults.value.alerts].sort((a: any, b: any) => {
        const riskOrder: Record<string, number> = { 'High': 3, 'Medium': 2, 'Low': 1, 'Informational': 0 };
        return (riskOrder[b.risk] || 0) - (riskOrder[a.risk] || 0);
    });

    const start = (currentPage.value - 1) * itemsPerPage;
    return sortedAlerts.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
    if (!scanResults.value || !scanResults.value.alerts) return 0;
    return Math.ceil(scanResults.value.alerts.length / itemsPerPage);
});

const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
}

const openDetails = (alert: any) => {
    selectedAlert.value = alert;
}

const startScan = () => {
    if (!scanUrl.value) {
        alert("Please enter a URL.");
        return;
    }

    isScanning.value = true;
    progress.value = 0;
    scanResults.value = null;

    // Fake progress simulation
    const interval = setInterval(() => {
        if (progress.value < 90) {
            progress.value += Math.floor(Math.random() * 5) + 1;
        }
    }, 500);

    scan({ url: scanUrl.value })
        .then((response) => {
            clearInterval(interval);
            progress.value = 100;
            setTimeout(() => {
                isScanning.value = false;
                scanResults.value = response.data;
                console.log(scanResults.value);
            }, 500);
        })
        .catch((error) => {
            clearInterval(interval);
            progress.value = 0;
            isScanning.value = false;
            console.error(error);
            alert("Scan failed. Please check the URL and try again.");
        });
}

const countRisks = (riskLevel: string) => {
    if (!scanResults.value || !scanResults.value.alerts) return 0;
    return scanResults.value.alerts.filter((a: any) => a.risk === riskLevel).length;
}

const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
        case 'High':
            return 'bg-orange-900/30 text-orange-400 border-orange-500/20';
        case 'Medium':
            return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/20';
        case 'Low':
            return 'bg-blue-900/30 text-blue-400 border-blue-500/20';
        case 'Start Free Scan': // Not a risk, but sometimes passed improperly
        case 'Informational':
            return 'bg-slate-800 text-slate-300 border-slate-500/20';
        default:
            return 'bg-slate-800 text-slate-300 border-slate-500/20';
    }
}

const getConfidenceClass = (confidence: string) => {
    switch (confidence) {
        case 'High': return 'text-green-500';
        case 'Medium': return 'text-yellow-500';
        case 'Low': return 'text-slate-400';
        default: return 'text-slate-500';
    }
}
</script>