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
                    <input v-model="searchQuery" @input="filterScans"
                        class="w-full rounded-lg border-white/10 bg-[#1e2329] py-2 pl-10 pr-4 text-sm text-white focus:border-primary focus:ring-primary placeholder-slate-400 shadow-sm"
                        placeholder="Search by target URL..." type="text" />
                </div>
                <div class="flex flex-wrap gap-2">
                    <div class="relative">
                        <select v-model="statusFilter" @change="filterScans"
                            class="appearance-none h-9 pl-3 pr-8 rounded-lg border border-white/10 bg-[#1e2329] text-white text-sm font-medium focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer hover:bg-white/5 transition-colors">
                            <option value="">Status: All</option>
                            <option value="COMPLETED">Completed</option>
                            <option value="RUNNING">Running</option>
                            <option value="FAILED">Failed</option>
                        </select>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
                            <span class="material-symbols-outlined text-base">expand_more</span>
                        </div>
                    </div>
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
                                    <tr v-for="scan in paginatedScans" :key="scan.id"
                                        class="hover:bg-white/5 transition-colors">
                                        <td class="whitespace-nowrap px-4 py-4 text-sm text-slate-400">
                                            {{ formatDate(scan.start_time) }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm font-medium text-white">
                                            {{ scan.target_url }}</td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm">
                                            <span :class="getStatusClass(scan.status)"
                                                class="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium border">
                                                <div class="size-1.5 rounded-full"
                                                    :class="scan.status === 'COMPLETED' ? 'bg-green-400' : (scan.status === 'FAILED' ? 'bg-red-400' : 'bg-blue-400')">
                                                </div>{{ scan.status }}
                                            </span>
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            <!-- We might not have count summary in the list API, showing 'View Report' -->
                                            Click report to see details
                                        </td>
                                        <td class="whitespace-nowrap px-3 py-4 text-sm text-slate-400">
                                            <!-- Duration calculation if start/end exists -->
                                            {{ scan.end_time ? 'Completed' : 'Running' }}
                                        </td>
                                        <td
                                            class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                            <button @click="viewReport(scan)"
                                                class="text-primary hover:text-primary/80 transition-colors">
                                                View Report
                                            </button>
                                        </td>
                                    </tr>
                                    <tr v-if="filteredScans.length === 0">
                                        <td colspan="6" class="px-6 py-8 text-center text-slate-400">No scans found.
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            <!-- Pagination -->
            <nav aria-label="Pagination" v-if="totalPages > 1"
                class="mt-6 flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
                <div class="hidden sm:block">
                    <p class="text-sm text-slate-400">
                        Showing <span class="font-medium text-white">{{ (currentPage - 1) * itemsPerPage + 1 }}</span>
                        to <span class="font-medium text-white">{{ Math.min(currentPage * itemsPerPage,
                            filteredScans.length) }}</span> of <span class="font-medium text-white">{{
                                filteredScans.length }}</span>
                        results
                    </p>
                </div>
                <div class="flex flex-1 justify-between sm:justify-end gap-3">
                    <button
                        class="relative inline-flex items-center rounded-md border border-white/10 bg-[#1e2329] px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="currentPage === 1" @click="changePage(currentPage - 1)">Previous</button>
                    <button
                        class="relative inline-flex items-center rounded-md border border-white/10 bg-[#1e2329] px-3 py-2 text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">Next</button>
                </div>
            </nav>
        </div>

        <!-- Report Details Modal -->
        <transition enter-active-class="transition duration-200 ease-out"
            enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-75 ease-in" leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0">
            <div v-if="showReportModal" class="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title"
                role="dialog" aria-modal="true">
                <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <div class="fixed inset-0 bg-gray-900 bg-opacity-75 transition-opacity" aria-hidden="true"
                        @click="showReportModal = false"></div>

                    <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

                    <div
                        class="inline-block align-bottom bg-[#1e2329] rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-4xl sm:w-full border border-white/10">
                        <div class="bg-[#1e2329] px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                            <div class="sm:flex sm:items-start">
                                <div class="mt-3 text-center sm:mt-0 sm:text-left w-full">
                                    <h3 class="text-xl leading-6 font-bold text-white mb-4" id="modal-title">
                                        Scan Report: {{ selectedScan?.target_url }}
                                    </h3>

                                    <div v-if="isScanDetailsLoading" class="text-center py-8 text-slate-400">
                                        Loading details...
                                    </div>

                                    <div v-else>
                                        <div
                                            class="overflow-x-auto bg-[#1e2329] rounded-xl border border-white/5 shadow-sm">
                                            <table class="w-full text-left text-sm">
                                                <thead
                                                    class="text-xs text-slate-400 uppercase bg-white/5 border-b border-white/5">
                                                    <tr>
                                                        <th class="px-6 py-4" scope="col">Risk</th>
                                                        <th class="px-6 py-4" scope="col">Alert</th>
                                                        <th class="px-6 py-4" scope="col">URL</th>
                                                        <th class="px-6 py-4" scope="col">Confidence</th>
                                                        <th class="px-6 py-4" scope="col">Details</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="divide-y divide-white/5">
                                                    <tr v-for="(alert, index) in paginatedAlerts"
                                                        :key="alert.id || index"
                                                        class="hover:bg-white/5 transition-colors">
                                                        <td class="px-6 py-4">
                                                            <span :class="getRiskBadgeClass(alert.risk_level)"
                                                                class="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold border">
                                                                {{ alert.risk_level }}
                                                            </span>
                                                        </td>
                                                        <td class="px-6 py-4 font-medium text-white">{{ alert.alert_name
                                                            }}</td>
                                                        <td class="px-6 py-4 text-slate-300 break-all">{{ alert.url }}
                                                        </td>
                                                        <td class="px-6 py-4 font-medium"
                                                            :class="getConfidenceClass(alert.confidence)">{{
                                                                alert.confidence }}</td>
                                                        <!-- Details are shown inline or user can see description/solution here? The user asked to show scan details in history view too.
                                                             Let's show description/solution in a collapsible detail or just columns. 
                                                             The request was "pagination-de gorkezmegi unutma. Tablisany modele gabat getir".
                                                             I will show the main columns and maybe a tooltip or expand for description/solution if needed, 
                                                             or just assume "Scan Details" means the list of alerts itself is the detail. 
                                                             The user provided a model: alert, confidence, description, risk, solution, url.
                                                             I'm displaying Risk, Alert, URL, Confidence. 
                                                             Description and Solution are large texts, better suited for a nested detail or tooltip.
                                                             Let's add an expand row or another modal? A nested modal is bad UX.
                                                             I will add a row expansion for description/solution.
                                                        -->
                                                        <td class="px-6 py-4">
                                                            <details class="group cursor-pointer" ref="detailsElement">
                                                                <summary
                                                                    class="list-none text-primary font-medium hover:underline">
                                                                    View</summary>
                                                                <div class="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/80"
                                                                    @click.stop="((e) => (e.target as HTMLElement).closest('details')?.removeAttribute('open'))($event)">
                                                                    <div class="bg-[#1e2329] p-6 rounded-lg max-w-2xl w-full border border-white/10 max-h-[80vh] overflow-y-auto relative"
                                                                        @click.stop>
                                                                        <button
                                                                            class="absolute top-4 right-4 text-slate-400 hover:text-white"
                                                                            @click="((e) => (e.target as HTMLElement).closest('details')?.removeAttribute('open'))($event)">✕</button>
                                                                        <h4 class="text-lg font-bold text-white mb-2">{{
                                                                            alert.alert_name }}</h4>
                                                                        <div class="space-y-4">
                                                                            <div>
                                                                                <strong
                                                                                    class="text-slate-300 block">Description:</strong>
                                                                                <p
                                                                                    class="text-slate-400 text-sm whitespace-pre-wrap">
                                                                                    {{ alert.description }}</p>
                                                                            </div>
                                                                            <div>
                                                                                <strong
                                                                                    class="text-slate-300 block">Solution:</strong>
                                                                                <p
                                                                                    class="text-slate-400 text-sm whitespace-pre-wrap">
                                                                                    {{ alert.solution }}</p>
                                                                            </div>
                                                                            <div
                                                                                class="grid grid-cols-2 gap-2 text-sm border-t border-white/10 pt-4">
                                                                                <p><span
                                                                                        class="text-slate-400">Risk:</span>
                                                                                    <span class="text-white">{{
                                                                                        alert.risk_level }}</span>
                                                                                </p>
                                                                                <p><span
                                                                                        class="text-slate-400">Confidence:</span>
                                                                                    <span class="text-white">{{
                                                                                        alert.confidence }}</span>
                                                                                </p>
                                                                                <p class="col-span-2"><span
                                                                                        class="text-slate-400">URL:</span>
                                                                                    <span
                                                                                        class="text-white break-all">{{
                                                                                            alert.url }}</span>
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </details>
                                                        </td>
                                                    </tr>
                                                    <tr v-if="paginatedAlerts.length === 0">
                                                        <td colspan="5" class="px-6 py-8 text-center text-slate-400">
                                                            No details found for this scan.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                        <!-- Alert Pagination -->
                                        <div class="flex items-center justify-center p-4" v-if="totalAlertPages > 1">
                                            <button
                                                class="flex size-8 items-center justify-center text-white hover:text-primary disabled:opacity-50"
                                                :disabled="alertCurrentPage === 1"
                                                @click="changeAlertPage(alertCurrentPage - 1)">
                                                <span class="material-symbols-outlined text-sm">chevron_left</span>
                                            </button>

                                            <span class="text-xs text-slate-400 px-2">Page {{ alertCurrentPage }} of {{
                                                totalAlertPages }}</span>

                                            <button
                                                class="flex size-8 items-center justify-center text-white hover:text-primary disabled:opacity-50"
                                                :disabled="alertCurrentPage === totalAlertPages"
                                                @click="changeAlertPage(alertCurrentPage + 1)">
                                                <span class="material-symbols-outlined text-sm">chevron_right</span>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div class="bg-[#191d23] px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                            <button type="button"
                                class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary sm:ml-3 sm:w-auto sm:text-sm"
                                @click="showReportModal = false">
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
import { ref, onMounted, computed } from 'vue';
import { scanList, scanDetail } from '../api/api_endpoints';

const scans = ref<any[]>([]);
const filteredScans = ref<any[]>([]);
const searchQuery = ref('');
const statusFilter = ref('');

// Pagination
const currentPage = ref(1);
const itemsPerPage = 10;

// Details Modal
const selectedScan = ref<any>(null);
const scanAlerts = ref<any[]>([]);
const isScanDetailsLoading = ref(false);
const showReportModal = ref(false);

const alertCurrentPage = ref(1);
const alertItemsPerPage = 5;

// Computed for Pagination
const paginatedScans = computed(() => {
    const start = (currentPage.value - 1) * itemsPerPage;
    return filteredScans.value.slice(start, start + itemsPerPage);
});

const totalPages = computed(() => {
    return Math.ceil(filteredScans.value.length / itemsPerPage);
});

// Computed for Alert Pagination in Modal
const paginatedAlerts = computed(() => {
    // Sort alerts by risk
    const sortedAlerts = [...scanAlerts.value].sort((a: any, b: any) => {
        const riskOrder: Record<string, number> = { 'High': 3, 'Medium': 2, 'Low': 1, 'Informational': 0 };
        return (riskOrder[b.risk_level] || 0) - (riskOrder[a.risk_level] || 0); // Note: backend uses risk_level
    });

    const start = (alertCurrentPage.value - 1) * alertItemsPerPage;
    return sortedAlerts.slice(start, start + alertItemsPerPage);
});

const totalAlertPages = computed(() => {
    return Math.ceil(scanAlerts.value.length / alertItemsPerPage);
});

const fetchScans = async () => {
    try {
        const response = await scanList();
        // Assuming response.data.scans is the array
        if (response.data && response.data.scans) {
            scans.value = response.data.scans;
            filteredScans.value = scans.value;
        }
    } catch (error) {
        console.error("Error fetching scans:", error);
    }
};

const filterScans = () => {
    filteredScans.value = scans.value.filter(scan => {
        const matchesUrl = scan.target_url.toLowerCase().includes(searchQuery.value.toLowerCase());
        const matchesStatus = statusFilter.value ? scan.status === statusFilter.value : true;
        return matchesUrl && matchesStatus;
    });
    currentPage.value = 1; // Reset to first page
};

const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};

