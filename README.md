# Bamazon

Bamazon is an app that uses Node.js and MySQL to create hypothetical command line customer and manager interfaces for a generic-and-not-at-all-well-known online retailer. It's split into two variations **bamazonCustomer.js** and **bamazonManager.js** for each purpose.

The file "products.csv" has been included as a sample table of products with which to interact. User can utilize MySQL Workbench (or any other database tool) to import, host, and interact with the provided database, or make up their own values and products. Host, port, and user details will need to be accordingly edited in the beginning "mysql.createConnection()" blocks of code of the Javascript files.

Two final notes: (1) These apps are dependant on "Inquirer.js" and "MySQL," which have been included in a JSON package; to ensure the repository works as intended, "npm install" should be run in the downloaded directory, and (2) at any step, errors will be explicitly thrown to the command line for user convenience.

## **ONE:** *bamazonCustomer.js*

1. The straight-forward customer interface is accessed by running "node bamazonCustomer.js" as a command. The user is presented a table overview of all products in the Bamazon catalog, as seen below.

![Capture1](/images/Capture1.PNG)

2. User will be prompted to enter the *ItemID* and *quantity* of the products they would like to purchase.

![Capture2](/images/Capture2.PNG)

3. If the requested quantity exceeds the available stock, the request will be rejected with the message "Insufficient quantity!"

![Capture3](/images/Capture3_insufficient.PNG)

4. If the available stock meets the request, the request will be accepted. The total purchase price will be calculated and displayed (in dollars), the available stock will decrease to reflect the sale, and the connection will close.

![Capture4](/images/Capture4_success.PNG)

## **TWO:** *bamazonManager.js*

1. The useful manager interface is accessed by running "node bamazonCustomer.js" as a command. It presents the user with the origin menu of a Bamazon manager using *Inquirer*, as seen below.

![Capture5](/images/Capture5.PNG)

2. *VIEW PRODUCTS*

    User is presented a table overview of all products in the Bamazon catalog, as seen below. The app then returns to the origin menu.

![Capture6](/images/Capture6.PNG)

3. *VIEW LOW INVENTORY*

    User is presented a table overview similar to *"View Products"*, but only including products whose stock quantity (available product) is below 20 units. The app then returns to the origin menu.

![Capture7](/images/Capture7.PNG)

4. *REORDER LOW INVENTORY*

    User is presented with a list of products with low quanity (those shown in *"View Low Inventory"*) and they can choose from a generated rawlist to replenish exactly 25 units. A summary of order and the new "New Stock" is displayed. The app then returns to the origin menu.

![Capture8](/images/Capture8.PNG)

5. *ADD NEW PRODUCT*

    User is prompted for the details to add a new product to the product database. "Product name" is a string input less than 30 characters. "Department name" is chosen from a list of inputs. "Price" and "Stock quantity" are integer inputs. "PRODUCT (*product name*) successfully aadded!" is returned if the operation is compeleted without error. The app then returns to the origin menu.

![Capture9a](/images/Capture9a.PNG)

![Capture9b](/images/Capture9b.PNG)

That is the gist of the app. Enjoy!