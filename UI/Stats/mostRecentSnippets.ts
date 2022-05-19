import dedent from "dedent-js"


const snippets = {
    title: "Rectangle into Squares",
    languages: [
        {
            language: "javascript",
            solution: dedent`
                function sqInRect(lng, wdth){
                    let sizeOfSquares = [];
                    if (lng == wdth) sizeOfSquares = null;
                    const recurse = (lng, wdth) => {
                        if (lng == wdth) {
                            sizeOfSquares.push(lng);
                            return;
                        }
                        if (lng < wdth) {
                            sizeOfSquares.push(lng);
                            recurse(lng, wdth - lng);
                        } else {
                            sizeOfSquares.push(wdth);
                            recurse(lng - wdth, wdth);
                        }
                    }
                    if (sizeOfSquares) recurse(lng, wdth);
                    return sizeOfSquares;
                }
            `
        },
        {
            language: "rust",
            solution: dedent`
                #[tokio::main]
                async fn main() -> Result<(), Error> {
                    dotenv::dotenv()?;
                    let log_verbosity = env::var("LOG_VERBOSITY")
                        .map(|s| s.parse::<i32>().unwrap_or(2))
                        .unwrap_or(2);
                    setup_logger(log_verbosity)?;
                    
                    tracing::info!("Starting Game Server");
                    tracing::info!("Initializing server...");
                
                    let game_port = env::var("GAME_PORT")?;
                    let rpc_port = env::var("GAME_RPC_PORT")?;
                
                    let ctrlc = tokio::signal::ctrl_c();
                
                    let server = GameServer::run(format!("0.0.0.0:{}", game_port));
                    let server = tokio::spawn(server);
                
                    let rpc_server = RpcServer::run(format!("0.0.0.0:{}", rpc_port));
                    let rpc_server = tokio::spawn(rpc_server);
                
                    tracing::info!("Initializing State ..");
                    State::init().await?;
                
                    tracing::info!("Game Server will be available on {}", game_port);
                    tracing::info!("RPC Server will be available on {}", rpc_port);
                
                    tokio::select! {
                        _ = ctrlc => {
                            tracing::info!("Got Ctrl+C Signal!");
                        }
                        _ = server => {
                            tracing::info!("Server Is Shutting Down..");
                        }
                        _ = rpc_server => {
                            tracing::info!("Rpc Server is Suhtting Down..");
                        }
                    };
                    State::clean_up().await?;
                    tracing::info!("Shutdown.");
                    Ok(())
                }
            `
        }
    ]
}

export default snippets