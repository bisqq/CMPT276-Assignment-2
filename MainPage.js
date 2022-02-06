const add = document.getElementsByClassName("addRow")[0];

let count = 0;
add.addEventListener("click", function (e) {
    e.preventDefault();
    count++;

    let row = document.createElement("tbody");
    row.innerHTML = `
        <tr>
            <td>` + count + `</td>
            <td>
                <nav>
                    <a href = "/temp" id = "name-` + count + `"></a>
                </nav>
            </td>
            <td>
                <h3 class = "headerThree" id = "colour-` + count + `"></h3>
            </td>
        </tr>
    `;

    document.querySelector("table").appendChild(row);

});