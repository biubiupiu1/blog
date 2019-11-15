// template.js
module.exports = {
  vueTemplate: compoenntName => {
    return `<template>
  <div class="${compoenntName}">
    ${compoenntName}组件
  </div>
</template>
<script>

export default {
  name: '${compoenntName}'
}
</script>

<style lang="scss" scoped>
</style>
`
  },
  entryTemplate: compoenntName => {

    let arr = compoenntName.split("-");
    arr = arr.map(item => item.replace(/./, match => match.toUpperCase()))

    let exportName = arr.join("");

    return `import ${exportName} from './${compoenntName}.vue'
export default ${exportName}`
  },

  cssTemplate: compoenntName => {
    return ``
  },

  routerTemplate: (Name) => {

    let _name = Name.replace(/./, match => match.toLowerCase());
    return `import ${Name} from "../../views/${Name}/${Name}"

export default [
    {
        path: '/${_name}',
        name: ${Name},
        component: ${Name},
    }
]`
  }

}