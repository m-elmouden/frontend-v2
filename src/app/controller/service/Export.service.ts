import jsPDF from 'jspdf';
import autoTable, { RowInput } from 'jspdf-autotable';
import { saveAs } from 'file-saver';
import { Injectable } from '@angular/core';
import { Workbook }   from 'exceljs/dist/exceljs.min.js';

@Injectable({
    providedIn: 'root'
})
export class ExportService {
    constructor() { }

    exportExcel(criteriaData: any[], exportData: any[], filename: string) {
        // Excel Title, Header, Data
        const title = filename;
        const header = Object.keys(exportData[0]);
        const data = exportData;
        // Create workbook and worksheet
        const workbook = new Workbook();

        const worksheet = workbook.addWorksheet('liste des ' + filename);


        // Add criteria title
        const titleRowCR = worksheet.addRow(['Critères']);
        titleRowCR.font = { name: 'Calibri', family: 4, size: 14, underline: 'single', bold: true };
        worksheet.addRow([]);
        const headerCr = Object.keys(criteriaData[0]);
        const headerRowCr = worksheet.addRow(headerCr);
        // Cell Style : Fill and Border
        headerRowCr.eachCell((cell, number) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '03FCF4' } };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        criteriaData.forEach(d => { const row = worksheet.addRow(Object.values(d)); });
        // Add Row and formatting
        worksheet.addRow([]);
        const titleRow = worksheet.addRow([title]);
        titleRow.font = { name: 'Calibri', family: 4, size: 14, underline: 'single', bold: true };

        // let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])

        // worksheet.mergeCells('A1:D2');
        // Blank Row
        worksheet.addRow([]);
        // Add Header Row
        const headerRow = worksheet.addRow(header);

