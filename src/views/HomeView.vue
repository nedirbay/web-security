<template>
    <main class="flex flex-col gap-8 py-8 px-4 sm:px-0">
        <!-- HeroSection -->
        <div class="@container">
            <div class="@[480px]:p-4">
                <div class="flex min-h-[480px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10"
                    style='background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(17, 23, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDP6asXHBmFOOpd3i4qVbudeI5dm3ipvEcVhBBK3AzUBhVIl3LjLojnnFYRizVr26E-N19MbNTdeO6dly_KJ0qMgUrKlR2F6bnouX6Glg5XmroqRFvEWNLVdsuCVe3XlvBnAgGQdBf5cyTrsfJDPDAu1wv34r2p0mD84dNpLvlWZioekAGEzzQbOKGosr-KVKKGrJiI0RPiL12zC1MXjVZJ6-WXZndMH-6zdwHUIWl6o1d7UfqCcBpSl3uNcoe1lWkqH4bvBL1c8UQ");'>
                    <div class="flex flex-col gap-2 text-left">
                        <h1
                            class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                            Stay Ahead of Threats: The ZAP Security Blog
                        </h1>
                        <h2
                            class="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                            Expert insights on identifying and mitigating the top web application vulnerabilities.
                        </h2>
                    </div>
                    <label class="flex flex-col min-w-40 h-14 w-full max-w-[480px] @[480px]:h-16">
                        <div class="flex w-full flex-1 items-stretch rounded-lg h-full">
                            <div
                                class="text-slate-400 dark:text-slate-400 flex border border-slate-300 dark:border-white/10 bg-white dark:bg-[#1e2329] items-center justify-center pl-[15px] rounded-l-lg border-r-0">
                                <span class="material-symbols-outlined" style="font-size: 20px;">search</span>
                            </div>
                            <input
                                class="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-800 dark:text-white focus:outline-0 focus:ring-0 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#1e2329] focus:border-primary h-full placeholder:text-slate-400 dark:placeholder:text-slate-500 px-[15px] rounded-r-none border-r-0 pr-2 rounded-l-none border-l-0 pl-2 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal"
                                placeholder="Search for articles..." />
                            <div
                                class="flex items-center justify-center rounded-r-lg border-l-0 border border-slate-300 dark:border-white/10 bg-white dark:bg-[#1e2329] pr-[7px]">
                                <button
                                    class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 @[480px]:h-12 @[480px]:px-5 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] @[480px]:text-base @[480px]:font-bold @[480px]:leading-normal @[480px]:tracking-[0.015em] hover:bg-primary/90">
                                    <span class="truncate">Search</span>
                                </button>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
        </div>

        <!-- Chips -->
        <div class="flex gap-2 sm:gap-3 p-3 overflow-x-auto justify-center">
            <div
                class="flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-primary pl-4 pr-4">
                <p class="text-white text-sm font-medium leading-normal">All Posts</p>
            </div>
            <div v-for="category in blogCategoriesData" :key="category.id"
                class="flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-[#1e2329] border border-transparent dark:border-white/10 pl-4 pr-4 hover:bg-slate-300 dark:hover:bg-white/5 transition-colors">
                <p class="text-white dark:text-gray-300 text-sm font-medium leading-normal">{{ category.name }}</p>
            </div>
        </div>

        <!-- ImageGrid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <template v-if="blogsData.length > 0">
                <router-link v-for="blog in blogsData" :key="blog.id" :to="`/detail/${blog.id}`"
                    class="flex flex-col gap-3 pb-3 group cursor-pointer">
                    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden">
                        <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                            :style='`background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2Reqx2ttxxtvt7i2_h8s6e7lnHkZG--BWn4ZB3WO-8HUHzRtflvlNxxmZvxOcSptf9IwVkizsnBxF7X8Cgc6NDNZCu7evPMH43lkjDgqEPnf2WmYNIRmI_39tZ_jcX64GdWjTumrJGyK-xQ727DXuFUtO0tMi5apesw0tnfkTtIIPFk5nELlQALHK605MOqeCWnWlmJRdEaZPn93UREevzDgVsU0qUj5o1kBipP5D181piB5nJlaNREI4fBz81TKgnHFY2OhvL-w");`'>
                        </div>
                    </div>
                    <div>
                        <p class="text-primary text-xs font-bold uppercase">{{ getCategoryName(blog.category) }}</p>
                        <span
                            class="text-white dark:text-white text-base font-bold leading-normal mt-1 group-hover:text-primary dark:group-hover:text-primary block">
                            {{ blog.title }}
                        </span>
                        <p class="text-white dark:text-slate-400 text-sm font-normal leading-normal mt-2">
                            {{ new Date(blog.created_at).toLocaleDateString() }}
                        </p>
                    </div>
                </router-link>
            </template>
            <div v-else class="col-span-full text-center text-white">
                Häzirlikçe maglumat ýok
            </div>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center p-4" v-if="totalPages > 1">
            <button
                class="flex size-10 items-center justify-center text-white dark:text-white hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!previousPageUrl" @click="changePage(currentPage - 1)">
                <span class="material-symbols-outlined">chevron_left</span>
            </button>

            <template v-for="(page, index) in visiblePages" :key="index">
                <button v-if="page !== '...'" @click="changePage(page as number)" :class="[
                    'flex size-10 items-center justify-center rounded-full text-sm font-bold leading-normal transition-colors',
                    currentPage === page
                        ? 'bg-primary text-white tracking-[0.015em]'
                        : 'text-white dark:text-white hover:bg-slate-200 dark:hover:bg-[#1e2329] font-normal'
                ]">
                    {{ page }}
                </button>
                <span v-else class="flex size-10 items-center justify-center text-white dark:text-white">
                    ...
                </span>
            </template>

            <button
                class="flex size-10 items-center justify-center text-white dark:text-white hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed"
                :disabled="!nextPageUrl" @click="changePage(currentPage + 1)">
                <span class="material-symbols-outlined">chevron_right</span>
            </button>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { blogCategories, blogs } from '@/api/api_endpoints';

