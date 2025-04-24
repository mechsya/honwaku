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

@include('component.navbar', ['label' => 'Pengumuman', 'urlback' => '/announcement'])

@section('content')
    <section class="lg:w-[80%] w-full m-auto">
        <div class="border-b-[0.5px] border-white/10 p-6">
            <p class="text-2xl text-white font-serif text-center line-clamp-4">{{ $announcement->title }}</p>
            <p class="text-white/50 text-sm text-center mt-4">
                <span
                    class="{{ 'capitalize ' . ($announcement->status === 'penting' ? 'text-red-400' : 'text-green-400') }}">{{ $announcement->status }}</span>
                &bull; {{ $announcement->user->name }}
                &bull; {{ $announcement->updated_at }}
            </p>
        </div>
        <div class="p-4 leading-7 text-white font-roboto m-auto" id="content">
            <p class="text-white">{!! $announcement->html !!}</p>
        </div>
    </section>
@endsection
