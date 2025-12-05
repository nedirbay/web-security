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
                            class="text-slate-300 text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
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
            <div v-for="tag in ['SQL Injection', 'XSS', 'CSRF', 'Broken Authentication', 'Insecure Deserialization']"
                :key="tag"
                class="flex h-8 shrink-0 cursor-pointer items-center justify-center gap-x-2 rounded-full bg-slate-200 dark:bg-[#1e2329] border border-transparent dark:border-white/10 pl-4 pr-4 hover:bg-slate-300 dark:hover:bg-white/5 transition-colors">
                <p class="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal">{{ tag }}</p>
            </div>
        </div>

        <!-- ImageGrid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
            <!-- Card 1 -->
            <router-link to="/detail" class="flex flex-col gap-3 pb-3 group cursor-pointer">
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden">
                    <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuB2Reqx2ttxxtvt7i2_h8s6e7lnHkZG--BWn4ZB3WO-8HUHzRtflvlNxxmZvxOcSptf9IwVkizsnBxF7X8Cgc6NDNZCu7evPMH43lkjDgqEPnf2WmYNIRmI_39tZ_jcX64GdWjTumrJGyK-xQ727DXuFUtO0tMi5apesw0tnfkTtIIPFk5nELlQALHK605MOqeCWnWlmJRdEaZPn93UREevzDgVsU0qUj5o1kBipP5D181piB5nJlaNREI4fBz81TKgnHFY2OhvL-w");'>
                    </div>
                </div>
                <div>
                    <p class="text-primary text-xs font-bold uppercase">XSS</p>
                    <span
                        class="text-slate-800 dark:text-white text-base font-bold leading-normal mt-1 group-hover:text-primary dark:group-hover:text-primary block">
                        Deep Dive into Cross-Site Scripting: How to Protect Your App
                    </span>
                    <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-2">By Jane Doe -
                        Oct 26, 2023</p>
                </div>
            </router-link>

            <!-- Card 2 -->
            <router-link to="/detail" class="flex flex-col gap-3 pb-3 group cursor-pointer">
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden">
                    <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuCtEs0vYd3Pz7B-FVfE_IgX1kqkruy2X-m7NkJU5d4IXeo-_7-U5ULzCr8qHmG-qRKCyXppmVryfgdRSVOnRI_Kk7WHg3kFx9gg22jV2GTJp7qIFmqLfeYHaAVk-DRnZnbAvZThRHPrPKsimMWLzxwPwZrkvjvtaV5qFF1gTCqJI5_9ETyeH4FWXtv8UzaSly6sB22apLCBNOL8tLpczfLNH07_2gnqbslL8QuARSNtU2aiGP9tOppCQn0pY06qYDTSZPVUV9eRWyc");'>
                    </div>
                </div>
                <div>
                    <p class="text-primary text-xs font-bold uppercase">SQL Injection</p>
                    <span
                        class="text-slate-800 dark:text-white text-base font-bold leading-normal mt-1 group-hover:text-primary dark:group-hover:text-primary block">
                        Understanding SQL Injection Vulnerabilities</span>
                    <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-2">By John Smith
                        - Oct 24, 2023</p>
                </div>
            </router-link>

            <!-- Card 3 -->
            <router-link to="/detail" class="flex flex-col gap-3 pb-3 group cursor-pointer">
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden">
                    <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuDWWzwLRoTfVYvEuKq7CY5j_7p16c9eGhWMko3nJZsGGDO8UmxtI0M-lelVWHLcrSmXX_n8OeFmatCkEp_I8Y8qbcruqzLdcS6mzXvmzWcUPYGQ8kpx_dgQFPi8Ka3cq21jSSL6xnYpTQxL8mgyfsxZQjE_pWR17JdXk3qz3oSN5GzCFKE8SiuqCV84UtVwvbCo7L607ldziHTvwUAioxHJ_p3JcKk9PVSZp5bnQF420gLbfLkY02yF9I6CeQJpYZh1AB6wj_2mh6s");'>
                    </div>
                </div>
                <div>
                    <p class="text-primary text-xs font-bold uppercase">API Security</p>
                    <span
                        class="text-slate-800 dark:text-white text-base font-bold leading-normal mt-1 group-hover:text-primary dark:group-hover:text-primary block">
                        Securing Your APIs Against Broken Object Level Authorization</span>
                    <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-2">By Alex Ray -
                        Oct 22, 2023</p>
                </div>
            </router-link>

            <!-- Card 4 -->
            <router-link to="/detail" class="flex flex-col gap-3 pb-3 group cursor-pointer">
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-lg overflow-hidden">
                    <div class="w-full h-full bg-cover bg-center group-hover:scale-105 transition-transform duration-300"
                        style='background-image: url("https://lh3.googleusercontent.com/aida-public/AB6AXuAj4qKe_fYKJLVm2Q21HLlYD2bzA-QBgUA4CSo5TQfXFrHI0UHte5S60gFMOJk1m911LiVzwm9RPlO6qEc6O0s7a_cFVH3OzX3RMdwOEZox5yEiJfqP-_hD7dL9QPmW2Azvr5Gj-l0jD_8fRJjQvzRwCmrebBVM40YfsaUClt6SCDPnrwV-GG-A4qGj1GIk9lmxpi3YlcKOBzfWjX6jeulYjwqfTWb1O0OEXq2sGMJz1G0uN-2WFErTokMcpp0RXoj_NiwlZY0veRY");'>
                    </div>
                </div>
                <div>
                    <p class="text-primary text-xs font-bold uppercase">Deserialization</p>
                    <span
                        class="text-slate-800 dark:text-white text-base font-bold leading-normal mt-1 group-hover:text-primary dark:group-hover:text-primary block">
                        A Guide to Preventing Insecure Deserialization</span>
                    <p class="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal mt-2">By Sarah Lee -
                        Oct 20, 2023</p>
                </div>
            </router-link>
        </div>

        <!-- Pagination -->
        <div class="flex items-center justify-center p-4">
            <a class="flex size-10 items-center justify-center text-slate-500 dark:text-white hover:text-primary"
                href="#">
                <span class="material-symbols-outlined">chevron_left</span>
            </a>
            <a class="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-primary"
                href="#">1</a>
            <a class="text-sm font-normal leading-normal flex size-10 items-center justify-center text-slate-500 dark:text-white rounded-full hover:bg-slate-200 dark:hover:bg-[#1e2329]"
                href="#">2</a>
            <a class="flex size-10 items-center justify-center text-slate-500 dark:text-white hover:text-primary"
                href="#">
                <span class="material-symbols-outlined">chevron_right</span>
            </a>
        </div>
    </main>
</template>

<script setup>
// Bu ýerde script logikalaryny goşup bilersiňiz
</script>