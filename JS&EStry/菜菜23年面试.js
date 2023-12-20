function find(data) {
  let result = Array.isArray(data) ? data : [data];
  const query = {
    where: function (condition) {
      let keyList = Object.entries(condition);
      for (let i = 0; i < keyList.length; i++) {
        result = result.filter((item) => {
          let key = keyList[i][0];
          let value = keyList[i][1];
          return value.test(item[key]) == true;
        });
      }
      return query;
    },
    order: function (key, direction) {
      result.sort((a, b) => {
        if (direction === "asc") {
          return a[key] - b[key];
        } else if (direction === "desc") {
          return b[key] - a[key];
        } else {
          return 0;
        }
      });
      return result;
    }
  };
  return query;
}
const item = find([
  { title: null, id: 0 },
  { title: "w1", id: 1 },
  { title: "w2", id: 2 },
  { title: "w11", id: 3 },
  { title: "w10", id: 4 }
])
  .where({ title: /\d$/ })
  .order("id", "desc");
console.log(item);
