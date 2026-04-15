import Mock from "mockjs";

export interface Item {
  id: number;
  title: string;
  img: string;
}

export function fetchList(): Promise<Item[]> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const data = Mock.mock({
        "list|1000": [
          {
            "id|+1": 1,
            title: "@ctitle(5, 20)",
            img: "@image(100x100, @color, #fff, img)",
          },
        ],
      });
      resolve(data.list);
    }, 300);
  });
}