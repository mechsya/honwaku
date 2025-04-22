@extends('container')

@section('content')
    <div class="bg-base w-full">
        <!-- Navbar -->
        <nav class="w-full bg-base border-white/10 border-b-[0.5px] flex items-center px-4 py-2">
            <section class="w-full max-w-7xl mx-auto flex items-center justify-between">
                <div class="flex items-center gap-2">
                    <a href="/" class="flex items-center gap-2">
                        <img src="{{ asset('images/logo.png') }}" class="w-8 h-8 md:w-10 md:h-10" alt="Honwaku Logo" />
                        <p class="font-roboto font-medium text-white text-lg md:text-2xl tracking-wider">Honwaku</p>
                    </a>
                    <span class="hidden md:block text-white/50">|</span>
                    <a href="" class="hidden md:block text-white/70 text-base md:text-lg">Announcement</a>
                </div>

                <div class="flex items-center gap-3">
                    <a href="">@include('icon.facebook', ['size' => 24])</a>
                    <a href="">@include('icon.instagram', ['size' => 28])</a>
                    <a href="">@include('icon.discord', ['size' => 28])</a>
                    <span class="hidden md:block text-white/50">|</span>
                    <a href="" class="hidden lg:block">
                        <img src="{{ asset('images/download.webp') }}" class="h-10 md:h-16" alt="Download" />
                    </a>
                </div>
            </section>
        </nav>

        <!-- Hero Section -->
        <section class="flex flex-col-reverse lg:flex-row lg:w-[60%] w-full m-auto items-center p-6 md:p-10 my-7">
            <div class="flex-1 text-center lg:text-left">
                <p class="text-4xl md:text-6xl font-roboto font-semibold text-[#C2A2FE] mb-2 md:mb-4">Honwaku</p>
                <p class="text-4xl md:text-6xl font-roboto font-semibold text-white">Novel in your pocket</p>
                <p class="text-base md:text-xl my-4 text-white/70">
                    Honwaku adalah aplikasi baca novel ringan dan gratis untuk Android, dibuat dari dan untuk komunitas
                    pecinta novel.
                    Temukan dan baca novel favoritmu dengan lebih mudah dari sebelumnya, dalam tampilan yang sederhana dan
                    nyaman.
                </p>
                <div class="mt-6 md:mt-10">
                    <a href="" class="bg-primary text-white py-3 px-6 rounded text-base md:text-lg">
                        Download on Playstore
                    </a>
                </div>
            </div>
            <div class="w-full lg:w-[50%] mb-6 lg:mb-0">
                <img class="w-[60%] md:w-[70%] m-auto" src="{{ asset('images/logo.png') }}" alt="Logo Honwaku" />
            </div>
        </section>

        <!-- Features Section -->
        <section class="grid gap-4 grid-cols-1 lg:grid-cols-3 lg:w-[60%] w-full m-auto items-center p-10 my-7">
            <div class=" bg-[#202127] rounded-lg p-6">
                <div class="bg-[#2B2F36] w-14 h-14 rounded-lg justify-center items-center flex">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="28px"
                        class="text-yellow-400" width="28px" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="M12.5 6.9c1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-.53.12-1.03.3-1.48.54l1.47 1.47c.41-.17.91-.27 1.51-.27zM5.33 4.06 4.06 5.33 7.5 8.77c0 2.08 1.56 3.21 3.91 3.91l3.51 3.51c-.34.48-1.05.91-2.42.91-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c.96-.18 1.82-.55 2.45-1.12l2.22 2.22 1.27-1.27L5.33 4.06z">
                        </path>
                    </svg>
                </div>
                <div class="my-2">
                    <p class="text-white my-1">Tanpa Bayar</p>
                    <p class="text-white/70">Nikmati ratusan novel gratis tanpa bayar sekalipun</p>
                </div>
            </div>
            <div class=" bg-[#202127] rounded-lg p-6">
                <div class="bg-[#2B2F36] w-14 h-14 rounded-lg justify-center items-center flex">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="28px"
                        class="text-green-400" width="28px" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2zM6.435 8.467A1.49 1.49 0 0 1 8.502 8.4a1.49 1.49 0 0 1 2.065.033c.597.592.604 1.521.018 2.118l-2.05 2.083-2.082-2.05a1.484 1.484 0 0 1-.018-2.117zM12 18c-4 0-5-4-5-4h10s-1 4-5 4zm5.585-7.449-2.05 2.083-2.082-2.05a1.485 1.485 0 0 1-.019-2.117 1.49 1.49 0 0 1 2.068-.067 1.49 1.49 0 0 1 2.065.033c.597.591.605 1.521.018 2.118z">
                        </path>
                    </svg>
                </div>
                <div class="my-2">
                    <p class="text-white my-1">Novel Tercihuyy</p>
                    <p class="text-white/70">Temukan novel novel yang mungkin belum pernah kamu baca</p>
                </div>
            </div>
            <div class=" bg-[#202127] rounded-lg p-6">
                <div class="bg-[#2B2F36] w-14 h-14 rounded-lg justify-center items-center flex">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="28px"
                        class="text-blue-400" width="28px" xmlns="http://www.w3.org/2000/svg">
                        <path fill="none" d="M0 0h24v24H0z"></path>
                        <path
                            d="m16.99 5 .63 1.37 1.37.63-1.37.63L16.99 9l-.63-1.37L14.99 7l1.37-.63.63-1.37M11 6.13V4h2c.57 0 1.1.17 1.55.45l1.43-1.43A4.899 4.899 0 0 0 13 2H7.5v2H9v2.14A5.007 5.007 0 0 0 5.26 9.5h3.98L15 11.65v-.62a5 5 0 0 0-4-4.9zM1 22h4V11H1v11zm19-5h-7l-2.09-.73.33-.94L13 16h2.82c.65 0 1.18-.53 1.18-1.18 0-.49-.31-.93-.77-1.11L8.97 11H7v9.02L14 22l8-3c-.01-1.1-.89-2-2-2zm0-3c1.1 0 2-.9 2-2s-2-4-2-4-2 2.9-2 4 .9 2 2 2z">
                        </path>
                    </svg>
                </div>
                <div class="my-2">
                    <p class="text-white my-1">Clean and Sigma</p>
                    <p class="text-white/70">Tampilan yang simple buat pengalaman baca kamu to the moon</p>
                </div>
            </div>
        </section>

        <!-- Footer -->
        <section class="w-full flex justify-center items-center h-16 bg-[#202127]">
            <p class="text-white text-sm ">&copy; Honwaku Community</p>
        </section>
    </div>
@endsection
