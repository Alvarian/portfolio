use rocket::post;
use rocket_contrib::json::Json;
use serde::Deserialize;

use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};

extern crate dotenv;
use std::env::var;

#[derive(Debug, PartialEq, Eq, Deserialize)]
pub struct Mail {
    name: String,
    email: String,
    message: String,
}

#[post("/contact", format = "json", data = "<user_input>")]
pub fn main(user_input: Json<Mail>) -> () {
    dotenv::from_filename("rocket.env").ok();
    let mail_username: String = var("MAIL_USERNAME").unwrap();
    let mail_password: String = var("MAIL_PASSWORD").unwrap();
    let mail_server: String = var("MAIL_SERVER").unwrap();
    println!("{:?}", user_input);
    let email = Message::builder()
        .from(mail_username.parse().unwrap())
        .reply_to(user_input.email.parse().unwrap())
        .to(mail_username.parse().unwrap())
        .subject(format!("Message by {} from portfolio v2", user_input.name))
        .body(user_input.message.clone())
        .unwrap();

    
    let creds = Credentials::new(mail_username, mail_password);

    // Open a remote connection to gmail
    let mailer = SmtpTransport::relay(mail_server.as_str())
        .unwrap()
        .credentials(creds)
        .build();

    // Send the email
    match mailer.send(&email) {
        Ok(_) => println!("Email sent successfully!"),
        Err(e) => panic!("Could not send email: {:?}", e),
    }
}