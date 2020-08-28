const QRCode = require("qrcode");
const csv = require("csv-parser");
const fs = require("fs");
const mdMaster = require("./files/md-master");

var txt = "";
fs.createReadStream("files/form.csv")
  .pipe(csv())
  .on("data", (row) => {
    txt += `| ${row.baan} | ${row.locationNameTh} | ${row.locationNameEn} | ${
      row.uuid
    } | ![${
      row.locationNameTh
    }](https://raw.githubusercontent.com/silkyland/map-qrcode/master/qrcode/${encodeURIComponent(
      row.locationNameTh
    )}.png) |\n`;
    QRCode.toFile(`./qrcode/${row.locationNameTh}.png`, row.uuid, {
      width: 1024,
    });
    // QRCode.toFile();
  })
  .on("end", () => {
    fs.writeFileSync("README.md", mdMaster(txt), {
      encoding: "utf8",
      flag: "w",
    });
    console.log("CSV file successfully processed");
  });

//QRCode.toFile("foo.png", [{ data: [253, 254, 255], mode: "byte" }]);
