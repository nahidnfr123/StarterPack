## Project Setup (Laravel JWT Auth)

Clone the project.

```php
composer install
```

Copy the .env.example file and rename to .env

```php
cp .env.example .env
```

Generate Key

```php
php artisan key:generate
```

Generate Passport Secret

```php
php artisan passport:install
```

Run Migration

```php
php artisan migrate:fresh
```

### Setup mailtrap account or any other mail service in .env

Start Server

```php
php artisan ser
```
