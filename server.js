const ioHook = require("iohook");
const screenshot = require("screenshot-desktop");
const fs = require("fs");


var subFolder=process.argv[2];
var session=process.argv[3];


if(subFolder==undefined)
{
subFolder="ssGeneralBin"
}
if(session==undefined)
{
session="screenCapture"
}
console.log(subFolder + " :subject");
console.log(session + " : name of session");

ioHook.on("keypress", async (event) => {
  if (event.shiftKey && event.keychar == 80) {
    //shift+P --> to take screenshot
    console.log("Screenshot taken");
    var dirname = "D:/sstaker/"+subFolder;
    var d = new Date();
    var date = d.toISOString();
    console.log(date)
    var shot = "D:/sstaker/"+subFolder+"/"+session+"_"+Date.now()+".jpg";
    await fs.promises.mkdir(dirname, { recursive: true });
    screenshot({ filename: shot }).then((img) => {
      console.log(img)
    },err=>{console.log(err)})
  }

  if (event.ctrlKey && event.keychar == 99)
    // ctrl+C --> to stop PPP
    ioHook.stop();
});

ioHook.start();
