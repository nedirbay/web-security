<template>
    <div
        class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
        <div class="layout-container flex h-full grow flex-col">
            <div class="flex flex-1 justify-center py-5 sm:px-10 md:px-20 lg:px-40">
                <div class="layout-content-container flex w-full flex-1 flex-col">
                    <!-- TopNavBar -->
                    <!-- <AppHeader /> -->

                    <router-view />

                    <!-- Footer -->
                    <!-- <AppFooter /> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
import AppFooter from '../components/AppFooter.vue';
</script>
