const options = {
    definition: {
        openapi: "3.1.0",
        info: {
            title: "Excel Clone API",
            version: "0.1.0",
            description: "This is a simple API for an Excel clone application",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
            contact: {
                name: "Vladyslav Yavorskyi",
                email: "info@email.com",
            },
        },
        servers: [
            {
                url: "http://localhost:3000",
            },
        ],
    },
    apis: ["./routes/*.js", "./models/*.js"],
};
export default options;
