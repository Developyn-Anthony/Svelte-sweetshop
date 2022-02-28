module.exports = (app) => {
    let products = [
        {
            id: 1,
            name: "Squashies",
            quantity: 25,
            price: 1,
            desc: "Original raspberry and milk flavoured gum sweets",
            currency: "GBP",
        },
        {
            id: 2,
            name: "Marshmallows",
            quantity: 250,
            price: 1.50,
            desc: "Sweet, soft treats to enjoy",
            currency: "GBP",
        },
        {
            id: 3,
            name: "Gummy bears",
            quantity: 10,
            price: 1,
            desc: "Small, fruity gum candies in the shape of a bear",
            currency: "GBP",
        },
        {
            id: 4,
            name: "Brownies",
            quantity: 5,
            price: 3.50,
            desc: "Moist, Rich chocolate Brownies",
            currency: "GBP",
        },
        {
            id: 5,
            name: "Carrot Cake",
            quantity: 50,
            price: 2,
            desc: "Carrot cake",
            currency: "GBP",
        },
    ];
    app.get("/sweets", (req, res) => {
        res.status(200).json(products);
    });

    app.get("/sweets/:id", function (req, res) {
        let get = products.find(function (product) {
          return product.id === parseInt(req.params.id);
        });
        if (get) {
          res.status(200).json(get);
        } else {
          res.sendStatus(404);
        }
      });

      app.delete("/sweets/delete/:id", (req, res) => {
        let get = products.find(function (product) {
          return product.id === parseInt(req.params.id);
        });
        if (get) {
          let targetIndex = products.indexOf(get);
          products.splice(targetIndex, 1);
        }
        res.sendStatus(204);
      });

      app.post("/sweets/add", (req, res) => {
        let proId = products.map((product) => product.id);
        let newId = proId.length > 0 ? Math.max.apply(Math, proId) + 1 : 1;
        let newProduct = {
          id: newId,
          name: req.body.name,
          quantity: req.body.quantity,
          price: req.body.price,
          currency: req.body.currency,
          desc: req.body.desc,
        };
        products.push(newProduct);
        res.status(201).json(newProduct)
      })
}