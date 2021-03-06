const mysql = require("mysql");
const inquirer = require("inquirer");
var productStock = 0;
var itemID = 0;

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "bamazon_db"
});


connection.connect(function(err) {
  if (err) throw err;
  runApp();
});
  
function runApp(){
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
              itemID = res2[0].item_id;
              productStock = res2[0].stock_quantity;
              inquirer.prompt([
                {
                  type: "input",
                  message: "How many do you want to purchase?",
                  name: "quant"
                }
              ]).then(function(response2){
                
                if(productStock > parseInt(response2.quant)){
                  console.log("Thank you for your purchase!")
                  var newQuant = productStock - response2.quant;

                  query = connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                      {
                        stock_quantity: newQuant
                      },
                      {
                        item_id: itemID
                      }
                    ],
                    function(err, res) {
                      console.log(res.affectedRows + " product stock updated!");
                      runApp();
                      
                      
                    }
                  );

                }
                else{
                  console.log(productStock + " currently in stock")
                  console.log("Sorry. Insuficient stock.")
                  runApp();
                  
                }
              })
            }
            
            
            
          })
        }
        
      })

    });
}
  