        // Cell Style : Fill and Border
        headerRow.eachCell((cell, number) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '03FCF4' } };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        data.forEach(d => { const row = worksheet.addRow(Object.values(d)); });
        for (let i = 1; i <= header.length; i++){worksheet.getColumn(i).width = 36; }
        worksheet.addRow([]);
        // Footer Row
        const footerRow = worksheet.addRow(['Description']);
        footerRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFCCFFE5' }
        };
        // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        // Merge Cells
        // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
        // Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data) => {
            this.saveAsExcelFile(data, filename);
        });
    }
    exportCustomizeExcel(compagneData: any[], distinctionsData: any[], boursesData: any[], gestionEquipeData: any[], filename: string) {
        // Excel Title, Header, Data
        const title = filename;

        // Create workbook and worksheet
        const workbook = new Workbook();

        const worksheet = workbook.addWorksheet('liste des ' + filename);
        const worksheetDistinctions = workbook.addWorksheet('liste des distinctions');
        const worksheetBourses = workbook.addWorksheet('liste des bourses');
        const worksheetGestionEquipes = workbook.addWorksheet('liste des equipes');




        // Add criteria title
        const titleRowCR = worksheet.addRow(['Compagne ']);
        titleRowCR.font = { name: 'Calibri', family: 4, size: 14, underline: 'single', bold: true };
        worksheet.addRow([]);
        const headerCr = Object.keys(compagneData[0]);
        const headerRowCr = worksheet.addRow(headerCr);
        // Cell Style : Fill and Border
        headerRowCr.eachCell((cell, number) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '03FCF4' } };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        compagneData.forEach(d => { const row = worksheet.addRow(Object.values(d)); });
        // Add Row and formatting
        worksheet.addRow([]);
        const titleRow = worksheetDistinctions.addRow(['Distinction ']);
        titleRow.font = { name: 'Calibri', family: 4, size: 14, underline: 'single', bold: true };

        const titleRowBourse = worksheetBourses.addRow(['Bourses ']);
        titleRowBourse.font = { name: 'Calibri', family: 4, size: 14, underline: 'single', bold: true };

        const titleRowGestionEquipe = worksheetGestionEquipes.addRow(['Gestion Equipes ']);
        titleRowGestionEquipe.font = { name: 'Calibri', family: 4, size: 14, underline: 'single', bold: true };

        // let subTitleRow = worksheet.addRow(['Date : ' + this.datePipe.transform(new Date(), 'medium')])

        // worksheet.mergeCells('A1:D2');
        // Blank Row
        worksheetDistinctions.addRow([]);
        worksheetBourses.addRow([]);
        worksheetGestionEquipes.addRow([]);

        // Add Header Row
        const headerRow = worksheetDistinctions.addRow(Object.keys(distinctionsData[0]));

        // Cell Style : Fill and Border
        headerRow.eachCell((cell, number) => {
            cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '03FCF4' } };
            cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
        });
        // worksheet.addRows(data);
        // Add Data and Conditional Formatting
        distinctionsData.forEach(d => { const row = worksheetDistinctions.addRow(Object.values(d)); });
        for (let i = 1; i <= Object.keys(distinctionsData[0]).length; i++){worksheetDistinctions.getColumn(i).width = 36; }
        worksheetDistinctions.addRow([]);
        if (boursesData.length > 0){
            // Add Header Row
            const headerBoursesRow = worksheetBourses.addRow(Object.keys(boursesData[0]));

            // Cell Style : Fill and Border
            headerBoursesRow.eachCell((cell, number) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '03FCF4' } };
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
            // worksheet.addRows(data);
            // Add Data and Conditional Formatting
            boursesData.forEach(d => { const row = worksheetBourses.addRow(Object.values(d)); });
            for (let i = 1; i <= Object.keys(boursesData[0]).length; i++){worksheetBourses.getColumn(i).width = 36; }
            worksheetBourses.addRow([]);
        }
        if (gestionEquipeData.length > 0){
            // Add Header Row
            const headerGestionEquipesRow = worksheetGestionEquipes.addRow(Object.keys(gestionEquipeData[0]));

            // Cell Style : Fill and Border
            headerGestionEquipesRow.eachCell((cell, number) => {
                cell.fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: '03FCF4' } };
                cell.border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } };
            });
            // worksheet.addRows(data);
            // Add Data and Conditional Formatting
            gestionEquipeData.forEach(d => { const row = worksheetGestionEquipes.addRow(Object.values(d)); });
            for (let i = 1; i <= Object.keys(gestionEquipeData[0]).length; i++){worksheetGestionEquipes.getColumn(i).width = 36; }
            worksheetGestionEquipes.addRow([]);
        }
        // Footer Row
        const footerRow = worksheet.addRow(['Description']);
        footerRow.getCell(1).fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'FFCCFFE5' }
        };
        // footerRow.getCell(1).border = { top: { style: 'thin' }, left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
        // Merge Cells
        // worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
        // Generate Excel File with given name
        workbook.xlsx.writeBuffer().then((data) => {
            this.saveAsExcelFile(data, filename);
        });
    }
    saveAsExcelFile(buffer: any, fileName: string): void {
        import('file-saver').then(FileSaver => {
            const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
            const data: Blob = new Blob([buffer], { type: EXCEL_TYPE });
            FileSaver.saveAs(data, fileName + '.xlsx');

        });
    }

    exportPdf(criteriaData: any[], exportData: any[], filename: string): void {
        const doc = new jsPDF();
        const columnsCriteria: any[] = [];
        const columnsData: any[] = [];

        Object.keys(criteriaData[0]).forEach(e => {
            const headerObject: any = {};
            headerObject.header = e;
            headerObject.dataKey = e;
            columnsCriteria.push(headerObject);
        });
        Object.keys(exportData[0]).forEach(e => {
            const headerData: any = {};
            headerData.header = e;
            headerData.dataKey = e;
            columnsData.push(headerData);
        });
        autoTable(doc, {
            columns: columnsCriteria,
            body: criteriaData,
            startY: 25,
            margin: { horizontal: 10 },
            styles: { overflow: 'linebreak', fontSize: 5 },
            bodyStyles: { valign: 'top' },
            theme: 'striped',
            showHead: 'everyPage', didDrawPage(data) {
                // Header
                doc.setFontSize(10);
                doc.setTextColor(40);
                doc.text('Critères :', data.settings.margin.left, 22);
            }
        });
        autoTable(doc, {
            columns: columnsData,
            body: exportData,
            startY: 41,
            margin: { horizontal: 10 },
            styles: { overflow: 'linebreak', fontSize: 5 },
            bodyStyles: { valign: 'top' },
            theme: 'striped',
            showHead: 'everyPage', didDrawPage(data) {
                // Header
                doc.setFontSize(10);
                doc.setTextColor(40);
                doc.text('Liste des ' + filename, data.settings.margin.left, 40);
            }
        });
        doc.save(filename + '.pdf');
    }

    exportCSV(criteriaData: any[], exportData: any[], filename: string) {
        const replacer = (key, value) => value === null ? '' : value; // specify how you want to handle null values here
        const headerCr = Object.keys(criteriaData[0]);
        const header = Object.keys(exportData[0]);

        const csvCr = criteriaData.map(row => headerCr.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
        csvCr.unshift(header.join(';'));
        const csvCrArray = csvCr.join('\r\n');

        const csv = exportData.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(';'));
        csv.unshift(header.join(';'));
        const csvArray = csv.join('\r\n');
        const blob = new Blob([csvCrArray, '\n', '\n', csvArray], { type: 'text/csv' });
        saveAs(blob, filename + '.csv');
    }
}
