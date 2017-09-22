import os

profile = input("Enter your AWS CLI profile <default>: ") or "default"
bucket = input("Enter your bucket name: ")

if not bucket:
    print("Bucket name required.")
    exit(1)

os.chdir("public")
os.system("aws --profile {} s3 sync . s3://{} --storage-class REDUCED_REDUNDANCY".format(profile, bucket))

print("Done! Thanks :3")
