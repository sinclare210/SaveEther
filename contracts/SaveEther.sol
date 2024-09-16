// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

contract SaveEther{

    error CantSendZero();
    error InsufficientFunds();

    address public owner;

    mapping (address => uint256) balances;

    constructor (){
        owner = msg.sender;
    } 

    event DepositSuccesful(address indexed _user, uint256 indexed _amount);
    event withdrawalSucessful(address indexed _user, uint256 indexed _amount);
   


    modifier notZeroAddress(){
        msg.sender != address(0);
        _;
    }

    function deposit() external notZeroAddress payable {
        if(msg.value <= 0){revert CantSendZero();}
        
        balances[msg.sender] += msg.value;
        emit DepositSuccesful(msg.sender, msg.value);

    }

    function withdraw(uint256 _amount) external notZeroAddress{
        if(balances[msg.sender] < _amount){revert InsufficientFunds();}

        balances[msg.sender] -= _amount;
        (bool sucess,) = msg.sender.call{value: _amount}("");
        require(sucess);
        emit withdrawalSucessful(msg.sender,_amount);

    }

    function transferFunds(address  _recipent,uint256 _amount) external {
        require(_recipent != address(0));
        balances[msg.sender] -= _amount;
        balances[_recipent] += _amount;
        (bool sucess,) = _recipent.call{value: _amount}("");
        require(sucess);
        
    }

    function getMyBalance() external view returns (uint256){
        return balances[msg.sender];
    }

    function getContractBalance() external view returns (uint256){
        return address(this).balance;
    }



}
