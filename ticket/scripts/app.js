/* ============================================================
   Chinook Theatre — Ticket Cost Calculator  |  STARTER
   CPRG 213 — Web Development 1

   YOUR NAME:

   The HTML and CSS are already built for you. Your job is to write
   the JavaScript that makes the "Calculate Total" button work.

   This uses the same skills as the Week 7 Tip Calculator:
   variables, a function, if/else, template literals, getElementById,
   .value, .innerHTML, and addEventListener.

   Follow the numbered steps below. Replace each TODO with your code.
   ============================================================ */

/* ---------- 1. Get references to the HTML elements ----------
   TODO: Use document.getElementById() to create a variable for each of:
     - the ticket-type <select>   → id="ticket-type"
     - the quantity <input>        → id="quantity"
     - the calculate <button>      → id="calculate-button"
     - the result <div>            → id="result"
*/

// INSERT YOUR CODE HERE
const ticketTypeSelect = document.getElementById("ticket-type");
const quantityInput = document.getElementById("quantity");
const calculateButton = document.getElementById("calculate-button");
const resultDiv = document.getElementById("result");


/* ---------- Pricing rules (provided for you) ---------- */
const GROUP_SIZE     = 10;    // 10+ tickets qualifies for the group discount
const GROUP_DISCOUNT = 0.10;  // 10% off the subtotal
const BOOKING_FEE    = 2.50;  // flat fee, once per order


/* ---------- 2. Write the calculation function ----------
   TODO: Create a function called calculateTotal() that:
     a. Reads the selected ticket price as a number
        (the <select> value is already the price — use Number()).
     b. Reads the quantity as a whole number (use parseInt).
     c. Validates the quantity: if it is not a number or is less than 1,
        call showError("...") with a helpful message and stop (return).
     d. Calculates:
          subtotal = price * quantity
          discount = 10% of the subtotal IF quantity is 10 or more, otherwise 0
          total    = subtotal - discount + BOOKING_FEE
     e. Displays the result inside the result <div> using .innerHTML.
        Show the subtotal, the discount (only when there is one),
        the booking fee, and the total. Use .toFixed(2) for money.
*/

// INSERT YOUR CODE HERE
function calculateTotal() {
  const ticketPrice = Number(ticketTypeSelect.value);
  const quantity = parseInt(quantityInput.value, 10);

  if (isNaN(quantity) || quantity < 1) {
    showError("Please enter a valid number of tickets.");
    return;
  }

  const subtotal = ticketPrice * quantity;
  let discount = 0;

  if (quantity >= GROUP_SIZE) {
    discount = subtotal * GROUP_DISCOUNT;
  }

  const total = subtotal - discount + BOOKING_FEE;
  let discountRow = "";

  if (discount > 0) {
    discountRow =
      '<div class="result-row">' +
      "<span>Group Discount</span>" +
      "<span>-$" + discount.toFixed(2) + "</span>" +
      "</div>";
  }

  resultDiv.className = "";
  resultDiv.style.display = "block";
  resultDiv.innerHTML =
    '<div class="result-row">' +
    "<span>Subtotal</span>" +
    "<span>$" + subtotal.toFixed(2) + "</span>" +
    "</div>" +
    discountRow +
    '<div class="result-row">' +
    "<span>Booking Fee</span>" +
    "<span>$" + BOOKING_FEE.toFixed(2) + "</span>" +
    "</div>" +
    '<div class="result-row total">' +
    "<span>Total</span>" +
    "<span>$" + total.toFixed(2) + "</span>" +
    "</div>";
}


/* ---------- 3. Helper: show an error message (provided for you) ----------
   Uncomment this once you have created your result variable above.
*/
function showError(message) {
  resultDiv.className = "error";
  resultDiv.style.display = "block";
  resultDiv.textContent = message;
}


/* ---------- 4. Connect the button ----------
   TODO: Add a "click" event listener to the calculate button
   that runs your calculateTotal function.
*/

// INSERT YOUR CODE HERE
calculateButton.addEventListener("click", calculateTotal);
