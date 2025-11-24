export const CSS = `
            * {
              font-size: 14px;
              font-family: 'Arial', sans-serif;
              }

              .centered {
                display: grid;
                place-items: center;
              }
              .texto-centrado {
                text-align: center;
               }
              .both_border {
                border-top: 2px solid black;
                border-bottom: 2px solid black;
              }

              .border-item{
              border-bottom: 1px dotted black;
              }

              td.description,
              th.description {
                width: 70mm;
                max-width: 70mm;
                text-align:left;
                padding: 4px;
              }
              td.description,
              td.quantity,
              td.price{
              font-weight:normal;
              }
              td.quantity,
              th.quantity {
                width: 15mm;
                max-width: 15mm;
                word-break: break-all;
              text-align:center;
              }
              td.price,
              th.price {
                width: 20mm;
                max-width: 20mm;
                word-break: break-all;
              text-align:right;
              }
              td.importe,
              th.importe{
              width: 35mm;
              max-width: 35mm;
              word-break: break-all;
              text-align:right;
              }
              td.totales {
                font-size: 15px;
              }
              img {
                max-width: inherit;
                width: 40mm;
              }

              .border-doble-top{
                border-top:2px solid black;
              }
              .border-doble-bottom{
                border-bottom:2px solid black;
              }
`;

export const CSSMEDIACARTA = `
              @import url('https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css');
              .main{
                font-family: Arial, sans-serif;
              }
              .w-full{
                width: 100%;
              }
              .header{
                display: flex;
                justify-content: space-between;
              }
              th{
                text-align: left;
                gap: 0px;
                border-bottom: 1px solid black;
              }
              .total_row{
                border-top: 1px solid black;
              }
              .total_row_last{
                border-bottom: 1px solid black;
              }
              .flex-1{
                flex: 1;
              }
              .text-center{
                text-align: center;
              }
              .text-right{
                text-align: right;
              }
              .text-left{
                text-align: left;
              }
              .bg-red{
                background-color: red;
              }
              .bg-blue{
                background-color: blue;
              }
              .border{
                border: 1px solid black;
              }
                      .border-detalle{
                          border-bottom: 1px dotted black;
                      }
            `;
