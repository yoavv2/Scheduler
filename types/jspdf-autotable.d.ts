// types/jspdf-autotable.d.ts

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: jsPDFAutoTableOptions) => jsPDF;
  }

  interface jsPDFAutoTableOptions {
    // **Content Options**
    html?: string | HTMLElement;
    head?: any[]; // Array of header rows
    body?: any[]; // Array of body rows
    foot?: any[]; // Array of footer rows

    // **Styling Options**
    styles?: jsPDFAutoTableStyles;
    headStyles?: jsPDFAutoTableStyles;
    bodyStyles?: jsPDFAutoTableStyles;
    footStyles?: jsPDFAutoTableStyles;
    alternateRowStyles?: jsPDFAutoTableStyles;
    columnStyles?: {
      [key: string]: jsPDFAutoTableStyles;
    };

    // **Table Options**
    startY?: number;
    margin?: jsPDFAutoTableMargin;
    theme?: 'striped' | 'grid' | 'plain' | 'css';
    styles?: jsPDFAutoTableStyles;
    rowPageBreak?: 'auto' | 'avoid';
    tableWidth?: 'auto' | 'wrap' | number;
    showHead?: 'everyPage' | 'firstPage' | 'never';
    showFoot?: 'everyPage' | 'lastPage' | 'never';
    pageBreak?: 'auto' | 'avoid' | 'always';
    tableLineWidth?: number;
    tableLineColor?: string | number | [number, number, number];

    // **Hooks**
    didParseCell?: (data: jsPDFAutoTableCellHookData) => void;
    willDrawCell?: (data: jsPDFAutoTableCellHookData) => void;
    didDrawCell?: (data: jsPDFAutoTableCellHookData) => void;
    didDrawPage?: (data: jsPDFAutoTableHookData) => void;

    // **Additional Options**
    horizontalPageBreak?: boolean;
    horizontalPageBreakRepeat?: number;
  }

  interface jsPDFAutoTableStyles {
    font?: 'helvetica' | 'times' | 'courier' | string;
    fontStyle?: 'normal' | 'bold' | 'italic' | 'bolditalic' | string;
    overflow?:
      | 'linebreak'
      | 'ellipsize'
      | 'visible'
      | 'hidden'
      | 'ellipsize'
      | 'crop'
      | 'linebreak'
      | 'ellipsize';
    fillColor?: false | number | string | [number, number, number];
    textColor?: number | string | [number, number, number];
    halign?: 'left' | 'center' | 'right' | 'justify';
    valign?: 'top' | 'middle' | 'bottom';
    fontSize?: number;
    cellWidth?: 'auto' | 'wrap' | number;
    minCellHeight?: number;
    cellPadding?: number | jsPDFAutoTablePadding;
    lineColor?: number | string | [number, number, number];
    lineWidth?: number;
  }

  interface jsPDFAutoTableMargin {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
    horizontal?: number;
    vertical?: number;
  }

  interface jsPDFAutoTablePadding {
    top?: number;
    right?: number;
    bottom?: number;
    left?: number;
  }

  interface jsPDFAutoTableHookData {
    pageNumber: number;
    pageCount: number;
    settings: any;
    table: any;
    doc: jsPDF;
  }

  interface jsPDFAutoTableCellHookData extends jsPDFAutoTableHookData {
    cell: any;
    row: any;
    column: any;
    section: 'head' | 'body' | 'foot';
  }
}
