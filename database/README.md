# Database Setup Instructions

## Prerequisites
- MySQL or MariaDB installed on your system
- MySQL command line or phpMyAdmin access

## Method 1: Using MySQL Command Line

### Step 1: Open MySQL Command Line
```bash
mysql -u root -p
```
Enter your MySQL root password when prompted.

### Step 2: Run the Schema File
```bash
source E:/Projects_Vikrin/vastrani-looms/database/schema.sql
```

Or alternatively:
```bash
mysql -u root -p < E:/Projects_Vikrin/vastrani-looms/database/schema.sql
```

### Step 3: Verify Database Creation
```sql
SHOW DATABASES;
USE vastrani_looms;
SHOW TABLES;
```

## Method 2: Using phpMyAdmin

### Step 1: Open phpMyAdmin
Navigate to: `http://localhost/phpmyadmin`

### Step 2: Import SQL File
1. Click on "Import" tab
2. Click "Choose File" button
3. Select: `E:\Projects_Vikrin\vastrani-looms\database\schema.sql`
4. Click "Go" button at bottom

### Step 3: Verify
- Check if `vastrani_looms` database is created
- Open the database and verify tables are created
- Check if default categories and collections are inserted

## Method 3: Using XAMPP/WAMP MySQL Console

### For XAMPP:
1. Start XAMPP Control Panel
2. Start MySQL
3. Click "Shell" button
4. Run:
```bash
mysql -u root -p
source E:/Projects_Vikrin/vastrani-looms/database/schema.sql
```

### For WAMP:
1. Start WAMP
2. Click WAMP icon → MySQL → MySQL Console
3. Run:
```bash
source E:/Projects_Vikrin/vastrani-looms/database/schema.sql
```

## Database Structure

### Tables Created:
1. **categories** - Product categories (18 default entries)
2. **collections** - Product collections (15 default entries)
3. **products** - Main products table
4. **product_colors** - Available colors for each product
5. **product_images** - Product images

### Database Details:
- **Database Name:** vastrani_looms
- **Character Set:** utf8mb4
- **Collation:** utf8mb4_unicode_ci

## Verify Installation

Run these commands in MySQL to verify:

```sql
USE vastrani_looms;

-- Check categories count (should be 18)
SELECT COUNT(*) FROM categories;

-- Check collections count (should be 15)
SELECT COUNT(*) FROM collections;

-- View all categories
SELECT * FROM categories ORDER BY display_order;

-- View all collections
SELECT * FROM collections ORDER BY display_order;
```

## Database User Setup (Optional but Recommended)

Create a dedicated user for the application:

```sql
-- Create user
CREATE USER 'vastrani_user'@'localhost' IDENTIFIED BY 'your_secure_password';

-- Grant privileges
GRANT ALL PRIVILEGES ON vastrani_looms.* TO 'vastrani_user'@'localhost';

-- Apply changes
FLUSH PRIVILEGES;
```

## Troubleshooting

### Error: "Access denied"
- Check MySQL is running
- Verify your root password
- Try without password: `mysql -u root`

### Error: "Database already exists"
- Drop existing database first: `DROP DATABASE vastrani_looms;`
- Then run the schema file again

### Error: "Can't find file"
- Use full path: `E:/Projects_Vikrin/vastrani-looms/database/schema.sql`
- Use forward slashes (/) not backslashes (\)

## Next Steps

After database is created:
1. ✅ Database schema created
2. ⏭️ Create PHP API endpoints (categories.php, collections.php)
3. ⏭️ Create database configuration file
4. ⏭️ Update React frontend to use API
