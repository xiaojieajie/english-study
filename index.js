const fs = require('fs').promises
const path = require('path')

async function getAllFileName() {
  const dirs = await getTargetDir()
  const filenames = dirs.map(dir => {
    const targetPath = path.resolve(__dirname, dir)
    return fs.readdir(targetPath)
  })
  return (await Promise.all(filenames)).flat(2)
}

async function getTargetDir() {
  const dirs = await fs.readdir('./')
  const reg = /\.\w+$/
  return dirs.filter(dir => !reg.test(dir))
}

async function writeReadme() {
  const allFileName = await getAllFileName()
  let str = `# 记录自己每天学英语\n\n## 一天五条句子\n\n`
  const result = []
  for (const filename of allFileName) {
    result.push(`[${filename.substr(0, 10)}](${filename.substr(0, 7)}/${filename})`)
  }

  str += result.join('\n\n')

  const targetPath = path.resolve(__dirname, 'README.md')

  try {
    fs.writeFile(targetPath, str, {
      encoding: 'utf-8'
    })
    console.log('书写文件成功')
  } catch (err) {
    console.log('书写文件失败')
  }

}

writeReadme()