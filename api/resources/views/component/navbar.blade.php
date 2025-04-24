<nav class="w-full h-16 border-white/10 border-b-[0.5px] flex items-center px-4">
    <div class="lg:w-[80%] w-full m-auto flex items-center">
        <a class="flex gap-4 items-center text-white font-roboto" href="{{ @$urlback }}">
            @include('icon.arrow-back', ['size' => 16])
            <p class="mt-1">{{ @$label }}</p>
        </a>
    </div>
</nav>
