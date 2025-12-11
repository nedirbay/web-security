<template>
    <main class="flex flex-col gap-8 py-8 px-4 sm:px-0">
        <div class="@container">
            <div class="@[480px]:p-4">
                <div class="flex min-h-[300px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10"
                    style='background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(17, 23, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDP6asXHBmFOOpd3i4qVbudeI5dm3ipvEcVhBBK3AzUBhVIl3LjLojnnFYRizVr26E-N19MbNTdeO6dly_KJ0qMgUrKlR2F6bnouX6Glg5XmroqRFvEWNLVdsuCVe3XlvBnAgGQdBf5cyTrsfJDPDAu1wv34r2p0mD84dNpLvlWZioekAGEzzQbOKGosr-KVKKGrJiI0RPiL12zC1MXjVZJ6-WXZndMH-6zdwHUIWl6o1d7UfqCcBpSl3uNcoe1lWkqH4bvBL1c8UQ");'>
                    <div class="flex flex-col gap-2 text-left">
                        <h1
                            class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                            OWASP Top 10
                        </h1>
                        <h2
                            class="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                            Understanding the most critical web application security risks.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-4 sm:px-10 max-w-4xl mx-auto w-full">
            <article class="prose prose-invert max-w-none text-white">
                <p>The OWASP Top 10 is a standard awareness document for developers and web application security. It
                    represents a broad consensus about the most critical security risks to web applications.</p>

                <h3>The List</h3>
                <ul>
                    <li><strong>A01:2021-Broken Access Control:</strong> Restrictions on what authenticated users are
                        allowed to do are often not properly enforced.</li>
                    <li><strong>A02:2021-Cryptographic Failures:</strong> Focuses on failures related to cryptography
                        which often leads to sensitive data exposure or system compromise.</li>
                    <li><strong>A03:2021-Injection:</strong> User-supplied data is not validated, filtered, or sanitized
                        by the application.</li>
                    <li><strong>A04:2021-Insecure Design:</strong> Focuses on risks related to design flaws.</li>
                    <li><strong>A05:2021-Security Misconfiguration:</strong> Security settings are defined, implemented,
                        and maintained with defaults.</li>
                    <!-- Add more as needed -->
                </ul>
            </article>
            <div class="mt-8">
                <router-link to="/docs" class="text-primary hover:underline">← Back to Documentation</router-link>
            </div>
        </div>
    </main>
</template>
