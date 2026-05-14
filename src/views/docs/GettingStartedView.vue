<template>
    <main class="flex flex-col gap-8 py-8 px-4 sm:px-0">
        <div class="@container">
            <div class="@[480px]:p-4">
                <div class="flex min-h-[300px] flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-lg items-start justify-end px-4 pb-10 @[480px]:px-10"
                    style='background-image: linear-gradient(rgba(0, 0, 0, 0.2) 0%, rgba(17, 23, 34, 0.8) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuDP6asXHBmFOOpd3i4qVbudeI5dm3ipvEcVhBBK3AzUBhVIl3LjLojnnFYRizVr26E-N19MbNTdeO6dly_KJ0qMgUrKlR2F6bnouX6Glg5XmroqRFvEWNLVdsuCVe3XlvBnAgGQdBf5cyTrsfJDPDAu1wv34r2p0mD84dNpLvlWZioekAGEzzQbOKGosr-KVKKGrJiI0RPiL12zC1MXjVZJ6-WXZndMH-6zdwHUIWl6o1d7UfqCcBpSl3uNcoe1lWkqH4bvBL1c8UQ");'>
                    <div class="flex flex-col gap-2 text-left">
                        <h1
                            class="text-white text-4xl font-black leading-tight tracking-[-0.033em] @[480px]:text-5xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">
                            Başlamak
                        </h1>
                        <h2
                            class="text-white text-sm font-normal leading-normal @[480px]:text-base @[480px]:font-normal @[480px]:leading-normal">
                            Howpsuzlyk platformamyzy ulanmagyň esaslaryny öwreniň.
                        </h2>
                    </div>
                </div>
            </div>
        </div>
        <div class="px-4 sm:px-10 max-w-4xl mx-auto w-full">
            <article class="prose prose-invert max-w-none text-white">
                <h3>Giriş</h3>
                <p>Web howpsuzlyk platformasyna hoş geldiňiz. Bu gollanma size elýeterli funksiýalary nädip ulanmalydygyny we nawigasiýany öwrenmäge kömek eder.</p>

                <h3>Talaplar</h3>
                <ul>
                    <li>Işjeň hasap</li>
                    <li>Web howpsuzlyk düşünjeleri barada başlangyç bilim</li>
                </ul>

                <h3>Ilkinji ädimler</h3>
                <ol>
                    <li><strong>Panel:</strong> Howpsuzlyk ýagdaýyňyzyň umumy synyny görmek üçin panele geçiň.</li>
                    <li><strong>Barlagy başlatmak:</strong> Ilkinji gowşaklyk barlagyny başlatmak üçin "Barlaglar" bölümini ulanyň.
                    </li>
                    <li><strong>Hasabatlary gözden geçirmek:</strong> Ähtimal bolan töwekgelçilikleri anyklamak üçin dörän hasabatlary seljeriň.</li>
                </ol>
            </article>
            <div class="mt-8">
                <router-link to="/docs" class="text-primary hover:underline">← Dokumentasiýa dolan</router-link>
            </div>
        </div>
    </main>
</template>
