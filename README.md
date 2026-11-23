**Online booking for small businesses.** Customers find a barbershop, gym or
restaurant, pick a service and an open time, and book it online - no phone
calls. Business owners manage their schedule, services and hours, and an
admin approves new businesses.

Built as the group project for CIS 444 Web Programming (Fall 2026).

## Team

- Joshua Clemens

## Built with
HTML, CSS, JavaScript, PHP, MySQL (run locally with MAMP)

## Pages
| Page | Who uses it | What it does |
|------|-------------|--------------|
| Home | Everyone | Search and list businesses |
| Log In / Sign Up | Everyone | Customer or business owner accounts |
| Book | Customer | Pick a service, date and open time |
| My Bookings | Customer | See, change or cancel bookings |
| Business Dashboard | Owner | Today's schedule, services and hours |
| Admin Panel | Admin | Approve businesses, manage users |

## Database
5 tables: `users`, `businesses`, `services`, `business_hours`, `appointments`.
The full script with sample data is in [`database/queue_db.sql`](database/queue_db.sql).

## Run it locally
1. Install [MAMP](https://www.mamp.info) (free) and click **Start**.
2. Copy this folder into MAMP's `htdocs` folder.
3. Open phpMyAdmin -> **Import** -> choose `database/queue_db.sql`.
4. Go to http://localhost:8888/QUEUE/

Database settings are in `php/config.php` (MAMP defaults).

## Status
- [x] Plan, wireframes and page design
- [x] Web pages (HTML, CSS, JavaScript)
- [x] Database design and SQL
- [ ] Connect pages to the database (PHP + sessions)
- [ ] Final presentation
