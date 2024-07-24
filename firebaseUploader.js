const admin = require('firebase-admin');
require('dotenv').config();
const fs = require('fs');

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n')
  }),
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET
});

const bucket = admin.storage().bucket();

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

const uploadToFirebase = (file) => {
  return new Promise((resolve, reject) => {
    const folderPath = getFolderPath(file.mimetype);
    const blob = bucket.file(`${folderPath}${file.originalname}`);
    const blobStream = blob.createWriteStream({
      metadata: {
        contentType: file.mimetype
      }
    });

    blobStream.on('error', (err) => {
      reject(err);
    });

    blobStream.on('finish', () => {
      blob.getSignedUrl({
        action: 'read',
        expires: '03-09-2491'
      }).then((urls) => {
        resolve(urls[0]);
      }).catch((err) => {
        reject(err);
      });
    });

    blobStream.end(file.buffer);
  });
};

module.exports = { uploadToFirebase };
