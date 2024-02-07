const main = async () => {
  const array = [123, 23, 3544, 423, 5, 64, 100];

  const array1 = array.sort((a, b) => {
    return b - a;
  });

  console.log(array1);
};

main();
