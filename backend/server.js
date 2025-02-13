import app from "./src/app.js";
const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
    console.log(
        `Process Tree API available at http://localhost:${port}/api/processes`
    );
});
