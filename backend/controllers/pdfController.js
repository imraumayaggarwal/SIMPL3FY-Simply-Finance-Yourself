// Create a PDF report
const fs = require('fs');
const Expense = require('../models/expenseModel');
const Budget = require('../models/budgetModel');
const PDFDocument = require('pdfkit');
const { v4: uuidv4 } = require('uuid');
const path = require('path');

// Create a PDF report and send it directly in the response
exports.createPDF = async (req, res) => {
    const { category, startDate, endDate, userId, chartImage } = req.body;
    try {
        // Get the budget for the selected category
        const budget = await Budget.findOne({ category, userId });
        if (!budget) return res.status(404).json({ message: 'Budget not found' });

        // Fetch all expenses within the date range
        const expenses = await Expense.find({
            category,
            userId,
            date: { $gte: new Date(startDate), $lte: new Date(endDate) }
        });

        // Prepare data for the PDF
        const totalExpenses = expenses.reduce((acc, exp) => acc + exp.amount, 0);
        const remainingBudget = budget.amount - totalExpenses;

        // Set up PDF
        const doc = new PDFDocument();

        // Set response headers to indicate it's a PDF file
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="expense_report.pdf"');

        // Pipe the PDF output directly to the response
        doc.pipe(res);

        // Title
        doc.fontSize(20).text(`${category} Budget Report`, { align: 'center', underline: true });

        // Budget Info
        doc.moveDown().fontSize(12).text(`CATEGORY:              ${category}`);
        doc.text(`Total Budget:             ${budget.amount} rs`);
        doc.text(`Total Expenses:         ${totalExpenses} rs`);
        doc.text(`Remaining Budget:    ${remainingBudget} rs`);
        doc.moveDown();
        
        // Expenses Table
        doc.text('EXPENSES:');
        expenses.forEach(exp => {
            doc.text(`${exp.date.toISOString().slice(0, 10)}:    ${exp.amount} rs`);
        });
        doc.moveDown();

        // Add Chart Image (if present)
        if (chartImage) {
            // Decode the base64 image and embed it
            const imgBuffer = Buffer.from(chartImage.split(',')[1], 'base64');
            doc.image(imgBuffer, { fit: [500, 400], align: 'center' });
        }

        // Finalize the document
        doc.end();
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ message: 'Error generating PDF report' });
    }
};


// Function to delete the file after download (optional)
exports.cleanupPDF = (filePath) => {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error('Error deleting the file:', err);
        } else {
            console.log('PDF file deleted successfully.');
        }
    });
};

// Generate line graph using Puppeteer and Chart.js
const generateGraph = async (expenses, doc) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    // Create a chart in HTML
    const chartHTML = `
        <html>
        <head>
            <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
        </head>
        <body>
            <canvas id="myChart" width="800" height="600"></canvas>
            <script>
                var ctx = document.getElementById('myChart').getContext('2d');
                var myChart = new Chart(ctx, {
                    type: 'line',
                    data: {
                        labels: ${JSON.stringify(expenses.map((exp) => exp.date.toISOString().slice(0, 10)))},
                        datasets: [{
                            label: 'Expenses',
                            data: ${JSON.stringify(expenses.map((exp) => exp.amount))},
                            borderColor: 'rgba(75, 192, 192, 1)',
                            borderWidth: 1,
                            fill: false,
                        }]
                    },
                    options: {
                        responsive: true,
                        scales: {
                            x: { beginAtZero: true }
                        }
                    }
                });
            </script>
        </body>
        </html>
    `;

    await page.setContent(chartHTML);

    // Wait for the chart to render
    await page.waitForSelector('canvas');

    // Screenshot the chart and save it as an image
    const chartPath = path.join(__dirname, 'chart.png');
    await page.screenshot({ path: chartPath, clip: { x: 0, y: 0, width: 1000, height: 800 } });

    await browser.close();

    // Add the chart image to the PDF document
    doc.image(chartPath, { width: 500, align: 'center' });

    // After embedding the image into the PDF, delete it from the server
    fs.unlink(chartPath, (err) => {
        if (err) {
            console.error('Error deleting the chart image:', err);
        } else {
            console.log('Chart image deleted successfully.');
        }
    });
};
