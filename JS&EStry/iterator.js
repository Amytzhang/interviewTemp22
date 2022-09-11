//iterator遍历器是一种机制（接口）：为各种不同的数据结构提供统一的访问机制，
//任何数据结构只要部署iterator接口，就可以完成遍历操作，一次处理该数据结构的所有成员
/*
  拥有next方法用于依次遍历数据结构的成员
  每一次遍历返回的结果是一个对象{done: false,value:xxx}
    done:记录是否遍历完成
    value:当前遍历的结果

  拥有Symbol.iterator属性的数据结构（值），被称为可被遍历的，可以基于 for of 循环处理
    + 数组
    + 部分类数组： arguments/nodeList/htmlCollection...
    + String
    + Set
    + Map
    + generator object...

    对象默认不具备Symbol.iterator,属于不可被遍历的数据结构

 */
    class Iterator {
      constructor(assemble) {
        let self = this;
        self.assemble = assemble;
        self.index = 0;
      }
      next() {
        let self = this,
        assemble = self.assemble,
        index = self.index;
        if(index > assemble.length -1) return { done: true,value: undefined}
        return {
          done: false,
          value: assemble[self.index++]
        }
      }
    }
    let iter = new Iterator([1,2,3,4,5,6]);
    console.log(iter.next());
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())
    console.log(iter.next())


  let arr = [10,20,30,40];
  for(let item of arr) {
    // for of 内部是按照iterator.next去迭代，
    //只有具备[Symbol.iterator]属性才能用for of 遍历
  
    console.log('for of:',item)
  }

  let obj2 = {
    0:10,
    1:20,
    2:30,
    3:40,
    length: 4,
    // 1
    // [Symbol.iterator]: Array.prototype[Symbol.iterator]
    // 2
    [Symbol.iterator]:function() {
      return new Iterator(this)
    }
  }
  console.log(obj2)
  for(let item2 of obj2) {
    console.log('obj:',item2)
  }
 