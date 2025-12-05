<template>
    <div
        class="relative flex h-auto min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display">
        <div class="layout-container flex h-full grow flex-col">
            <div class="flex flex-1 justify-center py-5 sm:px-10 md:px-20 lg:px-40">
                <div class="layout-content-container flex w-full flex-1 flex-col">

                    <!-- TopNavBar (Header) -->
                    <header
                        class="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-b-[#232f48] px-4 sm:px-10 py-3">
                        <div class="flex items-center gap-4 text-slate-800 dark:text-white">
                            <div class="size-6 text-primary">
                                <svg fill="none" viewbox="0 0 48 48" xmlns="http://www.w.org/2000/svg">
                                    <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor">
                                    </path>
                                </svg>
                            </div>
                            <h2 class="text-slate-800 text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                                Web Security</h2>
                        </div>
                        <div class="hidden md:flex flex-1 justify-end gap-8">
                            <div class="flex items-center gap-9">
                                <router-link to="/"
                                    class="text-slate-600 text-white text-slate-300 hover:text-primary hover:text-primary text-sm font-medium leading-normal">Main</router-link>
                                <a class="text-primary dark:text-white text-sm font-bold leading-normal"
                                    href="#">Blog</a>
                                <a class="text-primary dark:text-white text-sm font-bold leading-normal"
                                    href="#">Docs</a>
                                <a class="text-slate-600 text-white text-slate-300 hover:text-primary hover:text-primary text-sm font-medium leading-normal"
                                    href="#">Scans</a>
                            </div>
                            <button
                                class="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90">
                                <span class="truncate">Start Free Scan</span>
                            </button>
                        </div>
                        <button
                            class="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                            <span class="material-symbols-outlined">menu</span>
                        </button>
                    </header>

                    <!-- Router View -->
                    <router-view />

                    <!-- Footer -->
                    <footer class="bg-background-dark border-t border-[#232f48] py-12 px-4 sm:px-10 mt-8 w-full">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div class="flex flex-col gap-4">
                                <h3 class="text-lg font-bold text-white">Get Security Insights
                                    Delivered to Your Inbox.</h3>
                                <p class="text-white">Stay updated with the latest trends,
                                    threats, and mitigation techniques in web application security.</p>
                                <div class="flex flex-col sm:flex-row gap-2 mt-2">
                                    <input
                                        class="form-input flex-grow rounded-lg border-[#324467] bg-[#192233] text-white placeholder:text-[#92a4c9] focus:border-primary focus:ring-primary"
                                        placeholder="Enter your email" type="email" />
                                    <button
                                        class="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90">Subscribe</button>
                                </div>
                            </div>
                            <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
                                <div>
                                    <h4 class="font-bold text-white mb-3">Company</h4>
                                    <ul class="space-y-2">
                                        <li><a class="text-white hover:text-primary" href="#">About Us</a></li>
                                        <li><a class="text-white hover:text-primary" href="#">Contact</a></li>
                                        <li><a class="text-white hover:text-primary" href="#">Careers</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-bold text-white mb-3">Resources</h4>
                                    <ul class="space-y-2">
                                        <li><a class="text-white hover:text-primary" href="#">Documentation</a></li>
                                        <li><a class="text-white hover:text-primary" href="#">Support</a></li>
                                        <li><a class="text-white hover:text-primary" href="#">API Status</a></li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 class="font-bold text-white mb-3">Legal</h4>
                                    <ul class="space-y-2">
                                        <li><a class="text-white hover:text-primary" href="#">Terms of Service</a></li>
                                        <li><a class="text-white hover:text-primary" href="#">Privacy Policy</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div
                            class="mt-12 border-t border-[#232f48] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <p class="text-sm text-white">© 2024 ZAP Security. All rights
                                reserved.</p>
                            <!-- Social Icons -->
                            <div class="flex gap-4">
                                <a class="text-white hover:text-primary" href="#">Twitter</a>
                                <a class="text-white hover:text-primary" href="#">LinkedIn</a>
                                <a class="text-white hover:text-primary" href="#">GitHub</a>
                            </div>
                        </div>
                    </footer>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
</script>