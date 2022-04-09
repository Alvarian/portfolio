import boto3
import zipfile
import io
from Crypto.Cipher import AES
from config import envSwitch
keys = envSwitch.keys()

s3 = boto3.client('s3', 
    aws_access_key_id=keys.ACCESS_KEY_ID,
    aws_secret_access_key=keys.ACCESS_SECRET_KEY,
)

def get_one_and_unzip(title, version, project_type):
    if not project_type:
        return None
        
    payload = {}
    projectKey = title+"/"+version
    
    zipped = s3.get_object(Bucket=keys.BUCKET_NAME, Key=projectKey)['Body'].read()
    buffer = io.BytesIO(zipped)
    
    unzipped = zipfile.ZipFile(buffer)
    for filename in unzipped.namelist():
        asset = filename.split(".")[0]
        if (asset == "project"):
            payload[asset] = unzipped.read(filename)
    
    return payload

def get_all_from_key(key):
    list = s3.list_objects_v2(
        Bucket=keys.BUCKET_NAME,
        EncodingType='url',
        Prefix=key+"/slides/",
    )['Contents']

    payload = {}
    list.pop(0)
    for slide in list:
        slideName = slide['Key'].split("/")[2]
        payload[slideName] = str(s3.get_object(Bucket=keys.BUCKET_NAME, Key=slide['Key'])['Body'].read())

    return payload