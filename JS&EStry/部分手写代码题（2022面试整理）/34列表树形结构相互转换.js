var data = [{
        id: 1,
        text: '节点1',
        parentId: 0 //用0作为顶级节点
    }, {
        id: 2,
        text: '节点1_1',
        parentId: 1 //通过这个确定父级
    },
    {
        id: 3,
        text: '节点1_2',
        parentId: 1 //通过这个确定父级
    }
]

//结果 
let result = [{
    id: 1,
    text: '节点1',
    parentId: 0,
    children: [{
        id: 2,
        text: '节点1_1',
        parentId: 1 //用0作为顶级节点
    }, {
        id: 3,
        text: '节点1_2',
        parentId: 1 //通过这个确定父级
    }]
}]


function listToTree(data = []) {
    let temp = {};
    let tempTree = []
    for (let i = 0; i < data.length; i++) {
        temp[data[i].id] = data[i]
    }
    console.log(temp)
    for (let id in temp) {
        if (temp[id].parentId != 0) {
            if (!temp[temp[id].parentId].children) {
                temp[temp[id].parentId].children = []
            }
            temp[temp[id].parentId].children.push(temp[id])
        } else {
            tempTree.push(temp[id])
        }
    }
    console.log(tempTree)
    return tempTree
}
listToTree(data)


//result =>data

function treeToList(data) {
    let res = []
    const dfs = (tree) => {
        tree.forEach(element => {
            if (element.children) {
                dfs(element.children)
                delete element.children
            }
            res.push(element)
        });

    }
    dfs(data)
    console.log('tree to list', res)
    return res;
}
treeToList(result)