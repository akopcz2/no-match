//Read through all images in image folder
//Delete ones that do not have the right prefix
var fs = require('fs');
var imagesFolder = './build/static/images/';
var imageDirectory = '/build/static/images/';
//Get prefix from deployment file
var deploymentFile = JSON.parse(fs.readFileSync('./deployment.json', 'utf8'));
var prefix = JSON.stringify(deploymentFile.prefix).replace(/\"/g, "").toLowerCase();

var deleteTheseImages = [];

//get images from build
function getImages(callback){
    fs.realpath(__dirname, function (err, path) {
        if (err) throw err;
        var fileLocation = path;
        //finds images in directory
        fs.readdir(imagesFolder, (err, files) => {
            files.forEach(file => {
                if(file.indexOf(prefix) == -1){
                var fullPath = fileLocation + imageDirectory + file;
                deleteTheseImages.push(fullPath);
                }
            });
            callback(deleteTheseImages);
            return deleteTheseImages;
        });
    });
}
getImages(function(images){
    deletePath();
});

function deletePath(){
    for(var i = 0; i < deleteTheseImages.length; i ++){
        console.log(deleteTheseImages[i]);
        fs.unlink(deleteTheseImages[i] ,function(err){
            if(err) throw err;
        });
    }
}

