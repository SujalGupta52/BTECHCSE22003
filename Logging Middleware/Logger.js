import axios from "axios";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJzdWphbGtvbGthdGExNEBnbWFpbC5jb20iLCJleHAiOjE3NTU1ODkwMDksImlhdCI6MTc1NTU4ODEwOSwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjM4YjU4ZjZiLTczNzktNDAyYy04NGM5LWU5OWZhZjFiZTIwOCIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6InN1amFsIGt1bWFyIGd1cHRhIiwic3ViIjoiMDE2YWE2ZGItYzMyMi00MGEzLWI0Y2YtMDZhMDk1ODVlMGMyIn0sImVtYWlsIjoic3VqYWxrb2xrYXRhMTRAZ21haWwuY29tIiwibmFtZSI6InN1amFsIGt1bWFyIGd1cHRhIiwicm9sbE5vIjoiYnRlY2gvY3NlLzIyLzAwMyIsImFjY2Vzc0NvZGUiOiJVd1ZmSnoiLCJjbGllbnRJRCI6IjAxNmFhNmRiLWMzMjItNDBhMy1iNGNmLTA2YTA5NTg1ZTBjMiIsImNsaWVudFNlY3JldCI6ImFoRWRoTlRWZWViSFlaUnkifQ.3clzXqfMnKoeCGSsZK3QySao6kcKRLKtgvNPZCuhim4";
async function Log(stack, level, folder, message) {
  //Package cannot be used as its a reserved word
  const payload = { stack, level, package: folder, message };
  const config = {
    headers: { Authorization: `Bearer ${TOKEN}` },
  };
  await axios.post(
    "http://20.244.56.144/evaluation-service/logs",
    payload,
    config
  );
  console.log(`${level}: ${message}`);
}

export default Log;
