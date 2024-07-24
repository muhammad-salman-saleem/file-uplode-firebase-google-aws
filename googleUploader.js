// googleUploader.js
const { Storage } = require('@google-cloud/storage');
const path = require('path');
require('dotenv').config();

const storage = new Storage({
  projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  keyFilename: process.env.GOOGLE_CLOUD_KEYFILE,
});

const bucket = storage.bucket(process.env.GOOGLE_CLOUD_BUCKET_NAME);

const getFolderPath = (mimetype) => {
  const documentTypes = [
    'application/pdf',
    'application/json',
    'application/msword', // .doc
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
    'application/vnd.ms-excel', // .xls
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
    'application/rtf', // .rtf
    'text/plain', // .txt
    'application/epub+zip', // .epub
    'application/x-mobipocket-ebook', // .mobi
    'application/vnd.ms-powerpoint', // .ppt
    'application/vnd.openxmlformats-officedocument.presentationml.presentation' // .pptx
  ];
  if (mimetype.startsWith('image/')) {
    return 'images/';
  } else if (documentTypes.includes(mimetype)) {
    return 'documents/';
  } else if (mimetype.startsWith('video/')) {
    return 'videos/';
  } else {
    return 'others/';
  }
};

const uploadToGoogleCloud = (file) => {
  return new Promise((resolve, reject) => {
    const folderPath = getFolderPath(file.mimetype);
    const blob = bucket.file(`${folderPath}${file.originalname}`);
    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream.on('error', (err) => {
      reject(err);
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
      resolve(publicUrl);
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploadToGoogleCloud };
