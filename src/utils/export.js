export const exportToCSV = (data, filename) => {
  if (!data || !data.length) {
    alert("No data to export.")
    return
  }
  
  // Extract headers
  const headers = Object.keys(data[0]).join(',')
  
  // Extract rows
  const rows = data.map(obj => 
    Object.values(obj).map(val => {
      // Handle values with commas or quotes
      let strVal = String(val)
      if (strVal.includes(',') || strVal.includes('"') || strVal.includes('\n')) {
        strVal = `"${strVal.replace(/"/g, '""')}"`
      }
      return strVal
    }).join(',')
  ).join('\n')
  
  const csv = `${headers}\n${rows}`
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.setAttribute('href', url)
  link.setAttribute('download', filename)
  link.style.visibility = 'hidden'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}
