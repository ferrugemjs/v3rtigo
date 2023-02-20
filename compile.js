const fs = require("fs");
var fjsparse = require("@ferrugemjs/compile/parse/parse");

const filePath = "src/connect-provider.html";

fs.readFile(filePath, function (err, buf) {
    const compiledStr = fjsparse.default(buf.toString(), {
        templateExtension: ".html",
        viewModel: "connect-provider",
        env: "production" // default is "development"
    })

    fs.writeFile(`${filePath}.js`, compiledStr, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
    });
});