// Define interfaces for better type safety (optional but good practice)
interface BlogCategory {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

interface Blog {
    id: number;
    title: string;
    category: number;
    description: string;
    created_at: string;
    updated_at: string;
}

const blogCategoriesData = ref<BlogCategory[]>([]);
const blogsData = ref<Blog[]>([]);
const currentPage = ref(1);
const totalCount = ref(0);
const nextPageUrl = ref<string | null>(null);
const previousPageUrl = ref<string | null>(null);
const pageSize = 10; // Assuming default page size of 10

const totalPages = computed(() => Math.ceil(totalCount.value / pageSize));

const visiblePages = computed(() => {
    const pages: (number | string)[] = [];
    const total = totalPages.value;
    const current = currentPage.value;

    // Simple pagination logic: show all if <= 7, otherwise show range
    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
    } else {
        if (current <= 4) {
            for (let i = 1; i <= 5; i++) pages.push(i);
            pages.push('...');
            pages.push(total);
        } else if (current >= total - 3) {
            pages.push(1);
            pages.push('...');
            for (let i = total - 4; i <= total; i++) pages.push(i);
        } else {
            pages.push(1);
            pages.push('...');
            for (let i = current - 1; i <= current + 1; i++) pages.push(i);
            pages.push('...');
            pages.push(total);
        }
    }
    return pages;
});

const getCategoryName = (categoryId: number) => {
    const category = blogCategoriesData.value.find((c) => c.id === categoryId);
    return category ? category.name : 'General';
};

const fetchBlogs = (page: number) => {
    blogs({ page }).then((res) => {
        blogsData.value = res.data.results;
        totalCount.value = res.data.count;
        nextPageUrl.value = res.data.next;
        previousPageUrl.value = res.data.previous;
        currentPage.value = page;
    });
};

const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages.value) {
        fetchBlogs(page);
    }
};

onMounted(() => {
    blogCategories().then((res) => {
        blogCategoriesData.value = res.data;
    });
    fetchBlogs(1);
});
</script>