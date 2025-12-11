<template>
    <main class="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
        <div v-if="blog" class="layout-content-container flex flex-col w-full max-w-4xl flex-1">
            <!-- Breadcrumbs -->
            <div class="flex flex-wrap gap-2 pt-8 pb-4">
                <router-link to="/"
                    class="text-white dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors">Home</router-link>
                <span class="text-white dark:text-gray-400 text-sm font-medium leading-normal">/</span>
                <router-link to="/"
                    class="text-white dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors">Blog</router-link>
                <span class="text-white dark:text-gray-400 text-sm font-medium leading-normal">/</span>
                <span class="text-white dark:text-white text-sm font-medium leading-normal truncate max-w-[200px]">{{
                    blog.title }}</span>
            </div>
            <!-- Article Header -->
            <div class="flex flex-col gap-4 py-4 border-b border-gray-200 dark:border-white/10">
                <!-- PageHeading -->
                <h1
                    class="text-white dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                    {{ blog.title }}
                </h1>
                <!-- MetaText -->
                <p class="text-white dark:text-gray-400 text-sm font-normal leading-normal">
                    Published on {{ new Date(blog.created_at).toLocaleDateString() }}
                </p>
                <!-- Chips -->
                <div class="flex gap-3 flex-wrap">
                    <div
                        class="flex h-8 shrink-0 items-center text-white justify-center gap-x-2 rounded-lg bg-primary/10 dark:bg-primary/20 px-4">
                        Category :
                        <p class="text-primary dark:text-primary text-sm font-medium leading-normal">
                            {{ getCategoryName(blog.category) }}
                        </p>
                    </div>
                </div>
            </div>
            <!-- Article Body -->
            <article
                class="prose prose-lg dark:prose-invert max-w-none py-8 text-white dark:text-gray-300 leading-relaxed"
                v-html="blog.description">
            </article>
        </div>
        <div v-else class="flex flex-1 items-center justify-center">
            <p class="text-white">Loading...</p>
        </div>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { blogDetail, blogCategories } from '../api/api_endpoints';
import { useRoute } from 'vue-router';

interface Blog {
    id: number;
    title: string;
    category: number;
    description: string;
    created_at: string;
    updated_at: string;
}

interface BlogCategory {
    id: number;
    name: string;
    description: string;
    created_at: string;
    updated_at: string;
}

const route = useRoute();
const blog = ref<Blog | null>(null);
const categories = ref<BlogCategory[]>([]);

const getCategoryName = (categoryId: number) => {
    const category = categories.value.find((c) => c.id === categoryId);
    return category ? category.name : 'General';
};

onMounted(() => {
    // Fetch categories first to ensure we have them for the name lookup
    blogCategories().then((res) => {
        categories.value = res.data;
    });

    const id = route.params.id as string;
    const blogId = parseInt(id);
    blogDetail(blogId).then((res) => {
        blog.value = res.data;
    });
});

</script>
