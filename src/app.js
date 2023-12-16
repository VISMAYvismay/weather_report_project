const path = require("path")
const hbs = require("hbs")

const weather=require("../../weather_app/app.js");
const express = require("express")

const application = express();



// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname,"../public"));

const directoryname = path.join(__dirname, "../public");
const viewspath = path.join(__dirname, "../template/views");
const partialspath = path.join(__dirname, "../template/partials");

application.set("view engine", "hbs");
application.set("views", viewspath);
hbs.registerPartials(partialspath);

application.use(express.static(directoryname))
application.get("/form", (req, res) => {
    res.render("absolute", { title: 'vismay', message: 'Hello there!' })
})


application.get("",(req,res)=>{
    res.render("index")
})

application.get("/info", (req, res) => {
    res.send("my name is charan");
})





application.get("/weather", (req, res) => {
    if (!req.query.place) {
        return res.send({
            error: "you must provide a place.."
        })
    }
    else if (Object.keys(req.query).length > 1) {
        return res.send({
            error: "the query string is invalid"
        })
    }
    else {
        let linktoapi = `http://api.weatherstack.com/current?access_key=5d7c1801503feba1e407bde74a62ef53&query=${encodeURIComponent(req.query.place)}&units=s`;
        weather(linktoapi,()=>{
            return res.send({
                error: "sorry for the inconvience from our side"
            })
        },()=>{
            return res.send({
                error: "please enter a valid city.."
            })
        },(fetcheddata)=>{
            // console.log(fetcheddata);
            res.send({
                location:`${fetcheddata.location.name}, ${fetcheddata.location.region}, ${fetcheddata.location.country}`,
                temperature: fetcheddata.current.temperature,
                weather_description:fetcheddata.current.weather_descriptions
            })
        });
    }
})

application.get("/products", (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "you must provide a search term.."
        })
    }
    console.log(req.query);
    res.send({
        products: []
    })
})





application.get("/info/*", (req, res) => {
    res.send("<h1>fuck you </h1>")
})




application.get("*", (req, res) => {
    res.send("<h1>this page is not present</h1>")
})




application.listen(3000, () => {
    console.log("mahesh was lawda!!!")
});






