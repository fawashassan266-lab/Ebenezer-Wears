const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;

const server = http.createServer(function (request, response) {

    let filePath = request.url;

    if (filePath === "/") {
        filePath = "/index.html";
    }

    const fullPath = path.join(__dirname, filePath);

    const extension = path.extname(fullPath).toLowerCase();

    const contentTypes = {
        ".html": "text/html",
        ".css": "text/css",
        ".js": "application/javascript",
        ".json": "application/json",
        ".png": "image/png",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".webp": "image/webp",
        ".svg": "image/svg+xml"
    };

    const contentType =
        contentTypes[extension] || "text/plain";

    fs.readFile(fullPath, function (error, content) {

        if (error) {

            response.writeHead(404, {
                "Content-Type": "text/plain"
            });

            response.end("Page not found.");

            return;
        }

        response.writeHead(200, {
            "Content-Type": contentType
        });

        response.end(content);

    });

});

server.listen(PORT, function () {

    console.log(
        "Ebenezer Wears is running on port " + PORT
    );

});