const changeAlertPage = (page: number) => {
    if (page >= 1 && page <= totalAlertPages.value) {
        alertCurrentPage.value = page;
    }
};

const viewReport = async (scan: any) => {
    selectedScan.value = scan;
    showReportModal.value = true;
    isScanDetailsLoading.value = true;
    scanAlerts.value = [];
    alertCurrentPage.value = 1; // Reset alert pagination

    try {
        const response = await scanDetail(scan.id);
        if (response.data && response.data.alerts) {
            scanAlerts.value = response.data.alerts;
        }
    } catch (error) {
        console.error("Error fetching scan details:", error);
    } finally {
        isScanDetailsLoading.value = false;
    }
};

const getStatusClass = (status: string) => {
    switch (status) {
        case 'COMPLETED': return 'bg-green-900/30 text-green-400 border-green-500/20';
        case 'RUNNING': return 'bg-blue-900/30 text-blue-400 border-blue-500/20';
        case 'FAILED': return 'bg-red-900/30 text-red-400 border-red-500/20';
        default: return 'bg-slate-800 text-slate-300';
    }
};

const getRiskBadgeClass = (risk: string) => {
    switch (risk) {
        case 'HIGH': return 'bg-orange-900/30 text-orange-400 border-orange-500/20';
        case 'MEDIUM': return 'bg-yellow-900/30 text-yellow-400 border-yellow-500/20';
        case 'LOW': return 'bg-blue-900/30 text-blue-400 border-blue-500/20';
        case 'INFO': return 'bg-slate-800 text-slate-300 border-slate-500/20';
        default: return 'bg-slate-800 text-slate-300 border-slate-500/20';
    }
};

const getConfidenceClass = (confidence: string) => {
    switch (confidence) {
        case 'High': return 'text-green-500';
        case 'Medium': return 'text-yellow-500';
        case 'Low': return 'text-slate-400';
        default: return 'text-slate-500';
    }
};

const formatDate = (dateString: string) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleString();
};

onMounted(() => {
    fetchScans();
});
</script>