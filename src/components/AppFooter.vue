<template>
    <footer
        class="bg-slate-100 dark:bg-[#0f1216] border-t border-slate-200 dark:border-white/5 py-12 px-4 sm:px-10 mt-auto">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="flex flex-col gap-4">
                <h3 class="text-lg font-bold text-slate-800 dark:text-white">Get Security Insights
                    Delivered to Your
                    Inbox.</h3>
                <p class="text-slate-600 dark:text-slate-400">Stay updated with the latest trends,
                    threats, and
                    mitigation techniques in web application security.</p>
                <div class="flex flex-col sm:flex-row gap-2 mt-2">
                    <input
                        class="form-input flex-grow rounded-lg border-slate-300 dark:border-[#324467] bg-white dark:bg-[#192233] text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#92a4c9] focus:border-primary focus:ring-primary"
                        placeholder="Enter your email" type="email" />
                    <button
                        class="flex items-center justify-center rounded-lg h-11 px-6 bg-primary text-white text-sm font-bold hover:bg-primary/90">Subscribe</button>
                </div>
            </div>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-8">
                <div>
                    <h4 class="font-bold text-slate-800 dark:text-white mb-3">Company</h4>
                    <ul class="space-y-2">
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">About Us</a></li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Contact</a></li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Careers</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-800 dark:text-white mb-3">Resources</h4>
                    <ul class="space-y-2">
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Documentation</a>
                        </li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Support</a></li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">API Status</a>
                        </li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold text-slate-800 dark:text-white mb-3">Legal</h4>
                    <ul class="space-y-2">
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Terms of
                                Service</a>
                        </li>
                        <li><a class="text-slate-600 dark:text-slate-400 hover:text-primary" href="#">Privacy
                                Policy</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div
            class="mt-12 border-t border-slate-200 dark:border-b-[#232f48] pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p class="text-sm text-slate-500 dark:text-slate-400">© 2024 ZAP Security. All rights
                reserved.</p>
            <div class="flex gap-4">
                <a class="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">Twitter</a>
                <a class="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">LinkedIn</a>
                <a class="text-slate-500 dark:text-slate-400 hover:text-primary" href="#">GitHub</a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
</script>
