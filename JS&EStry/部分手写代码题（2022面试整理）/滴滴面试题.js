function test() {
  console.log("start");

  setTimeout(() => {
    console.log("children2");
    Promise.resolve().then(() => {
      console.log("children2-1");
    });
  }, 0);

  setTimeout(() => {
    console.log("children3");
    Promise.resolve().then(() => {
      console.log("children3-1");
    });
  }, 0);

  Promise.resolve().then(() => {
    console.log("children1");
  });

  console.log("end");
}
test();
//有多少种排列方法
const permute = (nums) => {
  const res = [];
  const used = {};

  function dfs(path) {
    if (path.length == nums.length) {
      // 个数选够了
      res.push(path.slice()); // 拷贝一份path，加入解集res
      return; // 结束当前递归分支
    }
    for (const num of nums) {
      // for枚举出每个可选的选项
      // if (path.includes(num)) continue; // 别这么写！查找是O(n)，增加时间复杂度
      if (used[num]) continue; // 使用过的，跳过
      path.push(num); // 选择当前的数，加入path
      console.log(num, "path:", path);
      used[num] = true; // 记录一下 使用了
      dfs(path); // 基于选了当前的数，递归
      path.pop(); // 上一句的递归结束，回溯，将最后选的数pop出来
      console.log(num, "POP:", path, used[num]);
      used[num] = false; // 撤销这个记录
    }
  }

  dfs([]); // 递归的入口，空path传进去
  return res;
};

console.log(permute(["e1", "e2", "e3"]));
