fn get_aws_client() -> Result<Client> {
	let bucket_name: String = var("BUCKET_NAME").unwrap().context("Missing BUCKET_NAME")?;
	let access_key: String = var("ACCESS_KEY_ID").unwrap().context("Missing ACCESS_KEY_ID")?;
	let secret_key: String = var("ACCESS_SECRET_KEY").unwrap().context("Missing ACCESS_SECRET_KEY")?;
	let region: String = var("BUCKET_REGION").unwrap().context("Missing BUCKET_REGION")?;

	// build the aws cred
	let cred = Credentials::new(access_key, secret_key, None, None, "loaded-from-custom-env");

	// build the aws client
	let region = Region::new(region);
	let conf_builder = config::Builder::new().region(region).credentials_provider(cred);
	let conf = conf_builder.build();

	// build aws client
	let client = Client::from_conf(conf);
	Ok(client)
}
