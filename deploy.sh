cd public
aws --profile milkprojects s3 sync . s3://evaporating.link --storage-class REDUCED_REDUNDANCY
