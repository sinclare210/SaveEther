// SPDX-License-Identifier: MIT-License
pragma solidity ^0.8.24;

contract StudentPortal{
    error NotAStudent();
    error AlreadyAStudent();
    address immutable public owner;

     constructor() {
        owner = msg.sender;
    }


    struct Student{
     
        string name;
        string email;
        uint dob;
        string lga;
        string country;
        string state;
        bool exist;
        
    }
    

    mapping ( address => Student) public studentRecords;
 
    modifier onlyOwner (){
        require(owner == msg.sender,"Not Owner");
        _;
    }

    function registerStudents( string memory _name,string memory _email,string memory _lga,uint _dob,string  memory _country,string memory _state) public  onlyOwner(){
            if (studentRecords[msg.sender].exist == false){
             
            studentRecords[msg.sender] = (Student({
                 
                name:_name,
                email:_email,
                lga:_lga,
                dob: _dob,
                country:_country,
                state:_state,
                exist: true
            }));
           
            }   else{
                revert AlreadyAStudent();
            } 

    }

     function updateRecords(string memory _name,string memory _email,string memory _lga,uint _dob,string  memory _country,string memory _state,bool _exist) external onlyOwner(){
        if (studentRecords[msg.sender].exist == true){
          
            studentRecords[msg.sender].name = _name;
           studentRecords[msg.sender].email = _email;
           studentRecords[msg.sender].lga = _lga;
           studentRecords[msg.sender].dob = _dob;
           studentRecords[msg.sender].country = _country;
           studentRecords[msg.sender].state = _state;
           studentRecords[msg.sender].exist = _exist;
           }else{
            revert NotAStudent();
        }
           
           
    } 

    function deleteRecords() external onlyOwner{
        if (studentRecords[msg.sender].exist == true){
            delete studentRecords[msg.sender];

        }else{
            revert NotAStudent();
        }
       
    }

    function getStudents(address _student) external view  onlyOwner returns  (Student memory){
       return studentRecords[_student];
    }



}