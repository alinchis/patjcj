
// import libraries
const fs = require('fs-extra');
const glob = require('glob');
const piexif = require('piexifjs');

// import local modules
const createFolderPath = require('./create-folders');


// ////////////////////////////////////////////////////////////////////////////////////////////
// // METHODS

// format numbers with '0' padding
function pad (n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

// ////////////////////////////////////////////////////////////////////////////////////////////
// // EXPORTS
module.exports = (inPath, outPath, monArr) => {
    // images counter
    let imageCounter = 0;

    // get a list of all images in the folder
    const imagesList = fs.readdirSync(inPath);
    console.log(`TOTAL images found :: ${imagesList.length} :: START\n`);
    // console.log(imagesList);

    // for each item in list
    monArr.forEach((item, index) => {
        // create path string
        const county_path = `${item[7]}_${item[8]}`;
        const uat_path = `${item[9]}_${item[11]}`;
        const loc_path = `${item[12]}_${item[13]}`;
        const itemPath = `${county_path}/${uat_path}/${loc_path}/${item[1]}`;
        const itemFullPath = `${outPath}/${itemPath}`;

        // create folder path
        createFolderPath(index, itemFullPath);

        // read files
        const fileName = `${item[1]}*.jpg`;
        // test if file exists
        if (glob.sync(fileName, { cwd: inPath }).length > 0) {
            // get actual filename
            const matchedFileNames = glob.sync(fileName, { cwd: inPath });

            // for each item found
            for (let i = 0; i < matchedFileNames.length; i += 1) {

                // remove filename from imagesList
                const fileIndex = imagesList.indexOf(matchedFileNames[i]);
                if (fileIndex > -1) {
                    imagesList.splice(fileIndex, 1);
                }

                // fs read file creation date
                // const stats = fs.statSync(`${inPath}/${matchedFileNames[i]}`);
                // const lastModifyTime = stats.mtime;
                // const dateString = lastModifyTime.toISOString().split('T')[0];
                // console.log(`${index} :: stats.mtime = ${stats.mtime.toISOString().split('T')[0]}\n`);

                // read jpeg file
                const jpeg = fs.readFileSync(`${inPath}/${matchedFileNames[i]}`);
                const data = jpeg.toString('binary');
                const exifObj = piexif.load(data);
                // console.log(`${index} :: ${i} : Exif data:`)
                // for (var ifd in exifObj) {
                //     if (ifd == "thumbnail") {
                //         continue;
                //     }
                //     console.log("-" + ifd);
                //     for (var tag in exifObj[ifd]) {
                //         console.log("  " + piexif.TAGS[ifd][tag]["name"] + ":" + exifObj[ifd][tag]);
                //     }
                // };
                // console.log(`${index} :: ${i} : ${matchedFileNames[i]}`);
                // console.log(exifObj['Exif'][piexif.ExifIFD.DateTimeOriginal]);

                // get image metadata
                const zeroth = exifObj['0th'];
                const exif = exifObj['Exif'];
                const gps = exifObj['GPS'];
                const interop = exifObj['Interop'];
                const first = exifObj['1st'];
                const thumbnail = exifObj['thumbnail'];

                // DateTimeOriginal appears to be wrong, many files have the same value
                // set creation date to Image Information Data
                // exif[piexif.ExifIFD.DateTimeOriginal] = zeroth['306'];
                // const dateString = zeroth['306'].split(' ')[0].replace(/:/g, '-');

                // add GPS metadata
                const lat = item[16];
                const lng = item[17];
                gps[piexif.GPSIFD.GPSLatitudeRef] = lat < 0 ? 'S' : 'N';
                gps[piexif.GPSIFD.GPSLatitude] = piexif.GPSHelper.degToDmsRational(lat);
                gps[piexif.GPSIFD.GPSLongitudeRef] = lng < 0 ? 'W' : 'E';
                gps[piexif.GPSIFD.GPSLongitude] = piexif.GPSHelper.degToDmsRational(lng);

                // save exif data
                exifObj['0th'] = zeroth;
                exifObj['Exif'] = exif;
                exifObj['GPS'] = gps;
                exifObj['Interop'] = interop;
                exifObj['1st'] = first;
                exifObj['thumbnail'] = thumbnail;
                const exifbytes = piexif.dump(exifObj);

                // create index string
                const indexString = pad(i + 1, 3);
                // console.log(indexString);

                // create new image path
                const newJPEGFilePath = `${itemFullPath}/${matchedFileNames[i]}`;

                // write new image file
                const newData = piexif.insert(exifbytes, data);
                const newJpeg = Buffer.from(newData, "binary");
                fs.writeFileSync(newJPEGFilePath, newJpeg);
                console.log(`${index} :: ${i} : ${matchedFileNames[i]} >>>> file saved !\n`);
            }

            // print # items found
            console.log(`${index} :: ${item[0]} :: ${matchedFileNames.length} file(s) found!`);
            // increase image counter
            imageCounter += matchedFileNames.length;

            // const currentFilePath = `${itemFullPath}/${currentFileName}`;
            // console.log(`${index} :: ${matchedFileNames} :: CURRENT`);
        };

        // add metadada

        // write file to new path
    });

    // print image counter
    console.log(`TOTAL images found :: ${imageCounter} :: END`);

    // print unmatched images
    console.log(imagesList);
}
