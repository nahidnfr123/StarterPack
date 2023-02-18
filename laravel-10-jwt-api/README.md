## Project Setup (Laravel JWT Auth)

Copy the .env.example file and rename to .env

```php
// Generate the JWT Secret ...
php artisan jwt:secret
// This will update your .env file with something like JWT_SECRET=foobar
```

Run Migration

```php
php artisan migrate:fresh
```

Start Server

```php
php artisan ser
```
