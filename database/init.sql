CREATE DATABASE IF NOT EXISTS rajmail;

USE rajmail;


CREATE TABLE IF NOT EXISTS emails (

    id INT AUTO_INCREMENT PRIMARY KEY,

    sender VARCHAR(255) NOT NULL,

    receiver VARCHAR(255) NOT NULL,

    subject VARCHAR(255) NOT NULL,

    message TEXT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);


INSERT INTO emails
(sender, receiver, subject, message)
VALUES

(
    'admin@example.com',
    'raj@example.com',
    'Welcome to RajMail',
    'Welcome to your new email application!'
),

(
    'hr@example.com',
    'raj@example.com',
    'Interview Invitation',
    'Your interview has been scheduled for tomorrow.'
),

(
    'devops@example.com',
    'raj@example.com',
    'Docker Project',
    'Please complete the Docker project today.'
);
