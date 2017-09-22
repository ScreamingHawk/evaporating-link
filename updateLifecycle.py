import os

profile = input("Enter your AWS CLI profile <default>: ") or "default"
bucket = input("Enter your bucket name: ")

if not bucket:
    print("Bucket name required.")
    exit(1)

os.system("aws --profile {} s3api put-bucket-lifecycle-configuration --bucket {} --lifecycle-configuration file://lifecycle.json".format(profile, bucket))

print("Done! Thanks :3")
