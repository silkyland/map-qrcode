const QRCode = require("qrcode");
const csv = require("csv-parser");
const fs = require("fs");

fs.createReadStream("files/form.csv")
  .pipe(csv())
  .on("data", (row) => {
    QRCode.toFile(`./qrcode/${row.locationNameTh}.png`, row.uuid, {
      width: 512,
    });
    // QRCode.toFile();
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });

//QRCode.toFile("foo.png", [{ data: [253, 254, 255], mode: "byte" }]);
