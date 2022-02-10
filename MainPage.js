// const add = document.getElementsByClassName("addRow")[0];

// let count = 0;
// add.addEventListener("click", function (e) {
//     e.preventDefault();

//     const name = document.getElementsByName("name")[0]
//     const width = document.getElementsByName("width")[0]
//     const height = document.getElementsByName("height")[0]
//     const colour = document.getElementsByName("colour")[0]

//     if (name.value == "" || width.value == "" || height.value == "" || colour.value == "") {
//         alert("Please fill all the fields");
//         return;
    
//     } else {
//         count++;

//         let row = document.createElement("tbody");
//         row.innerHTML = `
//             <tr>
//                 <td>` + count + `</td>
//                 <td>
//                     <nav>
//                         <a href = "temp" id = "name-` + count + `"></a>
//                     </nav>
//                 </td>
//                 <td>
//                     <h3 class = "headerThree" id = "colour-` + count + `"></h3>
//                 </td>
//             </tr>
//         `;
    
//         document.querySelector("table").appendChild(row);

//         name.value = "";
//         width.value = "";
//         height.value = "";
//         colour.value = "";
//     }

// });