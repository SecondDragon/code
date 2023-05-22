import SparkMD5 from "spark-md5";

// 计算文件hash值
export const getHash = (file, SIZE, cb) => {
  const blobSlice =
    File.prototype.slice ||
    File.prototype.mozSlice ||
    File.prototype.webkitSlice;
  const chunkSize = SIZE;
  const chunks = Math.ceil(file.size / chunkSize);
  let currentChunk = 0;
  const spark = new SparkMD5.ArrayBuffer();
  const fileReader = new FileReader();

  function loadNext() {
    var start = currentChunk * chunkSize,
      end = start + chunkSize >= file.size ? file.size : start + chunkSize;
    fileReader.readAsArrayBuffer(blobSlice.call(file, start, end));
  }

  const promise = new Promise((resolve) => {
    fileReader.onload = function (e) {
      const progress = ((currentChunk + 1) / chunks) * 100;
      console.log(progress);
      cb(progress);
      console.log("read chunk nr", currentChunk + 1, "of", chunks);
      spark.append(e.target.result); // Append array buffer
      currentChunk++;

      if (currentChunk < chunks) {
        loadNext();
      } else {
        console.log("finished loading");
        const hash = spark.end();
        console.info("computed hash", hash); // Compute hash
        resolve({ code: 1, hash });
      }
    };

    fileReader.onerror = function () {
      console.warn("oops, something went wrong.");
      resolve({ code: 0, message: "oops, something went wrong." });
    };
  });

  loadNext();
  return promise;
};
