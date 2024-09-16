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
        uint regNo; 
        string name;
        string email;
        uint dob;
        string lga;
        string country;
        string state;
        bool exist;
        
    }
    

    mapping ( uint => Student) public studentRecords;
    Student[] public students;

    

    

    modifier onlyOwner (){
        require(owner == msg.sender,"Not Owner");
        _;
    }

    

   

    function registerStudents(uint _regNo, string memory _name,string memory _email,string memory _lga,uint _dob,string  memory _country,string memory _state) public  onlyOwner(){
            if (studentRecords[_regNo].exist == false){
                Student memory newStudent = Student({
                regNo: _regNo,    
                name:_name,
                email:_email,
                lga:_lga,
                dob: _dob,
                country:_country,
                state:_state,
                exist: true
            });
            studentRecords[_regNo] = (newStudent);
        students.push(newStudent);
            }   else{
                revert AlreadyAStudent();
            } 

    }

     function updateRecords(uint _regNo,string memory _name,string memory _email,string memory _lga,uint _dob,string  memory _country,string memory _state,bool _exist) external onlyOwner(){
        if (studentRecords[_regNo].exist == true){
            studentRecords[_regNo].regNo = _regNo;
            studentRecords[_regNo].name = _name;
           studentRecords[_regNo].email = _email;
           studentRecords[_regNo].lga = _lga;
           studentRecords[_regNo].dob = _dob;
           studentRecords[_regNo].country = _country;
           studentRecords[_regNo].state = _state;
           studentRecords[_regNo].exist = _exist;

           for (uint i = 0; i < students.length; i++) {
                if (students[i].regNo == _regNo) {
                    
                    students[i].name = _name;
                    students[i].email = _email;
                    students[i].dob = _dob;
                    students[i].lga = _lga;
                    students[i].country = _country;
                    students[i].state = _state;
                    break;
                }
            }
            
        }else{
            revert NotAStudent();
        }
           
           
    } 

    function deleteRecords(uint _regNo) external onlyOwner{
        if (studentRecords[_regNo].exist == true){
            delete studentRecords[_regNo];

             for (uint i = 0; i < students.length; i++) {
                if (students[i].regNo == _regNo) {
                    students[i] = students[students.length - 1];
                    students.pop();
                    break;
                }
            }
        }else{
            revert NotAStudent();
        }
       
    }

    function getAllStudents() external view  onlyOwner returns  (Student[] memory){
        Student[] memory allStudentsRecords = new Student[](students.length);
        for (uint i = 0; i < students.length; i++) 
        {
            allStudentsRecords[i] = students[i];
        }

        return allStudentsRecords;
    }



}