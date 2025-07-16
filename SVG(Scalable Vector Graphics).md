
````javascript
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="80" fill="#4CAF50" />
  <text x="100" y="110" font-size="24" text-anchor="middle" fill="#ffffff">Hello</text>
</svg>
````
_Creates a 200x200 canvas.

Draws a green circle centered at (100,100) with radius 80.

Adds white text (“Hello”) centered inside the circle._

You can drop this directly into any HTML file or embed it into your React/Django templates if you're rendering dashboard icons or identity tokens on-chain.

_**Live SVG Circle Based on Value
Let’s say you want the radius of a circle to reflect the current number of blockchain transactions.**_


_**How to select and manipulate SVG elements with JS.

How to link visuals to dynamic data sources (e.g., smart contract calls or APIs).

Perfect for dashboards where visuals respond to live updates (like disease spread or token movements).**_

```javascript
<svg id="dataCircle" width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <circle cx="100" cy="100" r="10" fill="#2196F3" />
</svg>

<script>
  // Simulate blockchain transaction data
  let transactions = [10, 20, 40, 60, 80, 100];
  let index = 0;

  const updateCircle = () => {
    const svg = document.getElementById("dataCircle");
    const circle = svg.querySelector("circle");
    circle.setAttribute("r", transactions[index]); // update radius
    index = (index + 1) % transactions.length; // loop through data
  };

  // Update every 2 seconds
  setInterval(updateCircle, 2000);
</script>

```
