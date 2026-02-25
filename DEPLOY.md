# Deployment Guide for HosterPK (Shared Hosting)

This guide will help you deploy **SiratAlQuran** (Laravel + React) to your shared hosting cPanel.

## Prerequisites
1.  **Domain Name**: You should have a domain (e.g., `siratalquran.com`) connected to your hosting.
2.  **Database**: Create a MySQL Database and User in cPanel.
3.  **FTP/File Manager**: Access to upload files.

---

## Step 1: Prepare the Files (Locally)

1.  **Frontend Build**: (Already done) `npm run build` has generated the production assets in `public/build`.
2.  **Zip the Project**:
    *   Create a ZIP file of the entire `SiratAlQuran` folder, **EXCLUDING** `node_modules`.
    *   Name it `project.zip`.

## Step 2: Upload to cPanel

1.  Log in to your **cPanel**.
2.  Open **File Manager**.
3.  Navigate to your root directory (usually `/home/username/`).
4.  Create a new folder named `sirat_project` (outside `public_html`).
5.  **Upload** `project.zip` into `sirat_project`.
6.  **Extract** the zip file there.

## Step 3: Configure the Public Folder

Laravel serves files from `public/`, but shared hosting serves from `public_html/`.

1.  **Move Public Files**:
    *   Go to `sirat_project/public`.
    *   Select ALL files (`.htaccess`, `index.php`, `build/`, etc.).
    *   **Move** them to `public_html/` (or your subdomain folder).

2.  **Update `index.php`**:
    *   Edit `public_html/index.php`.
    *   Find these lines:
        ```php
        require __DIR__.'/../storage/framework/maintenance.php';
        require __DIR__.'/../vendor/autoload.php';
        $app = require_once __DIR__.'/../bootstrap/app.php';
        ```
    *   Update the paths to point to your `sirat_project` folder:
        ```php
        require __DIR__.'/../sirat_project/storage/framework/maintenance.php';
        require __DIR__.'/../sirat_project/vendor/autoload.php';
        $app = require_once __DIR__.'/../sirat_project/bootstrap/app.php';
        ```

## Step 4: Database Setup

1.  **Export Local DB**:
    *   Use a tool (like HeidiSQL or TablePlus) to export your local database to `database.sql`.
2.  **Import to Server**:
    *   Go to **phpMyAdmin** in cPanel.
    *   Select your new database.
    *   Click **Import** and upload `database.sql`.

## Step 5: Environment Configuration

1.  Go to `sirat_project/` in File Manager.
2.  Rename `.env.example` to `.env` (or edit existing `.env`).
3.  Update these values:
    ```env
    APP_NAME=SiratAlQuran
    APP_ENV=production
    APP_DEBUG=false
    APP_URL=https://yourdomain.com

    DB_DATABASE=your_cpanel_db_name
    DB_USERNAME=your_cpanel_user
    DB_PASSWORD=your_cpanel_password

    # IMPORTANT: Use 'file' driver on Shared Hosting to avoid "Too Many Connections" errors
    SESSION_DRIVER=file
    CACHE_STORE=file
    ```

## Step 6: Final Permissions

1.  Ensure `storage/` and `bootstrap/cache/` folders have **775** permissions.

---

## Mobile App Setup

Once the website is live at `https://yourdomain.com`:

1.  Open `sirat-al-quran-mobile/services/api.js`.
2.  Update the `APP_URL` variable.
3.  Build the APK using Expo.
