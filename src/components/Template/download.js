export function downloadHtml(htmlContent, fileName) {
  const blob = new Blob([htmlContent], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.getElementById("root").appendChild(a);
  a.click();
  document.getElementById("root").removeChild(a);
  URL.revokeObjectURL(url);
}
