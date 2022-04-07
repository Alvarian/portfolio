import boto3

s3 = boto3.client('s3', 
    aws_access_key_id=ACCESS_KEY,
    aws_secret_access_key=SECRET_KEY,
)

def get_one_and_unzip():
    Fileobj=gzip.GzipFile(
        None,
        'rb',
        fileobj=BytesIO(
            s3.get_object(Bucket=bucket, Key=gzip_key)['Body'].read()
        )
    )
    print("dude")