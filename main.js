import fs from "fs/promises";
import moment from "moment";

// 1) დაწერეთ ფუნცქია რომელიც წამოიღებს ინფორმაციას ამ ეიპიაიდან
// https://dummyjson.com/recipes
// გაფარსეთ მოსული დეითა ამოიღეთ მხოლოდ შემდეგი ფროფერთები:
//  name, ingredients,prepTimeMinutes, rating და ჩაწერეთ ეს ინფო recipes.json ში.

async function task1() {
  const endrecipes = [];
  for (let i = 0; i < 50; i += 30) {
    const data = await fetch(
      `https://dummyjson.com/recipes?skip=${i}&limit=30`
    );
    const recipes = await data.json();
    const parsedRecipes = recipes.recipes.map((el) => {
      return {
        name: el.name,
        ingredients: el.ingredients,
        prepTimeMinutes: el.prepTimeMinutes,
        rating: el.rating,
      };
    });
    endrecipes.push(...parsedRecipes);
  }
  await fs.writeFile("recipes.json", JSON.stringify(endrecipes));
}

task1();

// 2) წამოიღეთ ინფორმაცია ამ სერვერიდან https://dummyjson.com/users
// გაფარსეთ დეითა და ამოიღეთ შემდეგი მონაცემები, id, fullName, email, birthDate,
// country დაბადების თარიღი დააფორმატეთ moment ით, და ისე ჩაეწრეთ users.json  ში.

async function task2() {
  const endusers = [];
  for (let i = 0; i < 208; i += 30) {
    const data = await fetch(`https://dummyjson.com/users?skip=${i}&limit=30`);
    const users = await data.json();
    const parsedUsers = users.users.map((el) => {
      return {
        id: el.id,
        fullName: `${el.firstName} ${el.lastName}`,
        email: el.email,
        birthDate: formatDate(el.birthDate),
        country: el.address.country,
      };
    });
    endusers.push(...parsedUsers);
  }
  await fs.writeFile("users.json", JSON.stringify(endusers));
}

function formatDate(date) {
  return moment(date).format("MMMM Do YYYY, h:mm:ss a");
}

task2();

// 3 ქულა ვისაც გინდათ დამატებით დაამატეთ რაიმე (descending order)

async function task3() {
  const resp = await fetch(
    `https://dummyjson.com/recipes?sortBy=rating&order=desc&limit=5`
  );
  const data = await resp.json();
  const parsedData = data.recipes.map((el) => {
    return {
      name: el.name,
      ingredients: el.ingredients,
      prepTimeMinutes: el.prepTimeMinutes,
      rating: el.rating,
    };
  });
  await fs.writeFile("top5recipes.json", JSON.stringify(parsedData));
}

task3();
