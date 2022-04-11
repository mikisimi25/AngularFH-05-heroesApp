// import { Component, OnInit } from '@angular/core';
// import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
// // import { TranslateService } from '@ngx-translate/core';


// import pdfMake from 'pdfmake/build/pdfmake';
// import pdfFonts from 'pdfmake/build/vfs_fonts';
// pdfMake.vfs = pdfFonts.pdfMake.vfs;

// interface Sticker {
//   column: number;
//   row: number;
//   offer?: string;
//   element?: number;
// }

// @Component({
//   selector: 'app-formulario',
//   templateUrl: './formulario.component.html',
//   styles: [],
// })
// export class FormularioComponent implements OnInit {


//   //Variables for form
//   public placeArray: Sticker[] = [];
//   public disableCheckbox: boolean = true;

//   //Parameters to create a table7
//   private _paramColumn: number = 1;
//   private _paramRow: number = 1;
//   private _sizeColumn: number = 5;
//   private _sizeRow: number = 13;
//   private _sizeTable: number = this._sizeColumn * this._sizeRow;

//   public columns: any[] = Array.from(Array(this._sizeColumn).keys());
//   public rows: any[] = Array.from(Array(this._sizeRow).keys());

//   constructor(
//     private formBuilder: FormBuilder,
//     private pdfMakerService: PdfMakerService,
//     private pdfService: PdfGeneratorService,
//     private translateService: TranslateService
//     ) {}

//   public pruebaCheck = false;
//   // public pruebaCheck: any[] = Array.from(Array(65).keys());;
//   ngOnInit(): void {
//     //   for (let place = 0; place < this.pruebaCheck.length; place++) {
//     //     this.pruebaCheck[place] = false;
//     //   }
//   }

//   //FormBuilder
//   public stickerForm: FormGroup = this.formBuilder.group({
//     offer: ['111111', [Validators.required]],
//     element: ['111',[Validators.required, Validators.min(1), this.checkIfNumber()],],
//     quantity: ['4', [Validators.required, Validators.min(1), this.checkIfNumber()],],
//     page: ['many', [Validators.required]],
//   });

//   //Get specific input
//   private getFormControl(controlName: string): AbstractControl {
//     return this.stickerForm.get(controlName);
//   }

//   //Invalid input
//   public isInvalid(controlName: string): boolean {
//     const nameControl: AbstractControl = this.getFormControl(controlName);
//     return nameControl.invalid && nameControl.touched;
//   }

//   //Show error message
//   public getErrorMessages(controlName: string): string[] {
//     const nameControl: AbstractControl = this.getFormControl(controlName);
//     const errors = nameControl.errors;
//     let errorsArray: string[] = [];

//     for (const key in errors) {
//       switch (key) {
//         case 'required':
//           errorsArray = [...errorsArray, 'required'];
//           break;

//         case 'isNotNumber':
//           errorsArray = [...errorsArray, 'not a number'];
//           break;

//         case 'quantity':
//           errorsArray = [...errorsArray, 'not quantity'];
//           break;

//         case 'selectedCheckboxes':
//           errorsArray = [...errorsArray, 'don´t mutch'];
//           break;
//       }
//     }

//     return errorsArray;
//   }

//   //Validate if it number
//   private checkIfNumber(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: boolean } | null => {
//       if (isNaN(control.value)) return { isNotNumber: true };
//       return null;
//     };
//   }

//   //When click on checkbox of the table
//   public selectPlace(): void {
//     const form = document.getElementById('input-form');
//     let array = [];

//     //Pushes to array the positions of the checked checkboxes
//     form.querySelectorAll('input').forEach((input) => {
//       if (input.type === 'checkbox' && input.checked) {
//         let prueba = JSON.parse(input.value);

//         array.push({
//           column: prueba.column,
//           row: prueba.row,
//         });
//       }
//     });

//     this.placeArray = array;
//     this.match();

//     console.log('Array of stickers: ', this.placeArray);
//   }

//   //Compare if quantity match with checkboxes that are checked
//   private flagForDisableCheckBox = false;
//   public match(): void {
//     if (this.stickerForm.get('quantity').value == this.placeArray.length) {
//       //If it´s match, it disable the checkboxes and enable the submit button
//       this.disableCheckbox = true;
//       this.flagForDisableCheckBox = false;

//       this.stickerForm.get('quantity').updateValueAndValidity();
//     } else {
//       //If it isn´t, it send a error message
//       this.stickerForm.controls['quantity'].setErrors({
//         selectedCheckboxes: true,
//       });

//       this.flagForDisableCheckBox = true;
//     }
//   }

//   //pageOption true = many; false = one
//   private pageOption: boolean = true;

//   //Clicking on radio button
//   public changeOption(): void {
//     this.pageOption = !this.pageOption;
//     this.match();

//     if (this.flagForDisableCheckBox) {
//       this.disableCheckbox = !this.disableCheckbox;
//     }

//     if (this.pageOption) {
//       this.stickerForm.get('quantity').updateValueAndValidity();
//     }
//   }

//   //If quantity is changing
//   public quantityChange(): void {
//     if (this.stickerForm.get('page').value === 'one') {
//       //If quantity is changed, the checkboxes are restarted and changed to enable
//       if (this.disableCheckbox) {
//         this.disableCheckbox = false;
//       }

