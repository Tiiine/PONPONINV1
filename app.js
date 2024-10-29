function fetchData(sheetName) {
  google.script.run.withSuccessHandler(renderTable).getInventoryData(sheetName);
}

function renderTable(data) {
  const tableBody = document.getElementById("inventoryTable").querySelector("tbody");
  tableBody.innerHTML = "";

  if (!data || data.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">Aucune donnée trouvée pour aujourd\'hui.</td></tr>';
    return;
  }

  data.forEach(row => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${row.id}</td>
      <td>${row.produit}</td>
      <td><input type="number" value="${row.quantite}" data-id="${row.id}" onchange="updateQuantity(this)"/></td>
      <td><button onclick="updateQuantity(this.previousSibling)">Mettre à jour</button></td>
    `;
    tableBody.appendChild(tr);
  });
}

function updateQuantity(input) {
  const id = input.getAttribute("data-id");
  const quantite = input.value;
  google.script.run.updateProductQuantity(id, quantite, sheetName);
}
