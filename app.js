const express = require('express');
const { uploadToGoogleCloud } = require('./googleUploader');
const { uploadToS3 } = require('./awsUploader');
const { uploadToFirebase } = require('./firebaseUploader');
const { upload } = require('./multer.middleware');

const app = express();

app.post('/upload-google', upload.single('file'), async (req, res) => {
  try {
    const publicUrl = await uploadToGoogleCloud(req.file);
    res.status(200).send({ publicUrl });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/upload-aws', upload.single('file'), async (req, res) => {
  try {
    const data = await uploadToS3(req.file);
    res.status(200).send({ publicUrl: data.Location });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.post('/upload-firebase', upload.single('file'), async (req, res) => {
  try {
    const publicUrl = await uploadToFirebase(req.file);
    res.status(200).send({ publicUrl });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});
const multipleFile = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'file', maxCount: 8 }])
app.post('/upload-firebase-multiple', multipleFile, async (req, res) => {
  try {
    const { files } = req;
    const uploadPromises = {
      avatar: [],
      file: []
    };
    
    if (files['avatar']) {
      uploadPromises.avatar = files['avatar'].map(file =>
        uploadToFirebase(file)
      );
    }
    if (files['file']) {
      uploadPromises.file = files['file'].map(file =>
        uploadToFirebase(file)
      );
    }

    const [[...avatarUrls], [...fileUrls]] = await Promise.all([
      Promise.all(uploadPromises.avatar),
      Promise.all(uploadPromises.file)
    ]);

    const avatarObjects = avatarUrls.map(url => ({ url }));
    const fileObjects = fileUrls.map((url) => ({ url }));
    res.status(200).send({ 
      avatars: avatarObjects,
      files: fileObjects
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
