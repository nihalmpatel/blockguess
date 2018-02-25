var SafeMath = artifacts.require("./SafeMath.sol");
var GamblingToken = artifacts.require("./GamblingToken.sol");
var BetGame = artifacts.require("./BetGame.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.link(SafeMath, GamblingToken);
  deployer.deploy(GamblingToken).then(function(){
    return deployer.deploy(BetGame, GamblingToken.address);
  });
};
