import clear from "clear";
import chalk from "chalk";
import figlet from "figlet";


const bannerBuilder: () => void = () => {
  clear();
  console.log(
    chalk.green(
      figlet.textSync(
        'Vote Counter',
        {
          font: "ANSI Shadow",
          horizontalLayout: "default",
        }
      )
    )
  );
};

export default bannerBuilder;
