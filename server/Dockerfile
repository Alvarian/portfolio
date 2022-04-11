FROM rustlang/rust:nightly

WORKDIR /usr/src

COPY ./Cargo.* ./
COPY ./Rocket.toml ./
COPY ./src ./src
COPY ./src.env ./

RUN cargo build --release

EXPOSE 8000

CMD cargo run --release
