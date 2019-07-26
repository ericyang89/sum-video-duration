import path from "path";
import fs from "fs";
import { getVideoDurationInSeconds } from "get-video-duration";

//use yourVideoDir or copy your file to the ./files dir
const yourVideoDir=``;
// const yourVideoDir=`/Users/eric/Desktop/itcast`;

const defaultDir = path.join(process.cwd(), "files");
const parentDir=yourVideoDir||defaultDir;

const files = fs.readdirSync(parentDir).filter(filename => /\.mp4/i.test(filename));
const getFullFileName = filename => path.join(parentDir, filename);

const filesPromise = files.map(filename =>
  getVideoDurationInSeconds(getFullFileName(filename))
);

Promise.all(filesPromise).then(durations => {
  const total=durations.reduce((pre,cur)=>{
    return pre+cur;
  });

  console.log(total);
  const hour=Math.floor(total/3600); 
  const minute=Math.floor((total-3600*hour)/60);
  const second=total%60;
  console.log(`视频总时长 ${hour}:${minute}:${second}`);
});
