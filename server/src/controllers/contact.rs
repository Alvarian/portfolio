use rocket::post;
use rocket_contrib::json::Json;
use serde::Deserialize;

use lettre::stub::StubTransport;
use lettre::Transport;
use lettre_email::EmailBuilder;

extern crate dotenv;
use std::env::var;

#[derive(Debug, PartialEq, Eq, Deserialize)]
pub struct Mail {
    from: String,
    msg: String
}

#[post("/contact", format = "json", data = "<user_input>")]
pub fn main(user_input: Json<Mail>) -> () {
    dotenv::from_filename("rocket.env").ok();
    let mail_username: String = var("MAIL_USERNAME").unwrap();

    println!("{:?}", user_input);

    // let email = EmailBuilder::new()
    //     .to(mail_username)
    //     .from("me@hello.com")
    //     .subject("Message from portfolio v2")
    //     .text("Hello, world!")
    //     .build()
    //     .unwrap();

    // let mut mailer = StubTransport::new_positive();

    // mailer.send(email.into()).unwrap()

    ()
}