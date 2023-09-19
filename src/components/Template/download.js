import FileSaver from "file-saver";
import JSZip from "jszip";
export async function downloadHtml(componentHTML, fileName) {
  // let arr=[]

  // const check=document.querySelector('#template1').innerHTML;
  // console.log("Check ",check)
  // console.log("Here")

  // arr.push(check)
  // // arr.push(check)
  // const blob = new Blob(arr);

  // // Save the Blob object to the new folder.
  // FileSaver.saveAs(blob, `my-component.zip`);

  const zip = new JSZip();
  // const indexFolder = zip.folder('index');
  // console.log("Index Folder",indexFolder)
  // Create the index.html file.
  const indexFile = zip.file(
    "index/index.html",
    `
    
${document.querySelector("#template1").innerHTML}
`
  );
  const indexJs=zip.file("index/app.js",`(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();
`);
console.log("Index JS", indexJs)
  const blob = await zip.generateAsync({ type: "blob" });

  // Save the zip file to the user's computer.
  FileSaver.saveAs(blob, "my-zip-file.zip");
}
