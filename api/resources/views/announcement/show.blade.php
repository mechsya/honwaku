@extends('container')

@section('head')
    <style>
        #content img {
            width: 100%;
            margin: auto;
            margin-bottom: 24px;
        }

        #content p {
            margin-bottom: 16px;
            font-family: "Roboto"
        }
    </style>
@endsection

@section('content')
    <nav class="w-full h-16 border-black/10 border-b-[0.5px] flex items-center px-4">
        <section class="lg:w-[80%] w-full m-auto flex items-center">
            <a href="/announcement" class="flex items-center gap-4 flex-1">
                @include('icon.arrow-back', ['size' => 16])
            </a>
            <div class="flex-1 justify-end flex">
                <img src="{{ asset('images/download.webp') }}" class="h-16" />
            </div>
        </section>
    </nav>
    <section class="lg:w-[80%] w-full m-auto">
        <div class="border-b-[0.5px] border-black/10 p-6">
            <p class="text-2xl font-serif text-center line-clamp-4">{{ $announcement->title }}</p>
            <p class="text-black/50 text-sm text-center mt-4">
                <span
                    class="{{ 'capitalize ' . ($announcement->status === 'penting' ? 'text-red-400' : 'text-green-400') }}">{{ $announcement->status }}</span>
                &bull; {{ $announcement->user->name }}
                &bull; {{ $announcement->updated_at }}
            </p>
        </div>
        <div class="p-4 leading-7 text-black font-roboto m-auto" id="content">
            <p>{!! $announcement->html !!}</p>
        </div>
    </section>
@endsection
