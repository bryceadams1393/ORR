const fs = require('fs');
const path = require('path');

const imagesDir = path.join(__dirname, 'images');
const outputFile = path.join(__dirname, 'albums.json');

const albums = [];

fs.readdirSync(imagesDir, { withFileTypes: true }).forEach(dirent => {
  if (dirent.isDirectory()) {
    const folderName = dirent.name;
    const folderPath = path.join(imagesDir, folderName);
    const files = fs.readdirSync(folderPath).filter(file =>
      /\.(jpg|jpeg|png|gif)$/i.test(file)
    );

    albums.push({
      title: folderName,
      folder: folderName,
      photos: files
    });
  }
});

fs.writeFileSync(outputFile, JSON.stringify(albums, null, 2));
console.log(`✅ albums.json created with ${albums.length} albums.`);