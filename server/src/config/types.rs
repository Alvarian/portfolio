use rocket::{Outcome, Request, State};
use rocket::request::{self, FromRequest};
use rocket::http::Status;
use std::ops::{Deref, DerefMut};

extern crate r2d2_redis;
use r2d2_redis::{r2d2, redis, RedisConnectionManager};
use r2d2::PooledConnection;

use aws_sdk_s3::types;


#[derive(Debug)]
pub enum S3Errors {
    StreamErr(aws_smithy_http::byte_stream::Error),
    FutureErr(types::SdkError<aws_sdk_s3::error::GetObjectError>),
    RedisErr(redis::RedisError)
}

impl From<redis::RedisError> for S3Errors {
    fn from(err: redis::RedisError) -> Self {
        S3Errors::RedisErr(err)
    }
}
impl From<aws_smithy_http::byte_stream::Error> for S3Errors {
    fn from(err: aws_smithy_http::byte_stream::Error) -> Self {
        S3Errors::StreamErr(err)
    }
}
impl From<types::SdkError<aws_sdk_s3::error::GetObjectError>> for S3Errors {
    fn from(err: types::SdkError<aws_sdk_s3::error::GetObjectError>) -> Self {
        S3Errors::FutureErr(err)
    }
}


pub struct RedisConn(PooledConnection<RedisConnectionManager>);
impl<'a, 'r> FromRequest<'a, 'r> for RedisConn {
    type Error = ();

    fn from_request(request: &'a Request<'r>) -> request::Outcome<RedisConn, ()> {
        let pool = request.guard::<State<r2d2::Pool<RedisConnectionManager>>>()?;
        match pool.get() {
            Ok(database) => Outcome::Success(RedisConn(database)),
            Err(_) => Outcome::Failure((Status::ServiceUnavailable, ())),
        }
    }
}
impl Deref for RedisConn {
    type Target = PooledConnection<RedisConnectionManager>;
    fn deref(&self) -> &Self::Target {
        &self.0
    }
}
impl DerefMut for RedisConn {
    fn deref_mut(&mut self) -> &mut Self::Target {
        &mut self.0
    }
}
