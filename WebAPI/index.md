#### element.style

> HTMLElement.style 属性返回一个 CSSStyleDeclaration 对象，
表示元素的 内联style 属性（attribute），但忽略任何样式表应用的属性。 
通过 style 可以访问的 CSS 属性列表，可以查看 CSS Properties Reference。

#### getComputedStyle(element, [])

> 返回的style是一个实时的 CSSStyleDeclaration 对象，当元素的样式更改时，它会自动更新本身。而且他是只读的

### 返回的对象与从元素的 style  属性返回的对象具有相同的类型;然而，两个对象具有不同的目的。从getComputedStyle返回的对象是只读的，可以用于检查元素的样式（包括由一个`<style>`元素或一个外部样式表设置的那些样式）。elt.style对象应用于在特定元素上设置样式。