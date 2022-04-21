FROM rustlang/rust:nightly

WORKDIR /usr/src/server

COPY ./Cargo.* ./
COPY ./Rocket.toml ./
COPY ./src ./src
COPY ./rocket.env ./

RUN cargo build --release

EXPOSE 8000

CMD cargo run --release
