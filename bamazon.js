const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "l1qu1df257",
  database: "bamazon_db"
});

function runApp(){
  connection.connect(function(err) {
    if (err) throw err;
  
    connection.query("SELECT * FROM products", function(err, res) {
      if (err) throw err;
      console.log("Available Products:")
      for(i=0; i < res.length; i++){
        productInfo = res[i].item_id + " " + res[i].product_name + " $" + res[i].price; 
        console.log(productInfo);
      }
      inquirer.prompt([
        {
          type: "input",
          message: "Please select product number or enter E to exit",
          name: "productID"
        }
      ]).then(function(response){
        if(response.productID == "e" || response.productID == "E"){
          console.log("Thank you for visiting Bamazon!")
          connection.end();
        }
        else{
          connection.query("SELECT * FROM products WHERE item_id = ?",[response.productID], function(err, res2) {
            if(err) throw err;
            if(res2.length === 0){
              console.log("Invalid Selection")
              runApp();
            }
            else{
              inquirer.prompt([
                {
                  type: "input",
                  message: `How many ${res2.product_name} do you want to purchase for $${res2.price}`,
                  name: "quant"
                }
              ]).then(function(response2){
                if(res2.stock_quantity > parseInt(response2.quant)){
                  console.log("Thank you! Your total is $" + response2.quant * res2.price)
                  var newQuant = res2.stock_quantity - response2.quant;
                  connection.query(
                    "UPDATE songs SET ? WHERE ?",[
                      {
                        productID : response.productID
                      },
                      {
                        stock_quantity : newQuant
                      }
                    ])
                  console.log("stock updated")
                  runApp();
                }
                else{
                  console.log("Sorry. Insuficient stock.")
                  runApp();
                }
              })
            }
            
            
            
          })
        }
        
      })

    });
  });
}
runApp();
