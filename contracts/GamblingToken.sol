pragma solidity ^0.4.4;

import './SafeMath.sol';

contract GamblingToken {
    
    using SafeMath for uint256;
    
    string public constant name = "Gambling Token";                  
    uint8 public constant decimals = 0;                
    string public constant symbol = "GBT";
    uint256 public totalSupply = 1000000;
    uint256 public RATE = 5000;
    address owner;
    
    mapping (address => uint256) balances;
    mapping (address => mapping (address => uint256)) allowed;
    
    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    event Approval(address indexed _owner, address indexed _spender, uint256 _value);
    
    function GamblingToken() public payable {
        owner = msg.sender;
        balances[owner] = totalSupply;
    }
    
    function() payable {
        createTokens(msg.sender,msg.value);
    }
    
    function createTokens(address _owner, uint256 _value) public payable returns(uint256) {
        require(_value > 0);
        uint256 tokens = (_value.mul(RATE)).div(1000000000000000000);
        balances[_owner] = balances[_owner].add(tokens);
        totalSupply = totalSupply.add(tokens);
        if (msg.sender == owner)
            owner.transfer(_value);
        return tokens;
    }
    
    function totalSupply() view public returns (uint256 supply) {
        return totalSupply;
    }
    
    function transfer(address _to, uint256 _value) public returns (bool success) {
        if (balances[msg.sender] >= _value && _value > 0) {
            balances[msg.sender] = balances[msg.sender].sub(_value); 
            balances[_to] = balances[_to].add(_value);
            Transfer(msg.sender, _to, _value);
            return true;
        } else { return false; }
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        if (balances[_from] >= _value && allowed[_from][msg.sender] >= _value && _value > 0) {
            balances[_to] = balances[_to].add(_value);
            balances[_from] = balances[_from].sub(_value);
            allowed[_from][msg.sender] = allowed[_from][msg.sender].sub(_value);
            Transfer(_from, _to, _value);
            return true;
        } else { return false; }
    }

    function balanceOf(address _owner) view public returns (uint256 balance) {
        return balances[_owner];
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        if(_value>0 && _spender != address(0x0)) {
            allowed[msg.sender][_spender] = _value;
            Approval(msg.sender, _spender, _value);
            return true;
        } else { return false; }
    }

    function allowance(address _owner, address _spender) view public returns (uint256 remaining) {
      return allowed[_owner][_spender];
    }
    
}