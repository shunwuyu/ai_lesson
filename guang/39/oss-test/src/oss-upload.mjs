import 'dotenv/config';
import OSS from 'ali-oss';
import fs from 'fs';

const client = new OSS({
  // yourRegion填写Bucket所在地域。以华东1（杭州）为例，Region填写为oss-cn-hangz
  region: process.env.OSS_REGION,
  accessKeyId: process.env.OSS_ACCESS_KEY_ID,
  accessKeySecret: process.env.OSS_ACCESS_KEY_SECRET,
  authorizationV4: true,
  bucket: process.env.OSS_BUCKET,
});

async function putStream () {
  try {
    // 使用chunked encoding。使用putStream接口时，SDK默认会发起一个chunked er
    let stream = fs.createReadStream('./zao.png');
    // 填写Object完整路径，例如exampledir/exampleobject.txt。Object完整路径中
    let result = await client.putStream('aaa/bbb/first.png', stream);
    console.log(result);
  } catch (e) {
    console.log(e)
  }
}

putStream();
