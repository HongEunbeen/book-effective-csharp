const fs = require('fs');
const https = require('https');


function getFiles (dir, files_){
    files_ = files_ || [];
    var files = fs.readdirSync(dir);
    for (var i in files){
        var name = dir + '/' + files[i];
        if (fs.statSync(name).isDirectory()){
            if(!name.match(/\[(.*?)[0-9](.*?)\]/g)) continue;
            if(!fs.existsSync(`${name}/README.md`)) continue;
            files_.push(name);
        }
    }
    return files_;
}


const readWriteAsyne = () => {
    const files = getFiles('.');
    const today = new Date(+new Date() + 3240 * 10000).toISOString().split("T")[0];

    fs.readFile(`README.md`, 'utf-8', (err, data) => {
        if (err) throw err;
        var updateData = data;
        for(var i in files){
            var fileName = files[i].replace(/(\.\/\[(.*?)\])/g, "").trim();
            var regex = new RegExp(`${fileName}\\s+\\|\\s+⬜️\\s+\\|\\s+\\|(.*?)`);
            if(!updateData.match(regex)) continue;
            updateData = updateData.replace( 
                regex,
                `${fileName} | ☑️ | ${today.slice(2, today.length)} |`
            );
        }
        fs.writeFile('README.md', updateData, 'utf-8', (err) => {
          if (err) throw err;
          console.log('README update complete.');
        });
    });

    
}

readWriteAsyne();