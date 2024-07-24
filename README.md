
# image uploade

image uploade on google clude, firebase and aws


## Importent env credential

 - [Firebse consol](https://console.firebase.google.com/)
 - [google consol](https://console.cloud.google.com/)
 - [aws consol](https://console.aws.amazon.com/console/home)


# File Upload Service

This Node.js project provides a RESTful API for uploading files to Google Cloud Storage, AWS S3, and Firebase Storage. It also includes support for uploading multiple files to Firebase Storage with different categories (e.g., avatars and files).

## Features

- Upload files to Google Cloud Storage
- Upload files to AWS S3
- Upload files to Firebase Storage
- Support for uploading single and multiple files to Firebase Storage


## Run Locally

Clone the project

```bash
  git clone https://link-to-project
```

Go to the project directory

```bash
  cd my-project
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


#### Upload to Google Cloud Storage:

- POST /upload-google
- Form-data: file (required)

#### Upload to AWS S3:

- POST /upload-aws
- Form-data: file (required)

#### Upload to Firebase Storage:

- POST /upload-firebase
- - Form-data: file (required)

#### Upload Multiple Files to Firebase Storage:

- POST /upload-firebase-multiple
- Form-data:

    - avatar (optional)
    - file (optional)
## Environment Variables

To run this project, you will need to add the following environment variables to your .env file
### Port
- `PORT=8000`

### Google Cloud Storage
- `FIREBASE_PROJECT_ID=your-firebase-project-id`,
- `FIREBASE_CLIENT_EMAIL=your-firebase-client-email`,
- `FIREBASE_PRIVATE_KEY=your-firebase-private-key`,
- `FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket`,

### AWS S3
- `AWS_ACCESS_KEY_ID=your-aws-access-key-id`,
- `AWS_SECRET_ACCESS_KEY=your-aws-secret-access-key`,
- `AWS_BUCKET_NAME=your-aws-bucket-name`,
- `AWS_REGION=your-aws-region`,

### Firebase
- `FIREBASE_PROJECT_ID=your-firebase-project-id`,
- `FIREBASE_CLIENT_EMAIL=your-firebase-client-email`,
- `FIREBASE_PRIVATE_KEY=your-firebase-private-key`,
- `FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket`,


## 🚀 About Me
I'm a full stack developer...


## Authors

- [@muhammad-salman-saleem](https://github.com/muhammad-salman-saleem)

## License

Feel free to adjust any details according to your project needs.