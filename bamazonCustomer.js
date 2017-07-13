var mysql = require("mysql");
var inquirer = require('inquirer');
var Table = require('cli-table');

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "eloquentSql#125",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) throw err;

  console.log("connected as id " + connection.threadId);
  
  connection.query("SELECT * FROM Products", function (err,res) {

    // var table = new Table({
    // chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    //        , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    //        , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    //        , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }
    // });

    var table = new Table({
      chars: { 'top': '' , 'top-mid': '' , 'top-left': '' , 'top-right': ''
             , 'bottom': '' , 'bottom-mid': '' , 'bottom-left': '' , 'bottom-right': ''
             , 'left': '' , 'left-mid': '' , 'mid': '' , 'mid-mid': ''
             , 'right': '' , 'right-mid': '' , 'middle': ' ' },
      style: { 'padding-left': 0, 'padding-right': 0 }
    });

    table.push(['Item ID', 'Product Name', 'Department', 'Price', 'Stock']);
    for (var i = 0; i < res.length; i++) {
      table.push([res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]);
    }
    
    console.log(table.toString());
    console.log("\n");
    orderThings();
  });

});


function orderThings() {
  inquirer.prompt([{
      name: 'item',
      type: 'input',
      message: 'Which item would you like to purchase? (Enter the Item ID)'
    },
    {
      name: 'quantity',
      type: 'input',
      message: 'How many units would you like to purchase?'

    }]).then(function(answer) {

    connection.query('SELECT * FROM products WHERE item_id = ?', [answer.item], function(err, res){
    //console.log(res[0].stock_quantity);
    if(answer.quantity <= res[0].stock_quantity) {
    totalCost = answer.quantity * res[0].price;
    
    console.log('Your order has been placed! Total amount you owe is $' + totalCost);
    console.log('Thank you for shopping with us');

    //update product table
      connection.query('UPDATE products SET ? Where ?', 
        [
            {
              stock_quantity: res[0].stock_quantity - answer.quantity
            },
            {
              item_id: answer.item
            }
        ], function(err, res) {
            console.log(res.affectedRows + " product updated");
        });
    }

    else { 
    console.log('Insufficient Quantity!');
     }
      
      });

       });
}


    
      

