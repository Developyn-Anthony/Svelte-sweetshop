<script>
    import axios from "axios";
    import { onMount } from "svelte";
  
    let products = [];
    let id = "";
    let name = "";
    let quantity = "";
    let price = "";
    let description =  "";
    let nameValid = false;
    let quantityValid = false;
    let priceValid = false;
    let descValid = false;

    $: total = () => {
        return products.reduce(function (total, row) {
          return total + row.quantity * row.price;
        }, 0);
    };

    const stockData = () => {
        axios
          .get("http://localhost:5000/sweets")
          .then((response) => {
            products = response.data;
          })
          .catch((error) => {
            if (error.response) {
              console.log(error.response.status);
            } else if (error.request) {
              console.log(error.request);
            } else {
              console.log(error.message);
            }
        });
    };

    const deleteRow = (id) => {
        axios
          .delete("http://localhost:5000/sweets/delete/" + id)
          .then((response) => {
            stockData();
            alert("success");
        });
    };
    const add = () => {

        if(name === "" || name.length > 100) {
          nameValid = false;
          document.getElementById('name').style.border = "0.2rem solid red";
        } else {
          nameValid = true;
          document.getElementById('name').style.border = "0.1rem solid lightgray";
        };
        console.log('Name Valid is: ', nameValid);

        const quantityTest = quantity => {
          const re = /^\d*\.?\d*$/;
          return re.test(String(quantity).toLowerCase());
        };

        if(quantity === "" || quantity.length > 100 || isNaN(quantity) || !quantityTest(quantity)) {
          quantityValid = false;
          document.getElementById('quantity').style.border = "0.2rem solid red";
        } else {
          quantityValid = true;
          document.getElementById('quantity').style.border = "0.1rem solid lightgray";
        };
        console.log('Quantity Valid is: ', quantityValid);

        const priceTest = price => {
          const re = /^\d*\.?\d*$/;
          return re.test(String(price).toLowerCase());
        };

        if(price === "" || price.length > 100 || isNaN(price) || !priceTest(price)) {
          priceValid = false;
          document.getElementById('price').style.border = "0.2rem solid red";
        } else {
          priceValid = true;
          document.getElementById('price').style.border = "0.1rem solid lightgray";
        };
        console.log('Price Valid is: ', priceValid);

        if(description === "" || description.length > 1000) {
          descValid = false;
          document.getElementById('description').style.border = "0.2rem solid red";
        } else {
          descValid = true;
          document.getElementById('description').style.border = "0.1rem solid lightgray";
        };
        console.log('Description Valid is: ', nameValid);


        if(nameValid && quantityValid && priceValid && descValid) {
          axios
            .post(`http://localhost:5000/sweets/add`, {
                name: name,
                quantity: quantity,
                price: price,
                description: description,
              })
            .then((response) => {
              console.log(response);
              stockData();
              alert('Success');
            })
            .catch((error) => {
              if (error.response) {
                console.log(error.response.status);
              } else if (error.request) {
               console.log(error.request);
              } else {
                console.log(error.message);
              }
            });
          name = "";
          quantity = "";
          price = "";
          description = "";
        }
    };
  onMount(stockData);
  </script>

<main>
    <div class="stock-div">
      <h3>Sweets stock management system</h3>
      <p>Stock Value = £{total()}</p>
      <table class="main-table">
        <tr>
          <td class="data">Product ID</td>
          <td class="data">Product Name</td>
          <td class="data">Product Quantity</td>
          <td class="data">Product Price</td>
          <td class="data">Product Description</td>
          <td class="data"></td>
        </tr>
        {#each products as row}
        <tr class="data-rows" v-for="row in products" v-bind:key="row.id">
          <td class="data">{ row.id }</td>
          <td class="data">{ row.name }</td>
          <td class="data">{ row.quantity }</td>
          <td class="data">£{ row.price }</td>
          <td class="data">{ row.description }</td>
          <td>
            <button type="button" class="button-del" on:click|preventDefault={deleteRow(row.id)}>Delete</button>
          </td>
        </tr>
        {/each}
      </table>
      <div class="add-item">
        <form class="add-form">
          <input
            class="input-forms"
            type="text"
            id="name"
            bind:value={name}
            placeholder="Product Name"
            required
          /><br />
          <input
            class="input-forms"
            type="text"
            id="quantity"
            bind:value={quantity}
            placeholder="Product Quantity"
            required
          /><br />
          <input
            class="input-forms"
            type="text"
            id="price"
            bind:value={price}
            placeholder="Product price"
            required
          /><br />
          <input
            class="input-forms"
            type="text"
            id="description"
            bind:value={description}
            placeholder="Product Description"
            required
          /><br />
          <button class="button-add" type="button" on:click|preventDefault={add}>
            Submit product
          </button>
        </form>
      </div>
    </div>
</main>
  
  
  
<style scoped>
    main {
        text-align: center;
    }

    .main-table {
        width: 80%;
        margin-left: auto;
        margin-right: auto;
        border: 0.2rem solid black;
        font-family: "Poppins", sans-serif;
        text-align: center;
    }
  
    .data {
        border: 0.1rem solid black;
    }
  
    .add-form {
        border: 0.2rem solid black;
        border-radius: 1rem;
        width: 25%;
        margin-top: 2rem;
        margin-left: auto;
        margin-right: auto;
        text-align: center;
    }
  
    .input-forms {
        height: 2rem;
        width: 80%;
        margin-top: 0.5rem;
        margin-bottom: 0.5rem;
        border: 0.1rem solid lightgray;
    }

    .button-del:hover {
      background-color: #6f0000;
      color: #fff;
      border-radius: 10%;
      cursor: pointer;
    }

    .button-del {
      background-color: #8b0000;
      color: #fff;
      border-radius: 10%;
    }

    .button-add:hover {
      background-color: #265828;
      color: #fff;
      border-radius: 10%;
      cursor: pointer;
    }

    .button-add {
      background-color: #449e48;
      color: #fff;
      border-radius: 10%;
      margin-bottom: 0.5rem;
      margin-left: auto;
      margin-right: auto;
    }
</style>