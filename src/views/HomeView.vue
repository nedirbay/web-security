<template>
  <div class="overflow-hidden">
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 lg:pt-32 lg:pb-48">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <h1 class="text-5xl md:text-7xl font-extrabold tracking-tight text-black mb-8 leading-[1.1]">
            SECURE YOUR MODERN <br />
            <span class="text-blue-600">APPLICATIONS.</span> <br />
            AUTOMATE SECURITY
          </h1>
          <p class="max-w-2xl mx-auto text-xl text-gray-500 mb-10 leading-relaxed">
            Identify vulnerabilities, secure code, and protect your digital assets with our advanced web security platform.
          </p>
          <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
            <router-link to="/register" class="w-full sm:w-auto px-8 py-4 text-lg font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg shadow-blue-200 transition-all transform hover:-translate-y-1">
              Get Started
            </router-link>
            <router-link to="/docs" class="w-full sm:w-auto px-8 py-4 text-lg font-bold text-black bg-gray-50 hover:bg-gray-100 rounded-full transition-all border border-gray-200">
              View Documentation
            </router-link>
          </div>
        </div>

        <!-- Hero Mockup Illustration -->
        <div class="mt-20 relative max-w-5xl mx-auto">
          <div class="absolute -inset-4 bg-gradient-to-tr from-blue-50 to-indigo-50 rounded-[2rem] blur-2xl opacity-50 -z-10"></div>
          <div class="bg-white border border-gray-100 rounded-2xl shadow-2xl overflow-hidden p-2">
            <div class="bg-gray-50 border border-gray-100 rounded-xl aspect-[16/9] flex items-center justify-center overflow-hidden">
              <img src="/src/pages/dashboard.png" alt="Dashboard Mockup" class="w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Features -->
    <section class="py-24 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-black mb-4 uppercase tracking-widest">Key Features</h2>
          <div class="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Automated Scanning</h3>
            <p class="text-gray-500 leading-relaxed">Scan repositories for vulnerabilities automatically with every commit.</p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Real-Time Protection</h3>
            <p class="text-gray-500 leading-relaxed">Actively monitor and block threats before they reach your users.</p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">Compliance Reporting</h3>
            <p class="text-gray-500 leading-relaxed">Generate instant security & compliance reports for your stakeholders.</p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div class="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 class="text-xl font-bold mb-4">API Security</h3>
            <p class="text-gray-500 leading-relaxed">Secure your APIs and endpoints against modern injection attacks.</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// Home Logic
</script>
