import hre from "hardhat";
import { task } from "hardhat/config";

task("verify", "Verifies contracts code of address")
  .addParam("address", "The contract's deployed address")
  .addParam("testator", "Address of the owner of this Will")
  .addParam("executor", "Address of the executor of this Will")
  .addParam("locktime", "Days of wait time after execution of this Will")
  .setAction(async (taskArgs) => {
    await hre.run("verify:verify", {
      address: taskArgs.address,
      constructorArguments: [
        taskArgs.testator,
        taskArgs.executor,
        taskArgs.locktime,
      ],
    });
  });

module.exports = {};
