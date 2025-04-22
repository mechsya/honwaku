@extends('container')

@section('head')
    <style>
        #content p {
            display: none;
        }
    </style>
@endsection

@section('content')
    <nav class="h-16 border-black/10 border-b-[0.5px] flex items-center px-4">
        <section class="lg:w-[80%] w-full m-auto flex items-center">
            <a class="flex items-center gap-4 flex-1">
                <p class="text-black">Announcement</p>
            </a>
            <div class="flex-1 justify-end flex">
                <img src="{{ asset('images/download.webp') }}" class="h-16" />
            </div>
        </section>
    </nav>
    <section class="lg:w-[80%] w-vdh m-auto px-4">
        <div class="border-b-[0.5px] border-black/10 py-2 flex items-center justify-between">
            <p class="text-black">Semua Berita</p>
            <select class=" border-[0.5px] border-black/10 p-2 w-36 rounded outline-primary">
                <option {{ $onScreen === 'semua' ? 'selected' : null }} value="semua">Semua</option>
                <option {{ $onScreen === 'penting' ? 'selected' : null }} value="penting">Penting</option>
                <option {{ $onScreen === 'umum' ? 'selected' : null }} value="umum">Umum</option>
            </select>
        </div>
    </section>

    <section class="lg:w-[80%] w-dvw m-auto grid lg:grid-cols-2 gap-4 overflow-hidden">
        @foreach ($announcements as $announcement)
            <a href="/announcement/{{ $announcement->slug }}" class="p-4 lg:w-full d-dvw border-b border-black/10">
                <p class="text-black line-clamp-2 font-serif">{{ $announcement->title }}</p>
                <p class="text-black/70 my-2 text-sm line-clamp-4" id="content">{{ $announcement->html }}</p>
                <p class="text-black/50 text-sm">
                    <span
                        class="{{ 'capitalize ' . ($announcement->status === 'penting' ? 'text-red-400' : 'text-green-400') }}">{{ $announcement->status }}</span>
                    &bull; {{ $announcement->user->name }}
                    &bull; {{ $announcement->updated_at }}
                </p>
            </a>
        @endforeach
    </section>

    <script>
        const select = document.querySelector("select");
        select.addEventListener("change", () => {
            window.location.href = "?sort=" + select.value;
        })
    </script>
@endsection
