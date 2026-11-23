-- QUEUE - CIS 444 Group 10 - Database phase
-- Import in phpMyAdmin (MAMP) or run: mysql -u root -p < queue_db.sql

DROP DATABASE IF EXISTS queue_db;
CREATE DATABASE queue_db;
USE queue_db;

CREATE TABLE users (
  user_id   INT AUTO_INCREMENT PRIMARY KEY,
  role      ENUM('customer','owner','admin') NOT NULL DEFAULT 'customer',
  name      VARCHAR(100) NOT NULL,
  email     VARCHAR(100) NOT NULL UNIQUE,
  password  VARCHAR(255) NOT NULL,
  status    ENUM('active','suspended') NOT NULL DEFAULT 'active'
);

CREATE TABLE businesses (
  business_id INT AUTO_INCREMENT PRIMARY KEY,
  owner_id    INT NOT NULL,
  name        VARCHAR(100) NOT NULL,
  category    VARCHAR(50) NOT NULL,
  address     VARCHAR(150) NOT NULL,
  status      ENUM('pending','approved','rejected') NOT NULL DEFAULT 'pending',
  FOREIGN KEY (owner_id) REFERENCES users(user_id) ON DELETE CASCADE
);

CREATE TABLE services (
  service_id  INT AUTO_INCREMENT PRIMARY KEY,
  business_id INT NOT NULL,
  name        VARCHAR(100) NOT NULL,
  minutes     INT NOT NULL,
  price       DECIMAL(6,2) NOT NULL,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE business_hours (
  business_id INT NOT NULL,
  day         ENUM('Mon','Tue','Wed','Thu','Fri','Sat','Sun') NOT NULL,
  open_time   TIME NOT NULL,
  close_time  TIME NOT NULL,
  PRIMARY KEY (business_id, day),
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE
);

CREATE TABLE appointments (
  appointment_id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id    INT NOT NULL,
  business_id    INT NOT NULL,
  service_id     INT NOT NULL,
  date           DATE NOT NULL,
  time           TIME NOT NULL,
  notes          VARCHAR(255),
  status         ENUM('pending','accepted','declined','done','cancelled') NOT NULL DEFAULT 'pending',
  FOREIGN KEY (customer_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (business_id) REFERENCES businesses(business_id) ON DELETE CASCADE,
  FOREIGN KEY (service_id)  REFERENCES services(service_id) ON DELETE CASCADE
);

-- Sample data (passwords would be stored with password_hash() in PHP)
INSERT INTO users (role, name, email, password) VALUES
('admin',    'Ethan Delacruz',  'admin@queue.com',   'hash_admin'),
('owner',    'Robert Dollete',  'robert@fadeco.com', 'hash_rob'),
('owner',    'Chima Ohaechesi', 'chima@fitzone.com', 'hash_chima'),
('customer', 'Joshua Clemens',  'josh@email.com',    'hash_josh'),
('customer', 'Maria Lopez',     'maria@email.com',   'hash_maria');

INSERT INTO businesses (owner_id, name, category, address, status) VALUES
(2, 'Fade Co. Barbershop', 'Barbershop', '120 Main St, San Marcos', 'approved'),
(3, 'FitZone Gym',         'Fitness',    '45 Twin Oaks Rd, San Marcos', 'pending');

INSERT INTO services (business_id, name, minutes, price) VALUES
(1, 'Haircut',            30, 25.00),
(1, 'Haircut and Beard',  45, 35.00),
(2, 'Personal Training',  60, 50.00);

INSERT INTO business_hours (business_id, day, open_time, close_time) VALUES
(1, 'Mon', '09:00', '18:00'),
(1, 'Sat', '10:00', '16:00'),
(2, 'Mon', '06:00', '21:00');

INSERT INTO appointments (customer_id, business_id, service_id, date, time, notes, status) VALUES
(4, 1, 1, '2026-12-01', '10:00', 'Short on the sides', 'accepted'),
(5, 1, 2, '2026-12-01', '11:00', NULL,                 'pending'),
(4, 2, 3, '2026-12-02', '07:00', 'First session',      'pending');
