
const exit = process.exit;
process.exit =  (code) => {
  setTimeout(() => {
      exit();
  }, 200);
};

require('../app');
