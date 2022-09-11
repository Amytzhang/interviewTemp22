let template = `我是{{name}},年龄{{age}},性别{{sex}}`;
let data = {
    name: '姓名',
    age: 19
}

function render(template, data) {
    let translate = template.replace(/\{\{(\w+)\}\}/g, function(match, key) {
        return data[key]
    })
    console.log(translate)
    return translate
}
render(template, data)