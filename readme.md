# Mafioso Lite

Built with
<img src="https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/Laravel/LaravelTransparent.png?raw=true" width="250px" />
and
<img src="https://github.com/SAWARATSUKI/KawaiiLogos/blob/main/TypeScript/TypeScript.png?raw=true" width="250px" />
and
❤️

## Getting Started with Laragon

These instructions will help you set up and run the project locally using [Laragon](https://laragon.org/).

---

### 1. Clone the Repository

```sh
git clone https://github.com/LarsFredrikHolstTry/mafioso-lite.git
cd mafioso-lite
```

### 2. Set Up the Environment

Copy the example environment file and adjust settings if needed:

```sh
cp .env.example .env
```

> **Note:** Laragon uses `localhost` and default ports. You can update `.env` as needed for your setup.

### 3. Install PHP Dependencies

```sh
composer install
```

### 4. Install Node.js Dependencies

```sh
npm install
```

### 5. Run Migrations

```sh
php artisan migrate
```

### 6. Build Frontend Assets

```sh
npm run build
```

### 7. Start the Development Servers

You can use Laragon's GUI to add the project as a site, or run manually:

```sh
php artisan serve
```

In a separate terminal, run:

```sh
npm run dev
```

---

## Additional Commands

- **Run Tests:**

    ```sh
    php artisan test
    ```

---

## Notes

- Default database is Mysql for local development.
- For other databases (sqlite, PostgreSQL), update `.env` and ensure the service is running in Laragon.
- For more info, see [config/database.php](config/database.php) and [.env.example](.env.example).

---

Happy coding!
