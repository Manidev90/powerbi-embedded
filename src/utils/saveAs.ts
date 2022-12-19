/**
 * Downloads a file by simulating a user clicking a html link
 *
 * @param url where the file/blob resides
 */
function saveAs(url: string, fileName = "") {
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;

  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
}

export default saveAs;
