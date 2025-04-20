<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ChapterResource\Pages;
use App\Filament\Resources\ChapterResource\RelationManagers;
use App\Models\Chapter;
use App\Models\Novel;
use Filament\Forms;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class ChapterResource extends Resource
{
    protected static ?string $model = Chapter::class;

    protected static ?string $navigationIcon = 'heroicon-o-rectangle-stack';

    protected static ?string $navigationGroup = 'Novels';

    protected static ?int $navigationSort = 2;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make("Informasi Chapter")->schema([
                    Select::make('novel_id')
                        ->label('Series')
                        ->options(Novel::all()->pluck('title', 'id'))
                        ->searchable(),
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


                ]),
                Section::make()->schema([
                    MarkdownEditor::make('content')->label("Content")
                ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("id")->label("ID"),
                TextColumn::make('title')->searchable(),
                TextColumn::make('novel.title')->label("Series")->searchable(),
                TextColumn::make("volume")->label("Volume"),
                TextColumn::make("chapter")->label("Chapter"),
                TextColumn::make("view")->label("View"),
            ])
            ->filters([
                //
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListChapters::route('/'),
            'create' => Pages\CreateChapter::route('/create'),
            'edit' => Pages\EditChapter::route('/{record}/edit'),
        ];
    }
}
