const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const mongoConnect = require('./util/database').mongoConnect;
const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

// const usersData = require('./routes/users');
const product = require('./routes/products'); 


app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// app.use("/products", productData.routes);
app.use("/", product.routes);
// app.use("/shop", product.routes);
// app.use("/insert", product.routes);


app.use((req, res, next) => {
    res.status(404).render('404', { pageTitle: 'Page Not Found' });
});

mongoConnect(() => {
    app.listen(3000);
});


// const path = require('path');

// const express = require('express');
// const bodyParser = require('body-parser');

// const mongoConnect = require('./util/database').mongoConnect;
// const app = express();
// const cors = require('cors');

// app.set('view engine', 'ejs');
// app.set('views', 'views');

// const usersData = require('./routes/users');
// const productData = require('./routes/products');

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(cors())

// app.get('/', async (req, res) => {
//     res.status(200).json("server is running!!")
// });



// app.use("/users", usersData.routes);
// app.use("/products", productData.routes);


// app.use((req, res, next) => {
//     res.status(404).render('404', { pageTitle: 'Page Not Found' });
// });


// mongoConnect(() => {
//     app.listen(3000);
// });