//       this.match();
//     }
//   }

//   //Button to create the PDF
//   public createPdf(): void {
//     let pdfObject: any = this.stickerForm.value;

//     //Equals cont with the value of the label of "element" from the form
//     let cont = pdfObject.element;

//     //Creates the array of stickers, introducing the attributs of "offer" and "element"
//     //Option of "one page"
//     if (pdfObject.page == 'one') {
//       this.placeArray.forEach((sticker) => {
//         sticker.offer = pdfObject.offer;
//         sticker.element = cont++;
//       });
//     } else {
//       //Option of "many pages"
//       let contStickers: number = 1;
//       this.placeArray = [];

//       //Generates all the stickers per page, wich lap of the for is a new page
//       for (
//         let stickersPerPage: number = 1;
//         stickersPerPage <= pdfObject.quantity;
//         stickersPerPage += this._sizeTable
//       ) {
//         this.rows.forEach((row, rowIndex) => {
//           this.columns.forEach((column, columnIndex) => {
//             if (contStickers <= pdfObject.quantity) {
//               contStickers++;

//               this.placeArray.push({
//                 column: columnIndex,
//                 row: rowIndex,
//                 offer: pdfObject.offer,
//                 element: cont++,
//               });
//             }
//           });
//         });
//       }
//     }

//     pdfMake.createPdf(this.buildTable(this.placeArray)).download(`${this.translateService.instant('tableName').toLowerCase()}_${'today'}.pdf`);
//   }

//   // public buildTable(placeArray: Sticker[]) {
//   //   console.log(placeArray)

//   //   let stickerArray = [], rowArray, flag, offer, element;

//   //   this.rows.forEach((row, rowIndex) => {
//   //     rowArray = []

//   //     this.columns.forEach((column, columnIndex) => {
//   //       flag = false;
//   //       offer = ''
//   //       element = 0

//   //       placeArray.forEach(sticker => {
//   //         if(sticker.column === column && sticker.row === row) {
//   //           flag = true;
//   //           offer = sticker.offer;
//   //           element = sticker.element;
//   //         }
//   //       });

//   //       if(flag) {
//   //         rowArray.push(this.stickerTemplate(offer,element))
//   //       } else {
//   //         rowArray.push('')
//   //       }

//   //     })

//   //     stickerArray.push(rowArray)
//   //   })

//   //   return this.tableTemplate(stickerArray);
//   // }

//   public buildTable(placeArray: Sticker[]) {
//     console.log(placeArray)

//     let stickerArray = [], rowArray, flag, offer, element;

//     this.rows.forEach((row, rowIndex) => {
//       rowArray = []

//       this.columns.forEach((column, columnIndex) => {
//         flag = false;
//         offer = ''
//         element = 0

//         for(let sticker = 0; sticker < 65; sticker++)  {
//           let objectSticker = placeArray[sticker];

//           if(objectSticker.column === column && objectSticker.row === row) {
//             flag = true;
//             offer = objectSticker.offer;
//             element = objectSticker.element;
//           }
//         }

//         // placeArray.forEach(sticker => {
//         //   if(sticker.column === column && sticker.row === row) {
//         //     flag = true;
//         //     offer = sticker.offer;
//         //     element = sticker.element;
//         //   }
//         // });

//         if(flag) {
//           rowArray.push(this.stickerTemplate(offer,element))
//         } else {
//           rowArray.push('')
//         }

//       })

//       stickerArray.push(rowArray)
//     })

//     return this.pageTamplate(this.tableTemplate(stickerArray));
//   }

//   public stickerTemplate(offer,element) {
//     return {
//       table: {
//           widths: '*',
//           heights: [15, 33],
//           body: [
//               [
//                   {
//                     image: 'data:image/png;base64,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 ',
//                       fit: [100,15],
//                       colSpan: 2,
//                       alignment: 'left',
//                   },
//                   {}
//               ],
//               [
//                   {
//                       text: [
//                           {
//                               text: 'Nº de muestra:\n\n',
//                               style: 'smallText'
//                           },
//                           {
//                               text: offer,
//                               style: 'bigText'
//                           }
//                       ],
//                   }, {
//                       text: [
//                           {
//                               text: 'Nº de elemento:\n\n',
//                               style: 'smallText'
//                           },
//                           {
//                               text: element,
//                               style: 'bigText'
//                           }
//                       ]
//                   }
//               ],
//           ]
//         }
//     }
//   }

//   public tableTemplate(stickerArray) {

//     return {
//       style: 'tableExample',
//       table: {
//         widths: '*',
//         heights: 60,
//         body: stickerArray
//       },

//       layout: {
//         hLineWidth: function (i, node) {
//           return 0;
//         },
//         vLineWidth: function (i, node) {
//           return 0;
//         },
//         paddingTop: function(i, node) { return 0; },
//         paddingBottom: function(i, node) { return 0; },
//       }
//     }

//   }

//   public pageTamplate(contentArray) {
//     return {
//       pageMargins: [28.5,31.7],
//       content: [contentArray],
//       styles: {
//         tableExample: {
//           alignment: 'center',
//         },
//         smallText: {
//               fontSize: 5
//         },
//         bigText: {
//               fontSize: 10,
//               bold: true
//         }
//       }
//     }
//   }

// }
