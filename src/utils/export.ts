export async function exportPDFToFile(response: { blob: () => any }, name: string) {
  const blob = await response.blob()

  // 创建对象 URL
  const url = URL.createObjectURL(blob)

  // 创建隐藏的 <a> 标签触发下载
  const a = document.createElement('a')
  a.href = url
  a.download = `${name}.pdf` // 下载文件名
  document.body.appendChild(a)
  a.click()

  // 清理：移除 <a> 标签并释放对象 URL
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
