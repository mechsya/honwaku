<?php

namespace App\Filament\Resources;

use App\Filament\Resources\NovelResource\Pages;
use App\Filament\Resources\NovelResource\RelationManagers\ChapterRelationManager;
use App\Models\Novel;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Hidden;
use Filament\Forms\Components\MarkdownEditor;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\TagsInput;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class NovelResource extends Resource
{
    protected static ?string $model = Novel::class;

    protected static ?string $navigationIcon = 'heroicon-o-book-open';

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?string $navigationGroup = 'Novels';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make("Informasi Novel")->columns(2)->schema([
                    TextInput::make("title")
                        ->label("Judul Novel")
                        ->required(),
                    Hidden::make("slug")
                        ->default(Str::uuid()
                            ->toString()),
                    TextInput::make("author")
                        ->required()
                        ->label("Author"),
                    Select::make("status")
                        ->required()
                        ->label("Status Novel")
                        ->options([
                            "complete" => "Complete",
                            "ongoing" => "Ongoing",
                            "new" => "New"
                        ]),
                    TagsInput::make("genre")
                        ->required()
                        ->separator(',')
                        ->label("Genre")
                        ->suggestions([
                            "fantasy" => "Fantasy",
                            "action" => "Action",
                            "drama" => "Drama",
                            "romance" => "Romance",
                            "adult" => "Adult",
                            "medieval" => "Medieval",
                            "slice of life" => "Slice of Life",
                            "adventure" => "Adventure",
                            "comedy" => "Comedy",
                            "horror" => "Horror",
                            "mistery" => "Mistery",
                            "thriller" => "Thriller",
                            "historical" => "Historical"
                        ]),
                    TextInput::make('ranting')->required()->label("Ranting Novel")
                        ->numeric(),
                    Select::make("adult")->label("R18+")->default(0)->options([
                        1 => "Yes",
                        0 => "No"
                    ])
                ]),
                Section::make()
                    ->schema([
                        FileUpload::make('cover')->label("Upload Cover"),
                    ]),
                Section::make()
                    ->schema([
                        MarkdownEditor::make('sinopsis')->label("Sinopsis")
                    ])
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make("id")->label("ID"),
                TextColumn::make("title")->searchable()->label("Title"),
                TextColumn::make("ranting")->label("Ranting"),
                TextColumn::make("status")->label("Status"),
                ToggleColumn::make("adult")->label("R18+"),
                TextColumn::make("view")->sortable(),
            ])
            ->filters([])
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
            ChapterRelationManager::class
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListNovels::route('/'),
            'create' => Pages\CreateNovel::route('/create'),
            'edit' => Pages\EditNovel::route('/{record}/edit'),
        ];
    }
}
