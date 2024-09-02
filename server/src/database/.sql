-- tables will be created once the application starts

-- Insert data inside user table
-- Insert users with role 'user'
INSERT INTO user_info (email, password, name, balance, role_d) VALUES ('user1@z.com', '123', 'user1', 50000.00, 1);  
INSERT INTO user_info (email, password, name, balance, role_id) VALUES ('user2@z.com', '456', 'user2', 90000.00, 1);
INSERT INTO user_info (email, password, name, balance, role_id) VALUES ('admin@z.com', '789', 'admin1', 200000.00, 2);

-- Insert data inside transaction table

-- Insert data inside role table
INSERT INTO Role (name) VALUES ('user');
INSERT INTO Role (name) VALUES ('admin');


