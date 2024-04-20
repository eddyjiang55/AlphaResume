const pdfParse = require('pdf-parse');

// 这个函数假设将PDF文本内容直接转换为Markdown（这里简化处理）
function convertToMarkdown(pdfBuffer) {
    return pdfParse(pdfBuffer).then(data => {
        // 这里的转换逻辑可以根据实际情况复杂化，比如添加Markdown的格式化标记
        // 比如将章节标题转换为Markdown的标题等
        return data.text.replace(/\n/g, '\n\n'); // 简单地将换行替换成Markdown的换行
    });
}

module.exports = { convertToMarkdown };
