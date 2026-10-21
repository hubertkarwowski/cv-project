import boto3
from app.core.config import settings
from typing import BinaryIO

s3 = boto3.client(
    service_name="s3",
    endpoint_url=settings.R2_ENDPOINT_URL,
    aws_access_key_id=settings.R2_ACCESS_KEY_ID,
    aws_secret_access_key=settings.R2_SECRET_ACCESS_KEY,
    region_name="auto",
    config=boto3.session.Config(signature_version="s3v4"),
)


def upload_fileobj(fileobj: BinaryIO, key: str, content_type: str) -> str:
    s3.upload_fileobj(
        fileobj,
        settings.R2_BUCKET,
        key,
        ExtraArgs={"ContentType": content_type},
    )
    return key


def delete_object(key: str) -> None:
    s3.delete_object(Bucket=settings.R2_BUCKET, Key=key)


def generate_presigned_url(key: str, expires_in: int = 3600) -> str:
    url = s3.generate_presigned_url(
        "get_object",
        Params={
            "Bucket": settings.R2_BUCKET,
            "Key": key,
        },
        ExpiresIn=expires_in,
    )
    return url
