# Barcode-Scanning-App

**PROBLEM:** There is a need for a more efficient tracking method in San Jose. Currently, if we get asked about the current whereabouts of a board in NXT San Jose, we need to conduct an intensive search for each board to determine where it is at. 
1.	We are notified when an RMA arrives and when an RMA leaves the facility.
a.	This notification is unreliable since we have boards that arrive/depart offline and without our department being notified.
2.	Once the board is here, we are completely unaware about its current location or stage in repair.
One solution that would be efficient would-be RFID tags that we can assign to each board, but this will be expensive and require an infrastructure set-up.

**PROPOSAL:** I propose we use QR/Barcode scanning to automatically update each stage the board is in. 
When the board comes into San Jose for RMA, we scan the board to update its location, when it’s handed off to BT, they will scan the board to receive it. When they hand off the board to APPs of FSI they will also need to scan the board. When the board leaves, we scan to update that it has departed.

Our scanner will automatically populate a spreadsheet that will have information such as
1.	RMA stock count and location of each board.
2.	History of each board so we know which boards are repeatedly failing in the field.
3.	Fail logs – this information will most likely need to be manually filled out since failures are specific and unique.

**IMPLIMENTATION:** To save on costs and materials, I propose we create an app that will scan the boards. This will remove the need to purchase physical scanners that we need to keep track of and hand off to each department. 

Each board already has its own unique barcode, so we will need to create a database to store the associated information using a data structure that fits our needs. When we scan the code, the user will be prompted with different stages they can change the board to.
