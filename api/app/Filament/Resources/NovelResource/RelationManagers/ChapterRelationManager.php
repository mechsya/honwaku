<?php

namespace App\Filament\Resources\NovelResource\RelationManagers;

use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ChapterRelationManager extends RelationManager
{
    protected static string $relationship = 'chapter';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                TextInput::make('title')
                    ->label("Judul Bab")
                    ->required()
                    ->maxLength(255),
                Hidden::make("slug")->default(Str::uuid()->toString()),
                TextInput::make('volume')
                    ->label("Volume")
                    ->required()
                    ->numeric()
                    ->maxLength(10),
                TextInput::make('chapter')
                    ->label("Chapter")
                    ->required()
                    ->numeric()
                    ->maxLength(10),
                MarkdownEditor::make('content')
                    ->label("Content")
                    ->reactive()
                    ->afterStateUpdated(function ($state, callable $set) {
                        $set('content_length', strlen($state));
                    }),
                Hidden::make('content_length')
            ])->columns(1);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                TextColumn::make("id")->label("ID")
                    ->sortable(),
                TextColumn::make('title')->searchable(),
                TextColumn::make("volume")->label("Volume"),
                TextColumn::make("chapter")->label("Chapter"),
                TextColumn::make("view")->label("View"),
            ])
            ->filters([])
            ->headerActions([
                Tables\Actions\CreateAction::make()
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }
}
