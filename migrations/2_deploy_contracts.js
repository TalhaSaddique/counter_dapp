const counter = artifacts.require("counter");

module.exports = function(deployer) {
  deployer.deploy(counter);
};
