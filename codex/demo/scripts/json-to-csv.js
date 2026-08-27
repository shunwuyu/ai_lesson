const fs = require('node:fs');
const path = require('node:path');
const readline = require('node:readline');

const inputPath = process.argv[2] || path.resolve(__dirname, '../temp/PEPXiaoXue3_1 2.json');
const outputPath = process.argv[3] || path.join(
  path.dirname(inputPath),
  `${path.basename(inputPath, path.extname(inputPath))}.csv`,
);

function escapeCsv(value) {
  const text = value == null ? '' : String(value);
  return /[",\r\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
}

async function convert() {
  const input = fs.createReadStream(inputPath, { encoding: 'utf8' });
  const output = fs.createWriteStream(outputPath, { encoding: 'utf8' });
  const lines = readline.createInterface({ input, crlfDelay: Infinity });

  output.write('wordRank,headWord,content,bookId\n');

  let rowCount = 0;
  for await (const line of lines) {
    if (!line.trim()) continue;

    const item = JSON.parse(line);
    const row = [
      item.wordRank,
      item.headWord,
      JSON.stringify(item.content),
      item.bookId,
    ].map(escapeCsv);

    output.write(`${row.join(',')}\n`);
    rowCount += 1;
  }

  await new Promise((resolve, reject) => {
    output.on('error', reject);
    output.end(resolve);
  });

  console.log(`转换完成：${rowCount} 条数据`);
  console.log(`输出文件：${outputPath}`);
}

convert().catch((error) => {
  console.error(`转换失败：${error.message}`);
  process.exitCode = 1;
});
