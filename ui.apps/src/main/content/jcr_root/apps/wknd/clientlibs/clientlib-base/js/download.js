// document.addEventListener('DOMContentLoaded', function () {
//     const downloadButtons = document.querySelectorAll('.download-button');

//     downloadButtons.forEach(button => {
//         button.addEventListener('click', function () {
//             // Get the download URL associated with the button
//             const downloadUrl = button.dataset.downloadUrl;

//             // Fetch the content of the download page
//             fetch(downloadUrl)
//                 .then(response => response.text())
//                 .then(pageContent => {
//                     // Use a PDF generation library like jsPDF
//                     const pdf = new jsPDF();

//                     // Add content to the PDF (use the fetched HTML content)
//                     pdf.text(pageContent, 10, 10);

//                     // Save the PDF as a file
//                     pdf.save('downloaded-page.pdf');
//                 })
//                 .catch(error => console.error('Error fetching page content:', error));
//         });
//     });
// });

function downloadPdf(button) {
    var url = button.getAttribute('data-url');

    fetch(url)
        .then(response => response.text())
        .then(htmlContent => {
            // Use jsPDF library to create a PDF
            var pdf = new jsPDF();
            pdf.fromHTML(htmlContent, 15, 15);

            // Save the PDF
            pdf.save('redirected-page.pdf');
        })
        .catch(error => console.error('Error fetching content:', error));
}
