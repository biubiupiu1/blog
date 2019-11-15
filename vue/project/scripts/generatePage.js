// generateComponent.js`
const chalk = require('chalk')
const path = require('path')
const fs = require('fs')
const resolve = (...file) => path.resolve(__dirname, ...file)
const log = message => console.log(chalk.green(`${message}`))
const successLog = message => console.log(chalk.blue(`${message}`))
const errorLog = error => console.log(chalk.red(`${error}`))
const { vueTemplate, cssTemplate, routerTemplate } = require('./template')

const generateFile = (path, data) => {
    if (fs.existsSync(path)) {
        errorLog(`${path}文件已存在`)
        return
    }
    return new Promise((resolve, reject) => {
        fs.writeFile(path, data, 'utf8', err => {
            if (err) {
                errorLog(err.message)
                reject(err)
            } else {
                resolve(true)
            }
        })
    })
}
log('请输入要生成的页面名称')
let componentName = ''
process.stdin.on('data', async chunk => {
    let inputName = String(chunk).trim().toString();
    inputName = inputName.replace(/./, m => m.toUpperCase());
    /**
     * 组件目录路径
     */
    const componentDirectory = resolve('../src/views', inputName)
    const routerDirectory = resolve('../src/router', inputName)

    console.log(componentDirectory, routerDirectory)
    const hasComponentDirectory = fs.existsSync(componentDirectory)
    const hasRouterDirectory = fs.existsSync(componentDirectory)
    if (hasComponentDirectory || hasRouterDirectory) {
        errorLog(`${inputName}页面目录已存在，请重新输入`)
        return
    } else {
        log(`正在生成 view 目录 ${componentDirectory}`)
        await dotExistDirectoryCreate(componentDirectory)
        log(`正在生成 router 目录 ${componentDirectory}`)
        await dotExistDirectoryCreate(routerDirectory)
        // fs.mkdirSync(componentDirectory);
    }
    try {

        componentName = inputName

        /**
         * vue组件路径
         */
        const componentVueName = resolve(componentDirectory, componentName + '.vue')
        /**
         * css路径
         */
        const scssComponentName = resolve(componentDirectory, componentName + '.scss')

        let relativeUrl = path.relative(
            "../src/router",
            componentVueName
        )
        /**
         * router 路径
         */
        const routerJs = resolve(routerDirectory, 'index.js')

        log(`正在生成 vue 文件 ${componentVueName}`)
        await generateFile(componentVueName, vueTemplate(componentName))
        log(`正在生成 scss 文件 ${scssComponentName}`)
        await generateFile(scssComponentName, cssTemplate(componentName))

        log(`正在生成 router 文件 ${routerJs}`)
        await dotExistDirectoryCreate(componentDirectory)
        await generateFile(routerJs, routerTemplate(componentName))
        successLog('生成成功')
    } catch (e) {
        errorLog(e.message)
    }

    process.stdin.emit('end')
})
process.stdin.on('end', () => {
    log('exit')
    process.exit()
})
function dotExistDirectoryCreate(directory) {
    return new Promise((resolve) => {
        mkdirs(directory, function () {
            resolve(true)
        })
    })
}

// 递归创建目录
function mkdirs(directory, callback) {
    var exists = fs.existsSync(directory)
    if (exists) {
        callback()
    } else {
        mkdirs(path.dirname(directory), function () {
            fs.mkdirSync(directory)
            callback()
        })
    }
}