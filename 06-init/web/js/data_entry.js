//数据录入JavaScript文件

document.addEventListener("DOMContentLoaded", function() {
    const fileUploadInput = document.getElementById("file-upload");
    const termInput = document.getElementById("term");
    const tbody = document.getElementById("table-body");

    // 确保表格至少显示六行
    const rowCount = 6;
    for (let i = 0; i < rowCount; i++) {
        // 创建一个新的表格行
        const row = document.createElement("tr");
        // 设置行的背景色
        row.style.backgroundColor = i % 2 === 0 ? "#cfd5eb" : "#e9ecf5";
        // 创建并插入空的单元格
        for (let j = 0; j < 3; j++) {
            const cell = document.createElement("td");
            cell.textContent = ""; // 空白内容
            row.appendChild(cell);
        }
        // 将行添加到表格主体中
        tbody.appendChild(row);
    }


    // 处理文件上传
    fileUploadInput.addEventListener("change", function() {
        const files = this.files;
        handleFileUpload(files);
    });

    // 处理拖拽文件
    document.body.addEventListener("dragover", function(event) {
        event.preventDefault();
        event.stopPropagation();
    });

    document.body.addEventListener("drop", function(event) {
        event.preventDefault();
        event.stopPropagation();
        const files = event.dataTransfer.files;
        handleFileUpload(files);
    });

    // 处理词条提交
    document.querySelector(".term-input button").addEventListener("click", function() {
        const term = termInput.value;
        // 处理词条提交

        // 更新记录数量（假设您有对应的记录数量）
        const recordCount = 0; // 假设有0条记录
        updateRecordCount(recordCount);
    });

    // 处理文件上传函数
    function handleFileUpload(files) {
        // 清空之前的文件展示
        tbody.innerHTML = "";
        // 确保表格至少显示六行
        const rowCount = Math.max(6, files.length);

        // 遍历上传的每个文件
        for (let i = 0; i < rowCount; i++) {
            const file = files[i] || {};// 确保即使文件不足六行也能显示空行
            // 创建一个新的表格行
            const row = document.createElement("tr");
            // 设置行的背景色
            row.style.backgroundColor = i % 2 === 0 ? "#cfd5eb" : "#e9ecf5";
            // 在表格行中插入文件信息
            const fileNameCell = document.createElement("td");
            fileNameCell.textContent = file.name || "";
            const fileTypeCell = document.createElement("td");
            fileTypeCell.textContent = file.type || "";
            const fileSizeCell = document.createElement("td");
            fileSizeCell.textContent = formatBytes(file.size || 0);
            // 将单元格添加到行中
            row.appendChild(fileNameCell);
            row.appendChild(fileTypeCell);
            row.appendChild(fileSizeCell);
            // 将行添加到表格主体中
            tbody.appendChild(row);
        }
        // 更新记录数量
        updateRecordCount(files.length);
    }

    // 格式化文件大小函数
    function formatBytes(bytes, decimals = 2) {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const dm = decimals < 0 ? 0 : decimals;
        const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
    }

    // 更新记录数量的函数
    function updateRecordCount(count) {
        const recordCountElement = document.getElementById("record-count");
        recordCountElement.textContent = `${count} records`;
    }
});