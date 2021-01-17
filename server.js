const ioHook = require("iohook");
const screenshot = require("screenshot-desktop");
const fs = require("fs");
const prompt = require('prompt-sync')();
const {exec}= require("child_process");
var subFolder=undefined
var session=undefined

ioHook.on("keypress", async (event) => {

  if (event.shiftKey && event.keychar == 13) {
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


async function takeInput(){
  subFolder = prompt('subject name : ');
  session= prompt("session name : ")
}

async function startIOHook()
{
if(subFolder==undefined)
{
subFolder="ssGeneralBin"
}
if(session==undefined)
{
session="screenCapture"
}
var dirname = "D:\sstaker\\"+subFolder;

exec(`start ${dirname}`, (error, stdout, stderr) => {
  if (error) {
      console.log(`error: ${error.message}`);
      return;
  }
  if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
  }
  console.log(`stdout: ${stdout}`);
});
ioHook.start();

}
async function fn()
{
await takeInput()
await startIOHook()
}

fn()



