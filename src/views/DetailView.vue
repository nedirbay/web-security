<template>
    <main class="px-4 sm:px-8 md:px-16 lg:px-24 xl:px-40 flex flex-1 justify-center py-5">
        <div class="layout-content-container flex flex-col w-full max-w-4xl flex-1">
            <!-- Breadcrumbs -->
            <div class="flex flex-wrap gap-2 pt-8 pb-4">
                <router-link to="/"
                    class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors">Home</router-link>
                <span class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
                <a class="text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-primary text-sm font-medium leading-normal transition-colors"
                    href="#">Blog</a>
                <span class="text-gray-500 dark:text-gray-400 text-sm font-medium leading-normal">/</span>
                <span class="text-gray-800 dark:text-white text-sm font-medium leading-normal">A Deep Dive into SQL
                    Injection...</span>
            </div>
            <!-- Article Header -->
            <div class="flex flex-col gap-4 py-4 border-b border-gray-200 dark:border-white/10">
                <!-- PageHeading -->
                <h1
                    class="text-gray-900 dark:text-white text-3xl md:text-4xl lg:text-5xl font-black leading-tight tracking-[-0.033em]">
                    A Deep Dive into SQL Injection Vulnerabilities
                </h1>
                <!-- MetaText -->
                <p class="text-gray-500 dark:text-gray-400 text-sm font-normal leading-normal">
                    By Alex Williams | Published on October 26, 2023 | 8 min read
                </p>
                <!-- Chips -->
                <div class="flex gap-3 flex-wrap">
                    <div
                        class="flex h-8 shrink-0 items-center text-white justify-center gap-x-2 rounded-lg bg-primary/10 dark:bg-primary/20 px-4">
                        Category :
                        <p class="text-primary dark:text-primary text-sm font-medium leading-normal">
                            SQL Injection
                        </p>
                    </div>
                </div>
            </div>
            <!-- Article Body -->
            <article
                class="prose prose-lg dark:prose-invert max-w-none py-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                <p>
                    SQL Injection (SQLi) remains one of the most prevalent and damaging web application
                    vulnerabilities. It occurs when an attacker can interfere with the queries that an
                    application makes to its database. This allows them to view data they are not
                    normally able to retrieve, modify or delete this data, and potentially escalate
                    their privileges to compromise the entire system. This article will explore what
                    SQLi is, how it works, and how you can defend against it.
                </p>
            </article>
        </div>
    </main>
</template>

<script setup lang="ts">
</script>
